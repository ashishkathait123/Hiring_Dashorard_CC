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
        if (response.data && response.data.success && response.data.message) {
          setApplicantData(response.data.message);
        } else {
          console.error("Unexpected data format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching applicant data:", error);
      }
    };

    fetchApplicantData();
  }, [id]);

  if (!applicantData) {
    return <div className="p-4">Loading...</div>;
  }

  const renderResume = () => (
    <div className="flex justify-center">
      <img
        src={applicantData.resume || "/path/to/default-avatar.jpg"}
        alt="Resume"
        className="w-full md:w-1/2 lg:w-1/3 h-auto"
      />
    </div>
  );

  const renderProfileInfo = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div className="bg-white p-4 md:p-6 rounded-lg shadow">
        <div className="flex flex-col items-center md:items-start">
          <img
            src={applicantData.profilePicture || "/path/to/default-avatar.jpg"}
            alt="Avatar"
            className="w-24 h-24 md:w-32 md:h-32 rounded-full mb-4"
          />
          <h3 className="text-xl font-semibold text-center md:text-left">
            {applicantData.firstName} {applicantData.lastName}
          </h3>
          <p className="text-sm text-gray-600 text-center md:text-left">
            {applicantData.jobTitle}
          </p>
          <div className="flex items-center mt-2">
            <span className="text-yellow-500 text-lg font-semibold">
              {applicantData.rating || 'N/A'}
            </span>
            <span className="text-sm text-gray-600 ml-2">☆</span>
          </div>
          <div className="mt-2 flex items-center">
            <span
              className={`w-2 h-2 rounded-full ${applicantData.hiringStage === "Interview" ? "bg-blue-500" : "bg-gray-500"}`}
            ></span>
            <span className="ml-2">{applicantData.hiringStage}</span>
          </div>
        </div>
        <div className="mt-4">
          <h4 className="font-semibold">Applied Jobs</h4>
          {applicantData.appliedJobs && Array.isArray(applicantData.appliedJobs) ? (
            applicantData.appliedJobs.map((job, index) => (
              <div key={index} className="bg-gray-100 p-4 rounded-lg mb-4">
                <h4 className="font-semibold">{job.title}</h4>
                <p className="text-sm text-gray-600">
                  {job.department} • {job.type}
                </p>
                <p className="text-sm text-gray-600 mt-2">{job.daysAgo}</p>
                <div className="flex items-center mt-2">
                  <span className="text-blue-500 text-sm font-semibold">Stage: {job.stage}</span>
                </div>
                <button className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-lg shadow">
                  Schedule Interview
                </button>
              </div>
            ))
          ) : (
            <div>No applied jobs</div>
          )}
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
      <div className="bg-white p-4 md:p-6 rounded-lg shadow lg:col-span-2">
        <div className="mb-4">
          <h4 className="font-semibold">Personal Info</h4>
          <ul className="mt-2">
            <li><strong>Full Name:</strong> {applicantData.firstName} {applicantData.lastName}</li>
            <li><strong>Gender:</strong> {applicantData.gender}</li>
            <li><strong>Date of Birth:</strong> {applicantData.dob}</li>
            <li><strong>Language:</strong> {applicantData.language}</li>
            <li><strong>Address:</strong> {applicantData.address}</li>
          </ul>
        </div>
        <div className="mb-4">
          <h4 className="font-semibold">Professional Info</h4>
          <p className="mt-2">{applicantData.additionalInfo}</p>
          <ul className="mt-2">
            <li><strong>Current Job:</strong> {applicantData.currentCTC}</li>
            <li><strong>Experience:</strong> {applicantData.yearsOfExperience} years</li>
            <li><strong>Qualification:</strong> {applicantData.certifications && applicantData.certifications}</li>
            <li><strong>Skills:</strong> {applicantData.technicalSkills && applicantData.technicalSkills}</li>
          </ul>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col p-4 md:ml-64">
        <TopNav />
        <div className="bg-gray-100 flex-1 p-4">
          <div className="mt-16">
            <nav className="flex space-x-4 overflow-x-auto">
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
              {activeTab === "Applicant Profile" && renderProfileInfo()}
              {activeTab === "Resume" && renderResume()}
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
    </div>
  );
};

export default ApplicantProfile;
