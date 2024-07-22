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
import ApplicationByJob from "./components/applicant_tarcking/ApplicationByJob.jsx";
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
        <Route path="/chart-view" element={<ApplicationByJob />} />
        <Route path="/applicant-list" element={<Applicants />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
