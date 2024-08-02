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

  const getFormattedDate = () => {
    const date = new Date();
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

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

  const barColors = ["#FF4560", "#00E396", "#008FFB", "#FF6E40", "#775DD0"];

  const barChartOptions = {
    chart: {
      type: "bar",
      height: 345,
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
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
      },
    },
    colors: barColors,
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
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
      },
    },
    colors: barColors,
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
      type: "donut",
      height: 350,
      background: '#f4f4f4', // Light gray background
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
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 90,
        donut: {
          size: "70%",
          labels: {
            show: true,
            total: {
              show: true,
              label: 'Total',
              formatter: function (w) {
                return w.globals.seriesTotals.reduce((a, b) => {
                  return a + b
                }, 0)
              }
            }
          }
        },
        offsetY: 10,
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'horizontal',
        shadeIntensity: 0.5,
        gradientToColors: undefined,
        inverseColors: true,
        opacityFrom: 0.85,
        opacityTo: 0.85,
        stops: [0, 50, 100]
      },
    },
    labels: ["Full-Time", "Internship", "Part-Time", "Contract", "Remote"],
    legend: {
      show: true,
      position: "bottom",
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
          type="donut"
          height={350}
        />
      ),
    },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <Sidebar user={user} isOpen={isSidebarOpen} />
      <div
        className={`flex flex-col flex-grow transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-0"} lg:ml-64`}
      >
        <TopNav />
        <div className="flex flex-col flex-grow p-6 overflow-auto">
          <div className="bg-white shadow rounded-lg p-4 flex flex-col flex-grow">
            <div className="bg-white p-6 rounded-lg shadow mb-6 flex-grow">
              <div className="mt-5">
                <h2 className="text-2xl font-bold">
                  {getGreeting()}, {user?.FullName}
                </h2>
                <p className="text-gray-500">{getFormattedDate()}</p>

              </div>
              <div className="flex justify-between items-center mb-4 mt-4">
                <h2 className="text-xl font-semibold">
                  Total Applicants: {applicants.length}
                </h2>
              </div>
              <div className="text-xl font-semibold mb-4">Charts</div>
              <div className="flex flex-wrap gap-2 mb-4">
                {charts.map((chart, index) => (
                  <button
                    key={index}
                    className={`bg-blue-500 text-white px-4 py-2 rounded-lg mb-1 ${
                      selectedChart === chart.name ? "bg-blue-700" : ""
                    }`}
                    onClick={() => setSelectedChart(chart.name)}
                  >
                    {chart.name}
                  </button>
                ))}
              </div>
              <div className="text-xl font-semibold mb-4">{selectedChart}</div>
              <div className="flex-grow overflow-auto">
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
