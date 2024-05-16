import React, { useState, useEffect } from "react";
import Sidebar from "../../Components/Sidebar";
import {
  Container,
  Table,
  Menu,
  MenuItem,
  Button,
  Grid,
  TextField,
} from "@mui/material";
import axios from "axios";
import Navbar from "../../Components/Navbar/Navbar";
import "../../App.css";
import { Modal, Form, Row, Col } from "react-bootstrap";

function CaretakerDashboard() {
  const [profileEditMode, setProfileEditMode] = useState(false);
  const [requirementsEditMode, setRequirementsEditMode] = useState(false);
  const [originalProfileData, setOriginalProfileData] = useState({});
  const [caregivers, setCaregivers] = useState([]);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [profileData, setProfileData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    dob: "",
    address: "",
    contactNumber: "",
    requirements: "",
    gender: "",
    selectedCategory: "",
  });

  useEffect(() => {
    setOriginalProfileData({ ...profileData });
    fetchCaretakerProfile();
    fetchCaregivers();
  }, []);

  const fetchCaretakerProfile = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/server/caretakerprofile"
      );
      setProfileData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCaregivers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/server/caregivers"
      );
      setCaregivers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditProfile = () => {
    setProfileEditMode(true);
  };

  const handleEditRequirements = () => {
    setRequirementsEditMode(true);
  };

  const handleProfileCancel = () => {
    setProfileData({ ...originalProfileData });
    setProfileEditMode(false);
  };

  const handleRequirementsCancel = () => {
    setRequirementsEditMode(false);
  };

  const handleProfileSave = async () => {
    try {
      setProfileEditMode(false);
      setOriginalProfileData({ ...profileData });
      const response = await axios.put(
        "http://localhost:5000/server/updatecaretakerprofile",
        profileData
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRequirementsSave = async () => {
    // Handle saving requirements
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleFeedbackSubmit = () => {
    // You can send the feedback to the server here
    // and perform any necessary actions
    console.log("Feedback: ", feedback);
    setShowFeedbackModal(false);
  };

  return (
    <div>
      <Navbar />
      <Container className="mt-5">
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <div className="profile section-1 p-3 shadow rounded">
              <h2 className="mb-4">Profile</h2>
              <Table bordered>
                <tbody>
                  <tr>
                    <td className="fw-bold">First Name:</td>
                    <td>
                      {profileEditMode ? (
                        <TextField
                          type="text"
                          name="firstName"
                          value={profileData.firstName}
                          onChange={handleChange}
                          className="form-control"
                        />
                      ) : (
                        profileData.firstName
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td className="fw-bold">Last Name:</td>
                    <td>
                      {profileEditMode ? (
                        <TextField
                          type="text"
                          name="lastName"
                          value={profileData.lastName}
                          onChange={handleChange}
                          className="form-control"
                        />
                      ) : (
                        profileData.lastName
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td className="fw-bold">Contact Number:</td>
                    <td>
                      {profileEditMode ? (
                        <TextField
                          type="text"
                          name="contactNumber"
                          value={profileData.contactNumber}
                          onChange={handleChange}
                          className="form-control"
                        />
                      ) : (
                        profileData.contactNumber
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td className="fw-bold">Date of Birth:</td>
                    <td>
                      {profileEditMode ? (
                        <TextField
                          type="text"
                          name="dob"
                          value={profileData.dob}
                          onChange={handleChange}
                          className="form-control"
                        />
                      ) : (
                        profileData.dob
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td className="fw-bold">Gender:</td>
                    <td>
                      {profileEditMode ? (
                        <>
                          <Button
                            aria-controls="simple-menu"
                            aria-haspopup="true"
                            onClick={handleClick}
                          >
                            {profileData.gender
                              ? profileData.gender
                              : "Select Gender"}
                          </Button>
                          <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                          >
                            <MenuItem
                              onClick={() =>
                                handleChange({
                                  target: { name: "gender", value: "Male" },
                                })
                              }
                            >
                              Male
                            </MenuItem>
                            <MenuItem
                              onClick={() =>
                                handleChange({
                                  target: { name: "gender", value: "Female" },
                                })
                              }
                            >
                              Female
                            </MenuItem>
                            <MenuItem
                              onClick={() =>
                                handleChange({
                                  target: { name: "gender", value: "Other" },
                                })
                              }
                            >
                              Other
                            </MenuItem>
                          </Menu>
                        </>
                      ) : (
                        profileData.gender
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td className="fw-bold">Address:</td>
                    <td>
                      {profileEditMode ? (
                        <TextField
                          type="text"
                          name="address"
                          value={profileData.address}
                          onChange={handleChange}
                          className="form-control"
                        />
                      ) : (
                        profileData.address
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td className="fw-bold">User Type:</td>
                    <td>
                      {profileEditMode ? (
                        <TextField
                          type="text"
                          name="userType"
                          value={profileData.userType}
                          onChange={handleChange}
                          className="form-control"
                        />
                      ) : (
                        profileData.userType
                      )}
                    </td>
                  </tr>
                </tbody>
              </Table>

              <div className="text-center">
                {profileEditMode ? (
                  <>
                    <Button
                      variant="contained"
                      color="primary"
                      className="me-2"
                      onClick={handleProfileSave}
                    >
                      Save
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={handleProfileCancel}
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleEditProfile}
                  >
                    Edit Profile
                  </Button>
                )}
              </div>
            </div>
          </Grid>

          <Grid item xs={12} md={6}>
            <div className="requirement section-2 p-3 shadow rounded">
              <h2 className="mb-4" style={{ textAlign: "center" }}>
                Your Requirements
              </h2>
              {requirementsEditMode ? (
                <TextField
                  name="requirements"
                  value={profileData.requirements}
                  onChange={handleChange}
                  className="form-control mb-3"
                  multiline
                  rows={5}
                />
              ) : (
                <p className="mb-3">{profileData.requirements}</p>
              )}
              <div className="text-center">
                {requirementsEditMode ? (
                  <>
                    <Button
                      variant="contained"
                      color="primary"
                      className="me-2"
                      onClick={handleRequirementsSave}
                    >
                      Save
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={handleRequirementsCancel}
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleEditRequirements}
                  >
                    Edit Information
                  </Button>
                )}
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>

      <Container className="mt-5">
        <div className="p-3 shadow rounded">
          <h2 className="mb-4">Allocated Caregivers</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Gender</th>
                <th>Experience (years)</th>
                <th>Contact</th>
              </tr>
            </thead>
            <tbody>
              {caregivers.map((caregiver, index) => (
                <tr key={index}>
                  <td>{caregiver.name}</td>
                  <td>{caregiver.specialization}</td>
                  <td>{caregiver.experience}</td>
                  <td>{caregiver.availability}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Container>

      <Container className="mt-5">
        <div className="p-3 shadow rounded">
          <Row>
            <Col className="fdbtn d-flex flex-column justify-content-center align-items-center">
              <h2>Feedback Section</h2>
              <Button
                variant="primary"
                onClick={() => setShowFeedbackModal(true)}
              >
                Leave Feedback
              </Button>
            </Col>
          </Row>
          <Modal
            show={showFeedbackModal}
            onHide={() => setShowFeedbackModal(false)}
          >
            <Modal.Header closeButton>
              <Modal.Title>Leave Feedback</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <Form>
                <Form.Group controlId="formFeedback">
                  <Form.Label>Feedback</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    onChange={handleFeedbackChange}
                  />
                </Form.Group>
              </Form>
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
        </div>
      </Container>
    </div>
  );
}

export default CaretakerDashboard;
