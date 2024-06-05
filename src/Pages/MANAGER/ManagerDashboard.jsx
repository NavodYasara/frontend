import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Table, Dropdown, Card } from "react-bootstrap";
import dayjs from "dayjs";
import Sidebar from "../../Components/Sidebar";
import Navbar from "../../Components/Navbar/Navbar";

const ManagerDashboard = () => {
  const [caretakers, setCaretakers] = useState([]);
  const [selectedCaretaker, setSelectedCaretaker] = useState(null);
  const [selectedCaregiver, setSelectedCaregiver] = useState(null);
  
  const [caretakerDetails, setCaretakerDetails] = useState(null);
  const [caregivers, setCaregivers] = useState([]);
  const [selectedCaregiverDetails, setSelectedCaregiverDetails] =
    useState(null);
  const [selectedCaregivers, setSelectedCaregivers] = useState(
    JSON.parse(localStorage.getItem("selectedCaregivers")) || {}
  );
  const [caretakerStatuses, setCaretakerStatuses] = useState({});

  useEffect(() => {
    fetch("http://localhost:5000/api/manager/getCaretakerInformation")
      .then((response) => response.json())
      .then((data) => {
        setCaretakers(Array.isArray(data) ? data : []);
        data.forEach((caretaker) => {
          getCaretakerStatus(caretaker.caretakerId);
        });
      })
      .catch((error) => console.error("Error:", error));

    fetch("http://localhost:5000/api/manager/getCaregivers")
      .then((response) => response.json())
      .then((data) => setCaregivers(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  const handleRowClick = (caretaker) => {
    setSelectedCaretaker(caretaker);
    fetch(
      `http://localhost:5000/api/manager/getCaretakerById/${caretaker.caretakerId}`
    )
      .then((response) => response.json())
      .then((data) => setCaretakerDetails(data))
      .catch((error) => console.error("Error:", error));
  };

  const handleViewCaregiver = (eventKey) => {
    const selectedCaregiver = caregivers.find(
      (caregiver) => caregiver.caregiverId.toString() === eventKey
    );

    if (selectedCaregiver) {
      fetch(
        `http://localhost:5000/api/manager/getCaregiverById/${selectedCaregiver.caregiverId}`
      )
        .then((response) => response.json())
        .then((data) => {
          setSelectedCaregiverDetails(data);
        })
        .catch((error) => console.error("Error:", error));
    }
  };

  const handleAllocateCaregiver = async (caretaker, eventKey) => {
    console.log("selected event key ", eventKey);
    const selectedCaregiver = caregivers.find(
      (caregiver) => caregiver.caregiverId.toString() === eventKey
    );

    if (eventKey) {
      const caregiverId = selectedCaregiver.caregiverId;
      const caretakerId = caretaker.caretakerId;
      const requirementId = caretaker.requirementId;

      if (
        typeof caregiverId !== "number" ||
        typeof caretakerId !== "number" ||
        typeof requirementId !== "number"
      ) {
        console.error("Invalid input types");
        return;
      }

      fetch(`http://localhost:5000/api/manager/getCaretakerById/${caretakerId}`)
        .then((response) => response.json())
        .then((data) => {
          if (!data.caregiverId || data.caregiverId !== caregiverId) {
            setSelectedCaregivers((prevCaregivers) => {
              const updatedCaregivers = {
                ...prevCaregivers,
                [caretakerId]: {
                  name: `${selectedCaregiver.firstName} (${selectedCaregiver.gender})`,
                  id: caregiverId,
                },
              };
              localStorage.setItem(
                "selectedCaregivers",
                JSON.stringify(updatedCaregivers)
              );
              return updatedCaregivers;
            });

            fetch(
              `http://localhost:5000/api/manager/getCaregiverById/${caregiverId}`
            )
              .then((response) => response.json())
              .then((data) => {
                console.log("came gere ", data);
                setSelectedCaregiver(data);

                fetch(`http://localhost:5000/api/manager/allocateCaregiver`, {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    category: caretaker.category,
                    caretakerId: caretaker.caretakerId,
                    caregiverId: eventKey,
                    requirementId: caretaker.requirementId,
                  }),
                })
                  .then((response) => {
                    if (response.ok) {
                      console.log("Caregiver allocated successfully!");
                    } else {
                      console.error(
                        "Error allocating caregiver:",
                        response.status
                      );
                    }
                  })
                  .catch((error) => console.error("Error:", error));
              })
              .catch((error) => console.error("Error:", error));
          } else {
            setSelectedCaregivers((prevCaregivers) => {
              const updatedCaregivers = {
                ...prevCaregivers,
                [caretakerId]: {
                  name: `${selectedCaregiver.firstName} (${selectedCaregiver.gender})`,
                  id: caregiverId,
                },
              };
              localStorage.setItem(
                "selectedCaregivers",
                JSON.stringify(updatedCaregivers)
              );
              return updatedCaregivers;
            });


            console.log("fetch even came here ", eventKey);
            fetch(`http://localhost:5000/api/manager/allocateCaregiver`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                caretakerId: caretaker.caretakerId,
                caregiverId: eventKey,
                requirementId: caretaker.requirementId,
              }),
            })
              .then((response) => {
                if (response.ok) {
                  console.log("Caregiver updated fgsfdg successfully!");
                } else {
                  console.error("Error updating caregiver:", response.status);
                }
              })
              .catch((error) => console.error("Error:", error));
          }
        })
        .catch((error) => console.error("Error:", error));
    }
  };

  const calculateAge = (dobString) => {
    if (!dobString) {
      return "N/A";
    }
    const dob = dayjs(dobString);
    const now = dayjs();
    return now.diff(dob, "year");
  };

  const getCaretakerStatus = async (caretakerId) => {
    try {
      const response = await axios.get("/api/manager/getCaretakerInformation");
      const caretakers = response.data;

      const caretaker = caretakers.find(
        (caretaker) => caretaker.caretakerId === caretakerId
      );

      if (caretaker) {
        let status;
        if (caretaker.status === "available") {
          status = "abailable";
        } else if (caretaker.status === "onprocess") {
          status = "onprocess";
        } else {
          status = "pending";
        }
        setCaretakerStatuses((prevStatuses) => ({
          ...prevStatuses,
          [caretakerId]: status,
        }));
      } else {
        setCaretakerStatuses((prevStatuses) => ({
          ...prevStatuses,
          [caretakerId]: "No Care Plan",
        }));
      }
    } catch (error) {
      console.error(error.message);
      setCaretakerStatuses((prevStatuses) => ({
        ...prevStatuses,
        [caretakerId]: "Error fetching caretaker information",
      }));
    }
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
                      <th>ID</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Start Date</th>
                      <th>End Date</th>
                      <th>Category</th>
                      <th>Caregiver</th>
                      <th>Preferred Gender</th>
                      <th>Status</th>
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
                          {dayjs(caretaker.startDate).format("DD/MM/YYYY")}
                        </td>
                        <td>{dayjs(caretaker.endDate).format("DD/MM/YYYY")}</td>
                        <td>{caretaker.category}</td>
                        <td>
                          <Dropdown
                            onSelect={(eventKey) =>
                              handleAllocateCaregiver(caretaker, eventKey)
                            }
                          >
                            <Dropdown.Toggle
                              variant="primary"
                              id="dropdown-basic"
                            >
                              {selectedCaregivers[caretaker.caretakerId]
                                ?.name || "Allocate Caregiver"}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              {caregivers.map((caregiver) => (
                                <Dropdown.Item
                                  key={caregiver.caregiverId}
                                  eventKey={caregiver.caregiverId.toString()}
                                >
                                  {`${caregiver.firstName} ${caregiver.lastName}`}
                                </Dropdown.Item>
                              ))}
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                        <td>{caretaker.preffGender}</td>
                        <td id="status-column">
                          {caretakerStatuses[caretaker.caretakerId] ||
                            "Loading..."}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Col>
            </Row>
            <Row className="justify-content-center mb-4">
              <Col md={4} className="d-flex justify-content-center">
                <Dropdown
                  onSelect={(eventKey) => handleViewCaregiver(eventKey)}
                >
                  <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                    Watch caregivers
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {caregivers.map((caregiver) => (
                      <Dropdown.Item
                        key={caregiver.caregiverId}
                        eventKey={caregiver.caregiverId.toString()}
                      >
                        {`${caregiver.firstName} (${caregiver.gender})`}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
            </Row>
            <Row>
              {caretakerDetails && (
                <Col md={4}>
                  <Card>
                    <Card.Header>
                      <Card.Title>Caretaker Details</Card.Title>
                    </Card.Header>
                    <Card.Body>
                      <p>ID: {caretakerDetails.caretakerId}</p>
                      <p>
                        Name: {caretakerDetails.firstName}{" "}
                        {caretakerDetails.lastName}
                      </p>
                      <p>Email: {caretakerDetails.email}</p>
                      <p>Category: {caretakerDetails.category}</p>
                      <p>Age: {calculateAge(caretakerDetails.dateOfBirth)}</p>
                      <p>
                        Address: {caretakerDetails.address},{" "}
                        {caretakerDetails.suburb}
                      </p>
                      <p>
                        Preferred Gender: {caretakerDetails.preferredGender}
                      </p>
                      <p>
                        Status:{" "}
                        {caretakerStatuses[caretakerDetails.caretakerId] ||
                          "Loading..."}
                      </p>
                    </Card.Body>
                  </Card>
                </Col>
              )}
              {selectedCaregiverDetails && (
                <Col md={4}>
                  <Card>
                    <Card.Header>
                      <Card.Title>Caregiver Details</Card.Title>
                    </Card.Header>
                    <Card.Body>
                      <p>ID: {selectedCaregiverDetails.caregiverId}</p>
                      <p>
                        Name: {selectedCaregiverDetails.firstName}{" "}
                        {selectedCaregiverDetails.lastName}
                      </p>
                      <p>Email: {selectedCaregiverDetails.email}</p>
                      <p>Gender: {selectedCaregiverDetails.gender}</p>
                      <p>Phone: {selectedCaregiverDetails.phone}</p>
                      <p>
                        Address: {selectedCaregiverDetails.address},{" "}
                        {selectedCaregiverDetails.suburb}
                      </p>
                    </Card.Body>
                  </Card>
                </Col>
              )}
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;

