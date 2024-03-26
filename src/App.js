import react from 'react'
import './App.css'
import Home from './Pages/Home'
import {Routes, Route, BrowserRouter} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Register from "./Pages/Register";
import Navbar from './Components/Navbar/Navbar'
import Login from './Pages/Login'
import TestRegister from './Pages/Register'
 



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
                <Route path="/TestRegister.jsx" element={<TestRegister/>} />
                <Route path="/Login.jsx" element={<Login/>} />
            </Routes>
        </BrowserRouter>
        
    );
}

export default App;

