

import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import {
  Container,
  Grid,
  Button,
  Typography,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Sidebar from "../../Components/Sidebar";
import Navbar from "../../Components/Navbar/Navbar";
import axios from "axios";

const DateCalendarValue = () => {
  const [selectedDates, setSelectedDates] = useState([]);
  const [caretakers, setCaretakers] = useState([]);
  const [open, setOpen] = useState(false);

  const getUserFromLocalStorage = () => {
    const userDetails = localStorage.getItem("userDetails");
    return userDetails ? JSON.parse(userDetails) : null;
  };

  useEffect(() => {
    const fetchCaretakers = async () => {
      try {
        const userID = JSON.parse(localStorage.getItem("userDetails"))?.userId;
        console.log("care giver id ",userID);
        const response = await axios.get(
          `http://localhost:5000/api/caregiver/assignedcaretakers?caregiverId=${userID}`
        );
        console.log("care givwer tasks ",response.data)
        console.log("Fetched requested caretakers:", response.data);
        setCaretakers(response.data);
      } catch (error) {
        console.error("Error fetching requested caretakers:", error);
        setCaretakers([]);
      }
    };
    fetchCaretakers();
  }, []);

  const handleAcceptRequest = async (caretakerId) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/caregiver/acceptrequest/${caretakerId}`
      );
      if (response.status === 200) {
        // Update the caretakers state to reflect the accepted status
        setCaretakers((prevCaretakers) =>
          prevCaretakers.map((caretaker) =>
            caretaker.caretakerId === caretakerId
              ? { ...caretaker, status: "Accepted" }
              : caretaker
          )
        );
        console.log(`Accepted request for caretaker with ID ${caretakerId}`);
      } else {
        console.error(
          `Error accepting request for caretaker with ID ${caretakerId}`
        );
      }
    } catch (error) {
      console.error("Error accepting caretaker request:", error);
    }
  };

  const handleRejectRequest = async (caretakerId) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/caregiver/rejectrequest/${caretakerId}`
      );
      if (response.status === 200) {
        // Update the caretakers state to reflect the rejected status
        setCaretakers((prevCaretakers) =>
          prevCaretakers.map((caretaker) =>
            caretaker.caretakerId === caretakerId
              ? { ...caretaker, status: "Rejected" }
              : caretaker
          )
        );
        console.log(`Rejected request for caretaker with ID ${caretakerId}`);
      } else {
        console.error(
          `Error rejecting request for caretaker with ID ${caretakerId}`
        );
      }
    } catch (error) {
      console.error("Error rejecting caretaker request:", error);
    }
  };

  const handleDateClick = (date) => {
    const dateString = date.format("YYYY-MM-DD");
    setSelectedDates((prevDates) => {
      if (prevDates.includes(dateString)) {
        return prevDates.filter((d) => d !== dateString);
      } else {
        return [...prevDates, dateString];
      }
    });
  };

  const handleClearDates = () => {
    setSelectedDates([]);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const localUser = getUserFromLocalStorage();
  const filteredCaretakers = caretakers;

  return (
    <div style={{ display: "flex" }}>
      <Sidebar userType={localUser?.userType} />
      <div style={{ flex: 1 }}>
        <Navbar />
        <div className="mgd-main" style={{ padding: "20px" }}>
          <Container>
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={12} id="caretaker-section">
                {filteredCaretakers.length > 0 ? (
                  <Typography variant="h6" gutterBottom>
                    Caretaker Requests
                  </Typography>
                ) : (
                  <Typography variant="body1" gutterBottom>
                    No caretaker requests found.
                  </Typography>
                )}
                {filteredCaretakers.map((caretaker) => (
                  <Card key={caretaker.requirementId} sx={{ mb: 2 }}>
                    <CardContent>
                      <Grid
                        container
                        spacing={2}
                        className={`caretaker-row-${caretaker.requirementId}`}
                      >
                        <Grid item xs={3}>
                          <Typography variant="subtitle1">
                            {caretaker.caretakerName}
                          </Typography>
                          <Typography variant="body2">
                            Category: {caretaker.category}
                          </Typography>
                        </Grid>
                        <Grid item xs={3}>
                          <Typography variant="body2">
                            Start Date:{" "}
                            {dayjs(caretaker.startDate).format("YYYY-MM-DD")}
                          </Typography>
                          <Typography variant="body2">
                            End Date:{" "}
                            {dayjs(caretaker.endDate).format("YYYY-MM-DD")}
                          </Typography>
                        </Grid>
                        <Grid item xs={3}>
                          <Typography variant="body2">
                            Requirement: {caretaker.requirement}
                          </Typography>
                        </Grid>
                        <Grid item xs={3}>
                          {caretaker.status === "PENDING" && (
                            <>
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={() =>
                                  handleAcceptRequest(caretaker.caretakerId)
                                }
                                sx={{ mt: 1, mr: 1 }}
                              >
                                Accept
                              </Button>
                              <Button
                                variant="contained"
                                color="secondary"
                                onClick={() =>
                                  handleRejectRequest(caretaker.caretakerId)
                                }
                                sx={{ mt: 1 }}
                              >
                                Reject
                              </Button>
                            </>
                          )}
                          {caretaker.status === "Accepted" && (
                            <Typography variant="body2">
                              Request Accepted
                            </Typography>
                          )}
                          {caretaker.status === "Rejected" && (
                            <Typography variant="body2">
                              Request Rejected
                            </Typography>
                          )}
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                ))}
              </Grid>
            </Grid>

            <Grid
              container
              spacing={2}
              alignItems="center"
              justifyContent="center"
            >
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">Unavailable Dates</Typography>
                    {selectedDates.length > 0 ? (
                      selectedDates.map((date, index) => (
                        <Typography variant="body2" key={index}>
                          {date}
                        </Typography>
                      ))
                    ) : (
                      <Typography variant="body2" style={{ marginTop: 8 }}>
                        No dates selected
                      </Typography>
                    )}
                    <Grid container spacing={1} justifyContent="center">
                      <Grid item>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={handleClearDates}
                          sx={{ mt: 2 }}
                        >
                          Clear Dates
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={handleOpen}
                          sx={{ mt: 2 }}
                        >
                          Add Dates
                        </Button>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Select Dates</DialogTitle>
              <DialogContent>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateCalendar
                    value={null}
                    onChange={handleDateClick}
                    renderDay={(day, _value, DayComponentProps) => {
                      const dateString = day.format("YYYY-MM-DD");
                      const isSelected = selectedDates.includes(dateString);
                      return (
                        <div
                          onClick={() => handleDateClick(day)}
                          style={{
                            backgroundColor: isSelected ? "#1976d2" : undefined,
                            borderRadius: isSelected ? "50%" : undefined,
                            color: isSelected ? "white" : undefined,
                            cursor: "pointer",
                            width: "36px",
                            height: "36px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {day.format("D")}
                        </div>
                      );
                    }}
                  />
                </LocalizationProvider>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Done
                </Button>
              </DialogActions>
            </Dialog>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default DateCalendarValue;
