import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import ApplicationForm from "../applicationFrom/ApplicationForm ";
const dummyJobs = [
  {
    id: 1,
    title: "Frontend Developer",
    location: "New York, NY",
    types: ["Full-Time", "Remote"]
  },
  {
    id: 2,
    title: "Backend Developer",
    location: "San Francisco, CA",
    types: ["Part-Time"]
  },
  {
    id: 3,
    title: "Project Manager",
    location: "Austin, TX",
    types: ["Full-Time"]
  },
  {
    id: 4,
    title: "Data Scientist",
    location: "Boston, MA",
    types: ["Full-Time", "On-site"]
  },
  {
    id: 5,
    title: "UI/UX Designer",
    location: "Seattle, WA",
    types: ["Full-Time", "Remote"]
  },
  {
    id: 6,
    title: "Marketing Specialist",
    location: "Chicago, IL",
    types: ["Part-Time"]
  },
  {
    id: 6,
    title: "Marketing Specialist",
    location: "Chicago, IL",
    types: ["Part-Time"]
  },
  {
    id: 6,
    title: "Marketing Specialist",
    location: "Chicago, IL",
    types: ["Part-Time"]
  },
  {
    id: 6,
    title: "Marketing Specialist",
    location: "Chicago, IL",
    types: ["Part-Time"]
  },
  {
    id: 6,
    title: "Marketing Specialist",
    location: "Chicago, IL",
    types: ["Part-Time"]
  },
  {
    id: 6,
    title: "Marketing Specialist",
    location: "Chicago, IL",
    types: ["Part-Time"]
  },
  {
    id: 6,
    title: "Marketing Specialist",
    location: "Chicago, IL",
    types: ["Part-Time"]
  },
  {
    id: 7,
    title: "HR Manager",
    location: "Tehri Garhwal, India",
    types: ["Full-Time"]
  }
];

function Home() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [location, setLocation] = useState("Tehri Garhwal, India");
  const [search, setSearch] = useState("");
  const [useDummyData, setUseDummyData] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 4;
  const [message, setMessage] = useState("");
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    if (useDummyData) {
      const fetchJobs = async () => {
        try {
          const response = await axios.get("http://localhost:3000/api/v1/jobs");
          setJobs(response.data);
          setFilteredJobs(response.data);
        } catch (error) {
          console.error("Error fetching jobs", error);
        }
      };
      fetchJobs();
    } else {
      setJobs(dummyJobs);
      setFilteredJobs(dummyJobs);
    }
  }, [useDummyData]);

  const handleSearch = () => {
    const filtered = jobs.filter(job =>
      job.title.toLowerCase().includes(search.toLowerCase()) &&
      job.location.toLowerCase().includes(location.toLowerCase())
    );
    setFilteredJobs(filtered);
    setCurrentPage(1);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleApply = (job) => {
    setSelectedJob(job);
    setMessage("");
    setShowApplicationForm(true);
  };

  const handleCloseForm = () => {
    setShowApplicationForm(false);
    setSelectedJob(null);
  };

  const handleFormSuccess = () => {
    setMessage("Application submitted successfully!");
    // Optionally, you can fetch jobs again or reset the form here
    alert("Application submitted successfully!")
  };

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  return (
    <div className="bg-custom-image bg-cover bg-center h-screen min-h-screen">
      <Navbar />

      <main className="container mx-auto px-4 py-8 pt-40">
        <h2 className="text-3xl font-bold text-center text-white mb-8 hover:text-indigo-600 transform transition-transform duration-300 hover:scale-110">
          Find your <span className="text-indigo-600">dream job</span>
        </h2>

        <div className="flex flex-col sm:flex-row justify-center mb-8 space-y-4 sm:space-y-0 sm:space-x-4">
          <input
            type="text"
            placeholder="Job title or keyword"
            className="border rounded py-2 px-4 w-full sm:w-1/2"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <input
            type="text"
            placeholder="Location"
            className="border rounded py-2 px-4 w-full sm:w-auto"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <button
            className="bg-indigo-600 text-white py-2 px-4 rounded w-full sm:w-auto hover:text-black transform transition-transform duration-300 hover:scale-110"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>

        <div className="bg-custom-image bg-cover bg-center bg-opacity-80 shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4 text-blue-800">All Jobs</h3>
          <p className="text-indigo-600 mb-6">Showing {currentJobs.length} of {filteredJobs.length} results</p>
          {message && <div className="bg-green-100 text-green-800 p-4 mb-4 rounded">{message}</div>}
          <div className="space-y-4">
            {currentJobs.map((job, index) => (
              <div key={index} className="border rounded p-4 flex flex-col sm:flex-row justify-between items-center">
                <div>
                  <h4 className="text-xl text-gray-300 font-bold mb-2">{job.title}</h4>
                  <p className="text-gray-400">{job.location}</p>
                </div>
                <div className="mt-4 sm:mt-0 flex space-x-2">
                  <button
                    className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                    onClick={() => handleApply(job)}
                  >
                    Apply
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-6">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                className={`px-4 py-2 mx-1 rounded ${currentPage === index + 1 ? "bg-indigo-600 text-white" : "bg-gray-200 text-black"}`}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </main>

      {showApplicationForm && (
        <ApplicationForm
          job={selectedJob}
          onClose={handleCloseForm}
          onSubmitSuccess={handleFormSuccess}
        />
      )}

      <Footer />
    </div>
  );
}

export default Home;
