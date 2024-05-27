import React, { useState } from "react";
import dayjs from "dayjs";
import {
  Container,
  Grid,
  Button,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Sidebar from "../../Components/Sidebar";
import Navbar from "../../Components/Navbar/Navbar";

const DateCalendarValue = () => {
  const [value, setValue] = useState(dayjs("2022-04-17"));

  // Example data arrays
  const caretakers = [
    { 
      caretakerId: 1,
      name: "John Doe", 
      startDate: "2022-05-01", 
      endDate: "2022-06-01", 
      requirement: "Requirement 1", 
      category: "MENTAL HEALTH", 
      status: "Pending",
    },
    { 
      caretakerId: 2,
      name: "Jane Smith", 
      startDate: "2022-05-15", 
      endDate: "2022-06-15", 
      requirement: "Requirement 2", 
      category: "DISABILITY", 
      status: "Pending",
    },
    // Add more caretakers as needed
  ];

  const getUserfromLocalStorage = () => {
    const userDetails = localStorage.getItem("userDetails");
    return userDetails ? JSON.parse(userDetails) : null;
  };

  const handleAcceptRequest = (caretakerId) => {
    // Handle accept request logic
    console.log(`Accepted request for caretaker with ID ${caretakerId}`);
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar userType={getUserfromLocalStorage()?.userType} />
      <div style={{ flex: 1 }}>
        <Navbar />
        <div className="mgd-main" style={{ padding: "20px" }}>
          <Container fluid>
            {/* Grid for caretakers and accept request section */}
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={12} id="caretaker-section">
                {caretakers.map((caretaker) => (
                  <Card key={caretaker.caretakerId} sx={{ mb: 2 }}>
                    <CardContent>
                      <Grid container spacing={2} className={`caretaker-row-${caretaker.caretakerId}`}>
                        <Grid item xs={3}>
                          <Typography variant="h6">{caretaker.name}</Typography>
                          <Typography>Category: {caretaker.category}</Typography>
                        </Grid>
                        <Grid item xs={3}>
                          <Typography>Start Date: {caretaker.startDate}</Typography>
                          <Typography>End Date: {caretaker.endDate}</Typography>
                        </Grid>
                        <Grid item xs={3}>
                          <Typography>Requirement: {caretaker.requirement}</Typography>
                        </Grid>
                        <Grid item xs={3}>
                          {caretaker.status === "Pending" && (
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => handleAcceptRequest(caretaker.caretakerId)}
                              sx={{ mt: 1 }}
                            >
                              Accept Request
                            </Button>
                          )}
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                ))}
              </Grid>
            </Grid>

            {/* Grid for calendar and unavailable dates section */}
            <Grid container spacing={2} alignItems="center" justifyContent="center" id="calendar-data-section">
              {/* Calendar section */}
              <Grid item xs={5} container justifyContent="center" id="calendar-section">
                <Card>
                  <CardContent>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DateCalendar value={value} onChange={(newValue) => setValue(newValue)} />
                    </LocalizationProvider>
                  </CardContent>
                </Card>
              </Grid>

              {/* Placeholder for unavailable dates section */}
              {/* Adjust as per your requirement for displaying unavailable dates */}
              <Grid item xs={5} container direction="column" id="unavailable-dates-section">
                <Card>
                  <CardContent>
                    <Typography variant="h6">Unavailable Dates</Typography>
                    {/* Placeholder for displaying unavailable dates */}
                    {/* You can populate this with actual logic to display selected unavailable dates */}
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default DateCalendarValue;
