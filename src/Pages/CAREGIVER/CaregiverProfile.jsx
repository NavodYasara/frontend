import React from "react";
import Sidebar from "../../Components/Sidebar";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import Navbar from "../../Components/Navbar/Navbar";
import "./CaregiverStyles.css";

function CaregiverProfile() {
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
                <Form>
                  <Row className="mb-3">
                    <Col>
                      <Form.Group controlId="formCaregiverName">
                        <Form.Label>Caregiver Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter caregiver name"
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="formGender">
                        <Form.Label>Gender</Form.Label>
                        <Form.Control type="text" placeholder="Enter gender" />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="mb-3">
                    <Col>
                      <Form.Group controlId="formCaregiverCategory">
                        <Form.Label>Caregiver Category</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter caregiver category"
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="formMobileNumber">
                        <Form.Label>Mobile Number</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter mobile number"
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="mb-3">
                    <Col>
                      <Form.Group controlId="formAddress">
                        <Form.Label>Address</Form.Label>
                        <Form.Control type="text" placeholder="Enter address" />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="formAge">
                        <Form.Label>Age</Form.Label>
                        <Form.Control type="text" placeholder="Enter age" />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="mb-3">
                    <Col>
                      <Form.Group controlId="formUnavailableDates">
                        <Form.Label>Unavailable Dates</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          placeholder="Enter unavailable dates"
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="mb-3">
                    <Col className="d-flex justify-content-center align-item-center">
                      <Button variant="primary" type="submit">
                        Save
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </div>

              <h2>Assigned Caretaker Profile</h2>
              <div className="caretaker-profile">
                {/* Add details or link to the assigned caretaker profile */}
              </div>
            </Container>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CaregiverProfile;
