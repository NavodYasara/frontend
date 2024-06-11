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

// Sample data for caretaker details and service requests
const caretakerDetails = {
  name: "John Doe",
  address: "123 Main St, Springfield",
  mobileNumber: "555-1234",
  birthDate: "01-01-1960",
  age: 64,
  medicareNumber: "ABC12345",
  medicalConditions: "Diabetes, Hypertension",
};

const serviceRequests = [
  {
    servicePeriod: "01-06-2024 to 15-06-2024",
    status: "Completed",
    caregiver: "Jane Smith",
  },
  {
    servicePeriod: "20-06-2024 to 30-06-2024",
    status: "Approved",
    caregiver: "Michael Johnson",
  },
];

function CaretakerReport() {
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
              Caretaker Report
            </Typography>
            <Typography variant="h5" gutterBottom>
              Caretaker Details
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>{caretakerDetails.name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Address</TableCell>
                    <TableCell>{caretakerDetails.address}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Mobile Number</TableCell>
                    <TableCell>{caretakerDetails.mobileNumber}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Birth Date</TableCell>
                    <TableCell>{caretakerDetails.birthDate}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Age</TableCell>
                    <TableCell>{caretakerDetails.age}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Medicare Number</TableCell>
                    <TableCell>{caretakerDetails.medicareNumber}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Medical Conditions</TableCell>
                    <TableCell>{caretakerDetails.medicalConditions}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            <Typography variant="h5" gutterBottom style={{ marginTop: "40px" }}>
              Service Requests
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Service Period</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Caregiver</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {serviceRequests.map((request, index) => (
                    <TableRow key={index}>
                      <TableCell>{request.servicePeriod}</TableCell>
                      <TableCell>{request.status}</TableCell>
                      <TableCell>{request.caregiver}</TableCell>
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

export default CaretakerReport;

// import React from "react";
// import Sidebar from "../../Components/Sidebar";
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
// } from "@mui/material";
// import Navbar from "../../Components/Navbar/Navbar";

// function Report() {
//   // Sample data for reports
//   const systemPerformanceData = [
//     { metric: "Total Service Requests", value: 120 },
//     { metric: "Completed Services", value: 100 },
//     { metric: "Pending Services", value: 15 },
//     { metric: "Rejected Services", value: 5 },
//     { metric: "Average Completion Time", value: "3 days" },
//   ];

//   const paymentData = [
//     {
//       caretaker: "John Doe",
//       period: "01-06-2024 to 15-06-2024",
//       total: "$500",
//     },
//     {
//       caretaker: "Jane Smith",
//       period: "10-06-2024 to 20-06-2024",
//       total: "$700",
//     },
//     {
//       caretaker: "Alice Johnson",
//       period: "05-06-2024 to 12-06-2024",
//       total: "$450",
//     },
//   ];

//   const getUserfromLocalStorage = localStorage.getItem("userDetails")
//     ? JSON.parse(localStorage.getItem("userDetails"))
//     : null;

//   return (
//     <div style={{ display: "flex" }}>
//       <Sidebar userType={getUserfromLocalStorage.userType} />
//       <div style={{ flex: 1 }}>
//         <Navbar />
//         <div className="mgd-main" style={{ padding: "20px" }}>
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

//             <Typography variant="h4" gutterBottom style={{ marginTop: "40px" }}>
//               Payment Report
//             </Typography>
//             <TableContainer component={Paper}>
//               <Table>
//                 <TableHead>
//                   <TableRow>
//                     <TableCell>Caretaker</TableCell>
//                     <TableCell align="right">Service Period</TableCell>
//                     <TableCell align="right">Total Payment</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {paymentData.map((row, index) => (
//                     <TableRow key={index}>
//                       <TableCell component="th" scope="row">
//                         {row.caretaker}
//                       </TableCell>
//                       <TableCell align="right">{row.period}</TableCell>
//                       <TableCell align="right">{row.total}</TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </Container>
//         </div>
//       </div> 
//     </div>
//   );
// }

// export default Report;
