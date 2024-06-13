import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  Badge
} from "react-bootstrap";
import Sidebar from "../../Components/Sidebar";
import Navbar from "../../Components/Navbar/Navbar";
import axios from "axios";
import { FaCalendarAlt, FaUser, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { message } from "antd";

const DateCalendarValue = () => {
  const [requirements, setRequirements] = useState([]);

  useEffect(() => {
    fetchRequirements();
  }, []);

  const fetchRequirements = async () => {
    try {
      const userId = JSON.parse(localStorage.getItem("userDetails"))?.userId;
      const response = await axios.get(
        `http://localhost:5000/api/caregiver/requirmentrelatedToCareGiver?userId=${userId}`
      );
      console.log("incoming requirements: ", response.data);
      setRequirements(response.data);
    } catch (error) {
      console.error("Error fetching requirements:", error);
      setRequirements([]);
    }
  };

  const handleAcceptRequest = async (requirementID, status) => {
    try {
      const statusData = {
        requirementID: requirementID,
        status: status
      };
      const response = await axios.patch(
        `http://localhost:5000/api/caregiver/acceptrequest`,
        statusData
      );
      if (response.status === 200) {
        fetchRequirements();
        console.log("Request accepted");
        message.success("Request Updated!");
      } else {
        console.error(
          `Error accepting request for requirement with ID ${requirementID}`
        );
      }
    } catch (error) {
      console.error("Error accepting requirement request:", error);
      message.error("Request Updating Error!");
    }
  };

  const getBadgeVariant = (requirement) => {
    const currentDate = dayjs();
    const startDate = dayjs(requirement.startDate);
    const endDate = dayjs(requirement.endDate);

    if (currentDate.isAfter(endDate)) {
      return "danger"; // Overdue
    } else if (currentDate.isSame(startDate, "day") || currentDate.isBefore(startDate, "day")) {
      return "warning"; // Upcoming or same day
    } else if (currentDate.isBefore(endDate, "day")) {
      return "primary"; // Processing
    } else {
      return "info"; // Default
    }
  };

  const getUserFromLocalStorage = () => {
    const userDetails = localStorage.getItem("userDetails");
    return userDetails ? JSON.parse(userDetails) : null;
  };

  const localUser = getUserFromLocalStorage();

  return (
    <div style={{ display: "flex" }}>
      {/* <Sidebar userType={localUser?.userType} /> */}
      <div style={{ flex: 1 }}>
        <Navbar />
        <div className="mgd-main" style={{ padding: "20px" }}>
          <Container>
            <h6>Caretaker Requests</h6>
            {requirements.map((requirement) => (
              <Card key={requirement.requirementId} className="mb-3">
                <Card.Body>
                  <Row>
                    <Col md={6}>
                      <h5>Requirement Details</h5>
                      <p>
                        <FaCalendarAlt /> Start Date:{" "}
                        {dayjs(requirement.startDate).format("YYYY-MM-DD")}
                      </p>
                      <p>
                        <FaCalendarAlt /> End Date:{" "}
                        {dayjs(requirement.endDate).format("YYYY-MM-DD")}
                      </p>
                      <p>
                        <FaCalendarAlt /> Requirement: {requirement.requirement}
                      </p>
                      <Badge bg={getBadgeVariant(requirement)}>
                        {requirement.status}
                      </Badge>
                    </Col>
                    <Col md={6}>
                      <h5>Caretaker Details</h5>
                      <p>
                        <FaUser /> Name:{" "}
                        {requirement.careTakerDetails.caretakerFirstName}{" "}
                        {requirement.careTakerDetails.caretakerLastName}
                      </p>
                      <p>
                        <FaUser /> ID:{" "}
                        {requirement.careTakerDetails.caretakerId}
                      </p>
                      <p>
                        <FaMapMarkerAlt /> Address:{" "}
                        {requirement.careTakerDetails.address}
                      </p>
                      <p>
                        <FaPhone /> Emergency Contact:{" "}
                        {requirement.careTakerDetails.emergCont}
                      </p>
                    </Col>
                  </Row>
                  {requirement.status === "assigned" &&
                    dayjs(requirement.startDate).isBefore(dayjs()) && (
                      <div className="mt-3">
                        <Button
                          variant="success"
                          onClick={() =>
                            handleAcceptRequest(
                              requirement.requirementId,
                              "start"
                            )
                          }
                        >
                          Start
                        </Button>
                      </div>
                    )}
                  {requirement.status === "assigned" && (
                    <div className="mt-3">
                      <Button
                        variant="primary"
                        className="me-2"
                        onClick={() =>
                          handleAcceptRequest(
                            requirement.requirementId,
                            "accepted"
                          )
                        }
                      >
                        Accept
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() =>
                          handleAcceptRequest(
                            requirement.requirementId,
                            "rejected"
                          )
                        }
                      >
                        Reject
                      </Button>
                    </div>
                  )}
                  {dayjs(requirement.endDate).isBefore(dayjs()) && (
                    <div className="mt-3">
                      <Button
                        variant="success"
                        onClick={() =>
                          handleAcceptRequest(
                            requirement.requirementId,
                            "finished"
                          )
                        }
                      >
                        Finish
                      </Button>
                    </div>
                  )}
                </Card.Body>
              </Card>
            ))}
          </Container>
        </div>
      </div>
    </div>
  );
};

export default DateCalendarValue;
