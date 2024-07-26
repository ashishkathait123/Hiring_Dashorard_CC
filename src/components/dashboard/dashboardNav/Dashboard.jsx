import React, { useState, useEffect } from "react";
import axios from "axios";
import Chart from "react-apexcharts";
import JobUpdates from "../../jobUpdate/JobUpdates";
import Sidebar from "../../sidebar/Sidebar";
import TopNav from "./TopNav";
import { useUser } from "../../userContext/UserContext";

const Dashboard = () => {
  const [data, setData] = useState({
    jobViews: 2342,
    jobsApplied: 654,
    jobOpen: 12,
    applicants: 67,
    candidatesToReview: 76,
    scheduleForToday: 3,
    messagesReceived: 24,
    AllJobs: 22,
    Applied: 12,
  });
  const [hiringMonths, setHiringMonths] = useState([]);
  const [applied, setApplied] = useState([]);
  const { user } = useUser();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  useEffect(() => {
    const allAppliedNo = [];
    const allHiringMonths = [];
    const jobDataForChart = async () => {
      try {
        const dataReq = await axios.get("/api/v1/job-data");
        const dataRes = dataReq.data;
        for (let i = 0; i < dataRes.length; i++) {
          allAppliedNo.push(dataRes[i].hiringMonths_title);
          allHiringMonths.push(dataRes[i].applied_No);
        }
        setApplied(allAppliedNo);
        setHiringMonths(allHiringMonths);
      } catch (error) {
        console.error("Error fetching job data:", error);
      }
    };
    jobDataForChart();
  }, []);

  const chartOptions = {
    theme: { mode: "light" },
    xaxis: {
      tickPlacement: "on",
      categories: ["Jan", "Feb", "March", "April", "May"],
    },
    yaxis: {
      labels: {},
    },
    responsive: [
      {
        breakpoint: 600,
        options: {
          chart: {
            width: "100%",
          },
        },
      },
    ],
    legend: {
      show: true,
      position: "bottom",
    },
  };

  useEffect(() => {
    axios
      .get("/api/dashboard-data")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching dashboard data:", error);
      });
  }, []);

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Sidebar user={user} isOpen={true} />
      <div className="flex-1 flex flex-col p-4 md:ml-64">
        <TopNav />
        <div className="bg-gray-100 flex-1 p-4 mt-20">
        <div className="mb-10">
            <h2 className="text-2xl font-semibold">{getGreeting()}, {user?.FullName}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            
            <div className="bg-purple-500 text-white p-4 md:p-6 rounded-lg shadow">
              <div className="text-xl md:text-2xl font-semibold">{data.candidatesToReview}</div>
              <div className="mt-1 md:mt-2">New candidates to review</div>
            </div>
            <div className="bg-green-500 text-white p-4 md:p-6 rounded-lg shadow">
              <div className="text-xl md:text-2xl font-semibold">{data.scheduleForToday}</div>
              <div className="mt-1 md:mt-2">Schedule for today</div>
            </div>
            <div className="bg-blue-500 text-white p-4 md:p-6 rounded-lg shadow">
              <div className="text-xl md:text-2xl font-semibold">{data.messagesReceived}</div>
              <div className="mt-1 md:mt-2">Messages received</div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-white p-4 md:p-6 rounded-lg shadow overflow-x-auto">
              <div className="text-lg md:text-xl font-semibold mb-4">Job statistics</div>
              <div className="chart-container">
                <Chart
                  type="bar"
                  series={[
                    {
                      name: "Job statistics",
                      data: [33, 21, 34, 2, 32],
                    },
                  ]}
                  options={chartOptions}
                />
              </div>
              <div className="flex flex-wrap gap-4 mt-4">
                <div className="flex items-center">
                  <div className="bg-yellow-500 h-4 w-4 rounded-full mr-2"></div>
                  <div>All Jobs: {data.AllJobs}</div>
                </div>
                <div className="flex items-center">
                  <div className="bg-blue-500 h-4 w-4 rounded-full mr-2"></div>
                  <div>Job Applied: {data.Applied}</div>
                </div>
              </div>
            </div>
            <div className="bg-white p-4 md:p-6 rounded-lg shadow overflow-x-auto">
              <div className="text-lg md:text-xl font-semibold mb-4">Applicants Summary</div>
              <div className="chart-container">
                <Chart
                  type="donut"
                  series={[45, 32, 24, 30, 22]} // Dummy data
                  options={{
                    labels: [
                      "Full-Time",
                      "Internship",
                      "Part-Time",
                      "Contract",
                      "Remote",
                    ],
                    legend: {
                      show: true,
                      position: "bottom",
                    },
                  }}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                <div className="text-center">
                  <div className="text-lg md:text-2xl font-semibold">{data.jobOpen}</div>
                  <div className="mt-1 md:mt-2">Jobs Opened</div>
                </div>
                <div className="text-center">
                  <div className="text-lg md:text-2xl font-semibold">{data.applicants}</div>
                  <div className="mt-1 md:mt-2">Applicants</div>
                </div>
                <div className="text-center">
                  <div className="text-lg md:text-2xl font-semibold">{data.jobViews}</div>
                  <div className="mt-1 md:mt-2">Job Views</div>
                </div>
              </div>
            </div>
          </div>
          <JobUpdates />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
