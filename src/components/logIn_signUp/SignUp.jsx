import React, { useState, useRef } from "react";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import "tailwindcss/tailwind.css";
import googleImg from "../../assets/google.png";
import grpImg from "../../assets/grp.png";
import logo from "../../assets/logo.png";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Webcam from "react-webcam";

function SignUp() {
  const [FullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profile, setProfile] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null); // New state for captured image
  const [message, setMessage] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [capturing, setCapturing] = useState(false);
  const [role, setRole] = useState("Recruiter"); // Added role state
  const [showPopup, setShowPopup] = useState(false); // New state for pop-up
  const webcamRef = useRef(null);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleCapture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setProfile(imageSrc);
    setCapturedImage(imageSrc); // Set the captured image
    setCapturing(false);
    showPopUpMessage("Profile picture captured!");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("FullName", FullName);
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("role", role);    

    if (profile) {
      if (typeof profile === "string") {
        const response = await fetch(profile);
        const blob = await response.blob();
        formData.append("profile", blob, "profile.jpg");
      } else {
        formData.append("profile", profile);
      }
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

  const showPopUpMessage = (msg) => {
    setMessage(msg);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000); // Hide after 3 seconds
  };

  if (redirect) return <Navigate to={"/login"} />;

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="flex flex-col justify-center w-full md:w-auto bg-gray-100 p-10">
        <Link to={"/"}>
          <img
            src={logo}
            alt="ColoredCow Logo"
            className="h-8 md:h-12 mb-14 hover:text-black transform transition-transform duration-300 hover:scale-110"
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
      <div className="flex flex-col justify-center m-4 md:m-20 w-full md:w-1/3 p-10 border-2 rounded-lg bg-gray-100 drop-shadow-lg">
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
            <label className="block mb-2 text-gray-600" htmlFor="role">
              Select Role
            </label>
            <select
              id="role"
              className="w-full px-4 py-2 border rounded-lg"
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="recruiter">Recruiter</option>
              <option value="admin">Admin</option>
            </select>
          </div>
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
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </button>
          </div>
          <div className="mb-4 relative">
            <label className="block mb-2 text-gray-600" htmlFor="profile">
              Choose Profile Picture
            </label>
            <input
              className="w-full px-4 py-2 border rounded-lg"
              type="file"
              id="profile"
              accept="image/*"
              onChange={(e) => {
                setProfile(e.target.files[0]);
                showPopUpMessage("Profile picture uploaded!");
              }}
            />
            <label className="block mb-2 text-gray-600" htmlFor="profile">
              Or Capture Profile Picture
            </label>
            <div className="flex flex-col md:flex-row items-center mt-2">
              <button
                type="button"
                className="mr-2 mb-2 md:mb-0 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:text-black"
                onClick={() => setCapturing(true)}
              >
                Capture
              </button>
              {capturing && (
                <div className="flex flex-col items-center">
                  <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    className="rounded-lg shadow-lg mb-4 w-full md:w-64"
                  />
                  <button
                    type="button"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:text-black"
                    onClick={handleCapture}
                  >
                    Take Snapshot
                  </button>
                  {capturedImage && (
                    <div className="mt-4">
                      <h2 className="text-gray-600">Captured Image:</h2>
                      <img src={capturedImage} alt="Captured" className="rounded-lg shadow-lg mt-2 w-full md:w-64" />
                    </div>
                  )}
                </div>
              )}
            </div>
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
        {showPopup && <p className="text-green-500 mt-2 text-center">{message}</p>} {/* Pop-up message */}
      </div>
    </div>
  );
}

export default SignUp;
