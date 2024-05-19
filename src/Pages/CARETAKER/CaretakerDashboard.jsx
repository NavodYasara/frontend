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
import { Modal, Form, Row, Col } from "react-bootstrap";

function ProfileAndFeedbackPage() {
  // ... all the state and useEffect logic from CaretakerDashboard
  const [profileEditMode, setProfileEditMode] = useState(false);
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

  const handleProfileCancel = () => {
    setProfileData({ ...originalProfileData });
    setProfileEditMode(false);
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

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleFeedbackSubmit = () => {
    // You can send the feedback to the server here
    // and perform any necessary actions
    console.log("Feedback: ", feedback);
    setShowFeedbackModal(false);
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

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div className="caretaker-dashboard" style={{ flex: 1 }}>
        <Container className="mt-5">
          {/* Profile Section */}
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
                    <td className="fw-bold">Caretaker Category:</td>
                    <td>
                      {profileEditMode ? (
                        <TextField
                          type="text"
                          name="userType"
                          value={profileData.category}
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
        </Container>

        <Container className="mt-5">
          {/* Feedback Section */}
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
    </div>
  );
}

export default ProfileAndFeedbackPage;




