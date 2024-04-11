import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-full flex flex-col justify-start items-start">
      <div className="px-6 text-xl font-semibold text-green-600 py-6">
        AgM Project
      </div>

      <div className="w-full">
        <Link to="/">
          <div className="w-full px-4 py-2 hover:bg-gray-100 cursor-pointer">
            Dashboard
          </div>
        </Link>
        <Link to="/users">
          <div className="w-full px-4 py-2 hover:bg-gray-100 cursor-pointer">
            User
          </div>
        </Link>
        <Link to="/">
          <div className="w-full px-4 py-2 hover:bg-gray-100 cursor-pointer">
            Scheme
          </div>
        </Link>
        <Link to="/data">
          <div className="w-full px-4 py-2 hover:bg-gray-100 cursor-pointer">
            Data
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
