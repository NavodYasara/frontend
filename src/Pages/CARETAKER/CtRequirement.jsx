import React, { useState, useEffect } from "react";
import Sidebar from "../../Components/Sidebar";
import Navbar from "../../Components/Navbar/Navbar";
import {
  Container,
  Table,
  Button as MuiButton,
  Grid,
  TextField,
} from "@mui/material";
import axios from "axios";
import {
  Modal,
  Form,
  Row,
  Col,
  Button,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";

function RequirementsAndCaregiversPage() {
  const [requirementsEditMode, setRequirementsEditMode] = useState(false);
  const [caregivers, setCaregivers] = useState([]);
  const [originalProfileData, setOriginalProfileData] = useState({});
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
    preferredGender: "",
  });

  useEffect(() => {
    // Fetch caregivers data
    const fetchCaregivers = async () => {
      try {
        const response = await axios.get("/api/caregivers");
        setCaregivers(response.data);
      } catch (error) {
        console.error("Error fetching caregivers:", error);
      }
    };

    fetchCaregivers();
  }, []);

  //#######################################################

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleGenderSelect = (gender) => {
    setProfileData((prevState) => ({
      ...prevState,
      preferredGender: gender,
    }));
  };

  const handleRequirementsSave = async () => {
    try {
      // Send updated requirements to backend
      await axios.put(`/api/profile/${profileData.id}`, {
        requirements: profileData.requirements,
      });
      setRequirementsEditMode(false);
    } catch (error) {
      console.error("Error saving requirements:", error);
    }
  };

  const handleRequirementsCancel = () => {
    setRequirementsEditMode(false);
    setProfileData((prevState) => ({
      ...prevState,
      requirements: originalProfileData.requirements,
    }));
  };

  const handleEditRequirements = () => {
    setRequirementsEditMode(true);
  };

  //############ Date Picker ##############################
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };
  //#######################################################
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div className="caretaker-dashboard" style={{ flex: 1 }}>
        <Container className="mt-5">
          {/* Requirements Section */}
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
                <p className="mb-3" style={{ textAlign: "center" }}>
                  {profileData.requirements}
                </p>
              )}
              <div className="text-center">
                {requirementsEditMode ? (
                  <>
                    <MuiButton
                      variant="contained"
                      color="primary"
                      className="me-2"
                      onClick={handleRequirementsSave}
                    >
                      Save
                    </MuiButton>
                    <MuiButton
                      variant="contained"
                      color="secondary"
                      onClick={handleRequirementsCancel}
                    >
                      Cancel
                    </MuiButton>
                  </>
                ) : (
                  <MuiButton
                    variant="contained"
                    color="primary"
                    onClick={handleEditRequirements}
                  >
                    Edit Information
                  </MuiButton>
                )}
              </div>
            </div>
          </Grid>
        </Container>

        <Container className="mt-5">
          {/* Preferred Gender Section */}
          <Grid item xs={12} md={6}>
            <div className="section-2 p-3 shadow rounded">
              <Row>
                <Col>
                  <h4 className="mb-4" style={{ textAlign: "center" }}>
                    Your Preferred Gender
                  </h4>
                </Col>
                <Col>
                  <div style={{ textAlign: "center" }}>
                    <DropdownButton
                      id="gender-dropdown"
                      title={profileData.preferredGender || "Select Gender"}
                      onSelect={handleGenderSelect}
                    >
                      <Dropdown.Item eventKey="Select">Select</Dropdown.Item>
                      <Dropdown.Item eventKey="male">Male</Dropdown.Item>
                      <Dropdown.Item eventKey="female">Female</Dropdown.Item>
                    </DropdownButton>
                  </div>
                </Col>
              </Row>
            </div>
          </Grid>
        </Container>

        <Container className="request-schedule mt-5">
          {/* reqest Preferred service period  */}
          <Grid item xs={12} md={6}>
            <div className="section-2 p-3 shadow rounded">
              <Container className="request-schedule">
                <Row>
                  <Col>
                    <Form.Group>
                      <Form.Label>Start Date</Form.Label>
                      <Form.Control
                        type="date"
                        value={startDate}
                        onChange={(e) => handleStartDateChange(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>End Date</Form.Label>
                      <Form.Control
                        type="date"
                        value={endDate}
                        onChange={(e) => handleEndDateChange(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Container>
            </div>
          </Grid>
        </Container>

        <Container className="mt-5">
          <div className="p-3 shadow rounded">
            <h2 className="mb-4" style={{ textAlign: "center" }}>
              Allocated Caregivers
            </h2>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Gender</th>
                  <th>Category</th>
                  <th>Contact</th>
                </tr>
              </thead>
              <tbody>
                {caregivers.map((caregiver, index) => (
                  <tr key={index}>
                    <td>{caregiver.userName}</td>
                    <td>{caregiver.gender}</td>
                    <td>{caregiver.category}</td>
                    <td>{caregiver.contact}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default RequirementsAndCaregiversPage;
