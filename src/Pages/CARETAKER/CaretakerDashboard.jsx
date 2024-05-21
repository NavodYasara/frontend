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
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Select,
} from "@mui/material";
import {} from "@mui/material";
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
        "http://localhost:5000/api/caretakerprofile"
      );
      setProfileData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCaregivers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/caregivers");
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
        "http://localhost:5000/api/updatecaretakerprofile",
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
    <>
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ flex: 1 }}>
          <Navbar />
          <div className="mgd-main" style={{ padding: "20px" }}>
            <Container fluid>
              <div>
                <Container className="mt-5">
                  {/* Profile Section */}
                  <Grid item xs={12} md={6}>
                    <Container className="mt-5">
                      {/* Profile Section */}
                      <Grid container justifyContent="center">
                        <Grid item xs={12} md={8} className="center-content">
                          <div className="profile section-1 p-3 shadow rounded">
                            <h2
                              className="mb-4"
                              style={{ textAlign: "center" }}
                            >
                              Patient's Profile
                            </h2>
                            <TableContainer
                              component={Paper}
                              className="table-container"
                            >
                              <Table>
                                <TableBody>
                                  <TableRow>
                                    <TableCell
                                      component="th"
                                      scope="row"
                                      className="table-cell-bold"
                                    >
                                      First Name:
                                    </TableCell>
                                    <TableCell className="table-cell">
                                      {profileEditMode ? (
                                        <TextField
                                          type="text"
                                          name="firstName"
                                          value={profileData.firstName}
                                          onChange={handleChange}
                                          fullWidth
                                        />
                                      ) : (
                                        profileData.firstName
                                      )}
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell
                                      component="th"
                                      scope="row"
                                      className="table-cell-bold"
                                    >
                                      Last Name:
                                    </TableCell>
                                    <TableCell className="table-cell">
                                      {profileEditMode ? (
                                        <TextField
                                          type="text"
                                          name="lastName"
                                          value={profileData.lastName}
                                          onChange={handleChange}
                                          fullWidth
                                        />
                                      ) : (
                                        profileData.lastName
                                      )}
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell
                                      component="th"
                                      scope="row"
                                      className="table-cell-bold"
                                    >
                                      Contact Number:
                                    </TableCell>
                                    <TableCell className="table-cell">
                                      {profileEditMode ? (
                                        <TextField
                                          type="text"
                                          name="contactNumber"
                                          value={profileData.contactNumber}
                                          onChange={handleChange}
                                          fullWidth
                                        />
                                      ) : (
                                        profileData.contactNumber
                                      )}
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell
                                      component="th"
                                      scope="row"
                                      className="table-cell-bold"
                                    >
                                      Date of Birth:
                                    </TableCell>
                                    <TableCell className="table-cell">
                                      {profileEditMode ? (
                                        <TextField
                                          type="date"
                                          name="dob"
                                          value={profileData.dob}
                                          onChange={handleChange}
                                          fullWidth
                                          InputLabelProps={{
                                            shrink: true,
                                          }}
                                        />
                                      ) : (
                                        profileData.dob
                                      )}
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell
                                      component="th"
                                      scope="row"
                                      className="table-cell-bold"
                                    >
                                      Address:
                                    </TableCell>
                                    <TableCell className="table-cell">
                                      {profileEditMode ? (
                                        <TextField
                                          type="text"
                                          name="address"
                                          value={profileData.address}
                                          onChange={handleChange}
                                          fullWidth
                                        />
                                      ) : (
                                        profileData.address
                                      )}
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell
                                      component="th"
                                      scope="row"
                                      className="table-cell-bold"
                                    >
                                      Caretaker Category:
                                    </TableCell>
                                    <TableCell className="table-cell">
                                      {profileEditMode ? (
                                        <Select
                                          name="category"
                                          value={profileData.category}
                                          onChange={handleChange}
                                          fullWidth
                                        >
                                          <MenuItem value={"Mental"}>
                                            Mental
                                          </MenuItem>
                                          <MenuItem value={"Disabled"}>
                                            Disabled
                                          </MenuItem>
                                          <MenuItem value={"Eldering"}>
                                            Eldering
                                          </MenuItem>
                                        </Select>
                                      ) : (
                                        profileData.category
                                      )}
                                    </TableCell>
                                  </TableRow>
                                </TableBody>
                              </Table>
                            </TableContainer>

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
                      </Grid>
                    </Container>
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
                        <Button
                          variant="primary"
                          onClick={handleFeedbackSubmit}
                        >
                          Submit
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </div>
                </Container>
              </div>
            </Container>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileAndFeedbackPage;
