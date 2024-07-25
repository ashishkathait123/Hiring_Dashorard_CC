import React, { useState, useEffect } from 'react';
import TopNav from '../dashboard/dashboardNav/TopNav';
import Sidebar from '../sidebar/Sidebar';
import Chart from 'react-apexcharts';
import axios from 'axios';

// Dummy Data
const DummysourceEffectivenessData = [
  { name: 'Direct', value: 48 },
  { name: 'Social', value: 23 },
  { name: 'Organic', value: 24 },
  { name: 'Other', value: 5 }
];

const DummytimeToHireData = [
  { date: '19 Jul', value: 120 },
  { date: '20 Jul', value: 135 },
  { date: '21 Jul', value: 125 },
  { date: '22 Jul', value: 130 },
  { date: '23 Jul', value: 129 }
];

const Performance = () => {
  const [totalViews, setTotalViews] = useState(2356); // Dummy data
  const [totalApplied, setTotalApplied] = useState(132); // Dummy data
  const [sourceEffectivenessData, setSourceEffectivenessData] = useState(DummysourceEffectivenessData); // Initialize with dummy data
  const [timeToHireData, setTimeToHireData] = useState(DummytimeToHireData); // Initialize with dummy data
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [viewsResponse, appliedResponse, sourceResponse, hireResponse] = await Promise.all([
          axios.get('/api/total-views'),
          axios.get('/api/total-applied'),
          axios.get('/api/source-effectiveness'),
          axios.get('/api/time-to-hire-trends')
        ]);

        console.log('API Response:', {
          viewsResponse: viewsResponse.data,
          appliedResponse: appliedResponse.data,
          sourceResponse: sourceResponse.data,
          hireResponse: hireResponse.data
        });

        setTotalViews(viewsResponse.data.totalViews);
        setTotalApplied(appliedResponse.data.totalApplied);
        setSourceEffectivenessData(Array.isArray(sourceResponse.data) ? sourceResponse.data : DummysourceEffectivenessData);
        setTimeToHireData(Array.isArray(hireResponse.data) ? hireResponse.data : DummytimeToHireData);
      } catch (error) {
        console.error('Error fetching data:', error);

        // Fallback to dummy data if any API call fails
        setSourceEffectivenessData(DummysourceEffectivenessData);
        setTimeToHireData(DummytimeToHireData);
      }
    };

    fetchData();
  }, []);

  const sourceEffectivenessOptions = {
    labels: sourceEffectivenessData.map(source => source.name),
    colors: ['#FFD700', '#1E90FF', '#32CD32', '#A9A9A9'],
    legend: {
      position: 'bottom',
    },
  };

  const sourceEffectivenessSeries = sourceEffectivenessData.map(source => source.value);

  const timeToHireOptions = {
    chart: {
      id: 'time-to-hire',
    },
    xaxis: {
      categories: timeToHireData.map(entry => entry.date),
    },
    stroke: {
      curve: 'smooth',
    },
    markers: {
      size: 5,
    },
  };

  const timeToHireSeries = [
    {
      name: 'Hire',
      data: timeToHireData.map(entry => entry.value),
    },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      <div className={`flex-grow transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-0"}`}>
        <TopNav />
        <main className="flex-1 p-6 bg-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Performance Analysis</h1>
            <button className="bg-blue-500 text-white px-4 py-2 rounded">More Action</button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-white p-6 rounded shadow">
              <h2 className="text-lg font-bold mb-4">Total Views</h2>
              <p className="text-2xl font-bold">{totalViews}</p>
              <p className="text-green-500">6.4% ↑ vs last day</p>
            </div>
            <div className="bg-white p-6 rounded shadow">
              <h2 className="text-lg font-bold mb-4">Total Applied</h2>
              <p className="text-2xl font-bold">{totalApplied}</p>
              <p className="text-red-500">0.4% ↓ vs last day</p>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="col-span-1 lg:col-span-2 bg-white p-6 rounded shadow">
              <h2 className="text-lg font-bold mb-4">Time to Hire Trends</h2>
              {timeToHireData.length > 0 ? (
                <Chart
                  options={timeToHireOptions}
                  series={timeToHireSeries}
                  type="line"
                  height={350}
                />
              ) : (
                <div>Loading Time to Hire Data...</div>
              )}
            </div>
            <div className="bg-white p-6 rounded shadow">
              <h2 className="text-lg font-bold mb-4">Source Effectiveness</h2>
              {sourceEffectivenessData.length > 0 ? (
                <Chart
                  options={sourceEffectivenessOptions}
                  series={sourceEffectivenessSeries}
                  type="donut"
                  height={350}
                />
              ) : (
                <div>Loading Source Effectiveness Data...</div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Performance;
