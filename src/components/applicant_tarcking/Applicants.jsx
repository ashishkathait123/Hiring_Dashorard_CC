import React, { useState, useEffect } from "react";
import TopNav from "../dashboard/dashboardNav/TopNav";
import Sidebar from "../sidebar/Sidebar";
import axios from "axios";
import { Link } from "react-router-dom";
import { useUser } from "../userContext/UserContext";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection

const Applicants = () => {
  const [applicants, setApplicants] = useState([]);
  const [filteredApplicants, setFilteredApplicants] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStage, setSelectedStage] = useState("All");
  const [selectedRole, setSelectedRole] = useState("All");
  const { user } = useUser();

  const navigate = useNavigate(); 

  useEffect(() => {
    if (!user) {
      navigate("/login"); 
    }
  }, [user, navigate]);

  const dummyData = [
    {
      id: 1,
      fullName: "John Doe",
      hiringStage: "Interview",
      appliedDate: "2024-07-01",
      jobRole: "Software Engineer",
      profilePicture: "https://via.placeholder.com/50", // Example profile picture URL
    },
    {
      id: 2,
      fullName: "Jane Smith",
      hiringStage: "Application Review",
      appliedDate: "2024-07-02",
      jobRole: "Product Manager",
      profilePicture: "https://via.placeholder.com/50",
    },
    {
      id: 3,
      fullName: "Emily Johnson",
      hiringStage: "Screening",
      appliedDate: "2024-07-03",
      jobRole: "UX Designer",
      profilePicture: "https://via.placeholder.com/50",
    },
    {
      id: 4,
      fullName: "Michael Brown",
      hiringStage: "Interview",
      appliedDate: "2024-07-04",
      jobRole: "Data Scientist",
      profilePicture: "https://via.placeholder.com/50",
    },
    {
      id: 5,
      fullName: "Sarah Wilson",
      hiringStage: "Offer",
      appliedDate: "2024-07-05",
      jobRole: "Backend Developer",
      profilePicture: "https://via.placeholder.com/50",
    },
  ];


  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:3000/api/v1/Applicants"
        );
        console.log("Fetched applicants data:", response.data);

        const fetchedApplicants = response.data.message; 

        const applicantsList = fetchedApplicants.map((applicant) => ({
          id: applicant._id,
          fullName: `${applicant.firstName} ${applicant.lastName}`,
          hiringStage: applicant.hiringStage,
          appliedDate: applicant.FormSubmitDate,
          jobRole: applicant.ApplyFor,
          profilePicture: applicant.profilePicture,
        }));

        setApplicants(applicantsList);
      } catch (error) {
        console.error("Error fetching applicants data", error);
        setError("Error fetching applicants data");
      } finally {
        setLoading(false);
      }
    };

    fetchApplicants();
  }, []);

  const handleStageChange = (e) => setSelectedStage(e.target.value);
  const handleRoleChange = (e) => setSelectedRole(e.target.value);

  useEffect(() => {
    let filtered = [...applicants];
    if (selectedStage !== "All") {
      filtered = filtered.filter(
        (applicant) => applicant.hiringStage === selectedStage
      );
    }
    if (selectedRole !== "All") {
      filtered = filtered.filter(
        (applicant) => applicant.jobRole === selectedRole
      );
    }
    setFilteredApplicants(filtered);
  }, [selectedStage, selectedRole, applicants]);

  const stages = Array.from(
    new Set(applicants.map((applicant) => applicant.hiringStage))
  );
  const roles = Array.from(
    new Set(applicants.map((applicant) => applicant.jobRole))
  );

  const stageOptions = ["All", ...stages];
  const roleOptions = ["All", ...roles];

  const getHiringStageClass = (hiringStage) => {
    switch (hiringStage) {
      case "Interview":
        return "bg-blue-100 text-blue-800 border-blue-500";
      case "Application Review":
        return "bg-yellow-100 text-yellow-800 border-yellow-500";
      case "Offer":
        return "bg-green-100 text-green-800 border-green-500";
      case "Screening":
        return "bg-navy-100 text-navy-800 border-navy-500";
      default:
        return "bg-gray-100 text-gray-800 border-gray-500";
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen overflow-hidden bg-gray-100">
      <Sidebar user={user} isOpen={isSidebarOpen} />
      <div
        className={`flex-grow transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-0"} lg:ml-64`}
      >
        <TopNav />
        <div className="p-4 sm:p-6 lg:p-8 flex-grow overflow-auto">
          <div className="mb-4 mt-20">
            <h2 className="text-2xl font-bold">
              {getGreeting()}, {user?.FullName}
            </h2>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 mt-10 space-y-4 sm:space-y-0">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800">
                Total Applicants: {filteredApplicants.length}
              </h2>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
                <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
                  <label
                    htmlFor="stage"
                    className="text-sm font-medium text-gray-600"
                  >
                    Filter by Hiring Stage:
                  </label>
                  <select
                    id="stage"
                    value={selectedStage}
                    onChange={handleStageChange}
                    className="bg-gray-50 border border-gray-300 rounded-lg p-2 text-sm w-full sm:w-auto"
                  >
                    {stageOptions.map((stage, index) => (
                      <option key={index} value={stage}>
                        {stage}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
                  <label
                    htmlFor="role"
                    className="text-sm font-medium text-gray-600"
                  >
                    Filter by Job Role:
                  </label>
                  <select
                    id="role"
                    value={selectedRole}
                    onChange={handleRoleChange}
                    className="bg-gray-50 border border-gray-300 rounded-lg p-2 text-sm w-full sm:w-auto"
                  >
                    {roleOptions.map((role, index) => (
                      <option key={index} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            {loading ? (
              <p className="text-center text-gray-500">Loading...</p>
            ) : error ? (
              <p className="text-center text-red-500">{error}</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-2 border-b text-left text-xs sm:text-sm lg:text-base text-gray-600 font-medium">
                        Profile Picture
                      </th>
                      <th className="px-4 py-2 border-b text-left text-xs sm:text-sm lg:text-base text-gray-600 font-medium">
                        Full Name
                      </th>
                      <th className="px-4 py-2 border-b text-left text-xs sm:text-sm lg:text-base text-gray-600 font-medium">
                        Hiring Stage
                      </th>
                      <th className="px-4 py-2 border-b text-left text-xs sm:text-sm lg:text-base text-gray-600 font-medium">
                        Applied Date
                      </th>
                      <th className="px-4 py-2 border-b text-left text-xs sm:text-sm lg:text-base text-gray-600 font-medium">
                        Job Role
                      </th>
                      <th className="px-4 py-2 border-b text-left text-xs sm:text-sm lg:text-base text-gray-600 font-medium">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(filteredApplicants) &&
                      filteredApplicants.map((applicant) => (
                        <tr key={applicant.id} className="hover:bg-gray-50">
                          <td className="px-4 py-2 border-b text-xs sm:text-sm lg:text-base text-gray-700">
                            <img
                              src={applicant.profilePicture}
                              alt={`${applicant.fullName} profile`}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                          </td>
                          <td className="px-4 py-2 border-b text-xs sm:text-sm lg:text-base text-gray-700">
                            {applicant.fullName}
                          </td>
                          <td className="px-4 py-2 border-b text-xs sm:text-sm lg:text-base">
                            <span
                              className={`px-2 py-1 border rounded ${getHiringStageClass(applicant.hiringStage)}`}
                            >
                              {applicant.hiringStage}
                            </span>
                          </td>
                          <td className="px-4 py-2 border-b text-xs sm:text-sm lg:text-base text-gray-700">
                            {applicant.appliedDate}
                          </td>
                          <td className="px-4 py-2 border-b text-xs sm:text-sm lg:text-base text-gray-700">
                            {applicant.jobRole}
                          </td>
                          <td className="px-4 py-2 border-b text-xs sm:text-sm lg:text-base">
                            <Link to={`/applicant-profile/${applicant.id}`}>
                              <button className="bg-blue-500 text-white px-3 py-1 sm:px-4 sm:py-2 rounded text-xs sm:text-sm lg:text-base hover:bg-blue-600 transition duration-300">
                                See Application
                              </button>
                            </Link>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Applicants;
