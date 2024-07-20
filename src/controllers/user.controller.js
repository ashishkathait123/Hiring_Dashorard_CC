import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadonCloudnary } from "../utils/Cloudnary.js";
import { ApiError } from "../utils/ApiError.1.js";
const generateAccessTokenAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
        user.refreshToken = refreshToken; // save the token in the database
        await user.save({ validateBeforeSave: false }); // avoid the required fields like username etc
        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(500,console.log(error) ,"something went wrong while generating AccessToken or RefreshToken ");
       
    }
}; 

const registerUser = asyncHandler(async (req, res) => {
    const { password, email, username } = req.body;
    if ([password, email, username].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    const existingUser = await User.findOne({
        $or: [{ username }, { email }]
    });
    if (existingUser) {
        throw new ApiError(409, "Username or email already exists");
    }

    const profileImageLocalPath = req.files?.profile[0]?.path;
    if (!profileImageLocalPath) {
        throw new ApiError(403, "Profile picture is required");
    }

    const profile = await uploadonCloudnary(profileImageLocalPath);
    if (!profile) {
        throw new ApiError(400, "Failed to upload profile picture");
    }

    const user = await User.create({
        email,
        password,
        profile: profile.url || "",
        username: username.toLowerCase()
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
    const user = await User.findOne({
        $or: [{ username }, { email }]
    });
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
        secure: true
    };

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(new ApiResponse(200, { user: loggedInUser, accessToken, refreshToken }, "User logged in successfully"));
});

const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(req.user._id, {
        $set: { refreshToken: undefined }
    }, {
        new: true
    });
    const options = {
        httpOnly: true,
        secure: true
    };
    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User logged out"));
});

export { registerUser, loginUser,
     logoutUser
     };
