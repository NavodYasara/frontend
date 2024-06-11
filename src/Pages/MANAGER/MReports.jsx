import React from "react";
import Sidebar from "../../Components/Sidebar";
import {
  Container,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import Navbar from "../../Components/Navbar/Navbar";

function Report() {
  // Sample data for reports
  const systemPerformanceData = [
    { metric: "Total Service Requests", value: 120 },
    { metric: "Completed Services", value: 100 },
    { metric: "Pending Services", value: 15 },
    { metric: "Rejected Services", value: 5 },
    { metric: "Average Completion Time", value: "3 days" },
  ];

  const paymentData = [
    {
      caretaker: "John Doe",
      period: "01-06-2024 to 15-06-2024",
      total: "$500",
    },
    {
      caretaker: "Jane Smith",
      period: "10-06-2024 to 20-06-2024",
      total: "$700",
    },
    {
      caretaker: "Alice Johnson",
      period: "05-06-2024 to 12-06-2024",
      total: "$450",
    },
  ];

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
            <Typography variant="h4" gutterBottom>
              Overall System Performance Report
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Metric</TableCell>
                    <TableCell align="right">Value</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {systemPerformanceData.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {row.metric}
                      </TableCell>
                      <TableCell align="right">{row.value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Typography variant="h4" gutterBottom style={{ marginTop: "40px" }}>
              Payment Report
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Caretaker</TableCell>
                    <TableCell align="right">Service Period</TableCell>
                    <TableCell align="right">Total Payment</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paymentData.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {row.caretaker}
                      </TableCell>
                      <TableCell align="right">{row.period}</TableCell>
                      <TableCell align="right">{row.total}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Container>
        </div>
      </div>
    </div>
  );
}

export default Report;


// Report.js (frontend)

// import React, { useState, useEffect } from 'react';
// import {
//   Container,
//   Typography,
//   TableContainer,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   Paper,
// } from '@mui/material';
// import Sidebar from '../../Components/Sidebar';
// import Navbar from '../../Components/Navbar/Navbar';

// function Report() {
//   const [systemPerformanceData, setSystemPerformanceData] = useState([]);

//   useEffect(() => {
//     fetchSystemPerformance();
//   }, []);

//   const fetchSystemPerformance = async () => {
//     try {
//     const response = await fetch(
//       "http://localhost:5000/api/report/system-performance"
//     );
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       const data = await response.json();
//       setSystemPerformanceData(data);
//     } catch (error) {
//       console.error('Error fetching system performance data:', error);
//     }
//   };

//   // Sample payment data (unchanged)

//   return (
//     <div style={{ display: 'flex' }}>
//       <Sidebar />
//       <div style={{ flex: 1 }}>
//         <Navbar />
//         <div className="mgd-main" style={{ padding: '20px' }}>
//           <Container fluid>
//             <Typography variant="h4" gutterBottom>
//               Overall System Performance Report
//             </Typography>
//             <TableContainer component={Paper}>
//               <Table>
//                 <TableHead>
//                   <TableRow>
//                     <TableCell>Metric</TableCell>
//                     <TableCell align="right">Value</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {systemPerformanceData.map((row, index) => (
//                     <TableRow key={index}>
//                       <TableCell component="th" scope="row">
//                         {row.metric}
//                       </TableCell>
//                       <TableCell align="right">{row.value}</TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>

//             {/* Remaining code for payment report (unchanged) */}
//           </Container>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Report;
