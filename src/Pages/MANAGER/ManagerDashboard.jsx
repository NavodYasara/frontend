import React, { useState, useEffect } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { Typography, Paper } from "@mui/material";
import { Table } from "react-bootstrap";
import Sidebar from "../../Components/Sidebar";


const ManagerDashboard = () => {
  const [caretakers, setCaretakers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/caretakerDetails')
      .then(response => response.json())
      .then(data => setCaretakers(data))
      .catch(error => console.error('Error:', error));
  }, []);


  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div className="vh-100 vw-100" style={{ width: "100%", marginTop: "50px" }}>
        <div className="calenderview">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Paper
              elevation={3}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center", 
                backgroundColor: "#f5f5f5",
                padding: "10px",
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                marginBottom: "20px",
              }}
            >
              <Typography variant="h5" gutterBottom>
                Select a Date
              </Typography>
              <DateCalendar />
            </Paper>
          </LocalizationProvider>
        </div>
        <div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Caretaker Name</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Address</th>
                <th>Birth Date</th>
                <th>Mobile</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {caretakers.map((caretaker, index) => (
                <tr key={index}>
                  <td>{caretaker.idCaretaker}</td>
                  <td>{caretaker.first_name}</td>
                  <td>{caretaker.last_name}</td>
                  <td>{caretaker.address}</td>
                  <td>{caretaker.date_of_birth}</td>
                  <td>{caretaker.phone_number }</td>
                  <td>{caretaker.catagory_carataker}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Caregiver Name</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Address</th>
                <th>Birth Date</th>
                <th>Mobile</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {caretakers.map((caretaker, index) => (
                <tr key={index}>
                  <td>{caretaker.idCaretaker}</td>
                  <td>{caretaker.first_name}</td>
                  <td>{caretaker.last_name}</td>
                  <td>{caretaker.address}</td>
                  <td>{caretaker.date_of_birth}</td>
                  <td>{caretaker.phone_number }</td>
                  <td>{caretaker.catagory_carataker}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;
