import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Table, Dropdown, Card } from "react-bootstrap";
import Sidebar from "../../Components/Sidebar";
import Navbar from "../../Components/Navbar/Navbar"; 

const Layout2 = () => {
  
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
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
