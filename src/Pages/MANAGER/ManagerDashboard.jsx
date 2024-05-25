// ManagerDashboard.jsx
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, Dropdown, Card } from "react-bootstrap";
import dayjs from "dayjs";
import Sidebar from "../../Components/Sidebar";
import Navbar from "../../Components/Navbar/Navbar";

const ManagerDashboard = () => {
  const [caretakers, setCaretakers] = useState([]);
  const [selectedCaretaker, setSelectedCaretaker] = useState(null);
  const [selectedCaregiver, setSelectedCaregiver] = useState(null);
  const [caretakerDetails, setCaretakerDetails] = useState(null);
  const [caregivers, setCaregivers] = useState([]); // State for caregivers

  useEffect(() => {
    // Fetch caretakers
    fetch("http://localhost:5000/api/manager/caretakerInformation")
      .then((response) => response.json())
      .then((data) => setCaretakers(Array.isArray(data) ? data : []))
      .catch((error) => console.error("Error:", error));

    // Fetch caregivers
    fetch("http://localhost:5000/api/manager/caregivers")
      .then((response) => response.json())
      .then((data) => setCaregivers(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  const handleRowClick = (caretaker) => {
    setSelectedCaretaker(caretaker);
    // Fetch detailed information for selected caretaker
    fetch(`http://localhost:5000/api/manager/getCaretakers/${caretaker.caretakerId}`)
      .then((response) => response.json())
      .then((data) => setCaretakerDetails(data))
      .catch((error) => console.error("Error:", error));
  };

  const handleCaregiverChange = (caregiverId) => {
    // Fetch detailed information for selected caregiver
    fetch(`http://localhost:5000/api/manager/caregivers/${caregiverId}`)
      .then((response) => response.json())
      .then((data) => setSelectedCaregiver(data))
      .catch((error) => console.error("Error:", error));
  };


  const getUserfromLocalStorage = localStorage.getItem("userDetails")
    ? JSON.parse(localStorage.getItem("userDetails"))
    : null;

  return (
    <div style={{ display: "flex" }}>
      <Sidebar userType={getUserfromLocalStorage?.userType} />
      <div style={{ flex: 1 }}>
        <Navbar />
        <div className="mgd-main" style={{ padding: "20px" }}>
          <Container fluid>
            <Row>
              <Col>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Caretaker ID</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Start Date</th>
                      <th>End Date</th>
                      <th>Medical Conditions</th>
                      <th>Caregiver</th>
                      <th>Preferred Gender</th>
                    </tr>
                  </thead>
                  <tbody>
                    {caretakers.map((caretaker) => (
                      <tr
                        key={caretaker.caretakerId}
                        onClick={() => handleRowClick(caretaker)}
                      >
                        <td>{caretaker.caretakerId}</td>
                        <td>{caretaker.firstName}</td>
                        <td>{caretaker.lastName}</td>
                        <td>
                          {dayjs(caretaker.startDate).format("YYYY-MM-DD")}
                        </td>
                        <td>{dayjs(caretaker.endDate).format("YYYY-MM-DD")}</td>
                        <td>{caretaker.mediCondition}</td>
                        <td>
                          <Dropdown onSelect={handleCaregiverChange}>
                            <Dropdown.Toggle
                              variant="secondary"
                              id="dropdown-basic"
                            >
                              {caretaker.caregiver || "Select Caregiver"}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              {caregivers.map((caregiver) => (
                                <Dropdown.Item
                                  key={caregiver.userId}
                                  eventKey={caregiver.userId}
                                >
                                  {`${caregiver.firstName} ${caregiver.lastName}`}
                                </Dropdown.Item>
                              ))}
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                        <td>{caretaker.preffGender}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Col>
            </Row>

            {caretakerDetails && (
              <Row>
                <Col className="caretaker details section">
                  <Card>
                    <Card.Body>
                      <Card.Title>Caretaker Information</Card.Title>
                      <Card.Text>
                        <p>
                          Name:{""}
                          {`${caretakerDetails.firstName} ${caretakerDetails.lastName}`}
                        </p>
                        <p>
                          Medical Conditions:{" "}
                          {caretakerDetails.mediCondition || "N/A"}
                        </p>
                        <p>
                          Emergency Contact:{" "}
                          {caretakerDetails.emergCont || "N/A"}
                        </p>
                        <p>Address: {caretakerDetails.address}</p>
                        <p>Requirement: {caretakerDetails.requirement}</p>
                        <p>
                          Age:{" "}
                          {dayjs().year() - dayjs(caretakerDetails.dob).year()}
                        </p>
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
                          <p>Name: {selectedCaregiver.firstName}</p>
                          <p>Age: {selectedCaregiver.age}</p>
                          <p>Category: {selectedCaregiver.category}</p>
                          <p>Gender: {selectedCaregiver.gender}</p>
                          <p>
                            Unavailable Dates:{" "}
                            {selectedCaregiver.unavailableDates.join(", ")}
                          </p>
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