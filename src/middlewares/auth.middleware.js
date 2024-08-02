import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.1.js";

// Middleware to verify JWT and authorize user roles
export const verifyJwt = (roles = []) => {
  return asyncHandler(async (req, _, next) => {
    try {
      const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");
console.log("Raw Token:", token);
      if (!token) {
        throw new ApiError(401,console.log( "Unauthorized request"));
      }
      const decodeToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      const user = await User.findById(decodeToken?._id).select("-password -refreshToken");
      if (!user) {
        throw new ApiError(401,console.log( "Invalid access token"));
      }

      req.user = user;

      // Role-based authorization check
      if (roles.length && !roles.includes(user.role)) {
        throw new ApiError(403, "Forbidden: You do not have permission to perform this action");
      }

      next();
    } catch (error) {
      console.log("Invalid access token:", error);
      throw new ApiError(error?.status || 405, error?.message || "Invalid access token");
    }
  });
};
