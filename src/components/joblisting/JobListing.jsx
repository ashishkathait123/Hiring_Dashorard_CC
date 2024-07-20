import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../sidebar/Sidebar';
import TopNav from '../dashboard/dashboardNav/TopNav';
import 'tailwindcss/tailwind.css';

const JobListing = ({ user }) => {
    const [jobs, setJobs] = useState([]);
    const [applicants, setApplicants] = useState([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/v1/jobs');
                setJobs(response.data);
            } catch (error) {
                console.error('Error fetching jobs:', error);
            }
        };

        const fetchApplicants = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/v1/applicants');
                setApplicants(response.data);
            } catch (error) {
                console.error('Error fetching applicants:', error);
            }
        };

        fetchJobs();
        fetchApplicants();
    }, []);

    const getApplicantCount = (jobId) => {
        return applicants.filter(applicant => applicant.jobId === jobId).length;
    };

    const getJobStatus = (dueDate) => {
        const currentDate = new Date();
        const jobDueDate = new Date(dueDate);
        return currentDate <= jobDueDate ? 'Live' : 'Closed';
    };

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
            <Sidebar user={user} isOpen={isSidebarOpen} />
            <div className={`flex-grow ${isSidebarOpen ? 'md:ml-64' : ''} transition-all duration-300`}>
                <TopNav />
                <div className="p-4 md:p-6">
                    <h1 className="text-2xl md:text-3xl font-semibold mb-4">Job Listing</h1>
                    <p className="mb-4">Here is your jobs listing status from July 19 - July 25.</p>
                    <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
                        <div className="mb-4 flex justify-between items-center">
                            <h2 className="text-xl md:text-2xl font-semibold">Job List</h2>
                            <button className="bg-indigo-600 text-white px-2 py-1 md:px-4 md:py-2 rounded-lg">Filters</button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full table-auto">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="px-2 md:px-4 py-2 text-left">Roles</th>
                                        <th className="px-2 md:px-4 py-2 text-left">Status</th>
                                        <th className="px-2 md:px-4 py-2 text-left">Date Posted</th>
                                        <th className="px-2 md:px-4 py-2 text-left">Due Date</th>
                                        <th className="px-2 md:px-4 py-2 text-left">Applicants</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {jobs.map((job, index) => (
                                        <tr key={index} className="border-b">
                                            <td className="px-2 md:px-4 py-2">{job.title}</td>
                                            <td className="px-2 md:px-4 py-2">
                                                <span className={`px-2 py-1 rounded-lg ${getJobStatus(job.dueDate) === 'Live' ? 'bg-green-200 text-green-700' : 'bg-red-200 text-red-700'}`}>
                                                    {getJobStatus(job.dueDate)}
                                                </span>
                                            </td>
                                            <td className="px-2 md:px-4 py-2">{new Date(job.datePosted).toLocaleDateString()}</td>
                                            <td className="px-2 md:px-4 py-2">{new Date(job.dueDate).toLocaleDateString()}</td>
                                            <td className="px-2 md:px-4 py-2">{getApplicantCount(job._id)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobListing;
