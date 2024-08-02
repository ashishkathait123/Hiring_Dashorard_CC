import React, { useEffect, useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import TopNav from "../dashboard/dashboardNav/TopNav";
import Chart from "react-apexcharts";
import { useUser } from "../userContext/UserContext";
import { useNavigate } from "react-router-dom";
const TimeToHire = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [timeFrame, setTimeFrame] = useState("week");
  const { user } = useUser();
const navigate = useNavigate()
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
useEffect(() =>{
  if (!user) {
  navigate("/login")
    
  }
},[user,navigate])
  const pieChartOptions = {
    chart: {
      type: "donut",
      height: 350,
      animations: {
        enabled: true,
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
    labels: ["Background Checks", "Interviews", "Application Review"],
    legend: {
      show: true,
      position: "bottom",
    },
    plotOptions: {
      pie: {
        donut: {
          size: "70%",
        },
        dataLabels: {
          offset: 30,
        },
      },
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return `${val}%`;
        },
      },
    },
  };

  const lineChartOptions = {
    chart: {
      height: 350,
      type: "line",
      zoom: {
        enabled: false,
      },
      animations: {
        enabled: true,
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
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      categories: ["January", "February", "March", "April", "May", "June"],
    },
  };

  const barChartOptions = {
    chart: {
      type: "bar",
      height: 350,
      animations: {
        enabled: true,
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
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: ["Alice", "Bob", "Carol"],
    },
    yaxis: {
      title: {
        text: "Average Time Spent (days)",
      },
    },
    // fill: {
    //   opacity: 1,
    // },
    tooltip: {
      y: {
        formatter: function (val) {
          return val;
        },
      },
    },
  };

  // Dummy data for different time frames
  const chartData = {
    week: {
      pie: [20, 50, 30],
      line: [
        { name: "Alice", data: [5, 6, 7, 8, 9, 10] },
        { name: "Bob", data: [10, 9, 8, 7, 6, 5] },
        { name: "Carol", data: [6, 7, 8, 9, 10, 11] },
      ],
      bar: [
        { name: "Application Review", data: [3, 4, 2] },
        { name: "Interviews", data: [4, 5, 6] },
        { name: "Background Checks", data: [5, 6, 4] },
      ],
    },
    month: {
      pie: [30, 40, 30],
      line: [
        { name: "Alice", data: [10, 12, 14, 16, 18, 20] },
        { name: "Bob", data: [20, 18, 16, 14, 12, 10] },
        { name: "Carol", data: [14, 16, 18, 20, 22, 24] },
      ],
      bar: [
        { name: "Application Review", data: [10, 12, 8] },
        { name: "Interviews", data: [12, 14, 16] },
        { name: "Background Checks", data: [14, 16, 12] },
      ],
    },
    year: {
      pie: [40, 30, 30],
      line: [
        { name: "Alice", data: [20, 25, 30, 35, 40, 45] },
        { name: "Bob", data: [30, 28, 26, 24, 22, 20] },
        { name: "Carol", data: [25, 30, 35, 40, 45, 50] },
      ],
      bar: [
        { name: "Application Review", data: [20, 22, 18] },
        { name: "Interviews", data: [22, 24, 26] },
        { name: "Background Checks", data: [24, 26, 22] },
      ],
    },
  };

  const pieChartSeries = chartData[timeFrame].pie;
  const lineChartSeries = chartData[timeFrame].line;
  const barChartSeries = chartData[timeFrame].bar;

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isOpen={isSidebarOpen} />
      <div className={`flex-grow transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-0"}`}>
        <TopNav />
        <div className="p-6 flex-grow overflow-auto pt-20">
          <div className="bg-white shadow rounded-lg p-4">
            <div className="mb-4">
              <h2 className="text-2xl font-bold">
                {getGreeting()}, {user?.FullName}
              </h2>
              <p className="text-gray-500">{getFormattedDate()}</p>

            </div>
            <div className="bg-gray-100 rounded-lg p-4 mb-6">
              <h3 className="text-lg font-semibold">Hiring statistics</h3>
              <div className="flex space-x-4 mt-4">
                <button
                  className={`bg-white px-4 py-2 rounded-lg shadow-md ${timeFrame === "week" ? "bg-indigo-600 text-white" : ""}`}
                  onClick={() => setTimeFrame("week")}
                >
                  Week
                </button>
                <button
                  className={`bg-white px-4 py-2 rounded-lg shadow-md ${timeFrame === "month" ? "bg-indigo-600 text-white" : ""}`}
                  onClick={() => setTimeFrame("month")}
                >
                  Month
                </button>
                <button
                  className={`bg-white px-4 py-2 rounded-lg shadow-md ${timeFrame === "year" ? "bg-indigo-600 text-white" : ""}`}
                  onClick={() => setTimeFrame("year")}
                >
                  Year
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg shadow-md p-4">
                <h4 className="text-lg font-semibold mb-4">
                  Average Time Spent in Each Stage of the Hiring Pipeline
                </h4>
                <Chart
                  options={pieChartOptions}
                  series={pieChartSeries}
                  type="donut"
                  height={350}
                />
              </div>
              <div className="bg-white rounded-lg shadow-md p-4">
                <h4 className="text-lg font-semibold mb-4">
                  Average Time to Hire by Recruiter (Jan - Jun 2023)
                </h4>
                <Chart
                  options={lineChartOptions}
                  series={lineChartSeries}
                  type="line"
                  height={350}
                />
              </div>
              <div className="bg-white rounded-lg shadow-md p-4">
                <h4 className="text-lg font-semibold mb-4">
                  Average Time Spent in Each Stage of the Hiring Pipeline
                </h4>
                <Chart
                  options={barChartOptions}
                  series={barChartSeries}
                  type="bar"
                  height={350}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeToHire;
