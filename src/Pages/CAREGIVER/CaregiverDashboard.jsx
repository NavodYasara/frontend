import React, { useState } from "react";
import dayjs from "dayjs";
import { Container, Grid, Button, Typography, Box, Card, CardContent } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Sidebar from "../../Components/Sidebar";
import Navbar from "../../Components/Navbar/Navbar";

const DateCalendarValue = () => {
  const [value, setValue] = useState(dayjs("2022-04-17"));

  const data = [
    { col1: "Data1", col2: "Data2", col3: "Data3", col4: "Data4" },
    { col1: "Data5", col2: "Data6", col3: "Data7", col4: "Data8" },
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
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={12} id="data-section">
                {data.map((item, index) => (
                  <Card key={index} sx={{ mb: 2 }}>
                    <CardContent>
                      <Grid container spacing={2} className={`data-row-${index}`}>
                        <Grid
                          item
                          xs={2}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                          className="data-col1"
                        >
                          <Typography>{item.col1}</Typography>
                        </Grid>
                        <Grid
                          item
                          xs={2}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                          className="data-col2"
                        >
                          <Typography>{item.col2}</Typography>
                        </Grid>
                        <Grid
                          item
                          xs={2}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                          className="data-col3"
                        >
                          <Typography>{item.col3}</Typography>
                        </Grid>
                        <Grid
                          item
                          xs={2}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                          className="data-col4"
                        >
                          <Typography>{item.col4}</Typography>
                        </Grid>
                        <Grid item xs={4} className="data-button">
                          <Button variant="contained" color="primary" sx={{ ml: 1 }}>
                            Button
                          </Button>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                ))}
              </Grid>
            </Grid>

            <Grid container spacing={1} alignItems="center" justifyContent="center" id="calendar-data-section">
              <Grid item xs={5} container justifyContent="center" id="calendar-section">
                <Card>
                  <CardContent>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DateCalendar value={value} onChange={(newValue) => setValue(newValue)} />
                    </LocalizationProvider>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={6} container direction="column" spacing={1} id="right-data-section">
                {data.map((item, index) => (
                  <Card key={index} sx={{ mb: 2 }}>
                    <CardContent>
                      <Grid container spacing={2} alignItems="center" className={`right-data-row-${index}`}>
                        <Grid item xs={4} className="right-data-col1">
                          <Typography>{item.col1}</Typography>
                        </Grid>
                        <Grid item xs={4} className="right-data-col2">
                          <Typography>{item.col2}</Typography>
                        </Grid>
                        <Grid item xs={4} className="right-data-button">
                          <Button variant="contained" color="primary">
                            Button
                          </Button>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                ))}
              </Grid>
            </Grid>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default DateCalendarValue;
