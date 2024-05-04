
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './Pages/Home'
import Navbar from './Components/Navbar/Navbar'
import Register from "./Pages/Register";
import Login from './Pages/Login'

import AccDashboard from './Pages/ACCOUNTANT/AccDashboard.jsx'

import AdminDashboard from './Pages/ADMIN/AdminDashboard'
import UserManagement from './Pages/ADMIN/UserManagement'

import Appoinment from './Pages/CAREGIVER/Appointment.jsx'
import CaregiverDashboard from './Pages/CAREGIVER/CaregiverDashboard.jsx'
import CaregiverProfile from './Pages/CAREGIVER/CaregiverProfile.jsx'

import CaregiverDetail from './Pages/CARETAKER/CaregiverDetail.jsx'
import Careplan from './Pages/CARETAKER/Careplan.jsx'
import CaretakerDashboard from './Pages/CARETAKER/CaretakerDashboard'
import Report from './Pages/CARETAKER/Report.jsx'

import CreateCareplan from './Pages/MANAGER/CreateCareplan.jsx'
import ManagerDashboard from './Pages/MANAGER/ManagerDashboard.jsx'


function App() {

    return (

        <BrowserRouter>
            <div>
                <Navbar/>
            </div>

            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="Home" element={<Home/>} />
                <Route path="Register" element={<Register/>} />
                <Route path="Login" element={<Login/>} />
                
                <Route path="AccDashboard" element={<AccDashboard/>} />

                <Route path="AdminDashboard" element={<AdminDashboard/>} />
                <Route path="UserManagement" element={<UserManagement/>} />

                <Route path="Appoinment" element={<Appoinment/>} />
                <Route path="CaregiverDashboard" element={<CaregiverDashboard/>} />
                <Route path="CaregiverProfile" element={<CaregiverProfile/>} />
                
                <Route path="CaregiverDetail" element={<CaregiverDetail/>} />
                <Route path="Careplan" element={<Careplan/>} />
                <Route path="CaretakerDashboard" element={<CaretakerDashboard/>} />
                <Route path="Report" element={<Report/>} />

                <Route path="CreateCareplan" element={<CreateCareplan/>} />
                <Route path="ManagerDashboard" element={<ManagerDashboard/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;



////////////////////////////////////////////////////////////////////////////////////////////////////////

// import React from 'react'
// import 'bootstrap/dist/css/bootstrap.min.css'
// import { BrowserRouter, Routes, Route } from 'react-router-dom';

// import Home from './Pages/Home'
// import Navbar from './Components/Navbar/Navbar'
// import Register from "./Pages/Register";
// import Login from './Pages/Login'

// import AccDashboard from './Pages/ACCOUNTANT/AccDashboard.jsx'

// import AdminDashboard from './Pages/ADMIN/AdminDashboard'
// import UserManagement from './Pages/ADMIN/UserManagement'

// import Appoinment from './Pages/CAREGIVER/Appointment.jsx'
// import CaregiverDashboard from './Pages/CAREGIVER/CaregiverDashboard.jsx'
// import CaregiverProfile from './Pages/CAREGIVER/CaregiverProfile.jsx'

// import CaregiverDetail from './Pages/CARETAKER/CaregiverDetail.jsx'
// import Careplan from './Pages/CARETAKER/Careplan.jsx'
// import CaretakerDashboard from './Pages/CARETAKER/CaretakerDashboard'
// import Report from './Pages/CARETAKER/Report.jsx'

// import CreateCareplan from './Pages/MANAGER/CreateCareplan.jsx'
// import ManagerDashboard from './Pages/MANAGER/ManagerDashboard.jsx'


// function App() {

//     return (

//         <BrowserRouter>
//             <div>
//                 <Navbar/>
//             </div>

//             <Routes>
//                 <Route path="/" element={<Home/>} />
//                 <Route path="Home" element={<Home/>} />
//                 <Route path="Register" element={<Register/>} />
//                 <Route path="Login" element={<Login/>} />
                
//                 <Route path="AccDashboard" element={<AccDashboard/>} />

//                 <Route path="AdminDashboard" element={<AdminDashboard/>} />
//                 <Route path="UserManagement" element={<UserManagement/>} />

//                 <Route path="Appoinment" element={<Appoinment/>} />
//                 <Route path="CaregiverDashboard" element={<CaregiverDashboard/>} />
//                 <Route path="CaregiverProfile" element={<CaregiverProfile/>} />
                
//                 <Route path="CaregiverDetail" element={<CaregiverDetail/>} />
//                 <Route path="Careplan" element={<Careplan/>} />
//                 <Route path="CaretakerDashboard" element={<CaretakerDashboard/>} />
//                 <Route path="Report" element={<Report/>} />

//                 <Route path="CreateCareplan" element={<CreateCareplan/>} />
//                 <Route path="ManagerDashboard" element={<ManagerDashboard/>} />



//             </Routes>
//         </BrowserRouter>

//     );
// }

// export default App;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

