import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

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
import Navbar from "../Components/Navbar/Navbar";


const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const [profileEditMode, setProfileEditMode] = useState(false);
  const [originalProfileData, setOriginalProfileData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    dob: "",
    address: "",
    mobileNo: "",
    category: "",
    medicalCondition: "",
    emergCont: "",
  });
  const [profileData, setProfileData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    dob: "",
    address: "",
    mobileNo: "",
    category: "",
    medicalCondition: "",
    emergCont: "",
  });
  const [caregivers, setCaregivers] = useState([]);

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
      await axios.post("http://localhost:5000/api/user/registerPatient", profileData);
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

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const drawer = (
    <div>
      <List>
        {['Dashboard', 'Requirement', 'Feedback', 'Payment'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  // Remove this const when copying and pasting into your project.
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Navbar/>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
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
                                    name="mobileNo"
                                    value={profileData.mobileNo}
                                    onChange={handleChange}
                                    fullWidth
                                  />
                                ) : (
                                  profileData.mobileNo
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
                              <TableCell className="table-cell-bold">Date of Birth:</TableCell>
                              <TableCell className="table-cell">
                                {profileEditMode ? (
                                  <TextField
                                    type="date"
                                    name="dob"
                                    value={profileData.dob}
                                    onChange={handleChange}
                                    fullWidth
                                  />
                                ) : (
                                  profileData.dob
                                )}
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="table-cell-bold">Category:</TableCell>
                              <TableCell className="table-cell">
                                {profileEditMode ? (
                                  <Select
                                    name="category"
                                    value={profileData.category}
                                    onChange={handleChange}
                                    fullWidth
                                  >
                                    <MenuItem value="mental">Mental</MenuItem>
                                    <MenuItem value="disable">Disability</MenuItem>
                                    <MenuItem value="elderly">Elderly</MenuItem>
                                  </Select>
                                ) : (
                                  profileData.category
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
                                    name="emergCont"
                                    value={profileData.emergCont}
                                    onChange={handleChange}
                                    fullWidth
                                  />
                                ) : (
                                  profileData.emergCont
                                )}
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>
                      {profileEditMode ? (
                        <div className="text-center mt-3">
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={handleProfileSave}
                            className="me-2"
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
                        </div>
                      ) : (
                        <div className="text-center mt-3">
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={handleEditProfile}
                          >
                            Edit Profile
                          </Button>
                        </div>
                      )}
                    </Paper>
                  </Grid>
                </Grid>

                {/* Caregivers Section */}
                <h2 className="text-center mt-5">Assigned Caregivers</h2>
                <Grid container spacing={3} justifyContent="center">
                  {caregivers.map((caregiver) => (
                    <Grid item xs={12} md={6} key={caregiver.id}>
                      <Paper elevation={3} className="p-4">
                        <TableContainer component={Paper}>
                          <Table>
                            <TableBody>
                              <TableRow>
                                <TableCell className="table-cell-bold">First Name:</TableCell>
                                <TableCell className="table-cell">{caregiver.firstName}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell className="table-cell-bold">Last Name:</TableCell>
                                <TableCell className="table-cell">{caregiver.lastName}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell className="table-cell-bold">Contact Number:</TableCell>
                                <TableCell className="table-cell">{caregiver.mobileNo}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell className="table-cell-bold">Email:</TableCell>
                                <TableCell className="table-cell">{caregiver.email}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell className="table-cell-bold">Specialization:</TableCell>
                                <TableCell className="table-cell">{caregiver.specialization}</TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </Container>
            </div>
      </Box>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  window: PropTypes.func,
};

export default ResponsiveDrawer;
