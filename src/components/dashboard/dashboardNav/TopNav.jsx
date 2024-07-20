import React from 'react';
import { AiFillBell } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import logo from '../../../assets/logo.png'
const TopNav = ( ) => {
  const navigate = useNavigate();

  return (
    <div className=" fixed bg-white shadow-md p-.5 flex justify-between items-center z-10 top-0 left-0 right-0">
      
      <Link to={'/dashboard'}>
                    <div className="p-.5">
                        <img src={logo} alt="ColoredCow Logo" className="h-10 w-32 mb-8 mx-auto" />
                    </div>
                </Link>      <div className="flex items-center">
        <button className="relative mr-4">
          <AiFillBell />
          <span className="absolute top-0 right-0 h-2 w-2 bg-red-600 rounded-full"></span>
        </button>
        <button
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105"
          onClick={() => navigate('/post-job')}
        >
          + Post a job
        </button>
      </div>
    </div>
  );
};

export default TopNav;
