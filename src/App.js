import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './Pages/Home'
import Register from "./Pages/Register";
import Navbar from './Components/Navbar/Navbar'
import Login from './Pages/Login'
import AdminDashboard from './Pages/ADMIN/AdminDashboard'
import CaretakerDashboard from './Pages/CARETAKER/CaretakerDashboard'
import Careplan from './Pages/CARETAKER/Careplan.jsx'
import ViewCaregiver from './Pages/CARETAKER/ViewCaregiver.jsx' 


function App() {

    return (

        <BrowserRouter>
            <div>
                <Navbar/>
            </div>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/Home" element={<Home/>} />
                <Route path="/Register" element={<Register/>} />
                <Route path="/Login" element={<Login/>} />

                <Route path="AdminDashboard" element={<AdminDashboard/>} />
                <Route path="CaretakerDashboard" element={<CaretakerDashboard/>} />
                <Route path="Careplan" element={<Careplan/>} />
                <Route path="ViewCaregiver" element={<ViewCaregiver/>} />
            </Routes>
        </BrowserRouter>
        
    );
}

export default App;

