import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../userContext/UserContext";
import logo from "../../assets/logo.png";
import googleImg from "../../assets/google.png";
import grpImg from "../../assets/grp.jpeg";

function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/users/login",
        { email, password }
      );
      const { data } = response.data;
      const { user, accessToken } = data;

      if (accessToken && user) {
        localStorage.setItem("accessToken", accessToken);
        setUser(user);
        setLoading(false);
        setMessage(alert('Login successful click on "OK" '));
        setRedirect(true);
      } else {
        setLoading(false);
        setMessage("Token or user data not found in response");
      }
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.data) {
        setMessage(error.response.data.message || "Login failed");
      } else {
        setMessage("Login failed");
      }
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (redirect) {
      navigate("/dashboard");
    }
  }, [redirect, navigate]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex min-h-screen">
      <div className="flex flex-col justify-center w-1/2 bg-gray-100 p-10">
        <Link to={"/"}>
          <img
            src={logo}
            alt="ColoredCow Logo"
            className="h-10 w-32 mb-8 hover:text-black transform transition-transform duration-300 hover:scale-110"
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
          Welcome Back, Dude
        </h1>
        <button className="flex items-center justify-center w-full py-2 mb-4 bg-gray-100 rounded-lg text-blue-600 font-medium border border-gray-500 hover:text-black transform transition-transform duration-300 hover:scale-110">
          <img src={googleImg} alt="Google" className="h-6 w-6 mr-2" />
          Login with Google
        </button>
        <div className="flex items-center justify-center mb-4">
          <hr className="w-full border-gray-300" />
          <span className="px-4 text-gray-600 text-center">
            Or login with email
          </span>
          <hr className="w-full border-gray-300" />
        </div>
        <form onSubmit={handleSubmit}>
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
          <div className="flex items-center mb-4">
            <input type="checkbox" id="remember" className="mr-2" />
            <label className="text-gray-600" htmlFor="remember">
              Remember me
            </label>
          </div>
          <button
            className="w-full py-2 text-white bg-indigo-600 rounded-lg hover:text-black"
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login Account"}
          </button>
          {message && <p className="text-red-500 mt-4">{message}</p>}
        </form>
        <div className="mt-4 text-center">
          Don't have an account?{" "}
          <Link to="/signUp" className="text-indigo-600 hover:text-black">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LogIn;
