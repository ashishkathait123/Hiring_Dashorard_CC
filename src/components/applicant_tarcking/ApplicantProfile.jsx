import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
import TopNav from "../dashboard/dashboardNav/TopNav";

const dummyData = [
  {
    id: 1,
    name: "John Doe",
    role: "Software Engineer",
    rating: 4.5,
    appliedJobs: [
      {
        title: "Front-End Developer",
        department: "Engineering",
        type: "Full-Time",
        daysAgo: "2 days ago",
        stage: "Interview",
      },
    ],
    contact: {
      email: "johndoe@example.com",
      phone: "+1 123-456-7890",
      instagram: "instagram.com/johndoe",
      twitter: "twitter.com/johndoe",
      website: "www.johndoe.com",
    },
    personalInfo: {
      fullName: "John Doe",
      gender: "Male",
      dob: "January 1, 1990 (34 y.o)",
      language: "English, Spanish",
      address: "123 Main St, Anytown, USA",
    },
    professionalInfo: {
      about:
        "Experienced software engineer specializing in front-end development with a passion for creating user-friendly applications.",
      currentJob: "Software Engineer at XYZ Corp",
      experience: "6 Years",
      qualification: "BSc in Computer Science",
      skills: ["React", "JavaScript", "CSS", "HTML"],
    },
  },
  // Add more dummy data as needed
];

const ApplicantProfile = () => {
  const { id } = useParams();
  const [applicantData, setApplicantData] = useState(null);
  const [activeTab, setActiveTab] = useState("Applicant Profile");

  useEffect(() => {
    const applicant = dummyData.find(
      (applicant) => applicant.id === parseInt(id)
    );
    setApplicantData(applicant);
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
                        src="/path/to/avatar.jpg"
                        alt="Avatar"
                        className="w-16 h-16 rounded-full mr-4"
                      />
                      <div>
                        <h3 className="text-xl font-semibold">
                          {applicantData.personalInfo.fullName}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {applicantData.role}
                        </p>
                        <div className="flex items-center mt-2">
                          <span className="text-yellow-500 text-lg font-semibold">
                            {applicantData.rating}
                          </span>
                          <span className="text-sm text-gray-600 ml-2">☆</span>
                        </div>
                        <div className="mt-2">
                          <span
                            className={`inline-block w-2 h-2 rounded-full ${applicantData.appliedJobs[0].stage === "Interview" ? "bg-blue-500" : "bg-gray-500"}`}
                          ></span>
                          <span className="ml-2">
                            {applicantData.appliedJobs[0].stage}
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
                        <li>Email: {applicantData.contact.email}</li>
                        <li>Phone: {applicantData.contact.phone}</li>
                        <li>Instagram: {applicantData.contact.instagram}</li>
                        <li>Twitter: {applicantData.contact.twitter}</li>
                        <li>Website: {applicantData.contact.website}</li>
                      </ul>
                    </div>
                  </div>
                  <div className="bg-white p-4 md:p-6 rounded-lg shadow col-span-2">
                    <div className="mb-4">
                      <h4 className="font-semibold">Personal Info</h4>
                      <ul className="mt-2">
                        <li>
                          <strong>Full Name:</strong>{" "}
                          {applicantData.personalInfo.fullName}
                        </li>
                        <li>
                          <strong>Gender:</strong>{" "}
                          {applicantData.personalInfo.gender}
                        </li>
                        <li>
                          <strong>Date of Birth:</strong>{" "}
                          {applicantData.personalInfo.dob}
                        </li>
                        <li>
                          <strong>Language:</strong>{" "}
                          {applicantData.personalInfo.language}
                        </li>
                        <li>
                          <strong>Address:</strong>{" "}
                          {applicantData.personalInfo.address}
                        </li>
                      </ul>
                    </div>
                    <div className="mb-4">
                      <h4 className="font-semibold">Professional Info</h4>
                      <p className="mt-2">
                        {applicantData.professionalInfo.about}
                      </p>
                      <ul className="mt-2">
                        <li>
                          <strong>Current Job:</strong>{" "}
                          {applicantData.professionalInfo.currentJob}
                        </li>
                        <li>
                          <strong>Experience:</strong>{" "}
                          {applicantData.professionalInfo.experience}
                        </li>
                        <li>
                          <strong>Qualification:</strong>{" "}
                          {applicantData.professionalInfo.qualification}
                        </li>
                        <li>
                          <strong>Skills:</strong>{" "}
                          {applicantData.professionalInfo.skills.join(", ")}
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
