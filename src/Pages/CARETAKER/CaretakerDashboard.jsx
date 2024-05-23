import React, { useState, useEffect } from "react";
import Sidebar from "../../Components/Sidebar";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Paper,
  Select,
  Grid,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import axios from "axios";
import Navbar from "../../Components/Navbar/Navbar";

function ProfileAndFeedbackPage() {
  const [profileEditMode, setProfileEditMode] = useState(false);
  const [originalProfileData, setOriginalProfileData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    dob: "",
    address: "",
    contactNumber: "",
    category: "",
    medicalCondition: "",
    emergencyContact: "",
  });
  const [profileData, setProfileData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    dob: "",
    address: "",
    contactNumber: "",
    category: "",
    medicalCondition: "",
    emergencyContact: "",
  });
  const [caregivers, setCaregivers] = useState([]);

  //const id = localStorage.getItem.JSON.stringyfy("userDetails");
  const getUserfromLocalStorage = localStorage.getItem("userDetails")
  ? JSON.parse(localStorage.getItem("userDetails"))
  : null;



  useEffect(() => {
    fetchCaretakerProfile();
    fetchCaregivers();
  }, []);

  const fetchCaretakerProfile = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/caretakerprofile");
      setProfileData(response.data);
      setOriginalProfileData(response.data);
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
      //const newData = {}
      profileData.id = getUserfromLocalStorage.userId
      console.log(profileData);
      await axios.put("http://localhost:5000/api/user/registerPatient", profileData);
      setOriginalProfileData({ ...profileData });
      setProfileEditMode(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      <div style={{ display: "flex" }}>
        <Sidebar userType={getUserfromLocalStorage.userType} />
        <div style={{ flex: 1 }}>
          <Navbar />
          <div className="mgd-main" style={{ padding: "20px" }}>
            <Container>
              {/* Profile Section */}
              <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} md={8}>
                  <Paper elevation={3} className="p-4">
                    <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
                      Patient's Profile
                    </h2>
                    <TableContainer component={Paper}>
                      <Table>
                        <TableBody>
                          <TableRow>
                            <TableCell className="table-cell-bold">First Name:</TableCell>
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
                            <TableCell className="table-cell-bold">Last Name:</TableCell>
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
                            <TableCell className="table-cell-bold">Contact Number:</TableCell>
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
                            <TableCell className="table-cell-bold">Date of Birth:</TableCell>
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
                            <TableCell className="table-cell-bold">Address:</TableCell>
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
                            <TableCell className="table-cell-bold">Medical Condition:</TableCell>
                            <TableCell className="table-cell">
                              {profileEditMode ? (
                                <TextField
                                  type="text"
                                  name="medicalCondition"
                                  value={profileData.medicalCondition}
                                  onChange={handleChange}
                                  fullWidth
                                />
                              ) : (
                                profileData.medicalCondition
                              )}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="table-cell-bold">Emergency Contact:</TableCell>
                            <TableCell className="table-cell">
                              {profileEditMode ? (
                                <TextField
                                  type="text"
                                  name="emergencyContact"
                                  value={profileData.emergencyContact}
                                  onChange={handleChange}
                                  fullWidth
                                />
                              ) : (
                                profileData.emergencyContact
                              )}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="table-cell-bold">Caretaker Category:</TableCell>
                            <TableCell className="table-cell">
                              {profileEditMode ? (
                                <Select
                                  name="category"
                                  value={profileData.category}
                                  onChange={(e) =>
                                    setProfileData((prevState) => ({
                                      ...prevState,
                                      category: e.target.value,
                                    }))
                                  }
                                  fullWidth
                                >
                                  <MenuItem value={"Mental"}>Mental</MenuItem>
                                  <MenuItem value={"Disabled"}>Disabled</MenuItem>
                                  <MenuItem value={"Eldering"}>Eldering</MenuItem>
                                </Select>
                              ) : (
                                profileData.category
                              )}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <div className="text-center mt-4">
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
                  </Paper>
                </Grid>
              </Grid>
            </Container>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileAndFeedbackPage;
