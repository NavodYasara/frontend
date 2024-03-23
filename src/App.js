import './App.css'
import Home from './Pages/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import Register from "./Pages/Register";
import Navbar from './Components/Navbar/Navbar'

function App() {
    return (
        <div className="App">
            <Navbar/>
            <Home/>
        </div>
    );
}

export default App;