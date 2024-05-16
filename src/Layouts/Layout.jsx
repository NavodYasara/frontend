import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar/Navbar";
import "../App.css";
import Sidebar from "../Components/Sidebar";

function Layout() {
  
  const [isFixed, setIsFixed] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY >= 100) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function toggleSidebar() {
    setIsSidebarOpen(!isSidebarOpen);
  }

  return (
    <>
      <div className="main">
        <div className={`navbar-part ${isFixed ? 'fixed' : ''}`}>
          <Navbar/>
        </div>
        <div className="row page-part">
          <div className={`col-2 sidebar-part ${isSidebarOpen ? 'open' : ''}`}>
            <Sidebar/>
          </div>
          <div className="col-10 content-part">
            {/* Content goes here */}
            
            <div style={{ height: "2000px", overflow: "auto", padding: "20px" }}>
             

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Layout;
