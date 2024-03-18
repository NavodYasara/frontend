import './App.css'
import Home from './Pages/Home'
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