import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  MdDashboard,
  MdList,
  MdTrackChanges,
  MdAccessTime,
  MdSchedule,
  MdBarChart,
} from "react-icons/md";
import { useUser } from "../userContext/UserContext";

const Sidebar = ({ isOpen }) => {
  const [activeLink, setActiveLink] = useState("");
  const location = useLocation();
  const { user } = useUser(); 

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  useEffect(() => {
    console.log("Sidebar user data: ", user); 
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    // setUser(null);
  };

  return (
    <div
      className={`fixed inset-y-0 left-0 top-20 transform ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out bg-white shadow-lg w-64 z-50`}
    >
      <div className="flex flex-col h-full">
        <nav className="flex-1 overflow-y-auto bg-slate-100 shadow-md">
          <ul className="space-y-2">
            <li className={`${activeLink === "/dashboard" ? "shadow-md" : ""}`}>
              <Link
                to="/dashboard"
                className={`flex items-center p-4 text-gray-600 hover:bg-gray-200 rounded-lg hover:text-indigo-600 ${activeLink === "/dashboard" ? "text-indigo-600" : ""}`}
                onClick={() => setActiveLink("/dashboard")}
              >
                <MdDashboard className="text-lg" />
                <span className="ml-4">Dashboard</span>
              </Link>
            </li>
            <li
              className={`${activeLink === "/job-listing" ? "shadow-md" : ""}`}
            >
              <Link
                to="/job-listing"
                className={`flex items-center p-4 text-gray-600 hover:bg-gray-200 rounded-lg hover:text-indigo-600 ${activeLink === "/job-listing" ? "text-indigo-600" : ""}`}
                onClick={() => setActiveLink("/job-listing")}
              >
                <MdList className="text-lg" />
                <span className="ml-4">Job Listing</span>
              </Link>
            </li>
            <li
              className={`${activeLink === "/applicants-tracking" && "/application-by-job" ? "shadow-md" : ""}`}
            >
              <Link
                to="/applicants-tracking"
                className={`flex items-center p-4 text-gray-600  rounded-lg hover:text-indigo-600 ${activeLink === "/applicants-tracking"? "text-indigo-600" : ""}`}
                onClick={() => setActiveLink("/applicants-tracking")}
              >
                <MdTrackChanges className="text-lg" />
                <span className="ml-4">Applicants Tracking</span>
              </Link>
            </li>
            <li>
              <Link
                to="/time-to-hire"
                className="flex items-center p-4 text-gray-600 hover:bg-gray-200 rounded-lg hover:text-indigo-600"
              >
                <MdAccessTime className="text-lg" />
                <span className="ml-4">Time to Hire</span>
              </Link>
            </li>
            <li>
              <Link
                to="/my-schedule"
                className="flex items-center p-4 text-gray-600 hover:bg-gray-200 rounded-lg hover:text-indigo-600"
              >
                <MdSchedule className="text-lg" />
                <span className="ml-4">My Schedule</span>
              </Link>
            </li>
            <li>
              <Link
                to="/performance-analysis"
                className="flex items-center p-4 text-gray-600 hover:bg-gray-200 rounded-lg hover:text-indigo-600"
              >
                <MdBarChart className="text-lg" />
                <span className="ml-4">Performance Analysis</span>
              </Link>
            </li>
          </ul>
        </nav>
        <div className="p-6 mt-auto flex items-center">
          {user?.profile && (
            <img
              src={user.profile}
              alt="Profile"
              className="w-10 h-10 rounded-full mr-4"
            />
          )}
          <div className="text-sm text-gray-600">{user?.email}</div>
        </div>
        <button
          className="w-auto bg-red-600 text-white p-2 rounded-lg transform transition-transform duration-300 hover:scale-105 m-1"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
