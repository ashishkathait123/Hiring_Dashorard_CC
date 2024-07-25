import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home/Home.jsx";
import SignUp from "./components/logIn_signUp/SignUp.jsx";
import LogIn from "./components/logIn_signUp/LogIn.jsx";
import Company from "./components/BrowseCompany/Company.jsx";
import JobPost from "./components/jobs/PostJob.jsx";
import Dashboard from "./components/dashboard/dashboardNav/Dashboard.jsx";
import JobListing from "./components/joblisting/JobListing.jsx";
import { BrowserRouter } from "react-router-dom";
import Applicants from "./components/applicant_tarcking/Applicants.jsx";
import ApplicationChart from "./components/applicant_tarcking/ApplicationChart.jsx";
import MySchedule from "./components/mySchedule/MySchedule.jsx";
import TimeToHire from "./components/hiringTime/TimeToHire.jsx"
import Performance from "./components/performance/PerformanceAnalysis.jsx";
function App() {

  return (
    <BrowserRouter>
     <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/logIn" element={<LogIn />} />
        <Route path="/browse-company" element={<Company />} />
        <Route path="/find-jobs" element={<Home />} />
        <Route path="post-job" element={<JobPost />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/job-listing" element={<JobListing />} />
        <Route path="/applicants-tracking" element={<Applicants />} />
        <Route path="/chart-view" element={<ApplicationChart />} />
        <Route path="/applicant-list" element={<Applicants />} />
        <Route path="/time-to-hire" element={<TimeToHire />} />
        <Route path="/my-schedule" element={<MySchedule/>} />
        <Route path="/performance-analysis" element={<Performance/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
