import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../sidebar/Sidebar";
import TopNav from "../dashboard/dashboardNav/TopNav";
import Chart from "react-apexcharts";
import { useUser } from "../userContext/UserContext";

const ApplicationChart = () => {
  const [applicants, setApplicants] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedChart, setSelectedChart] = useState("Applications by Job"); // Default chart
  const { user } = useUser();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const response = await axios.get("/api/applicants");
        setApplicants(response.data);
      } catch (error) {
        console.error("Error fetching applicants data", error);
      }
    };

    fetchApplicants();
  }, []);

  const barChartOptions = {
    chart: {
      type: "bar",
      height: 345,
      responsive: true,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
        colors: {
          ranges: [
            { from: 0, to: 50, color: "#FF4560" },
            { from: 51, to: 100, color: "#00E396" },
            { from: 101, to: 150, color: "#008FFB" },
            { from: 151, to: 200, color: "#FF6E40" },
            { from: 201, to: 250, color: "#775DD0" },
          ],
          backgroundBarColors: ["#f4f4f4"],
          backgroundBarOpacity: 1,
          backgroundBarRadius: 4,
        },
      },
    },
    colors: ["#FF4560", "#00E396", "#008FFB", "#FF6E40", "#775DD0"],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: [
        "Software Engineer",
        "Product Manager",
        "Data Scientist",
        "Designer",
        "Marketing Specialist",
      ],
    },
    yaxis: {
      title: {
        text: "Number of Applications",
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val;
        },
      },
    },
  };

  const barChartSeries = [
    {
      name: "Applications",
      data: [120, 80, 100, 40, 90],
    },
  ];

  const barChartOptions2 = {
    chart: {
      type: "bar",
      height: 345,
      responsive: true,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
      },
    },
    colors: ["#00E396", "#FF4560", "#775DD0", "#FF6E40", "#008FFB"],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: [
        "Applied",
        "In Review",
        "Interview Scheduled",
        "Offer Stage",
        "Hired",
      ],
    },
    yaxis: {
      title: {
        text: "Number of Applicants",
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val;
        },
      },
    },
  };

  const barChartSeries2 = [
    {
      name: "Applications",
      data: [44, 11, 5, 5, 9],
    },
  ];

  const pieChartOptions = {
    chart: {
      type: "pie",
      height: 350,
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350,
        },
      },
    },
    labels: ["Full-Time", "Internship", "Part-Time", "Contract", "Remote"],
    legend: {
      show: true,
      position: "bottom",
    },
    plotOptions: {
      pie: {
        donut: {
          size: "70%",
        },
      },
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return `${val}`;
        },
      },
    },
  };

  const pieChartSeries = [34.8, 26.1, 8.7, 13.0, 17.4];

  const charts = [
    {
      name: "Applications by Job",
      component: (
        <Chart
          options={barChartOptions}
          series={barChartSeries}
          type="bar"
          height={345}
        />
      ),
    },
    {
      name: "Application status",
      component: (
        <Chart
          options={barChartOptions2}
          series={barChartSeries2}
          type="bar"
          height={345}
        />
      ),
    },
    {
      name: "Applications by Source",
      component: (
        <Chart
          options={pieChartOptions}
          series={pieChartSeries}
          type="pie"
          height={350}
        />
      ),
    },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <Sidebar user={user} isOpen={isSidebarOpen} />
      <div
        className={`flex-grow transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-0"} lg:ml-64`}
      >
        <TopNav />
        <div className="p-6 flex-grow overflow-auto">
          <div className="bg-white shadow rounded-lg p-4">
            <div className="bg-white p-6 rounded-lg shadow mb-6">
              <div className="mt-5">
                <h2 className="text-2xl font-bold">
                  {getGreeting()}, {user?.FullName}
                </h2>
              </div>
              <div className="flex justify-between items-center mb-4 mt-8">
                <h2 className="text-xl font-semibold">
                  Total Applicants: {applicants.length}
                </h2>
              </div>
              <div className="text-xl font-semibold mb-4">Charts</div>
              <div className="flex flex-wrap gap-2 mb-4">
                {charts.map((chart, index) => (
                  <button
                    key={index}
                    className={`bg-blue-500 text-white px-4 py-2 rounded-lg mb-2 ${
                      selectedChart === chart.name ? "bg-blue-700" : ""
                    }`}
                    onClick={() => setSelectedChart(chart.name)}
                  >
                    {chart.name}
                  </button>
                ))}
              </div>
              <div className="text-xl font-semibold mb-4">{selectedChart}</div>
              <div className="chart-container">
                 {charts.find((chart) => chart.name === selectedChart)?.component}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationChart;