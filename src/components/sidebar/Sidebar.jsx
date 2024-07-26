import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  MdDashboard,
  MdList,
  MdLogout,
  MdTrackChanges,
  MdAccessTime,
  MdSchedule,
  MdBarChart,
} from "react-icons/md";
import { useUser } from "../userContext/UserContext";
import { FaChevronDown, FaChevronUp } from "react-icons/fa"; // Importing icons for dropdown

const Sidebar = ( ) => {
  const [activeLink, setActiveLink] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useUser();

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      navigate("/");
    }
  };

  return (
    <div
      className={`fixed inset-y-0 left-0 top-20 transform transition-transform duration-300 ease-in-out bg-white shadow-lg w-64 z-50`}
    >
      <div className="flex flex-col h-full">
        <nav className="flex-1 overflow-y-auto bg-slate-100 shadow-md">
          <ul className="space-y-2">
            <li className={`${activeLink === "/dashboard" ? "shadow-md" : ""}`}>
              <Link
                to="/dashboard"
                className={`flex items-center p-4 text-gray-600 hover:bg-gray-200 rounded-lg hover:text-indigo-600 ${
                  activeLink === "/dashboard" ? "text-indigo-600" : ""
                }`}
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
                className={`flex items-center p-4 text-gray-600 hover:bg-gray-200 rounded-lg hover:text-indigo-600 ${
                  activeLink === "/job-listing" ? "text-indigo-600" : ""
                }`}
                onClick={() => setActiveLink("/job-listing")}
              >
                <MdList className="text-lg" />
                <span className="ml-4">Job Listing</span>
              </Link>
            </li>
            <li
              className={`${activeLink === "/applicants-tracking" ? "shadow-md" : ""}`}
            >
              <div>
                <Link
                  to="/applicants-tracking"
                  className={`flex items-center p-4 text-gray-600 rounded-lg hover:text-indigo-600 ${
                    activeLink === "/applicants-tracking"
                      ? "text-indigo-600"
                      : ""
                  }`}
                  onClick={() => {
                    setActiveLink("/applicants-tracking");
                    setIsDropdownOpen(!isDropdownOpen); // Toggle dropdown
                  }}
                >
                  <MdTrackChanges className="text-lg" />
                  <span className="ml-4">Applicants Tracking</span>
                  <span className="ml-auto">
                    {isDropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
                  </span>
                </Link>
                {isDropdownOpen && (
                  <ul className="space-y-2 ml-8 mt-2">
                    <li>
                      <Link
                        to="/chart-view"
                        className="flex items-center p-2 text-gray-600 hover:bg-gray-200 rounded-lg hover:text-indigo-600"
                      >
                        Chart View
                      </Link>
                    </li>
                  </ul>
                )}
              </div>
            </li>
            <li
              className={`${activeLink === "/time-to-hire" ? "shadow-md" : ""}`}
            >
              <Link
                to="/time-to-hire"
                className={`flex items-center p-4 text-gray-600 rounded-lg hover:text-indigo-600 ${
                  activeLink === "/time-to-hire" ? "text-indigo-600" : ""
                }`}
                onClick={() => setActiveLink("/time-to-hire")}
              >
                <MdAccessTime className="text-lg" />
                <span className="ml-4">Time to Hire</span>
              </Link>
            </li>
            <li
              className={`${activeLink === "/my-schedule" ? "shadow-md" : ""}`}
            >
              <Link
                to="/my-schedule"
                className={`flex items-center p-4 text-gray-600 rounded-lg hover:text-indigo-600 ${
                  activeLink === "/my-schedule" ? "text-indigo-600" : ""
                }`}
                onClick={() => setActiveLink("/my-schedule")}
              >
                <MdSchedule className="text-lg" />
                <span className="ml-4">My Schedule</span>
              </Link>
            </li>
            <li
              className={`${activeLink === "/performance-analysis" ? "shadow-md" : ""}`}
            >
              <Link
                to="/performance-analysis"
                className={`flex items-center p-4 text-gray-600 rounded-lg hover:text-indigo-600 ${
                  activeLink === "/performance-analysis"
                    ? "text-indigo-600"
                    : ""
                }`}
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
          className="flex items-center justify-center w-auto bg-red-600 text-white p-2 rounded-lg ml-2 transform transition-transform duration-300 hover:scale-105 m-4"
          onClick={handleLogout}
        >
          <MdLogout className="text-lg" />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
