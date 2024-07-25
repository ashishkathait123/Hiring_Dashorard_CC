import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.1.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const verifyJwt = asyncHandler(async (req, _, next) => {
  try {
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
    console.log("Token:", token);
    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }
    const decodeToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decodeToken?._id).select("-password -refreshToken");
    if (!user) {
      throw new ApiError(405, "Invalid Access token");
    }
    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(console.log(error, "invalid access token"), error?.message || "Invalid access token");
  }
});

const generateAccessTokenAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    console.error("Error generating tokens:", error);
    throw new ApiError(500, "Something went wrong while generating AccessToken or RefreshToken");
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { FullName, password, email, username } = req.body;
  if ([FullName, password, email, username].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }
  const exsistedUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (exsistedUser) {
    throw new ApiError(409, "User name or email already exist");
  }
  const profileLocalPath = req.files?.profile[0]?.path;

  if (!profileLocalPath) {
    throw new ApiError(403, "Profile image is required");
  }
  const profile = await uploadonCloudnary(profileLocalPath);
  if (!profile) {
    throw new ApiError(400, "Profile file is required");
  }
  const user = await User.create({
    FullName,
    profile: profile.url,
    email,
    password,
    username: username.toLowerCase(),
  });
  const createdUser = await User.findById(user._id).select("-password -refreshToken");
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }
  return res.status(201).json(new ApiResponse(200, createdUser, "User registered successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { username, password, email } = req.body;

  if (!(email || username)) {
    throw new ApiError(400, "Username or email is required");
  }

  const user = await User.findOne({ $or: [{ username }, { email }] });
  if (!user) {
    throw new ApiError(404, "User does not exist");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(402, "Invalid credentials");
  }

  const { accessToken, refreshToken } = await generateAccessTokenAndRefreshToken(user._id);
  const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

  const options = {
    httpOnly: true,
    secure: true,
  };

  res.status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(200, { user: loggedInUser, accessToken, refreshToken }, "User logged in successfully"));
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, {
    $set: { refreshToken: undefined },
  }, { new: true });

  const options = {
    httpOnly: true,
    secure: true,
  };

  res.status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out successfully"));
});

export { registerUser, loginUser, logoutUser };
