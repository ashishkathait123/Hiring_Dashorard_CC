import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
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
  const navigate = useNavigate(); 

  useEffect(() => {
    if (!user) {
      navigate("/login"); 
    }
  }, [user, navigate]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const getFormattedDate = () => {
    const date = new Date();
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
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
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "horizontal",
        shadeIntensity: 0.5,
        gradientToColors: ["#FFC0CB"], // Light pink
        stops: [0, 100],
      },
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
    <div className="flex flex-col md:flex-row min-h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col p-4 md:ml-64">
        <TopNav />
        <div className="p-6 flex-grow overflow-auto pt-20">
          <div className="mb-10 ">
            <h2 className="text-2xl font-semibold">
              {getGreeting()}, {user?.FullName}
            </h2>
            <p className="text-gray-500">{getFormattedDate()}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-purple-500 text-white p-4 rounded-lg shadow">
              <div className="text-xl font-semibold">
                {data.candidatesToReview}
              </div>
              <div className="mt-1">New candidates to review</div>
            </div>
            <div className="bg-green-500 text-white p-4 rounded-lg shadow">
              <div className="text-xl font-semibold">
                {data.scheduleForToday}
              </div>
              <div className="mt-1">Schedule for today</div>
            </div>
            <div className="bg-blue-500 text-white p-4 rounded-lg shadow">
              <div className="text-xl font-semibold">
                {data.messagesReceived}
              </div>
              <div className="mt-1">Messages received</div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-white rounded-lg shadow p-4">
              <div className="text-lg font-semibold mb-4">Job statistics</div>
              <div className="chart-container">
                <Chart
                  type="bar"
                  series={[
                    {
                      name: "Job statistics",
                      data: [33, 21, 34, 2, 32],
                    },
                  ]}
                  options={{
                    ...chartOptions,
                    chart: {
                      height: 300,
                      width: "100%", // Ensure the chart takes full width
                      toolbar: { show: false },
                    },
                  }}
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
            <div className="bg-white p-4 rounded-lg shadow overflow-hidden">
              <h4 className="text-lg font-semibold mb-4">Applicants Summary</h4>
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
                    chart: {
                      width: "100%", // Ensure the chart takes full width
                      height: 300, // Set a height for the chart
                      toolbar: { show: false },
                    },
                    plotOptions: {
                      pie: {
                        donut: {
                          size: "70%",
                          labels: {
                            show: true,
                            total: {
                              show: true,
                              label: "Total",
                              formatter: (w) => {
                                return w.globals.seriesTotals.reduce(
                                  (a, b) => a + b,
                                  0
                                );
                              },
                            },
                          },
                        },
                      },
                    },
                    fill: {
                      type: "gradient",
                      gradient: {
                        shade: "dark",
                        type: "horizontal",
                        shadeIntensity: 0.5,
                        gradientToColors: ["#FFC0CB"], // Light pink
                        stops: [0, 100],
                      },
                    },
                  }}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                <div className="text-center">
                  <div className="text-lg font-semibold">{data.jobOpen}</div>
                  <div className="mt-1">Jobs Opened</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold">{data.applicants}</div>
                  <div className="mt-1">Applicants</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold">{data.jobViews}</div>
                  <div className="mt-1">Job Views</div>
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
