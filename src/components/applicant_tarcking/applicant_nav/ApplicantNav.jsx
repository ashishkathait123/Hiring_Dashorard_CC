import { Link, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";

const ApplicantNav = ({ setSelectedChart }) => { 
  const [activeLink, setActiveLink] = useState("");
  const location = useLocation();

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  const handleClick = (chart) => {
    setSelectedChart(chart);
    setActiveLink(`/application-by-${chart}`);
  };

  return (
    <div className="flex flex-wrap space-x-2 sm:space-x-4 lg:space-x-6 border border-sky-500 rounded-md overflow-auto">
      <div className={`${activeLink === "/applicant-list" ? "bg-white" : ""}`}>
        <Link
          to="/applicant-list"
          className={`flex items-center p-2 sm:p-3 md:p-4 text-blue-600 bg-indigo-50 hover:bg-white rounded-lg hover:text-indigo-600 ${activeLink === "/applicant-list" ? "text-black-600 bg-white shadow-md" : ""}`}
          onClick={() => handleClick("/applicant-list")}
        >
          Applicant List
        </Link>
      </div>
      <Link
        to="/chart-view"
        className={`flex items-center p-2 sm:p-3 md:p-4 text-blue-600 bg-indigo-50 hover:bg-white rounded-lg hover:text-indigo-600 ${activeLink === "/application-by-job" ? "text-indigo-600 bg-white shadow-md" : ""}`}
        onClick={() => handleClick("Chart-View")}
      >
      Chart View 
      </Link>
      {/* <Link
        to="/application-by-source"
        className={`flex items-center p-2 sm:p-3 md:p-4 text-blue-600 bg-indigo-50 hover:bg-white rounded-lg hover:text-indigo-600 ${activeLink === "/application-by-source" ? "text-indigo-600 bg-white shadow-md" : ""}`}
        onClick={() => handleClick("source")}
      >
        Application By Source
      </Link>
      <Link
        to="/application-status"
        className={`flex items-center p-2 sm:p-3 md:p-4 text-blue-600 bg-indigo-50 hover:bg-white rounded-lg hover:text-indigo-600 ${activeLink === "/application-status" ? "text-indigo-600 bg-white shadow-md" : ""}`}
        onClick={() => handleClick("status")}
      >
        Application Status
      </Link> */}
    </div>
  );
};

export default ApplicantNav;
