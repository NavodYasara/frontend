import React, { useState } from "react";
import { Container, Row, Col, Button, Modal, Form } from "react-bootstrap";
import Sidebar from "../../Components/Sidebar";
import Navbar from "../../Components/Navbar/Navbar";

const AddFeedbackPage = () => {
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedback, setFeedback] = useState("");

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleFeedbackSubmit = () => {
    // You can send the feedback to the server here
    // and perform any necessary actions
    console.log("Feedback: ", feedback);
    setShowFeedbackModal(false);
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
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
          </Container>
        </div>
      </div>
    </div>
  );
};

export default AddFeedbackPage;
