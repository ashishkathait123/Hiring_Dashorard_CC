import React from "react";
import grpImg from "../../assets/grp.jpeg";
import PImg from "../../assets/prateek.png";
import PokhiImg from "../../assets/Pokhi.png";
import KalaImg from "../../assets/Kala.png";
import VaibhavImg from "../../assets/vaibhav.png";
import HTML from "../../assets/HTML.png";
import CSS from "../../assets/css.png";
import JS from "../../assets/js.png";
import REACT from "../../assets/react.png";
import PHP from "../../assets/php.png";

import { Link, Navigate } from "react-router-dom";
import "tailwindcss/tailwind.css";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
function Comapny() {
  return (
    <>
      <div className="p-6 bg-gray-100 min-h-screen pt-1">
        <Navbar></Navbar>
        <div className="grid grid-cols-1 mt-3 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="col-span-1 lg:col-span-2 bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">Company Profile</h2>
            <p>
              ColoredCow is a problem-solving company; we solve business
              problems through technology. We center the solutions around our
              clients and the people their business affects.
            </p>
            <div className="mt-4 flex">
              <div className="mr-6">
                <div className="text-sm text-gray-500">Founded</div>
                <div>July 31, 2011</div>
              </div>
              <div className="mr-6">
                <div className="text-sm text-gray-500">Employees</div>
                <div>100+</div>
              </div>
              <div className="mr-6">
                <div className="text-sm text-gray-500">Location</div>
                <div>India</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">Tech Stack</h2>
            <div className="grid grid-cols-3 gap-4 bg-white p-6  shadow col-span-1">
              <div className="text-center shadow-lg scale-105 ">
                <img src={HTML} alt=""></img>
                <span></span>HTML 5
              </div>
              <div className="text-center shadow-lg scale-105 item-center">
                <img src={CSS} alt=""></img>
                <span
                  className="font-semibold
"
                >
                  CSS 3
                </span>
              </div>
              <div className="text-center shadow-lg scale-105">
                <img src={JS}></img>
                <span
                  className="font-semibold
"
                >
                  JavaScript
                </span>
              </div>

              <div className="text-center shadow-lg scale-105">
                <img src={REACT} alt="" className="bg-blend-screen"></img>
                <span
                  className="font-semibold
"
                >
                  React
                </span>
              </div>

              <div className="text-center shadow-lg scale-105">
                <img src="{PImg}"></img>
                <span
                  className="font-semibold
"
                >
                  Mixpanel
                </span>
              </div>

              <div className="text-center shadow-lg scale-105">
                <img src={PHP}></img>
                <span
                  className="font-semibold
"
                >
                  PHP
                </span>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow col-span-1 lg:col-span-2 ">
            <h2 className="text-2xl font-semibold mb-4">Contact</h2>
            <div className="flex flex-wrap">
              <div className="w-1/2 p-2 ">
                <a
                  href="https://twitter.com/ColoredCow"
                  className="block bg-white p-2 rounded ring-offset-2 ring-2 tranfrom transition-transfrom duration-300 hover:scale-105 ml-2 mr-2"
                >
                  Twitter
                </a>
              </div>
              <div className="w-1/2 p-2">
                <a
                  href="https://facebook.com/ColoredCow"
                  className="block bg-white p-2 rounded ring-offset-2 ring-2 tranfrom transition-transfrom duration-300 hover:scale-105 ml-2 mr-2"
                >
                  Facebook
                </a>
              </div>
              <div className="w-1/2 p-2">
                <a
                  href="https://linkedin.com/company/coloredcow"
                  className="block bg-white p-2 rounded ring-offset-2 ring-2 tranfrom transition-transfrom duration-300 hover:scale-105 ml-2 mr-2"
                >
                  LinkedIn
                </a>
              </div>
              <div className="w-1/2 p-2">
                <a
                  href="mailto:coloredcow@gmail.com"
                  className="block bg-white p-2 rounded ring-offset-2 ring-2 tranfrom transition-transfrom duration-300 hover:scale-105 ml-2 mr-2"
                >
                  Email
                </a>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">Office Locations</h2>
            <ul>
              <li>Gurgram, India</li>
              <li>New Delhi, India</li>
              <li>New Tehri, Uttarakhand, India</li>
              <li>Dwarahat, Uttarakhand, India</li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-lg shadow col-span-1 lg:col-span-2">
            <h2 className="text-2xl font-semibold mb-4">
              Working at ColoreCow
            </h2>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <img
                  src={grpImg}
                  alt="Working at Nomad"
                  className="w-full rounded"
                />
              </div>
              <div>
                <img
                  src="/path/to/image2.jpg"
                  alt="Working at Nomad"
                  className="w-full rounded"
                />
              </div>
              <div>
                <img
                  src="/path/to/image3.jpg"
                  alt="Working at Nomad"
                  className="w-full rounded"
                />
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow col-span-1 lg:col-span-2">
            <h2 className="text-2xl font-semibold mb-4">Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center shadow-lg scale-105">
                <img
                  src={PImg}
                  alt="Member 1"
                  className="w-24 h-24 rounded-full mx-auto"
                />
                <div>
                  <span
                    className="font-semibold
"
                  >
                    Prateek Narang
                  </span>
                </div>
                <div>CEO & Founder</div>
              </div>
              <div className="text-center shadow-lg scale-105">
                <img
                  src={VaibhavImg}
                  alt="Member 2"
                  className="w-24 h-24 rounded-full mx-auto"
                />
                <div>
                  <span
                    className="font-semibold
"
                  >
                    Vaibhav Rathore
                  </span>{" "}
                </div>
                <div>Full-Stack Developer</div>
              </div>
              <div className="text-center shadow-lg scale-105">
                <img
                  src={PokhiImg}
                  alt="Member 3"
                  className="w-24 h-24 rounded-full mx-auto"
                />
                <div>
                  <span
                    className="font-semibold
"
                  >
                    Abhishek Pokhriyal
                  </span>{" "}
                </div>
                <div>Software Engineer</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow col-span-1 lg:col-span-2">
            <h2 className="text-2xl font-semibold mb-4">Benefits</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4">
                <div className="font-semibold">Full Healthcare</div>
                <p>
                  We believe in thriving communities and that starts with our
                  team being happy and healthy.
                </p>
              </div>
              <div className="p-4">
                <div className="font-semibold">Unlimited Vacation</div>
                <p>
                  We believe you should have a flexible schedule that makes
                  space for family, wellness, and fun.
                </p>
              </div>
              <div className="p-4">
                <div className="font-semibold">Skill Development</div>
                <p>
                  We believe in always learning and leveling up our skills.
                  Whether it's a conference or online course.
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow col-span-1 lg:col-span-2">
            <h2 className="text-2xl font-semibold mb-4">Open Positions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-100 p-4 rounded-lg">
                <div className="font-semibold">Social Media Assistant</div>
                <div>Nomad, Paris, France</div>
                <div className="text-sm">Full-Time, Marketing, Design</div>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <div className="font-semibold">Brand Designer</div>
                <div>Dropbox, San Francisco, USA</div>
                <div className="text-sm">Full-Time, Marketing, Design</div>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <div className="font-semibold">Interactive Developer</div>
                <div>Terraform, Hamburg, Germany</div>
                <div className="text-sm">Full-Time, Marketing, Design</div>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <div className="font-semibold">HR Manager</div>
                <div>Packer, Lucern, Switzerland</div>
                <div className="text-sm">Full-Time, Marketing, Design</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}
export default Comapny;
