import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";

function Navbar() {
  const [activeLink, setActiveLink] = useState("");
  const location = useLocation();

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  return (
    <header className="bg-white bg-opacity-10 shadow-md fixed top-0 left-0 w-full z-50 ">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center w-full">
        <Link to={"/"}>
          <img
            src={logo}
            alt="ColoredCow Logo" 
            className="h-12 w-auto mr-2 hover:text-black transform transition-transform duration-300 hover:scale-110"
          />
        </Link>
        <nav className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-10">
          <Link
            to="/find-jobs"
            className={`text-black font-bold hover:text-indigo-600 mt-2 sm:mt-0 transform transition-transform duration-300 hover:scale-110 ${activeLink === "/find-jobs" ? "border-b-4 border-indigo-500 text-indigo-600" : ""} hover:border-b-4 border-indigo-500`}
            onClick={() => setActiveLink("/find-jobs")}
          >
            Jobs
          </Link>
          <Link
            to="/browse-company"
            className={`text-black font-bold mt-2 sm:mt-0 transform transition-transform duration-300 hover:scale-110 ${activeLink === "/browse-company" ? "border-b-4 border-indigo-500 text-blue-600" : ""} hover:border-b-4 border-indigo-500`}
            onClick={() => setActiveLink("/browse-company")}
          >
           <h2>Browse Company</h2>  
          </Link>
          <Link
            to="/logIn"
            className="bg-indigo-600 text-indigo-800  text-white py-2 px-4 rounded ml-0 sm:ml-2 hover:text-black transform transition-transform duration-300 hover:scale-110"
          >
            Login
          </Link>
          <Link
            to="/signUp"
            className="bg-indigo-600 text-indigo-800 bg-indigo-600 text-white py-2 px-4 rounded ml-0 sm:ml-2 hover:text-black transform transition-transform duration-300 hover:scale-110"
          >
            SignUp
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;