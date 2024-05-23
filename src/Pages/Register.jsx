import React, { useState } from "react";
import { Container, Col, Card, Form, Button } from "react-bootstrap";
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
    category: "",
    usertype: "caretaker",
  });

  const [error, setError] = useState(null); // State to hold error messages
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
      form.userName === "" ||
      form.password === "" ||
      form.confPassword === "" ||
      form.mobileNo === "" ||
      form.dob === "" ||
      form.address === "" ||
      form.category === ""
    ) {
      setError("Please fill all the fields!");
      return;
    } else if (form.mobileNo.match(/^[0-9]{10}$/) === null) {
      setError("Please enter a valid mobile number!");
      return;
    } else if (form.password !== form.confPassword) {
      setError("Password and confirm password do not match!");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/registercaretaker",
        form
      );
      console.log(response.data);
      navigate("/Login");
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          setError("Bad request. Please check your inputs and try again.");
        } else if (error.response.status === 401) {
          setError("Unauthorized. Please check your credentials and try again.");
        } else if (error.response.status === 409) {
          setError("Username already exists. Please choose a different username.");
        } else {
          setError("An error occurred. Please try again later.");
        }
      } else if (error.request) {
        setError("No response from the server. Please try again later.");
      } else {
        console.error("Error:", error.message);
        setError("An error occurred. Please try again later.");
      }
    }
  };

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
                {error && <p className="text-danger">{error}</p>} {/* Display error message */}
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
                    <Form.Label>User Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your user name"
                      name="userName"
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
                      placeholder="Enter your confirm password"
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
                    <Form.Control as="select" name="category" onChange={handleChange}>
                      <option value="">Select</option>
                      <option value="mental">MENTAL</option>
                      <option value="disable">DISABILITY</option>
                      <option value="elder">ELDERING</option>
                    </Form.Control>
                  </Form.Group>
                  <Button className="w-100 mb-4" size="md" variant="primary" type="submit">
                    Sign Up
                  </Button>
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
