import React, { useEffect, useState } from "react";
import axios from "axios";
function ApplicationForm({ job, onClose }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [resume, setResume] = useState(null);
  const [address, setAddress] = useState("");
  const [technicalSkills, setTechnicalSkills] = useState("");
  const [certifications, setCertifications] = useState("");
  const [yearsOfExperience, setYearsOfExperience] = useState("");
  const [noticePeriod, setNoticePeriod] = useState("");
  const [currentCTC, setCurrentCTC] = useState("");
  const [ApplyFor, setApplyfor] = useState("");
  const [message, setMessage] = useState();
  const [FormSubmitDate, setFormSubmitDate] = useState("");
  const [instagram, setInstagram] = useState("");
  const [twitter, setTwitter] = useState("");
  const [dob, setDob] = useState("");
  const [language, setLanguage] = useState("");
  const [gender, setGender] = useState("");

  useEffect(() => {
    setApplyfor(job.title || "");
  }, [job.title]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("jobTitle", jobTitle);
    formData.append("linkedin", linkedin);
    formData.append("portfolio", portfolio);
    formData.append("additionalInfo", additionalInfo);
    formData.append("profilePicture", profilePicture);
    formData.append("resume", resume);
    formData.append("address", address);
    formData.append("technicalSkills", technicalSkills);
    formData.append("certifications", certifications);
    formData.append("yearsOfExperience", yearsOfExperience);
    formData.append("noticePeriod", noticePeriod);
    formData.append("currentCTC", currentCTC);
    formData.append("ApplyFor", ApplyFor);
    formData.append("instagram", instagram);
    formData.append("twitter", twitter);
    formData.append("dob", dob);
    formData.append("language", language);
    formData.append("gender", gender);
    formData.append("FormSubmitDate", FormSubmitDate);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/Applicants",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }

      );


      if (response.status === 201) {
        setMessage("Application submitted successfully!");
        onClose();
      } else {
        console.error("Form submission failed");
        setMessage("Form submission failed. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setMessage("Error submitting form. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4 drop-shadow-xl">
      <div
        className="absolute inset-0 bg-gray-900 opacity-50"
        onClick={onClose}
      ></div>
      <div className="relative bg-white rounded-lg shadow-lg p-4 max-w-full md:max-w-lg lg:max-w-xl w-full h-auto overflow-auto">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4">Apply for {job.title}</h2>
        {message && (
          <div className="bg-green-100 text-green-800 p-4 mb-4 rounded">
            {message}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-4 overflow-y-auto max-h-[80vh]"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">First Name</label>
              <input
                type="text"
                className="border rounded w-full py-2 px-3"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Last Name</label>
              <input
                type="text"
                className="border rounded w-full py-2 px-3"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Gender</label>
              <select
                className="border rounded w-full py-2 px-3"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
              >
                <option value="">Select</option>
                <option value="0-1">Male</option>
                <option value="1-3">Female</option>
                <option value="3-5">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700">Date of Birth</label>
              <input
                type="date"
                className="border rounded w-full py-2 px-3"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                required
              />
            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                className="border rounded w-full py-2 px-3"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Apply For</label>
              <input
                type="text"
                className="border rounded w-full py-2 px-3"
                value={ApplyFor}
                onChange={(e) => setApplyfor(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Phone</label>
              <input
                type="tel"
                className="border rounded w-full py-2 px-3"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-700">
              Current or Previous Job Title
            </label>
            <input
              type="text"
              className="border rounded w-full py-2 px-3"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Permanent Address</label>
            <input
              type="text"
              className="border rounded w-full py-2 px-3"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">LinkedIn URL</label>
              <input
                type="url"
                className="border rounded w-full py-2 px-3"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Portfolio URL</label>
              <input
                type="url"
                className="border rounded w-full py-2 px-3"
                value={portfolio}
                onChange={(e) => setPortfolio(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Instagram URL</label>
              <input
                type="url"
                className="border rounded w-full py-2 px-3"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Twitter URL</label>
              <input
                type="url"
                className="border rounded w-full py-2 px-3"
                value={twitter}
                onChange={(e) => setTwitter(e.target.value)}
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-700">Profile Picture</label>
            <input
              type="file"
              className="border rounded w-full py-2 px-3"
              onChange={(e) => setProfilePicture(e.target.files[0])}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Resume</label>
            <input
              type="file"
              className="border rounded w-full py-2 px-3"
              onChange={(e) => setResume(e.target.files[0])}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Technical Skills</label>
            <input
              type="text"
              className="border rounded w-full py-2 px-3"
              value={technicalSkills}
              onChange={(e) => setTechnicalSkills(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Languages</label>
            <input
              type="text"
              className="border rounded w-full py-2 px-3"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Certifications</label>
            <input
              type="text"
              className="border rounded w-full py-2 px-3"
              value={certifications}
              onChange={(e) => setCertifications(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Years of Experience</label>
            <select
              className="border rounded w-full py-2 px-3"
              value={yearsOfExperience}
              onChange={(e) => setYearsOfExperience(e.target.value)}
              required
            >
              <option value="">Select</option>
              <option value="0-1">0-1 years</option>
              <option value="1-3">1-3 years</option>
              <option value="3-5">3-5 years</option>
              <option value="5-10">5-10 years</option>
              <option value="10+">10+ years</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700">Notice Period</label>
            <select
              className="border rounded w-full py-2 px-3"
              value={noticePeriod}
              onChange={(e) => setNoticePeriod(e.target.value)}
              required
            >
              <option value="">Select</option>
              <option value="Immediate">Immediate</option>
              <option value="1 month">1 month</option>
              <option value="2 months">2 months</option>
              <option value="3 months">3 months</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700">Current CTC</label>
            <select
              className="border rounded w-full py-2 px-3"
              value={currentCTC}
              onChange={(e) => setCurrentCTC(e.target.value)}
              required
            >
              <option value="">Select</option>
              <option value="0-5 LPA">0-5 LPA</option>
              <option value="5-10 LPA">5-10 LPA</option>
              <option value="10-15 LPA">10-15 LPA</option>
              <option value="15-20 LPA">15-20 LPA</option>
              <option value="20+ LPA">20+ LPA</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700">
              Additional Information
            </label>
            <textarea
              className="border rounded w-full py-2 px-3"
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Form submission Date</label>
            <input
              type="date"
              className="border rounded w-full py-2 px-3"
              value={FormSubmitDate}
              onChange={(e) => setFormSubmitDate(e.target.value)}
              required
            />
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ApplicationForm;
