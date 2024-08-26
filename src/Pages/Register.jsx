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

    // // Validate names to contain only characters
    // const namePattern = /^[A-Za-z]+$/;
    // if (
    //   !namePattern.test(form.firstName) ||
    //   !namePattern.test(form.lastName) ||
    //   !namePattern.test(form.userName)
    // ) {
    //   setError(
    //     "First name, last name, and username should only contain characters!"
    //   );
    //   setOpenSnackbar(true);
    //   return;
    // }

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
                      type="text"
                      name="mobileNo"
                      value={form.mobileNo}
                      onChange={handleChange}
                      inputProps={{
                        maxLength: 10,
                        pattern: "\\d*",
                      }}
                    />
                  </Grid>

                  {/* <Grid item xs={12} sm={6}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      label="Contact Number"
                      type="text"
                      name="mobileNo"
                      value={form.mobileNo}
                      onChange={handleChange}
                      inputProps={{
                        maxLength: 10,
                        pattern: "\\d*",
                        onInput: (e) => {
                          e.target.value = e.target.value.replace(
                            /[^0-9]/g,
                            ""
                          );
                        },
                      }}
                    />
                  </Grid> */}

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
                      inputProps={{
                        max: new Date().toISOString().split("T")[0],
                      }}
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
