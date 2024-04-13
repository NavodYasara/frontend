import React from 'react'
import './App.css'
import Home from './Pages/Home'
import {Routes, Route, BrowserRouter} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Register from "./Pages/Register";
import Navbar from './Components/Navbar/Navbar'
import Login from './Pages/Login'
import AdminDashboard from './Pages/ADMIN/AdminDashboard'
import CaretakerDashboard from './Pages/CARETAKER/CaretakerDashboard'
 

function App() {

    
    return (

        <BrowserRouter>
            <div>
                <Navbar/>
            </div>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/src/Pages/Home.jsx" element={<Home/>} />
                <Route path="/register.jsx" element={<Register/>} />
                <Route path="/Login.jsx" element={<Login/>} />

                <Route path="/src/Pages/AdminDashboard.jsx" element={<AdminDashboard/>} />
                <Route path="/src/Pages/CaretakerDashboard.jsx" element={<CaretakerDashboard/>} />
            </Routes>
        </BrowserRouter>
        
    );
}

export default App;

