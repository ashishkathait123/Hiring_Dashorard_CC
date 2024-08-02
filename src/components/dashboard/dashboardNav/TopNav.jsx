import React from "react";
import { AiFillBell } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from "../../../assets/logo.png";
import { useUser } from "../../userContext/UserContext";
const TopNav = () => { // Accept userRole as a prop
  const navigate = useNavigate();
const {user}= useUser();
  return (
    <div className="fixed bg-white shadow-md p-2 sm:p-4 flex justify-between items-center z-10 top-0 left-0 right-0">
      <Link to={"/dashboard"}>
        <div className="p-1">
          <img
            src={logo}
            alt="ColoredCow Logo"
            className="h-8 sm:h-10 w-auto"
          />
        </div>
      </Link>
      <div className="flex items-center space-x-4">
        <button className="relative">
          <AiFillBell className="text-xl sm:text-2xl" />
          <span className="absolute top-0 right-0 h-2 w-2 bg-red-600 rounded-full"></span>
        </button>
        {user?.role === "admin" && ( 
          <button
            className="bg-indigo-600 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105 text-xs sm:text-base"
            onClick={() => navigate("/post-job")}
          >
            + Post a job
          </button>
        )}
      </div>
    </div>
  );
};

export default TopNav;
