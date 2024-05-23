import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./Components/Sidebar";

import Home from "./Pages/Home";
import Register from "./Pages/Register";
import Login from "./Pages/Login";

import Layout2 from "./Layouts/Layout2";
import MUI from "./Layouts/MUI";

import AdminDashboard from "./Pages/ADMIN/AdminDashboard";
import ManageStaff from "./Pages/ADMIN/ManageStaff";

import CaregiverDashboard from "./Pages/CAREGIVER/CaregiverDashboard";
import CaregiverProfile from "./Pages/CAREGIVER/CaregiverProfile";

import CaretakerDashboard from "./Pages/CARETAKER/CaretakerDashboard";
import Report from "./Pages/CARETAKER/Report";
import CtRequirement from "./Pages/CARETAKER/CtRequirement";
import Payment from "./Pages/CARETAKER/Payment";
import Feedback from "./Pages/CARETAKER/Feedback";

import ManagerDashboard from "./Pages/MANAGER/ManagerDashboard";
import Careplan from "./Pages/MANAGER/Careplan";
import { useEffect } from "react";


function App() {
  
  
  const [userType1, setUserType] = useState("");
  // userType is obtained from local storage
  useEffect(() => {
    const userTypeFromStorage = localStorage.getItem("userDetails");
    if (userTypeFromStorage) {
      setUserType(userTypeFromStorage.userType);
      console.log(userType1);
    }
  }, []);

  

  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="Home" element={<Home />} />
        <Route path="Register" element={<Register />} />
        <Route path="Login" element={<Login />} />

        <Route path="Layout2" element={<Layout2/>} />
        <Route path="MUI" element={<MUI/>} />

        <Route path="AdminDashboard" element={<AdminDashboard />} />
        <Route path="ManageStaff" element={<ManageStaff/>} />

        <Route path="CaregiverDashboard" element={<CaregiverDashboard />} />
        <Route path="CaregiverProfile" element={<CaregiverProfile />} />

        <Route path="CtRequirement" element={<CtRequirement />} />
        <Route path="Careplan" element={<Careplan />} />
        <Route path="CaretakerDashboard" element={<CaretakerDashboard />} />
        <Route path="Report" element={<Report />} />
        <Route path="Payment" element={<Payment />} />
        <Route path="Feedback" element={<Feedback />} />

        <Route path="ManagerDashboard" element={<ManagerDashboard />} />
        <Route path="Careplan" element={<Careplan />} />
        

        {/* Pass userType to Sidebar */}
        <Route path="*" element={<Sidebar userType={userType1} />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;

