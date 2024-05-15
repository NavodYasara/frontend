import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";

const Register = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    password: "",
    confpassword: "",
    mobileNo: "",
    dob: "",
    gender: "",
    address: "",
    category: "",
    usertype: "caretaker",
  });

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

    if (
      form.firstName === "" ||
      form.lastName === "" ||
      form.password === "" ||
      form.confPassword === "" ||
      form.mobileNo === "" ||
      form.dob === "" ||
      form.address === "" ||
      form.category === ""
    ) {
      alert("Please fill all the fields!");
      return;
    // } else if (form.mobileNo.match(/^[0-9]{10}$/) === null) {
    //   alert("Please enter a valid mobile number!");
    //   return;
    // } else if (form.password !== form.confPassword) {
    //   alert("Password and confirm password do not match!");
    //   return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/server/registercaretaker",form
      );
      console.log(response.data);
      navigate("/Login");
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.status === 400) {
          alert("Bad request. Please check your inputs and try again.");
        } else if (error.response.status === 401) {
          alert("Unauthorized. Please check your credentials and try again.");
        } else {
          alert("An error occurred. Please try again later.");
        }
      } else if (error.request) {
        // The request was made but no response was received
        alert("No response from the server. Please try again later.");
      } else {
        // Something happened in setting up the request that triggered an error
        console.error("Error:", error.message);
        alert("An error occurred. Please try again later.");
      }
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (
  //     form.firstName === "" ||
  //     form.lastName === "" ||
  //     form.password === "" ||
  //     form.confpassword === "" ||
  //     form.mobileNo === "" ||
  //     form.dob === "" ||
  //     form.address === ""
  //   ) {
  //     alert("Please fill all the fields!");
  //     return;
  //   } else if (form
  //     .mobileNo.match(/^[0-9]{10}$/) === null) {
  //     alert("Please enter a valid mobile number!");
  //     return;
  //   }else if
  //   //Validate password and confpassword
  //   (form.password !== form.confpassword) {
  //     alert("Password and confirm password do not match!");
  //     return;
  //   }

  //   try {
  //     const response = await axios.post(
  //       "http://localhost:5000/server/registercaretaker",
  //       form
  //     );
  //     console.log(response.data);
  //     navigate("/Login");
  //   } catch (error) {
  //     console.error(error);
  //     alert("Registration failed. Please try again!");
  //   }
  // };

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div>
        <Container className="mt-5">
          <Col md="6" className="mx-auto">
            <Card>
              <Card.Body>
                <div className="title mb-4 text-center">
                  <h3>Register</h3>
                </div>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-4">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your first name"
                      name="firstName"
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your last name"
                      name="lastName"
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter your password"
                      name="password"
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter your password"
                      name="confPassword"
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Contact Number</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your contact number"
                      name="mobileNo"
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control
                      type="date"
                      name="dob"
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Label>Gender</Form.Label>
                    <Form.Control
                      as="select"
                      name="gender"
                      onChange={handleChange}
                    >
                      <option value="">Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your address"
                      name="address"
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Label>Care Category</Form.Label>
                    <Form.Control
                      as="select"
                      name="category"
                      onChange={handleChange}
                    >
                      <option value="">Select</option>
                      <option value="mental">MENTAL</option>
                      <option value="disable">DISABILITY</option>
                      <option value="elder">ELDERING</option>
                    </Form.Control>
                  </Form.Group>
                  <Row>
                    <Col md="12">
                      <Button
                        className="w-100 mb-4"
                        size="md"
                        variant="primary"
                        type="submit"
                      >
                        Sign Up
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Container>
      </div>
    </>
  );
};

export default Register;

