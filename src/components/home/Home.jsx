import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";

// Dummy data
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
  const [useDummyData, setUseDummyData] = useState(true); // State to toggle dummy data

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 4;

  useEffect(() => {
    if (useDummyData) {
      // Use dummy data
      setJobs(dummyJobs);
      setFilteredJobs(dummyJobs);
    } else {
      // Fetch jobs from API
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
    }
  }, [useDummyData]);

  const handleSearch = () => {
    const filtered = jobs.filter(job =>
      job.title.toLowerCase().includes(search.toLowerCase()) &&
      job.location.toLowerCase().includes(location.toLowerCase())
    );
    setFilteredJobs(filtered);
    setCurrentPage(1); // Reset to first page when searching
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate current jobs
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  // Calculate total pages
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  return (
    <div className="bg-custom-image bg-cover bg-center h-screen min-h-screen">
      <Navbar />

      <main className=" container mx-auto px-4 py-8 pt-40">
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

          <div className="space-y-4">
            {currentJobs.map((job, index) => (
              <div
                key={index}
                className="border rounded p-4 flex flex-col sm:flex-row justify-between items-center bg-gray-600 bg-opacity-50"
              >
                <div className="mb-4 sm:mb-0 sm:mr-4">
                  <h4 className="text-lg font-semibold text-white">{job.title}</h4>
                  <p className="text-gray-400">{job.location}</p>
                  <div className="flex flex-wrap space-x-2 mt-2">
                    {job.types.map((type, idx) => (
                      <span
                        key={idx}
                        className={`text-sm ${
                          type === "Full-Time"
                            ? "bg-green-100 text-green-800"
                            : type === "Part-Time"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-blue-100 text-blue-800"
                        } rounded px-2 py-1`}
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
                <button className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700">
                  Apply
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className=" flex justify-center mt-8 space-x-1 text-white">
          <button
            className="border py-2 px-4 rounded bg-white bg-opacity-70 text-gray-800"
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &lt;
          </button>
          {[...Array(totalPages).keys()].map(number => (
            <button
              key={number + 1}
              className={`border py-2 px-4 rounded bg-white bg-opacity-70 text-gray-800 ${currentPage === number + 1 ? "font-bold" : ""}`}
              onClick={() => paginate(number + 1)}
            >
              {number + 1}
            </button>
          ))}
          <button
            className="border py-2 px-4 rounded bg-white bg-opacity-70 text-gray-800"
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            &gt;
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Home;