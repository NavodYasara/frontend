import React, { useState } from "react";
import Sidebar from "../../Components/Sidebar";
import Navbar from "../../Components/Navbar/Navbar";
import {
  Container,
  Box,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from "@mui/material";
import "./CaregiverStyles.css";

function CaregiverProfile() {
  const [open, setOpen] = useState(false);
  const [formValues, setFormValues] = useState({
    caregiverName: "",
    gender: "",
    caregiverCategory: "",
    mobileNumber: "",
    address: "",
    age: "",
    unavailableDates: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formValues);
    // Add your form submission logic here
    handleClose();
  };

  const getUserfromLocalStorage = localStorage.getItem("userDetails")
    ? JSON.parse(localStorage.getItem("userDetails"))
    : null;

  return (
    <div style={{ display: "flex" }}>
      <Sidebar userType={getUserfromLocalStorage.userType} />
      <div className="caregiver-profile" style={{ flex: 1 }}>
        <Navbar />
        <div className="parent">
          <div className="content-part">
            <Container fluid>
              <h2 className="text-center m-2">Caregiver Profile</h2>
              <div className="p-3">
                <Button variant="outlined" onClick={handleClickOpen}>
                  Open Caregiver Form
                </Button>
                <Dialog open={open} onClose={handleClose}>
                  <DialogTitle>Caregiver Profile</DialogTitle>
                  <DialogContent>
                    <Box
                      component="form"
                      onSubmit={handleSubmit}
                      noValidate
                      sx={{ mt: 1 }}
                    >
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            autoComplete="name"
                            name="caregiverName"
                            variant="outlined"
                            required
                            fullWidth
                            id="caregiverName"
                            label="Caregiver Name"
                            autoFocus
                            value={formValues.caregiverName}
                            onChange={handleChange}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="gender"
                            label="Gender"
                            name="gender"
                            value={formValues.gender}
                            onChange={handleChange}
                          />
                        </Grid>
                        
                        <Grid item xs={12} sm={6}>
                          <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="mobileNumber"
                            label="Mobile Number"
                            name="mobileNumber"
                            value={formValues.mobileNumber}
                            onChange={handleChange}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="address"
                            label="Address"
                            name="address"
                            value={formValues.address}
                            onChange={handleChange}
                          />
                        </Grid>
                      </Grid>
                    </Box>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose} color="primary">
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      onClick={handleSubmit}
                      color="primary"
                    >
                      Save
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
            </Container>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CaregiverProfile;

// import React, { useEffect, useState } from "react";
// import Sidebar from "../../Components/Sidebar";
// import { Container } from "react-bootstrap";
// import Navbar from "../../Components/Navbar/Navbar";
// import CaregiverForm from "../../Components/CaregiverForm";

// const CaregiverProfile = () => {
//   const [userDetails, setUserDetails] = useState(null);

//   useEffect(() => {
//     const storedUserDetails = localStorage.getItem("userDetails");
//     if (storedUserDetails) {
//       setUserDetails(JSON.parse(storedUserDetails));
//     }
//   }, []);

//   return (
//     <div style={{ display: "flex" }}>
//       <Sidebar userType={userDetails?.userType} />
//       <div className="caregiver-profile" style={{ flex: 1 }}>
//         <Navbar />
//         <div className="parent">
//           <div className="content-part">
//             <Container fluid>
//               <h2 className="text-center m-2">Caregiver Profile</h2>
//               <div className="p-3">
//                 <Form>
//                   <Row className="mb-3">
//                     <Col>
//                       <Form.Group controlId="formCaregiverName">
//                         <Form.Label>Caregiver Name</Form.Label>
//                         <Form.Control
//                           type="text"
//                           placeholder="Enter caregiver name"
//                         />
//                       </Form.Group>
//                     </Col>
//                     <Col>
//                       <Form.Group controlId="formGender">
//                         <Form.Label>Gender</Form.Label>
//                         <Form.Control type="text" placeholder="Enter gender" />
//                       </Form.Group>
//                     </Col>
//                   </Row>
//                   <Row className="mb-3">
//                     <Col>
//                       <Form.Group controlId="formCaregiverCategory">
//                         <Form.Label>Caregiver Category</Form.Label>
//                         <Form.Control
//                           type="text"
//                           placeholder="Enter caregiver category"
//                         />
//                       </Form.Group>
//                     </Col>
//                     <Col>
//                       <Form.Group controlId="formMobileNumber">
//                         <Form.Label>Mobile Number</Form.Label>
//                         <Form.Control
//                           type="text"
//                           placeholder="Enter mobile number"
//                         />
//                       </Form.Group>
//                     </Col>
//                   </Row>
//                   <Row className="mb-3">
//                     <Col>
//                       <Form.Group controlId="formAddress">
//                         <Form.Label>Address</Form.Label>
//                         <Form.Control type="text" placeholder="Enter address" />
//                       </Form.Group>
//                     </Col>
//                     <Col>
//                       <Form.Group controlId="formAge">
//                         <Form.Label>Age</Form.Label>
//                         <Form.Control type="text" placeholder="Enter age" />
//                       </Form.Group>
//                     </Col>
//                   </Row>
//                   <Row className="mb-3">
//                     <Col>
//                       <Form.Group controlId="formUnavailableDates">
//                         <Form.Label>Unavailable Dates</Form.Label>
//                         <Form.Control
//                           as="textarea"
//                           rows={3}
//                           placeholder="Enter unavailable dates"
//                         />
//                       </Form.Group>
//                     </Col>
//                   </Row>
//                   <Row className="mb-3">
//                     <Col className="d-flex justify-content-center align-items-center">
//                       <Button variant="primary" type="submit">
//                         Save
//                       </Button>
//                     </Col>
//                   </Row>
//                 </Form>
//               </div>
//               <div className="caretaker-profile">
//                 {/* Add details or link to the assigned caretaker profile */}
//               </div>
//             </Container>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CaregiverProfile;
