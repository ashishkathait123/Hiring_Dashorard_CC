import React, { useState } from "react";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import "tailwindcss/tailwind.css";
import googleImg from "../../assets/google.png";
import grpImg from "../../assets/grp.jpeg";
import logo from "../../assets/logo.png";

function SignUp() {
  const [FullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profile, setProfile] = useState(null);
  const [message, setMessage] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("FullName", FullName);
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    if (profile) {
      formData.append("profile", profile);
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/users/signUp",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage(response.data.message);
      setRedirect(true);
    } catch (error) {
      const errorMessage = error.response?.data?.message || "SignUp failed";
      setMessage(errorMessage);
    }
  };

  if (redirect) return <Navigate to={"/login"} />;

  return (
    <div className="flex min-h-screen">
      <div className="flex flex-col justify-center w-1/2 bg-gray-100 p-10">
        <Link to={"/"}>
          <img
            src={logo}
            alt="ColoredCow Logo"
            className="h-8 w-32 mb-14 hover:text-black transform transition-transform duration-300 hover:scale-110"
          />
        </Link>
        <div className="flex flex-col items-center">
          <img 
            src={grpImg}
            alt="Office Scene"
            className="rounded-lg shadow-lg mb-4"
          />
          <div className="text-xl font-semibold text-gray-700">
            100+ People got hired
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center w-1/2 p-10 bg-white">
        <h1 className="text-3xl font-semibold mb-4 text-center">
          Get more opportunities
        </h1>
        <button className="flex items-center justify-center w-full py-2 mb-4 bg-gray-100 rounded-lg text-blue-600 font-medium border border-gray-500 hover:text-black transform transition-transform duration-300 hover:scale-110">
          <img src={googleImg} alt="Google" className="h-6 w-6 mr-2" />
          Sign Up with Google
        </button>
        <div className="flex items-center justify-center mb-4">
          <hr className="w-full border-gray-300" />
          <span className="px-4 text-gray-600 ">Or sign up with email</span>
          <hr className="w-full border-gray-300" />
        </div>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-4 relative">
            <label className="block mb-2 text-gray-600" htmlFor="FullName">
              Full Name
            </label>
            <input
              className="w-full px-4 py-2 border rounded-lg"
              type="text"
              id="FullName"
              placeholder="Enter your full name"
              required
              value={FullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="mb-4 relative">
            <label className="block mb-2 text-gray-600" htmlFor="username">
              Username
            </label>
            <input
              className="w-full px-4 py-2 border rounded-lg"
              type="text"
              id="username"
              placeholder="Enter your username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4 relative">
            <label className="block mb-2 text-gray-600" htmlFor="email">
              Email Address
            </label>
            <input
              className="w-full px-4 py-2 border rounded-lg"
              type="email"
              id="email"
              placeholder="Enter email address"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4 relative">
            <label className="block mb-2 text-gray-600" htmlFor="password">
              Password
            </label>
            <input
              className="w-full px-4 py-2 border rounded-lg pr-12"
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder={showPassword ? "Password" : "Enter password"}
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 px-4 py-2 text-gray-600 hover:text-black mt-7"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <div className="mb-4 relative">
            <label className="block mb-2 text-gray-600" htmlFor="profile">
              Profile Picture
            </label>
            <input
              className="w-full px-4 py-2 border rounded-lg"
              type="file"
              id="profile"
              accept="image/*"
              onChange={(e) => setProfile(e.target.files[0])}
            />
          </div>
          <button className="w-full py-2 text-white bg-indigo-600 rounded-lg hover:text-black">
            Continue
          </button>
        </form>
        <div className="mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600">
            Login
          </Link>
        </div>
        <p className="mt-4 text-xs text-center text-gray-600">
          By clicking 'Continue', you acknowledge that you have read and accept
          the{" "}
          <a href="#" className="text-indigo-600">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-indigo-600">
            Privacy Policy
          </a>
          .
        </p>
        {message && <p className="text-red-500">{message}</p>}
      </div>
    </div>
  );
}

export default SignUp;
