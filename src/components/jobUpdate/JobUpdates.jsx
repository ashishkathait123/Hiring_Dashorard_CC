import React, { useEffect, useState } from "react";
import axios from "axios";

const JobUpdates = () => {
  const [jobUpdates, setJobUpdates] = useState([]);

  useEffect(() => {
    // Fetch job updates from the API
    axios
      .get("/api/job-updates")
      .then((response) => {
        setJobUpdates(response.data);
      })
      .catch((error) => {
        console.error("Error fetching job updates:", error);
      });
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="text-xl font-semibold mb-4">Job Updates</div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* {jobUpdates.map(job => (
          <div key={job.id} className="bg-gray-100 p-4 rounded-lg">
            <div className="text-lg font-semibold">{job.title}</div>
            <div className="text-sm text-gray-600">{job.location}</div>
            <div className="flex mt-2">
              {job.categories.map(category => (
                <div key={category} className={`text-xs bg-${category.color}-500 text-white px-2 py-1 rounded-full ml-2`}>{category.name}</div>
              ))}
            </div>
            <div className="mt-2">{job.applied} applied of {job.capacity} capacity</div>
          </div>
        ))} */}
      </div>
      <div className="text-right mt-4">
        <a href="/job-updates" className="text-blue-500">
          View All
        </a>
      </div>
    </div>
  );
};

export default JobUpdates;
