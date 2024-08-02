import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "tailwindcss/tailwind.css";

function JobPost() {
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    categories: "Full-Time",
    description: "",
    responsibilities: "",
    whoYouAre: "",
    niceToHaves: "",
    perksBenefits: "",
    
    applyBefore: "",
    salary: "",
    postDate: "",
  });
  
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.title || !formData.location || !formData.description) {
      setMessage("Please fill in all required fields.");
      return;
    }
  
    try {
      const token = localStorage.getItem('accessToken'); // or wherever you store the token
      console.log("Token being sent:", token); // Log the token

      const response = await axios.post(
        "http://localhost:3000/api/v1/jobs",
        { ...formData, dueDate: formData.applyBefore },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 201) {
        setMessage("Job posted successfully!");
        navigate("/");
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Job post failed");
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-semibold mb-4 text-center">
        Post a New Job
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-lg shadow-md max-w-4xl mx-auto"
      >
        {/* Job Title */}
        <div className="mb-4">
          <label className="block mb-2 text-gray-600" htmlFor="title">
            Job Title <span className="text-red-500">*</span>
          </label>
          <input
            className="w-full px-4 py-2 border rounded-lg"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter job title"
            required
          />
        </div>
        {/* Location */}
        <div className="mb-4">
          <label className="block mb-2 text-gray-600" htmlFor="location">
            Location <span className="text-red-500">*</span>
          </label>
          <input
            className="w-full px-4 py-2 border rounded-lg"
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter job location"
            required
          />
        </div>
        {/* Job Type */}
        <div className="mb-4">
          <label className="block mb-2 text-gray-600" htmlFor="type">
            Job Type
          </label>
          <select
            className="w-full px-4 py-2 border rounded-lg"
            name="type"
            value={formData.type}
            onChange={handleChange}
          >
            <option value="Full-Time">Full-Time</option>
            <option value="Part-Time">Part-Time</option>
            <option value="Intern">Intern</option>
          </select>
        </div>
        {/* Description */}
        <div className="mb-4">
          <label className="block mb-2 text-gray-600" htmlFor="description">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            className="w-full px-4 py-2 border rounded-lg"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter job description"
            required
          ></textarea>
        </div>
        {/* Responsibilities */}
        <div className="mb-4">
          <label
            className="block mb-2 text-gray-600"
            htmlFor="responsibilities"
          >
            Responsibilities
          </label>
          <textarea
            className="w-full px-4 py-2 border rounded-lg"
            name="responsibilities"
            value={formData.responsibilities}
            onChange={handleChange}
            placeholder="Enter job responsibilities"
          ></textarea>
        </div>
        {/* Who You Are */}
        <div className="mb-4">
          <label className="block mb-2 text-gray-600" htmlFor="whoYouAre">
            Who You Are
          </label>
          <textarea
            className="w-full px-4 py-2 border rounded-lg"
            name="whoYouAre"
            value={formData.whoYouAre}
            onChange={handleChange}
            placeholder="Enter who you are"
          ></textarea>
        </div>
        {/* Nice-To-Haves */}
        <div className="mb-4">
          <label className="block mb-2 text-gray-600" htmlFor="niceToHaves">
            Nice-To-Haves
          </label>
          <textarea
            className="w-full px-4 py-2 border rounded-lg"
            name="niceToHaves"
            value={formData.niceToHaves}
            onChange={handleChange}
            placeholder="Enter nice-to-haves"
          ></textarea>
        </div>
        {/* Perks & Benefits */}
        <div className="mb-4">
          <label className="block mb-2 text-gray-600" htmlFor="perksBenefits">
            Perks & Benefits
          </label>
          <textarea
            className="w-full px-4 py-2 border rounded-lg"
            name="perksBenefits"
            value={formData.perksBenefits}
            onChange={handleChange}
            placeholder="Enter perks and benefits"
          ></textarea>
        </div>
        {/* Categories */}
        <div className="mb-4">
          <label className="block mb-2 text-gray-600" htmlFor="categories">
            Categories
          </label>
          <input
            className="w-full px-4 py-2 border rounded-lg"
            type="text"
            name="categories"
            value={formData.categories}
            onChange={handleChange}
            placeholder="Enter job categories"
          />
        </div>
        {/* Apply Before */}
        <div className="mb-4">
          <label className="block mb-2 text-gray-600" htmlFor="applyBefore">
            Apply Before
          </label>
          <input
            className="w-full px-4 py-2 border rounded-lg"
            type="date"
            name="applyBefore"
            value={formData.applyBefore}
            onChange={handleChange}
          />
        </div>
        {/* Salary */}
        <div className="mb-4">
          <label className="block mb-2 text-gray-600" htmlFor="salary">
            Salary
          </label>
          <input
            className="w-full px-4 py-2 border rounded-lg"
            type="text"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            placeholder="Enter salary range"
          />
        </div>
        {/* Post Date */}
        <div className="mb-4">
          <label className="block mb-2 text-gray-600" htmlFor="postDate">
            Post Date
          </label>
          <input
            className="w-full px-4 py-2 border rounded-lg"
            type="date"
            name="postDate"
            value={formData.postDate}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 text-white bg-indigo-600 rounded-lg hover:text-black"
        >
          Post Job
        </button>
        {message && <p className="mt-4 text-center text-red-600">{message}</p>}
      </form>
    </div>
  );
}

export default JobPost;
