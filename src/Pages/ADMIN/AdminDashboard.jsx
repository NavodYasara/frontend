import React from "react";
import Sidebar from "../../Components/Sidebar";
import { Container, Typography, Grid, Paper } from "@mui/material";
import Navbar from "../../Components/Navbar/Navbar";

function AdminDashboard() {
  // Example data for system status, pending tasks, and reports
  const systemStatus = {
    serverUptime: "99.9%",
    activeUsers: 120,
  };

  const pendingTasks = [
    { id: 1, title: "Review user registrations", deadline: "2024-05-10" },
    { id: 2, title: "Update system documentation", deadline: "2024-05-15" },
    { id: 3, title: "Approve caregiver profiles", deadline: "2024-05-20" },
  ];

  const reports = [
    { id: 1, title: "Monthly financial report", date: "2024-05-01" },
    { id: 2, title: "User engagement metrics", date: "2024-05-05" },
    { id: 3, title: "System performance analysis", date: "2024-05-10" },
  ];

  return (
    
      <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: 1 }}>
        <Navbar />
        <div className="mgd-main" style={{ padding: "20px" }}>
          <Container fluid>

                  <Container>
          <Typography variant="h4" gutterBottom>
            Admin Dashboard
          </Typography>
          <Grid container spacing={3}>
            {/* System Status */}
            <Grid item xs={12} md={4}>
              <Paper elevation={3} style={{ padding: "20px" }}>
                <Typography variant="h5" gutterBottom>
                  System Status
                </Typography>
                <Typography variant="body1">
                  Server Uptime: {systemStatus.serverUptime}
                </Typography>
                <Typography variant="body1">
                  Active Users: {systemStatus.activeUsers}
                </Typography>
              </Paper>
            </Grid>

            {/* Pending Tasks */}
            <Grid item xs={12} md={4}>
              <Paper elevation={3} style={{ padding: "20px" }}>
                <Typography variant="h5" gutterBottom>
                  Pending Tasks
                </Typography>
                <ul>
                  {pendingTasks.map((task) => (
                    <li key={task.id}>
                      {task.title} - Deadline: {task.deadline}
                    </li>
                  ))}
                </ul>
              </Paper>
            </Grid>

            {/* Reports */}
            <Grid item xs={12} md={4}>
              <Paper elevation={3} style={{ padding: "20px" }}>
                <Typography variant="h5" gutterBottom>
                  Reports
                </Typography>
                <ul>
                  {reports.map((report) => (
                    <li key={report.id}>
                      {report.title} - Date: {report.date}
                    </li>
                  ))}
                </ul>
              </Paper>
            </Grid>
          </Grid>
        </Container>

          </Container>
        </div>
        
      </div>
    </div>
        
        
        

      

  );
}

export default AdminDashboard;
