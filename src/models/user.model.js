import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        lowercase: true,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        lowercase: true,
        unique: true,
        trim: true,
    },
    refreshToken: {
        type: String
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    profile: {
        type: String,
        required: [true, 'Profile picture is required']
    }
}, { timestamps: true });

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
    return jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username
    }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY || '1h'  // Fallback to 1 hour if not set
    });
};

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign({
        _id: this._id,
    }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY || '7d'  // Fallback to 7 days if not set
    });
};

console.log('Access Token Expiry:', process.env.ACCESS_TOKEN_EXPIRY);
console.log('Refresh Token Expiry:', process.env.REFRESH_TOKEN_EXPIRY);

export const User = mongoose.model('User', userSchema);
