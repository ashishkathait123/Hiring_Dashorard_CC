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
      { name: "Remote", color: "green" }
    ],
    applied: 50,
    capacity: 100
  },
  {
    id: "2",
    title: "Backend Developer",
    location: "San Francisco, CA",
    categories: [
      { name: "Part-time", color: "yellow" }
    ],
    applied: 30,
    capacity: 50
  },
  {
    id: "3",
    title: "Project Manager",
    location: "Austin, TX",
    categories: [
      { name: "Full-time", color: "blue" }
    ],
    applied: 20,
    capacity: 40
  },
  {
    id: "4",
    title: "Data Scientist",
    location: "Boston, MA",
    categories: [
      { name: "Full-time", color: "blue" },
      { name: "On-site", color: "red" }
    ],
    applied: 60,
    capacity: 80
  }
];

const JobUpdates = () => {
  const [jobUpdates, setJobUpdates] = useState([]);
  const [useDummyData, setUseDummyData] = useState(true); // State to toggle dummy data

  useEffect(() => {
    if (useDummyData) {
      // Use dummy data
      setJobUpdates(dummyJobUpdates);
    } else {
      // Fetch job updates from the API
      axios
        .get("/api/job-updates")
        .then((response) => {
          setJobUpdates(response.data);
        })
        .catch((error) => {
          console.error("Error fetching job updates:", error);
        });
    }
  }, [useDummyData]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="text-xl font-semibold mb-4">Job Updates</div>
      <div className="job-updates-container">
        <div className="job-updates-wrapper">
          {jobUpdates.map((job) => (
            <div
              key={job.id}
              className="job-update-item"
            >
              <div className="text-lg font-semibold mb-2">{job.title}</div>
              <div className="text-sm text-gray-600 mb-2">{job.location}</div>
              <div className="flex flex-wrap mt-2">
                {job.categories.map((category, index) => (
                  <div
                    key={index}
                    className={`text-xs bg-${category.color}-500 text-white px-2 py-1 rounded-full mr-2 mb-2`}
                  >
                    {category.name}
                  </div>
                ))}
              </div>
              <div className="mt-2">{job.applied} applied of {job.capacity} capacity</div>
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
