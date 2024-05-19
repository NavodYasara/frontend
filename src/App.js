import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./Components/Sidebar";

import Home from "./Pages/Home";
import Register from "./Pages/Register";
import Login from "./Pages/Login";

import Layout2 from "./Layouts/Layout2";

import AccDashboard from "./Pages/ACCOUNTANT/AccDashboard";

import AdminDashboard from "./Pages/ADMIN/AdminDashboard";
import ManageStaff from "./Pages/ADMIN/ManageStaff";

import CaregiverDashboard from "./Pages/CAREGIVER/CaregiverDashboard";
import CaregiverProfile from "./Pages/CAREGIVER/CaregiverProfile";

import CaretakerDashboard from "./Pages/CARETAKER/CaretakerDashboard";
import Report from "./Pages/CARETAKER/Report";
import CtRequirement from "./Pages/CARETAKER/CtRequirement";
import Payment from "./Pages/CARETAKER/Payment";

import ManagerDashboard from "./Pages/MANAGER/ManagerDashboard";
import Careplan from "./Pages/MANAGER/Careplan";


function App() {
  // userType is obtained from some authentication mechanism
  const [userType, setUserType] = useState("manager");

  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="Home" element={<Home />} />
        <Route path="Register" element={<Register />} />
        <Route path="Login" element={<Login />} />

        <Route path="Layout2" element={<Layout2/>} />

        <Route path="AccDashboard" element={<AccDashboard />} />

        <Route path="AdminDashboard" element={<AdminDashboard />} />
        <Route path="ManageStaff" element={<ManageStaff/>} />

        <Route path="CaregiverDashboard" element={<CaregiverDashboard />} />
        <Route path="CaregiverProfile" element={<CaregiverProfile />} />

        <Route path="CtRequirement" element={<CtRequirement />} />
        <Route path="Careplan" element={<Careplan />} />
        <Route path="CaretakerDashboard" element={<CaretakerDashboard />} />
        <Route path="Report" element={<Report />} />
        <Route path="Payment" element={<Payment />} />

        <Route path="ManagerDashboard" element={<ManagerDashboard />} />

        {/* Pass userType to Sidebar */}
        <Route path="*" element={<Sidebar userType={userType} />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;

