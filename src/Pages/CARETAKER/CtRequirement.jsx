import React, { useState, useEffect } from "react";
import Sidebar from "../../Components/Sidebar";
import Navbar from "../../Components/Navbar/Navbar";
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
import { Modal, Form, Row, Col } from "react-bootstrap";

function RequirementsAndCaregiversPage() {
  // ... the state and useEffect logic related to Requirements and Caregivers from CaretakerDashboard
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
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleRequirementsSave = async () => {
    // Handle saving requirements
  };

  const handleRequirementsCancel = () => {
    setRequirementsEditMode(false);
  };

  const handleEditRequirements = () => {
    setRequirementsEditMode(true);
  };
  

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
      </div>
    </div>
  );
}

export default RequirementsAndCaregiversPage;
