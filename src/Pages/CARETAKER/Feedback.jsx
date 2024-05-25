import React, { useState } from "react";
import { Container, Row, Col, Button, Modal, Form, Table } from "react-bootstrap";
import Sidebar from "../../Components/Sidebar";
import Navbar from "../../Components/Navbar/Navbar";


const AddFeedbackPage = () => {
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedback, setFeedback] = useState("");

  const [caregivers, setCaregivers] = useState([]);

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleFeedbackSubmit = () => {
    // You can send the feedback to the server here
    // and perform any necessary actions
    console.log("Feedback: ", feedback);
    setShowFeedbackModal(false);
  };
 const getUserfromLocalStorage = localStorage.getItem("userDetails")
    ? JSON.parse(localStorage.getItem("userDetails"))
    : null;
  return (
    <div style={{ display: "flex" }}>
      <Sidebar userType={getUserfromLocalStorage.userType} />
      <div style={{ flex: 1 }}>
        <Navbar />
        <div className="mgd-main" style={{ padding: "20px" }}>
          <Container fluid>
            <Container className="mt-5">
              {/* Feedback Section */}
              <div className="p-3 shadow rounded">
                <Row>
                  <Col className="fdbtn d-flex flex-column justify-content-center align-items-center">
                    <h2>Feedback Section</h2>
                    <Button
                      variant="primary"
                      onClick={() => setShowFeedbackModal(true)}
                    >
                      Leave Feedback
                    </Button>
                  </Col>
                </Row>
                <Modal
                  show={showFeedbackModal}
                  onHide={() => setShowFeedbackModal(false)}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Leave Feedback</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form>
                      <Form.Group controlId="formFeedback">
                        <Form.Label>Feedback</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          value={feedback}
                          onChange={handleFeedbackChange}
                        />
                      </Form.Group>
                    </Form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      variant="secondary"
                      onClick={() => setShowFeedbackModal(false)}
                    >
                      Cancel
                    </Button>
                    <Button variant="primary" onClick={handleFeedbackSubmit}>
                      Submit
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>
            </Container>
            <Container className="mt-5">
              <Row>
                <div className="p-3 shadow rounded">
                  <div className="row">
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
                  <div className="row">
                    <Button variant="primary">Reject Caregiver</Button>
                  </div>
                </div>
              </Row>
              
              </Container>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default AddFeedbackPage;
