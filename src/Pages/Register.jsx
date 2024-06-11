import React, { useState } from "react";
import {
  Container,
  Box,
  Card,
  TextField,
  Button,
  Snackbar,
  Alert,
  Grid,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";

const Register = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    password: "",
    confPassword: "",
    mobileNo: "",
    dob: "",
    gender: "",
    address: "",
    usertype: "caretaker",
  });

  const [error, setError] = useState(null); // State to hold error messages
  const [openSnackbar, setOpenSnackbar] = useState(false); // State for Snackbar
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors

    // Basic validations
    if (
      form.userName === "" ||
      form.password === "" ||
      form.confPassword === "" ||
      form.mobileNo === "" ||
      form.dob === "" ||
      form.address === ""
    ) {
      setError("Please fill in all the required fields!");
      setOpenSnackbar(true);
      return;
    }

    // Validate mobile number format
    if (!/^[0-9]{10}$/.test(form.mobileNo)) {
      setError("Please enter a valid 10-digit mobile number!");
      setOpenSnackbar(true);
      return;
    }

    // Password match validation
    if (form.password !== form.confPassword) {
      setError("Password and confirm password do not match!");
      setOpenSnackbar(true);
      return;
    }

    try {
      // Submit the form if all validations pass
      const response = await axios.post(
        "http://localhost:5000/api/user/registercaretaker",
        form
      );
      console.log(response.data);
      navigate("/Login");
    } catch (error) {
      // Handle axios request errors
      if (error.response) {
        if (error.response.status === 400) {
          setError("Bad request. Please check your inputs and try again.");
        } else if (error.response.status === 401) {
          setError(
            "Unauthorized. Please check your credentials and try again."
          );
        } else if (error.response.status === 409) {
          setError(
            "Username already exists. Please choose a different username."
          );
        } else {
          setError("An error occurred. Please try again later.");
        }
      } else if (error.request) {
        setError("No response from the server. Please try again later.");
      } else {
        console.error("Error:", error.message);
        setError("An error occurred. Please try again later.");
      }
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <>
      <Navbar />
      <Container component="main" maxWidth="md">
        <Box mt={8}>
          <Card>
            <Box p={3}>
              <Box mb={4} textAlign="center">
                <h3>Register</h3>
              </Box>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      label="First Name"
                      name="firstName"
                      value={form.firstName}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      label="Last Name"
                      name="lastName"
                      value={form.lastName}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      label="User Name"
                      name="userName"
                      value={form.userName}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      type="password"
                      label="Password"
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      type="password"
                      label="Confirm Password"
                      name="confPassword"
                      value={form.confPassword}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      label="Contact Number"
                      name="mobileNo"
                      value={form.mobileNo}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      type="date"
                      label="Date of Birth"
                      name="dob"
                      InputLabelProps={{ shrink: true }}
                      value={form.dob}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      label="Address"
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>
              </form>
            </Box>
          </Card>
        </Box>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity="error"
            sx={{ width: "100%" }}
          >
            {error}
          </Alert>
        </Snackbar>
      </Container>
    </>
  );
};

export default Register;

// import React, { useState } from "react";
// import { Container, Col, Card, Form, Button } from "react-bootstrap";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../Components/Navbar/Navbar";

// const Register = () => {
//   const [form, setForm] = useState({
//     firstName: "",
//     lastName: "",
//     userName: "",
//     password: "",
//     confPassword: "",
//     mobileNo: "",
//     dob: "",
//     gender: "",
//     address: "",
//     usertype: "caretaker",
//   });

//   const [error, setError] = useState(null); // State to hold error messages
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prevForm) => ({
//       ...prevForm,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (
//       form.userName === "" ||
//       form.password === "" ||
//       form.confPassword === "" ||
//       form.mobileNo === "" ||
//       form.dob === "" ||
//       form.address === ""
//     ) {
//       setError("Please fill all the fields!");
//       return;
//     } else if (form.mobileNo.match(/^[0-9]{10}$/) === null) {
//       setError("Please enter a valid mobile number!");
//       return;
//     } else if (form.password !== form.confPassword) {
//       setError("Password and confirm password do not match!");
//       return;
//     }

//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/user/registercaretaker",
//         form
//       );
//       console.log(response.data);
//       navigate("/Login");
//     } catch (error) {
//       if (error.response) {
//         if (error.response.status === 400) {
//           setError("Bad request. Please check your inputs and try again.");
//         } else if (error.response.status === 401) {
//           setError("Unauthorized. Please check your credentials and try again.");
//         } else if (error.response.status === 409) {
//           setError("Username already exists. Please choose a different username.");
//         } else {
//           setError("An error occurred. Please try again later.");
//         }
//       } else if (error.request) {
//         setError("No response from the server. Please try again later.");
//       } else {
//         console.error("Error:", error.message);
//         setError("An error occurred. Please try again later.");
//       }
//     }
//   };

//   return (
//     <>
//       <div>
//         <Navbar />
//       </div>
//       <div>
//         <Container className="mt-5">
//           <Col md="6" className="mx-auto">
//             <Card>
//               <Card.Body>
//                 <div className="title mb-4 text-center">
//                   <h3>Register</h3>
//                 </div>
//                 {error && <p className="text-danger">{error}</p>} {/* Display error message */}
//                 <Form onSubmit={handleSubmit}>
//                   <Form.Group className="mb-4">
//                     <Form.Label>First Name</Form.Label>
//                     <Form.Control
//                       type="text"
//                       placeholder="Enter your first name"
//                       name="firstName"
//                       onChange={handleChange}
//                     />
//                   </Form.Group>
//                   <Form.Group className="mb-4">
//                     <Form.Label>Last Name</Form.Label>
//                     <Form.Control
//                       type="text"
//                       placeholder="Enter your last name"
//                       name="lastName"
//                       onChange={handleChange}
//                     />
//                   </Form.Group>
//                   <Form.Group className="mb-4">
//                     <Form.Label>User Name</Form.Label>
//                     <Form.Control
//                       type="text"
//                       placeholder="Enter your user name"
//                       name="userName"
//                       onChange={handleChange}
//                     />
//                   </Form.Group>
//                   <Form.Group className="mb-4">
//                     <Form.Label>Password</Form.Label>
//                     <Form.Control
//                       type="password"
//                       placeholder="Enter your password"
//                       name="password"
//                       onChange={handleChange}
//                     />
//                   </Form.Group>
//                   <Form.Group className="mb-4">
//                     <Form.Label>Confirm Password</Form.Label>
//                     <Form.Control
//                       type="password"
//                       placeholder="Enter your confirm password"
//                       name="confPassword"
//                       onChange={handleChange}
//                     />
//                   </Form.Group>
//                   <Form.Group className="mb-4">
//                     <Form.Label>Contact Number</Form.Label>
//                     <Form.Control
//                       type="text"
//                       placeholder="Enter your contact number"
//                       name="mobileNo"
//                       onChange={handleChange}
//                     />
//                   </Form.Group>
//                   <Form.Group className="mb-4">
//                     <Form.Label>Date of Birth</Form.Label>
//                     <Form.Control
//                       type="date"
//                       name="dob"
//                       onChange={handleChange}
//                     />
//                   </Form.Group>

//                   <Form.Group className="mb-4">
//                     <Form.Label>Address</Form.Label>
//                     <Form.Control
//                       type="text"
//                       placeholder="Enter your address"
//                       name="address"
//                       onChange={handleChange}
//                     />
//                   </Form.Group>

//                   <Button className="w-100 mb-4" size="md" variant="primary" type="submit">
//                     Sign Up
//                   </Button>
//                 </Form>
//               </Card.Body>
//             </Card>
//           </Col>
//         </Container>
//       </div>
//     </>
//   );
// };

// export default Register;
