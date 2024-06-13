
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import Sidebar from "../../Components/Sidebar";
import Navbar from "../../Components/Navbar/Navbar";

const ManagerDashboard = () => {
  const [caretakers, setCaretakers] = useState([]);
  const [serviceCount, setServiceCount] = useState(0);
  const [waitingCount, setWaitingCount] = useState(0);
  const [rejectedCount, setRejectedCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const getUserfromLocalStorage = localStorage.getItem("userDetails")
    ? JSON.parse(localStorage.getItem("userDetails"))
    : null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/manager/getCaretakerInformation"
        );
        const data = response.data;
        setCaretakers(Array.isArray(data) ? data : []);
        setLoading(false);

        // Calculate service and waiting counts
        const waiting = data.filter(
          (caretaker) => caretaker.status === "pending"
        ).length;
        const ongoing = data.filter(
          (caretaker) => caretaker.status === "accepted"
        ).length;
        const rejected = data.filter(
          (caretaker) => caretaker.upcoming === "rejected"
        ).length;
        setWaitingCount(waiting);
        setServiceCount(ongoing);
        setRejectedCount(rejected);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div style={{ display: "flex" }}>
      <Sidebar userType={getUserfromLocalStorage?.userType} />
      <div style={{ flex: 1 }}>
        <Navbar />
        <Container className="p-3">
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="div">
                    On Going Services{/* Caretakers Serviced */}
                  </Typography>
                  <Typography variant="h2" color="primary">
                    {serviceCount}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="div">
                    Caretakers Waiting
                  </Typography>
                  <Typography variant="h2" color="secondary">
                    {waitingCount}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="div">
                    Caretakers rejected
                  </Typography>
                  <Typography variant="h2" color="secondary">
                    {waitingCount}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Grid container spacing={3} mt={3}>
            <Grid item xs={12}>
              <Paper>
                <Box p={2}>
                  <Typography variant="h6">Caretaker Details</Typography>
                  <Table caretakers={caretakers} />
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </div>
    </div>
  );
};

const Table = ({ caretakers }) => (
  <table style={{ width: "100%", borderCollapse: "collapse" }}>
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Status</th>
        <th>Service Start</th>
        <th>Service End</th>
      </tr>
    </thead>
    <tbody>
      {caretakers.map((caretaker) => (
        <tr key={caretaker.caretakerId}>
          <td>{caretaker.caretakerId}</td>
          <td>
            {caretaker.firstName} {caretaker.lastName}
          </td>
          <td>{caretaker.status}</td>
          <td>
            {caretaker.startDate
              ? new Date(caretaker.startDate).toLocaleDateString()
              : "N/A"}
          </td>
          <td>
            {caretaker.endDate
              ? new Date(caretaker.endDate).toLocaleDateString()
              : "N/A"}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default ManagerDashboard;
