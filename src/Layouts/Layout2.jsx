import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar/Navbar";

const Layout2 = () => {
  
   const getUserfromLocalStorage = localStorage.getItem("userDetails")
    ? JSON.parse(localStorage.getItem("userDetails"))
    : null;
  return (
    <div style={{ display: "flex" }}>
      <Sidebar userType={getUserfromLocalStorage.userType} />
      <div style={{ flex: 1 }}>
        <Navbar />
        <div className="mgd-main" style={{ padding: "20px" }}>
          <Container fluid>

            {/* Content here */}


          </Container>
        </div>
        
      </div>
    </div>
  );
};

export default Layout2;
