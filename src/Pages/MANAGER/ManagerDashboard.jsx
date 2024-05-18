import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Table, Dropdown, Card } from "react-bootstrap";
import dayjs from "dayjs";
import Sidebar from "../../Components/Sidebar";
import Navbar from "../../Components/Navbar/Navbar"; 

const ManagerDashboard = () => {
  const [caretakers, setCaretakers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCaretaker, setSelectedCaretaker] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/caretakerDetails")
      .then((response) => response.json())
      .then((data) => setCaretakers(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleRowClick = (caretaker) => {
    setSelectedCaretaker(caretaker);
  };

  const filteredCaretakers = caretakers.filter((caretaker) =>
    caretaker.firstName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sample data for demonstration
  const sampleCaretakers = [
    {
      caretakerid: 1,
      firstName: "Alice",
      startDate: "2023-01-01",
      endDate: "2023-12-31",
      gender: "Female",
      caregiver: "Sample Caregiver A",
      medicalConditions: "Condition A",
      emergencyContact: "1234567890",
      address: "123 Street A",
      requirement: "Requirement A",
      age: 30,
    },
    {
      caretakerid: 2,
      firstName: "Bob",
      startDate: "2023-02-01",
      endDate: "2023-11-30",
      gender: "Male",
      caregiver: "Sample Caregiver B",
      medicalConditions: "Condition B",
      emergencyContact: "0987654321",
      address: "456 Street B",
      requirement: "Requirement B",
      age: 40,
    },
  ];

  const sampleCaregivers = [
    {
      caregiverid: 1,
      name: "Sample Caregiver A",
      age: 35,
      category: "Category A",
      gender: "Female",
      unavailableDates: ["2023-01-01", "2023-02-15"],
    },
    {
      caregiverid: 2,
      name: "Sample Caregiver B",
      age: 45,
      category: "Category B",
      gender: "Male",
      unavailableDates: ["2023-03-01", "2023-04-10"],
    },
  ];

  const selectedCaregiver = sampleCaregivers.find(
    (caregiver) => caregiver.name === selectedCaretaker?.caregiver
  );

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: 1 }}>
        <Navbar />
        <div className="mgd-main" style={{ padding: "20px" }}>
          <Container fluid>
            <Row>
              <Col>
                <Form>
                  <Form.Group controlId="caretakerSearch">
                    <Form.Label>Search Caretaker</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter name"
                      value={searchTerm}
                      onChange={handleSearch}
                    />
                  </Form.Group>
                </Form>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Caretaker ID</th>
                      <th>Caretaker's Name</th>
                      <th>Start Date</th>
                      <th>End Date</th>
                      <th>Preferred Gender</th>
                      <th>Caregiver</th>
                      <th>Gender</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sampleCaretakers.map((caretaker) => (
                      <tr key={caretaker.caretakerid} onClick={() => handleRowClick(caretaker)}>
                        <td>{caretaker.caretakerid}</td>
                        <td>{caretaker.firstName}</td>
                        <td>{dayjs(caretaker.startDate).format("YYYY-MM-DD")}</td>
                        <td>{dayjs(caretaker.endDate).format("YYYY-MM-DD")}</td>
                        <td>{caretaker.gender}</td>
                        <td>
                          <Dropdown>
                            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                              {caretaker.caregiver}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                              <Dropdown.Item>Action</Dropdown.Item>
                              {/* Add more dropdown items as needed */}
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                        <td>{caretaker.gender}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Col>
            </Row>

            {selectedCaretaker && (
              <Row>
                <Col>
                  <Card>
                    <Card.Body>
                      <Card.Title>Caretaker Information</Card.Title>
                      <Card.Text>
                        <p>Name: {selectedCaretaker.firstName}</p>
                        <p>Medical Conditions: {selectedCaretaker.medicalConditions}</p>
                        <p>Emergency Contact: {selectedCaretaker.emergencyContact}</p>
                        <p>Address: {selectedCaretaker.address}</p>
                        <p>Requirement: {selectedCaretaker.requirement}</p>
                        <p>Age: {selectedCaretaker.age}</p>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col>
                  {selectedCaregiver && (
                    <Card>
                      <Card.Body>
                        <Card.Title>Caregiver Information</Card.Title>
                        <Card.Text>
                          <p>Name: {selectedCaregiver.name}</p>
                          <p>Age: {selectedCaregiver.age}</p>
                          <p>Category: {selectedCaregiver.category}</p>
                          <p>Gender: {selectedCaregiver.gender}</p>
                          <p>Unavailable Dates: {selectedCaregiver.unavailableDates.join(", ")}</p>
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  )}
                </Col>
              </Row>
            )}
          </Container>
        </div>
        
      </div>
    </div>
  );
};

export default ManagerDashboard;
