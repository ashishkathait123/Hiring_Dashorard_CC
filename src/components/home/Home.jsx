import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";

function Home() {
  const [jobs, setJobs] = useState([]);
  const [location, setLocation] = useState("Gurugram, India");
  const [search, setSearch] = useState("");

  useEffect(() => {
    // Fetch jobs from API
    const fetchJobs = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/jobs");
        setJobs(response.data);
      } catch (error) {
        console.error("Error fetching jobs", error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-center mb-8 hover:text-black transform transition-transform duration-300 hover:scale-110">
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
          <button className="bg-indigo-600 text-white py-2 px-4 rounded w-full sm:w-auto hover:text-black transform transition-transform duration-300 hover:scale-110">
            Search
          </button>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">All Jobs</h3>
          <p className="text-gray-600 mb-6">Showing {jobs.length} results</p>

          <div className="space-y-4">
            {jobs.map((job, index) => (
              <div
                key={index}
                className="border rounded p-4 flex flex-col sm:flex-row justify-between items-center"
              >
                <div className="mb-4 sm:mb-0 sm:mr-4">
                  <h4 className="text-lg font-semibold">{job.title}</h4>
                  <p className="text-gray-600">{job.location}</p>
                  <div className="flex flex-wrap space-x-2 mt-2">
                    {job.types.map((type, idx) => (
                      <span
                        key={idx}
                        className={`text-sm ${type === "Full-Time" ? "bg-green-100 text-green-800" : type === "Part-Time" ? "bg-yellow-100 text-yellow-800" : "bg-blue-100 text-blue-800"} rounded px-2 py-1`}
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
                <button className="bg-indigo-600 text-white py-2 px-4 rounded">
                  Apply
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-8 space-x-1">
          <button className="border py-2 px-4 rounded">&lt;</button>
          <button className="border py-2 px-4 rounded">1</button>
          <button className="border py-2 px-4 rounded">2</button>
          <button className="border py-2 px-4 rounded">3</button>
          <button className="border py-2 px-4 rounded">...</button>
          <button className="border py-2 px-4 rounded">&gt;</button>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Home;
