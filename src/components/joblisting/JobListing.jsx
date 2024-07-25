import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../sidebar/Sidebar";
import TopNav from "../dashboard/dashboardNav/TopNav";
import "tailwindcss/tailwind.css";

// Dummy data
const dummyJobs = [
  { _id: "1", title: "Software Engineer", datePosted: "2024-07-01", dueDate: "2024-08-01" },
  { _id: "2", title: "Product Manager", datePosted: "2024-07-05", dueDate: "2024-08-15" },
  { _id: "3", title: "UX Designer", datePosted: "2024-07-10", dueDate: "2024-08-20" },
];

const dummyApplicants = [
  { jobId: "1", name: "Alice Johnson" },
  { jobId: "1", name: "Bob Smith" },
  { jobId: "2", name: "Carol White" },
];

const JobListing = ({ user }) => {
  const [jobs, setJobs] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [useDummyData, setUseDummyData] = useState(true); // State to toggle dummy data

  useEffect(() => {
    if (useDummyData) {
      // Use dummy data
      setJobs(dummyJobs);
      setApplicants(dummyApplicants);
    } else {
      // Fetch data from the API
      const fetchJobs = async () => {
        try {
          const response = await axios.get("/api/v1/jobs");
          setJobs(response.data);
        } catch (error) {
          console.error("Error fetching jobs:", error);
        }
      };

      const fetchApplicants = async () => {
        try { 
          const response = await axios.get("/api/v1/applicants");
          setApplicants(response.data);
        } catch (error) {
          console.error("Error fetching applicants:", error);
        }
      };

      fetchJobs();
      fetchApplicants();
    }
  }, [useDummyData]);

  const getApplicantCount = (jobId) => {
    return applicants.filter((applicant) => applicant.jobId === jobId).length;
  };

  const getJobStatus = (dueDate) => {
    const currentDate = new Date();
    const jobDueDate = new Date(dueDate);
    return currentDate <= jobDueDate ? "Live" : "Closed";
  };

  return (
    <div className="flex">
      <Sidebar user={user} isOpen={isSidebarOpen} />
      <div
        className={`flex-grow transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-0"} lg:ml-64`}
      >
        <TopNav />
        <div className="p-4 sm:p-6 lg:p-8">
          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold mb-4">
            Job Listing
          </h1>
          <p className="text-sm sm:text-base mb-4">
            Here is your jobs listing status from July 19 - July 25.
          </p>
          <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-md">
            <div className="mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold">
                Job List
              </h2>
              <button className="mt-2 sm:mt-0 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm sm:text-base">
                Filters
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="px-2 sm:px-4 py-2 text-left text-xs sm:text-sm md:text-base">
                      Roles
                    </th>
                    <th className="px-2 sm:px-4 py-2 text-left text-xs sm:text-sm md:text-base">
                      Status
                    </th>
                    <th className="px-2 sm:px-4 py-2 text-left text-xs sm:text-sm md:text-base">
                      Date Posted
                    </th>
                    <th className="px-2 sm:px-4 py-2 text-left text-xs sm:text-sm md:text-base">
                      Due Date
                    </th>
                    <th className="px-2 sm:px-4 py-2 text-left text-xs sm:text-sm md:text-base">
                      Applicants
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {jobs.map((job, index) => (
                    <tr key={index} className="border-b">
                      <td className="px-2 sm:px-4 py-2 text-xs sm:text-sm md:text-base">{job.title}</td>
                      <td className="px-2 sm:px-4 py-2 text-xs sm:text-sm md:text-base">
                        <span
                          className={`px-2 py-1 text-xs rounded-lg ${getJobStatus(job.dueDate) === "Live" ? "bg-green-200 text-green-700" : "bg-red-200 text-red-700"}`}
                        >
                          {getJobStatus(job.dueDate)}
                        </span>
                      </td>
                      <td className="px-2 sm:px-4 py-2 text-xs sm:text-sm md:text-base">
                        {new Date(job.datePosted).toLocaleDateString()}
                      </td>
                      <td className="px-2 sm:px-4 py-2 text-xs sm:text-sm md:text-base">
                        {new Date(job.dueDate).toLocaleDateString()}
                      </td>
                      <td className="px-2 sm:px-4 py-2 text-xs sm:text-sm md:text-base">
                        {getApplicantCount(job._id)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobListing;