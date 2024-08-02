import React, { useEffect, useState } from "react";
import axios from "axios";

// Dummy data
const dummyJobUpdates = [
  {
    id: "1",
    title: "Frontend Developer",
    location: "New York, NY",
    categories: [
      { name: "Full-time", color: "blue" },
      { name: "Remote", color: "green" },
    ],
    applied: 50,
    capacity: 100,
  },
  // ... other dummy jobs
];

const JobUpdates = () => {
  const [jobUpdates, setJobUpdates] = useState([]);
  const [useDummyData, setUseDummyData] = useState(true); // State to toggle dummy data

  useEffect(() => {
    if (useDummyData) {
      const fetchJobs = async () => {
        try {
          const response = await axios.get("http://localhost:3000/api/v1/jobs");
          console.log(response.data); // Log the response to check its structure

          // Transform data if necessary
          const transformedJobs = response.data.map(job => ({
            ...job,
            categories: job.categories || [] // Fallback in case categories are missing
          }));

          setJobUpdates(transformedJobs);
        } catch (error) {
          console.error("Error fetching job updates:", error);
        }
      };
      fetchJobs();
    } else {
      setJobUpdates(dummyJobUpdates);
    }
  }, [useDummyData]);

  const colorMapping = {
    blue: "bg-blue-500",
    green: "bg-green-500",
    yellow: "bg-yellow-500",
    red: "bg-red-500",
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md overflow-hidden">
      <div className="text-xl font-semibold mb-4">Job Updates</div>
      <div className="job-updates-container">
        <div className="job-updates-wrapper">
          {jobUpdates.map((job) => (
            <div key={job.id} className="job-update-item mb-4 p-4 border rounded-lg shadow-sm">
              <div className="text-lg font-semibold mb-2">{job.title}</div>
              <div className="text-sm text-gray-600 mb-2">{job.location}</div>
              <div className="flex flex-wrap mt-2">
                {job.categories && Array.isArray(job.categories) && job.categories.length > 0 ? (
                  job.categories.map((category, index) => (
                    <div
                      key={index}
                      className={`${colorMapping[category.color]} text-white text-xs px-2 py-1 rounded-full mr-2 mb-2`}
                    >
                      {category.name}
                    </div>
                  ))
                ) : (
                  <div className="text-xs text-gray-500">No categories available</div>
                )}
              </div>
              <div className="mt-2">
                {job.applied} applied of {job.capacity} capacity
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="text-right mt-4">
        <a href="/job-updates" className="text-blue-500 hover:underline">
          View All
        </a>
      </div>
    </div>
  );
};

export default JobUpdates;
