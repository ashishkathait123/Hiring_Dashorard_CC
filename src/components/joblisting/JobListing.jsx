import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../sidebar/Sidebar";
import TopNav from "../dashboard/dashboardNav/TopNav";
import "tailwindcss/tailwind.css";
import { useUser } from "../userContext/UserContext";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection

// Dummy data
const dummyJobs = [
  {
    _id: "1",
    title: "Software Engineer",
    datePosted: "2024-07-01",
    dueDate: "2024-08-01",
  },
  {
    _id: "2",
    title: "Product Manager",
    datePosted: "2024-07-05",
    dueDate: "2024-08-15",
  },
  {
    _id: "3",
    title: "UX Designer",
    datePosted: "2024-07-10",
    dueDate: "2024-08-20",
  },
];

const dummyApplicants = [
  { jobId: "1", name: "Alice Johnson" },
  { jobId: "1", name: "Bob Smith" },
  { jobId: "2", name: "Carol White" },
];

const JobListing = () => {
  const [jobs, setJobs] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [useDummyData, setUseDummyData] = useState(false); // State to toggle dummy data
  const { user } = useUser(); // Access user from context

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const getFormattedDate = () => {
    const date = new Date();
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };
  const navigate= useNavigate();
  useEffect(() => {
    // Check if the user is logged in
    if (!user) {
      navigate("/login"); // Redirect to login if not authenticated
    }
  }, [user, navigate]);
  useEffect(() => {
    if (!useDummyData) {
      // Fetch data from the API
      const fetchJobs = async () => {
        try {
          const response = await axios.get("http://localhost:3000/api/v1/jobs");
          setJobs(response.data);
        } catch (error) {
          console.error("Error fetching jobs:", error);
        }
      };

      const fetchApplicants = async () => {
        try {
          const response = await axios.get("http://localhost:3000/api/v1/applicants");
          console.log(response.data); // Log the response to check its structure
          setApplicants(response.data);

        } catch (error) {
          console.error("Error fetching applicants:", error);
        }
      };

      fetchJobs();
      fetchApplicants();
    } else {
      // Use dummy data
      setJobs(dummyJobs);
      setApplicants(dummyApplicants);
    }
  }, [useDummyData]);

  const getApplicantCount = (jobId) => {
    if (!Array.isArray(applicants)) return 0; // Return 0 if applicants is not an array
    return applicants.filter((applicant) => applicant.jobId === jobId).length;
  };

  const getJobStatus = (dueDate) => {
    const currentDate = new Date();
    const jobDueDate = new Date(dueDate);
    return currentDate <= jobDueDate ? "Live" : "Closed";
  };

  const handleUpdateJob = (jobId) => {
    console.log(`Updating job with ID: ${jobId}`);
  };

  // Event handler for deleting a job
  const handleDeleteJob = async (jobId) => {
    try {
      await axios.delete(`/api/v1/jobs/${jobId}`);
      setJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId)); // Remove job from the state
      console.log(`Deleted job with ID: ${jobId}`);
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  return (
    <div className="flex">
      <Sidebar isOpen={isSidebarOpen} />
      <div
        className={`flex-grow transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-0"} lg:ml-64`}
      >
        <TopNav />
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="mb-5 mt-20">
            <h2 className="text-2xl font-bold">
              {getGreeting()}, {user?.FullName}
            </h2>
          </div>

          <p className="text-sm sm:text-base mb-4">
            Here is your jobs listing status from July 19 to{" "}
            <span>{getFormattedDate()}</span>
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
                    {user?.role === "admin" && ( // Conditionally render action buttons for admin
                      <th className="px-2 sm:px-4 py-2 text-left text-xs sm:text-sm md:text-base">
                        Actions
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {jobs.map((job, index) => (
                    <tr key={index} className="border-b">
                      <td className="px-2 sm:px-4 py-2 text-xs sm:text-sm md:text-base">
                        {job.title}
                      </td>
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
                      {user?.role === "admin" && ( // Render action buttons for admin
                        <td className="px-2 sm:px-4 py-2 text-xs sm:text-sm md:text-base">
                          <button
                            onClick={() => handleUpdateJob(job._id)}
                            className="text-blue-500 hover:underline mr-2"
                          >
                            Update Job
                          </button>
                          <button
                            onClick={() => handleDeleteJob(job._id)}
                            className="text-red-500 hover:underline"
                          >
                            Delete Job
                          </button>
                        </td>
                      )}
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
