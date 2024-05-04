// src/pages/CarePlan.js
import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


function CarePlan() {
  const [carePlanData, setCarePlanData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setCarePlanData({
      ...carePlanData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Call your API function to save the care plan data
    // For example: await saveCarePlan(carePlanData);

    // After successful submission, redirect the user to the caretaker dashboard
    navigate('/caretaker');
  };

  return (
    <Card className="p-4">
      <h2 className="mb-4">Create Care Plan</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={carePlanData.title}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={carePlanData.description}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="startDate">
          <Form.Label>Start Date</Form.Label>
          <Form.Control
            type="date"
            name="startDate"
            value={carePlanData.startDate}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="endDate">
          <Form.Label>End Date</Form.Label>
          <Form.Control
            type="date"
            name="endDate"
            value={carePlanData.endDate}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Save Care Plan
        </Button>
      </Form>
    </Card>
  );
}

export default CarePlan;
