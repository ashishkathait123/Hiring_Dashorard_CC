import React, { useState, useEffect } from "react";
import TopNav from "../dashboard/dashboardNav/TopNav";
import Sidebar from "../sidebar/Sidebar";
import axios from "axios";
import ApplicantNav from "./applicant_nav/ApplicantNav";
const Applicants = ({ user }) => {
  const [applicants, setApplicants] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const response = await axios.get("/api/applicants");
        setApplicants(response.data);
      } catch (error) {
        console.error("Error fetching applicants data", error);
      }
    };

    fetchApplicants();
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <Sidebar user={user} isOpen={isSidebarOpen} />
      <div
        className={`flex-grow transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-0"} lg:ml-64`}
      >
        <TopNav />
        <div className="p-4 sm:p-6 lg:p-8 flex-grow overflow-auto">
          <div className="bg-white shadow rounded-lg p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 mt-10">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold">
                Total Applicants: {applicants.length}
              </h2>
              <ApplicantNav></ApplicantNav>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="px-2 sm:px-4 py-2 border text-xs sm:text-sm lg:text-base">Full Name</th>
                    <th className="px-2 sm:px-4 py-2 border text-xs sm:text-sm lg:text-base">Score</th>
                    <th className="px-2 sm:px-4 py-2 border text-xs sm:text-sm lg:text-base">Hiring Stage</th>
                    <th className="px-2 sm:px-4 py-2 border text-xs sm:text-sm lg:text-base">Applied Date</th>
                    <th className="px-2 sm:px-4 py-2 border text-xs sm:text-sm lg:text-base">Job Role</th>
                    <th className="px-2 sm:px-4 py-2 border text-xs sm:text-sm lg:text-base">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {/* {applicants.map((applicant) => (
                    <tr key={applicant.id} className="border-t">
                      <td className="px-2 sm:px-4 py-2 border text-xs sm:text-sm lg:text-base">{applicant.fullName}</td>
                      <td className="px-2 sm:px-4 py-2 border text-xs sm:text-sm lg:text-base">{applicant.score}</td>
                      <td className="px-2 sm:px-4 py-2 border text-xs sm:text-sm lg:text-base">{applicant.hiringStage}</td>
                      <td className="px-2 sm:px-4 py-2 border text-xs sm:text-sm lg:text-base">{applicant.appliedDate}</td>
                      <td className="px-2 sm:px-4 py-2 border text-xs sm:text-sm lg:text-base">{applicant.jobRole}</td>
                      <td className="px-2 sm:px-4 py-2 border">
                        <button className="bg-blue-500 text-white px-3 py-1 sm:px-4 sm:py-2 rounded text-xs sm:text-sm lg:text-base">
                          See Application
                        </button>
                      </td>
                    </tr>
                  ))} */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Applicants;
