import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import {
  Container,
  Grid,
  Button,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import Sidebar from "../../Components/Sidebar";
import Navbar from "../../Components/Navbar/Navbar";
import axios from "axios";

const DateCalendarValue = () => {
  const [caretakers, setCaretakers] = useState([]);
  const [requirements, setRequirements] = useState([]);

  useEffect(() => {
    fetchCaretakers();
    fetchRequirements();
  }, []);

  const fetchCaretakers = async () => {
    try {
      const userID = JSON.parse(localStorage.getItem("userDetails"))?.userId;
      const response = await axios.get(
        `http://localhost:5000/api/caregiver/assignedcaretakers?caregiverId=${userID}`
      );

      setCaretakers(response.data);
    } catch (error) {
      console.error("Error fetching requested caretakers:", error);
      setCaretakers([]);
    }
  };

  const fetchRequirements = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/caregiver/getAllRequirements"
      );
      console.log(response.data);
      setRequirements(response.data);
    } catch (error) {
      console.error("Error fetching requirements:", error);
      setRequirements([]);
    }
  };

  const handleAcceptRequest = async (requirmentID, status) => {
    try {
      const statusData = {
        requirmentID: requirmentID,
        status: status,
      };
      console.log("statusData", statusData);
      const response = await axios.patch(
        `http://localhost:5000/api/caregiver/acceptrequest`,
        statusData
      );
      if (response.status === 200) {
        fetchCaretakers();
        fetchRequirements();
        // setCaretakers((prevCaretakers) =>
        //   prevCaretakers.map((caretaker) =>
        //     caretaker.caretakerId === requirmentID
        //       ? { ...caretaker, status: "Accepted" }
        //       : caretaker
        //   )
        // );
        console.log("Request accepted");
      } else {
        console.error(
          `Error accepting request for caretaker with ID ${requirmentID}`
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
        setCaretakers((prevCaretakers) =>
          prevCaretakers.map((caretaker) =>
            caretaker.caretakerId === caretakerId
              ? { ...caretaker, status: "Rejected" }
              : caretaker
          )
        );
      } else {
        console.error(
          `Error rejecting request for caretaker with ID ${caretakerId}`
        );
      }
    } catch (error) {
      console.error("Error rejecting caretaker request:", error);
    }
  };

  const getUserFromLocalStorage = () => {
    const userDetails = localStorage.getItem("userDetails");
    return userDetails ? JSON.parse(userDetails) : null;
  };

  const localUser = getUserFromLocalStorage();

  return (
    <div style={{ display: "flex" }}>
      <Sidebar userType={localUser?.userType} />
      <div style={{ flex: 1 }}>
        <Navbar />
        <div className="mgd-main" style={{ padding: "20px" }}>
          <Container>
            <Typography variant="h6" gutterBottom>
              Caretaker Requests
            </Typography>
            {caretakers.length === 0 ? (
              <Typography variant="body1" gutterBottom>
                No caretaker requests found.
              </Typography>
            ) : (
              caretakers.map((caretaker) => {
                const requirement = requirements.find(
                  (req) => req.caretakerId === caretaker.caretakerId
                );

                return (
                  <Card key={caretaker.requirementId} sx={{ mb: 2 }}>
                    <CardContent>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <Typography variant="subtitle1">
                            {caretaker.firstName} {caretaker.lastName}
                          </Typography>
                          <Typography variant="body2">
                            ID: {caretaker.caretakerId}
                          </Typography>
                          <Typography variant="body2">
                            Age:{" "}
                            {new Date().getFullYear() -
                              new Date(caretaker.dob).getFullYear()}
                          </Typography>
                          <Typography variant="body2">
                            Address: {caretaker.address}
                          </Typography>
                          <Typography variant="body2">
                            Emergency Contact: {caretaker.emergCont}
                          </Typography>
                          <Typography variant="body2">
                            Medical Condition: {caretaker.mediCondition}
                          </Typography>
                          <Typography variant="body2">
                            Category:{" "}
                            {caretaker.category ? caretaker.category : "N/A"}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Typography variant="body2">
                            Start Date:{" "}
                            {dayjs(caretaker.startDate).format("YYYY-MM-DD")}
                          </Typography>
                          <Typography variant="body2">
                            End Date:{" "}
                            {dayjs(caretaker.endDate).format("YYYY-MM-DD")}
                          </Typography>
                          <Typography variant="body2">
                            Requirement: {caretaker.requirement}
                          </Typography>
                          {requirement && requirement.status === "pending" && (
                            <>
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={() =>
                                  handleAcceptRequest(
                                    requirement?.requirementId,
                                    "Accepted"
                                  )
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

                          <Typography variant="body2">
                            { dayjs(caretaker.startDate).isAfter(dayjs()) ? (
                              "Upcomming Task"
                            ) : requirement?.status === "Started" ? (
                              <button
                                onClick={() =>
                                  handleAcceptRequest(
                                    requirement?.requirementId,
                                    "Finished"
                                  )
                                }
                              >
                                End Task
                              </button>
                            ) : requirement?.status === "Accepted" ? (
                              <button
                                onClick={() =>
                                  handleAcceptRequest(
                                    requirement?.requirementId,
                                    "Started"
                                  )
                                }
                              >
                                Start Task
                              </button>
                            ) : (
                              <button
                                onClick={() =>
                                  handleAcceptRequest(
                                    requirement?.requirementId,
                                    "Finished"
                                  )
                                }
                              >
                                Ended
                              </button>
                            )}
                            {/* Request Accepted */}
                          </Typography>

                          {requirement?.status === "Rejected" && (
                            <Typography variant="body2">
                              Request Rejected
                            </Typography>
                          )}
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </Container>
        </div>
      </div>
    </div>
  );
};

export default DateCalendarValue;
