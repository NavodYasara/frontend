import React, { useState, useEffect } from "react";
import { Container, Button, Modal, Form } from "react-bootstrap";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import FeedbackIcon from "@mui/icons-material/Feedback";
import NoteIcon from "@mui/icons-material/Note";
import Sidebar from "../../Components/Sidebar";
import Navbar from "../../Components/Navbar/Navbar";

const getUserFromLocalStorage = localStorage.getItem("userDetails")
  ? JSON.parse(localStorage.getItem("userDetails"))
  : null;

const AddFeedbackPage = () => {
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [showRequirementModal, setShowRequirementModal] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [requirement, setRequirement] = useState("");
  const [selectedCaregiver, setSelectedCaregiver] = useState(null);
  const [caregivers, setCaregivers] = useState([]);
  const [pastFeedback, setPastFeedback] = useState([]);
  const [pastRequirement, setPastRequirement] = useState([]);

  useEffect(() => {
    // Fetch caregivers data from server
    fetchCaregivers();
  }, []);

  
  const fetchCaregivers = async () => {
  const userId = getUserFromLocalStorage ? getUserFromLocalStorage.userId : null;
  if (userId) {
    try {
      const response = await fetch(`http://localhost:5000/api/feedback/getcaregiver/${userId}`);
      console.log(response);
      const caregiversData = await response.json();
      setCaregivers(caregiversData);
    } catch (error) {
      console.error('Error fetching caregivers:', error);
    }
  } else {
    console.error('No user ID found in local storage.');
  }
};

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleRequirementChange = (event) => {
    setRequirement(event.target.value);
  };

  const handleFeedbackSubmit = () => {
    // You can send the feedback to the server here
    console.log("Feedback for:", selectedCaregiver);
    console.log("Feedback:", feedback);
    setShowFeedbackModal(false);
  };

  const handleRequirementSubmit = () => {
    // You can send the requirement to the server here
    console.log("Requirement for:", selectedCaregiver);
    console.log("Requirement:", requirement);
    setShowRequirementModal(false);
  };

  const handleLeaveFeedback = (caregiver) => {
    setSelectedCaregiver(caregiver);
    setShowFeedbackModal(true);
  };

  const handleViewPastFeedback = (caregiver) => {
    // Fetch past feedback for the selected caregiver
    // Replace with actual API call
    const feedbackData = [
      { feedback: "Great service!", date: "2024-05-01" },
      { feedback: "Very helpful and kind.", date: "2024-05-15" },
    ];
    setPastFeedback(feedbackData);
    setSelectedCaregiver(caregiver);
    setShowFeedbackModal(true);
  };

  const handleViewRequirement = (caregiver) => {
    // Fetch past requirement for the selected caregiver
    // Replace with actual API call
    const requirementData = [
      { requirement: "Ensure timely medication.", date: "2024-05-01" },
      { requirement: "Assist with daily exercises.", date: "2024-05-15" },
    ];
    setPastRequirement(requirementData);
    setSelectedCaregiver(caregiver);
    setShowRequirementModal(true);
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar userType={getUserFromLocalStorage.userType} />
      <div style={{ flex: 1 }}>
        <Navbar />
        <div className="mgd-main" style={{ padding: "20px" }}>
          <Container fluid>
            <Container className="mt-5">
              <div className="p-3 shadow rounded">
                <div className="row">
                  <h2 className="mb-4" style={{ textAlign: "center" }}>
                    Allocated Caregivers
                  </h2>
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Name</TableCell>
                          <TableCell>Gender</TableCell>
                          <TableCell>Contact</TableCell>
                          <TableCell>Enter Requirement</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {caregivers.map((caregiver, index) => (
                          <TableRow key={index}>
                            <TableCell>{caregiver.userName}</TableCell>
                            <TableCell>{caregiver.gender}</TableCell>
                            <TableCell>{caregiver.mobileNo}</TableCell>
                            <TableCell>
                              <IconButton
                                onClick={() => handleLeaveFeedback(caregiver)}
                              >
                                <FeedbackIcon />
                              </IconButton>
                              <Button
                                variant="link"
                                onClick={() =>
                                  handleViewPastFeedback(caregiver)
                                }
                              >
                                View Past Feedback
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
              </div>
            </Container>
          </Container>
        </div>
      </div>

      {/* Feedback Modal */}
      <Modal
        show={showFeedbackModal}
        onHide={() => setShowFeedbackModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Leave Feedback for {selectedCaregiver?.userName}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formFeedback">
              <Form.Label>Feedback</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={feedback}
                onChange={handleFeedbackChange}
              />
            </Form.Group>
          </Form>
          {pastFeedback.length > 0 && (
            <div className="mt-4">
              <h5>Past Feedback</h5>
              <ul>
                {pastFeedback.map((fb, index) => (
                  <li key={index}>
                    {fb.feedback} - {fb.date}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowFeedbackModal(false)}
          >
            Cancel
          </Button>
          <Button variant="primary" onClick={handleFeedbackSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Requirement Modal */}
      <Modal
        show={showRequirementModal}
        onHide={() => setShowRequirementModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Requirement for {selectedCaregiver?.userName}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formRequirement">
              <Form.Label>Requirement</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={requirement}
                onChange={handleRequirementChange}
              />
            </Form.Group>
          </Form>
          {pastRequirement.length > 0 && (
            <div className="mt-4">
              <h5>Past Requirements</h5>
              <ul>
                {pastRequirement.map((inst, index) => (
                  <li key={index}>
                    {inst.requirement} - {inst.date}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowRequirementModal(false)}
          >
            Cancel
          </Button>
          <Button variant="primary" onClick={handleRequirementSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddFeedbackPage;

