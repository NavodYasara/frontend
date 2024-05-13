import React from "react";
import { Container, Row, Col, Button, Form, Card } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";

export const CaregiverAllocation = () => {
  const [date, setDate] = useState(new Date());

  return (
    <>
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} className="text-center mb-2">
            <h1>Allocate Caregivers</h1>
          </Col>
        </Row>

        <Row className="justify-content-center mb-4">
          <Col xs={6} className="d-flex justify-content-center">
            <DatePicker
              selected={date}
              onChange={(date) => setDate(date)}
              className="form-control"
            />
          </Col>
        </Row>

        <Container className="caregiver-allocation">
          <Card className="box">
            <Card.Body className="rectangle">
              <Row className="justify-content-center">
                <Col xs={12} lg={8}>
                  <Form>
                    <Row className="mb-3">
                      <Col xs={12} md={6}>
                        <Form.Group>
                          <Form.Label>Caretaker Name</Form.Label>
                          <Form.Control type="text" />
                        </Form.Group>
                      </Col>
                      <Col xs={12} md={6}>
                        <Form.Group>
                          <Form.Label>Caregiver Name</Form.Label>
                          <Form.Control type="text" />
                        </Form.Group>
                      </Col>
                      <Col xs={12} md={6}>
                        <Form.Group>
                          <Form.Label>Start Date</Form.Label>
                          <Form.Control type="date" />
                        </Form.Group>
                      </Col>
                      <Col xs={12} md={6}>
                        <Form.Group>
                          <Form.Label>End Date</Form.Label>
                          <Form.Control type="date" />
                        </Form.Group>
                      </Col>
                    </Row>
                  </Form>
                </Col>
              </Row>
            </Card.Body>
          </Card>
          <Row className="justify-content-center mt-4">
            <Col xs={12} md={6} lg={4} className="d-flex justify-content-center">
              <Button variant="success" className="w-100 mb-3">
                Save
              </Button>
            </Col>
            <Col xs={12} md={6} lg={4} className="d-flex justify-content-center">
              <Button variant="danger" className="w-100 mb-3">
                Delete
              </Button>
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  );
};

export default CaregiverAllocation;
