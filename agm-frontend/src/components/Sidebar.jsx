import React from "react";
import { Link } from "react-router-dom";
// Import Icons
import { LuLayoutDashboard } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa";
import { GoDatabase } from "react-icons/go";

const Sidebar = () => {
  return (
    <div className="w-full flex flex-col justify-start items-start">
      <div className="flex justify-center items-center text-xl font-semibold text-green-600 py-4 w-full">
        AgM Project
      </div>

      <div className="w-full">
        <Link to="/">
          <div className="w-full px-4 py-2 hover:bg-gray-100 cursor-pointer flex justify-start items-center gap-3 border-y border-gray-200">
            <LuLayoutDashboard /> Dashboard
          </div>
        </Link>
        <Link to="/" onClick={(e) => e.preventDefault()}>
          <div className="w-full px-4 py-2 hover:bg-gray-100 cursor-pointer flex justify-start items-center gap-3 border-b border-gray-200 cursor-not-allowed opacity-80">
            <FaRegUser />
            Users
          </div>
        </Link>
        <Link to="/data">
          <div className="w-full px-4 py-2 hover:bg-gray-100 cursor-pointer flex justify-start items-center gap-3 border-b border-gray-200">
            <GoDatabase /> Data
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
