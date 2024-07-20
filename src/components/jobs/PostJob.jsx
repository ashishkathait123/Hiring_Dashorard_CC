import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'tailwindcss/tailwind.css';

function JobPost() {
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [type, setType] = useState('Full-Time');
    const [description, setDescription] = useState('');
    const [responsibilities, setResponsibilities] = useState('');
    const [whoYouAre, setWhoYouAre] = useState('');
    const [niceToHaves, setNiceToHaves] = useState('');
    const [perksBenefits, setPerksBenefits] = useState('');
    const [categories, setCategories] = useState('');
    const [applyBefore, setApplyBefore] = useState('');
    const [salary, setSalary] = useState('');
    const [postDate, setPostDate] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/v1/jobs', {
                title,
                location,
                type,
                description,
                responsibilities,
                whoYouAre,
                niceToHaves,
                perksBenefits,
                categories,
                applyBefore,
                salary,
                postDate,
                dueDate,
            });
            setMessage('Job posted successfully');
            navigate('/');
        } catch (error) {
            setMessage(error.response?.data?.message || 'Job post failed');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-10">
            <h1 className="text-3xl font-semibold mb-4 text-center">Post a New Job</h1>
            <form onSubmit={handleSubmit} className="bg-white p-10 rounded-lg shadow-md max-w-4xl mx-auto">
                {/* Job Title */}
                <div className="mb-4">
                    <label className="block mb-2 text-gray-600" htmlFor="title">Job Title</label>
                    <input className="w-full px-4 py-2 border rounded-lg" type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter job title" />
                </div>
                {/* Location */}
                <div className="mb-4">
                    <label className="block mb-2 text-gray-600" htmlFor="location">Location</label>
                    <input className="w-full px-4 py-2 border rounded-lg" type="text" id="location" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Enter job location" />
                </div>
                {/* Job Type */}
                <div className="mb-4">
                    <label className="block mb-2 text-gray-600" htmlFor="type">Job Type</label>
                    <select className="w-full px-4 py-2 border rounded-lg" id="type" value={type} onChange={(e) => setType(e.target.value)}>
                        <option value="Full-Time">Full-Time</option>
                        <option value="Part-Time">Part-Time</option>
                        <option value="Intern">Intern</option>
                    </select>
                </div>
                {/* Description */}
                <div className="mb-4">
                    <label className="block mb-2 text-gray-600" htmlFor="description">Description</label>
                    <textarea className="w-full px-4 py-2 border rounded-lg" id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter job description"></textarea>
                </div>
                {/* Responsibilities */}
                <div className="mb-4">
                    <label className="block mb-2 text-gray-600" htmlFor="responsibilities">Responsibilities</label>
                    <textarea className="w-full px-4 py-2 border rounded-lg" id="responsibilities" value={responsibilities} onChange={(e) => setResponsibilities(e.target.value)} placeholder="Enter job responsibilities"></textarea>
                </div>
                {/* Who You Are */}
                <div className="mb-4">
                    <label className="block mb-2 text-gray-600" htmlFor="whoYouAre">Who You Are</label>
                    <textarea className="w-full px-4 py-2 border rounded-lg" id="whoYouAre" value={whoYouAre} onChange={(e) => setWhoYouAre(e.target.value)} placeholder="Enter who you are"></textarea>
                </div>
                {/* Nice-To-Haves */}
                <div className="mb-4">
                    <label className="block mb-2 text-gray-600" htmlFor="niceToHaves">Nice-To-Haves</label>
                    <textarea className="w-full px-4 py-2 border rounded-lg" id="niceToHaves" value={niceToHaves} onChange={(e) => setNiceToHaves(e.target.value)} placeholder="Enter nice-to-haves"></textarea>
                </div>
                {/* Perks & Benefits */}
                <div className="mb-4">
                    <label className="block mb-2 text-gray-600" htmlFor="perksBenefits">Perks & Benefits</label>
                    <textarea className="w-full px-4 py-2 border rounded-lg" id="perksBenefits" value={perksBenefits} onChange={(e) => setPerksBenefits(e.target.value)} placeholder="Enter perks and benefits"></textarea>
                </div>
                {/* Categories */}
                <div className="mb-4">
                    <label className="block mb-2 text-gray-600" htmlFor="categories">Categories</label>
                    <input className="w-full px-4 py-2 border rounded-lg" type="text" id="categories" value={categories} onChange={(e) => setCategories(e.target.value)} placeholder="Enter job categories" />
                </div>
                {/* Apply Before */}
                <div className="mb-4">
                    <label className="block mb-2 text-gray-600" htmlFor="applyBefore">Apply Before</label>
                    <input className="w-full px-4 py-2 border rounded-lg" type="date" id="applyBefore" value={applyBefore} onChange={(e) => setApplyBefore(e.target.value)} />
                </div>
                {/* Salary */}
                <div className="mb-4">
                    <label className="block mb-2 text-gray-600" htmlFor="salary">Salary</label>
                    <input className="w-full px-4 py-2 border rounded-lg" type="text" id="salary" value={salary} onChange={(e) => setSalary(e.target.value)} placeholder="Enter salary range" />
                </div>
                {/* Post Date */}
                <div className="mb-4">
                    <label className="block mb-2 text-gray-600" htmlFor="postDate">Post Date</label>
                    <input className="w-full px-4 py-2 border rounded-lg" type="date" id="postDate" value={postDate} onChange={(e) => setPostDate(e.target.value)} />
                </div>
               
                <button type="submit" className="w-full py-2 text-white bg-indigo-600 rounded-lg hover:text-black">Post Job</button>
                {message && <p className="mt-4 text-center text-red-600">{message}</p>}
            </form>
        </div>
    );
}

export default JobPost;
