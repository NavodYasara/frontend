import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import "../App.css";
import Sidebar from "../Components/Sidebar";

function Layout() {
  return (
    <>
      <div>
        <div className="navbar-part">
          <Navbar/>
        </div>
        <div className="page-part">
          <div className="sidebar-part">
            <Sidebar />
          </div>
          <div className="content-part">
            {/* Content goes here */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Layout;


