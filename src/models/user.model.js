import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Define the user schema
const userSchema = new mongoose.Schema(
  {
    FullName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profile: { type: String },
    refreshToken: { type: String },
    role: {
      type: String,
      enum: ["admin", "recruiter"],
      default: "recruiter",
    }, // Role field for authorization
  },
  { timestamps: true }
);

// Password hashing before saving the user
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Only hash the password if it has been modified

  // Hash the password
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to compare the provided password with the hashed password
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password); // Check if the password matches
};

// Method to generate access token
userSchema.methods.generateAccessToken =  function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      FullName: this.FullName,
      role: this.role, // Include role in the token payload
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

// Method to generate refresh token
userSchema.methods.generateRefreshToken =  function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESS_TOKEN_EXPIRY,
    }
  );
};

// Create the User model
export const User = mongoose.model("User", userSchema);
