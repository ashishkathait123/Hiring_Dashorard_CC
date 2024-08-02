import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
import TopNav from "../dashboard/dashboardNav/TopNav";
import axios from "axios";

const ApplicantProfile = () => {
  const { id } = useParams();
  const [applicantData, setApplicantData] = useState(null);
  const [activeTab, setActiveTab] = useState("Applicant Profile");

  useEffect(() => {
    const fetchApplicantData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/Applicants/${id}`);
        setApplicantData(response.data.message);
      } catch (error) {
        console.error("Error fetching applicant data:", error);
      }
    };

    fetchApplicantData();
  }, [id]);

  if (!applicantData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col p-4 md:ml-64">
        <TopNav />
        <div className="bg-gray-100 flex-1 p-4">
          <div className="mt-16">
            <nav className="flex space-x-4">
              {[
                "Applicant Profile",
                "Resume",
                "Hiring Progress",
                "Interview Schedule",
              ].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg ${activeTab === tab ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                >
                  {tab}
                </button>
              ))}
            </nav>
            <div className="mt-4 p-4 bg-white rounded-lg shadow">
              {activeTab === "Applicant Profile" && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white p-4 md:p-6 rounded-lg shadow col-span-1">
                    <div className="flex items-center">
                      <img
                        src={applicantData.profilePicture || "/path/to/default-avatar.jpg"}
                        alt="Avatar"
                        className="w-16 h-16 rounded-full mr-4"
                      />
                      <div>
                        <h3 className="text-xl font-semibold">
                          {applicantData.fullName}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {applicantData.jobRole}
                        </p>
                        <div className="flex items-center mt-2">
                          <span className="text-yellow-500 text-lg font-semibold">
                            {applicantData.rating}
                          </span>
                          <span className="text-sm text-gray-600 ml-2">☆</span>
                        </div>
                        <div className="mt-2">
                          <span
                            className={`inline-block w-2 h-2 rounded-full ${applicantData.hiringStage === "Interview" ? "bg-blue-500" : "bg-gray-500"}`}
                          ></span>
                          <span className="ml-2">
                            {applicantData.hiringStage}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4">
                      {applicantData.appliedJobs.map((job, index) => (
                        <div
                          key={index}
                          className="bg-gray-100 p-4 rounded-lg mb-4"
                        >
                          <h4 className="font-semibold">{job.title}</h4>
                          <p className="text-sm text-gray-600">
                            {job.department} • {job.type}
                          </p>
                          <p className="text-sm text-gray-600 mt-2">
                            {job.daysAgo}
                          </p>
                          <div className="flex items-center mt-2">
                            <span className="text-blue-500 text-sm font-semibold">
                              Stage: {job.stage}
                            </span>
                          </div>
                          <button className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-lg shadow">
                            Schedule Interview
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4">
                      <h4 className="font-semibold">Contact</h4>
                      <ul className="mt-2">
                        <li>Email: {applicantData.email}</li>
                        <li>Phone: {applicantData.phone}</li>
                        <li>Instagram: {applicantData.instagram}</li>
                        <li>Twitter: {applicantData.twitter}</li>
                        <li>Website: {applicantData.website}</li>
                      </ul>
                    </div>
                  </div>
                  <div className="bg-white p-4 md:p-6 rounded-lg shadow col-span-2">
                    <div className="mb-4">
                      <h4 className="font-semibold">Personal Info</h4>
                      <ul className="mt-2">
                        <li>
                          <strong>Full Name:</strong>{" "}
                          {applicantData.fullName}
                        </li>
                        <li>
                          <strong>Gender:</strong>{" "}
                          {applicantData.gender}
                        </li>
                        <li>
                          <strong>Date of Birth:</strong>{" "}
                          {applicantData.dob}
                        </li>
                        <li>
                          <strong>Language:</strong>{" "}
                          {applicantData.language}
                        </li>
                        <li>
                          <strong>Address:</strong>{" "}
                          {applicantData.address}
                        </li>
                      </ul>
                    </div>
                    <div className="mb-4">
                      <h4 className="font-semibold">Professional Info</h4>
                      <p className="mt-2">
                        {applicantData.about}
                      </p>
                      <ul className="mt-2">
                        <li>
                          <strong>Current Job:</strong>{" "}
                          {applicantData.currentJob}
                        </li>
                        <li>
                          <strong>Experience:</strong>{" "}
                          {applicantData.experience}
                        </li>
                        <li>
                          <strong>Qualification:</strong>{" "}
                          {applicantData.qualification}
                        </li>
                        <li>
                          <strong>Skills:</strong>{" "}
                          {applicantData.skills.join(", ")}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>{" "}
            {activeTab === "Resume" && <p>Resume content goes here.</p>}
            {activeTab === "Hiring Progress" && (
              <p>Hiring progress content goes here.</p>
            )}
            {activeTab === "Interview Schedule" && (
              <p>Interview schedule content goes here.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicantProfile;
