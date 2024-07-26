import React, { useState } from "react";
import axios from "axios";

const ApplicationForm = ({ job, onClose }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    currentJobTitle: "", 
    linkedin: "",
    portfolio: "",
    additionalInfo: "",
    resume: null,
  }); 

  const handleChange = (e) => {
    const { username, value } = e.target;
    setFormData({ ...formData, [username]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, resume: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    Object.keys(formData).forEach((key) => {
      form.append(key, formData[key]);
    });

    try {
      await axios.post("http://localhost:3000/api/v1/applications", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Application submitted successfully");
      onClose();
    } catch (error) {
      console.error("Error submitting application", error);
      alert("Failed to submit application");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">{job.title}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Full username</label>
            <input
              type="text"
              username="username"
              className="w-full px-4 py-2 border rounded-lg"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Email</label>
            <input
              type="email"
              username="email"
              className="w-full px-4 py-2 border rounded-lg"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Phone</label>
            <input
              type="text"
              username="phone"
              className="w-full px-4 py-2 border rounded-lg"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Current or Previous Job Title</label>
            <input
              type="text"
              username="currentJobTitle"
              className="w-full px-4 py-2 border rounded-lg"
              value={formData.currentJobTitle}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">LinkedIn URL</label>
            <input
              type="url"
              username="linkedin"
              className="w-full px-4 py-2 border rounded-lg"
              value={formData.linkedin}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Portfolio URL</label>
            <input
              type="url"
              username="portfolio"
              className="w-full px-4 py-2 border rounded-lg"
              value={formData.portfolio}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Additional Information</label>
            <textarea
              username="additionalInfo"
              className="w-full px-4 py-2 border rounded-lg"
              value={formData.additionalInfo}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Attach Resume</label>
            <input
              type="file"
              username="resume"
              className="w-full px-4 py-2 border rounded-lg"
              onChange={handleFileChange}
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="mr-4 py-2 px-4 bg-gray-600 text-white rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2 px-4 bg-indigo-600 text-white rounded"
            >
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplicationForm;
