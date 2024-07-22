import React from "react";
import logo from "../../assets/logo.png";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200 py-12">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row justify-between">
        <div className="mb-8 lg:mb-0 lg:w-1/4">
          <img
            src={logo}
            alt="ColoredCow Logo"
            className="h-12 w-auto mr-2 mb-4 lg:mb-0"
          />
          <h1 className="text-2xl font-bold text-white mb-4">ColoredCow</h1>
          <p className="text-gray-400">
            Great platform for the job seeker that passionate about startups.
            Find your dream job easier.
          </p>
        </div>
        <div className="lg:w-1/4 mb-8 lg:mb-0">
          <h2 className="text-white font-bold mb-4">About</h2>
          <ul className="text-gray-400 space-y-2">
            <li>
              <a href="#">Company</a>
            </li>
            <li>
              <a href="#">Pricing</a>
            </li>
            <li>
              <a href="#">Terms</a>
            </li>
            <li>
              <a href="#">Advice</a>
            </li>
            <li>
              <a href="#">Privacy Policy</a>
            </li>
          </ul>
        </div>
        <div className="lg:w-1/4 mb-8 lg:mb-0">
          <h2 className="text-white font-bold mb-4">Resources</h2>
          <ul className="text-gray-400 space-y-2">
            <li>
              <a href="#">Help Docs</a>
            </li>
            <li>
              <a href="#">Guide</a>
            </li>
            <li>
              <a href="#">Updates</a>
            </li>
            <li>
              <a href="#">Contact Us</a>
            </li>
          </ul>
        </div>
        <div className="lg:w-1/4">
          <h2 className="text-white font-bold mb-4">Get job notifications</h2>
          <p className="text-gray-400 mb-4">
            The latest job news, articles, sent to your inbox weekly.
          </p>
          <div className="flex flex-col sm:flex-row">
            <input
              type="email"
              placeholder="Email Address"
              className="bg-gray-800 text-gray-200 placeholder-gray-400 py-2 px-4 rounded-t sm:rounded-l sm:rounded-t-none focus:outline-none"
            />
            <button className="bg-indigo-600 text-white py-2 px-4 rounded-b sm:rounded-r sm:rounded-b-none">
              Subscribe
            </button>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-8 pt-6">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 mb-4 md:mb-0">
            &copy; 2024 @ ColoredCow. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <i className="fab fa-dribbble"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <i className="fab fa-twitter"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
