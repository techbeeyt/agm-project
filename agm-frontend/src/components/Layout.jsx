import React from "react";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="">
      <div className="fixed top-0 left-0 h-[100vh] w-[260px] shadow-md">
        <Sidebar />
      </div>
      <div className="pl-[260px]">{children}</div>
    </div>
  );
};

export default Layout;
