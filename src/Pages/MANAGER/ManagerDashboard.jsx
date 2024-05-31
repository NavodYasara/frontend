import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, Dropdown, Card } from "react-bootstrap";
import dayjs from "dayjs";
import Sidebar from "../../Components/Sidebar";
import Navbar from "../../Components/Navbar/Navbar";

const ManagerDashboard = () => {
  // State variables to store caretakers, caregivers, and their details
  const [caretakers, setCaretakers] = useState([]);
  const [selectedCaretaker, setSelectedCaretaker] = useState(null);
  const [selectedCaregiver, setSelectedCaregiver] = useState(null);
  const [caretakerDetails, setCaretakerDetails] = useState(null);
  const [caregivers, setCaregivers] = useState([]);
  const [selectedCaregiverDetails, setSelectedCaregiverDetails] = useState(null);
  const [selectedCaregivers, setSelectedCaregivers] = useState({});

  // Fetch caretakers and caregivers data when the component mounts
  useEffect(() => {
    // Fetch caretakers data from API
    fetch("http://localhost:5000/api/manager/getCaretakerInformation")
      .then((response) => response.json())
      .then((data) => setCaretakers(Array.isArray(data) ? data : []))
      .catch((error) => console.error("Error:", error));

    // Fetch caregivers data from API
    fetch("http://localhost:5000/api/manager/getCaregivers")
      .then((response) => response.json())
      .then((data) => setCaregivers(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  // Handle click on a caretaker row to fetch and display caretaker details
  const handleRowClick = (caretaker) => {
    setSelectedCaretaker(caretaker);
    fetch(
      `http://localhost:5000/api/manager/getCaretakerById/${caretaker.caretakerId}`
    )
      .then((response) => response.json())
      .then((data) => setCaretakerDetails(data))
      .catch((error) => console.error("Error:", error));
  };

  // const handleViewCaregiver = (caregiverId) => {
  //   console.log("caregiverId is " + caregiverId);
  //   fetch(`http://localhost:5000/api/manager/getCaregiverById/${caregiverId}`)
  //     .then((response) => {
  //       if (!response.ok) {
  //         // Handle errors like 404 Not Found
  //         if (response.status === 404) {
  //           console.error("Caregiver not found:", response.status);
  //           setSelectedCaregiverDetails(null); // Clear state if caregiver is not found
  //           return; // Exit the function
  //         }
  //         throw new Error("Network response was not ok");
  //       }
  //       return response.json(); // Parse the response as JSON
  //     })
  //     .then((data) => {
  //       // Now data is an object
  //       if (data) {
  //         setSelectedCaregiverDetails(data);
  //       } else {
  //         console.log("No data returned from server");
  //       }
  //     })
  //     .catch((error) => console.error("Error:", error));
  // };

  // Handle caregiver selection and allocate the caregiver to the caretaker

  const handleViewCaregiver = (eventKey) => {
  const selectedCaregiver = caregivers.find(
    (caregiver) => caregiver.caregiverId.toString() === eventKey
  );

  if (selectedCaregiver) {
    fetch(`http://localhost:5000/api/manager/caregivers/${selectedCaregiver.caregiverId}`)
      .then((response) => response.json())
      .then((data) => {
        setSelectedCaregiverDetails(data);
      })
      .catch((error) => console.error("Error:", error));
  }
};


  const handleAllocateCaregiver = async (caretaker, eventKey) => {
    const selectedCaregiver = caregivers.find(
      (caregiver) => caregiver.caregiverId.toString() === eventKey
    );

    if (selectedCaregiver) {
      const caregiverId = selectedCaregiver.caregiverId;
      setSelectedCaregivers({
        ...selectedCaregivers,
        [caretaker.caretakerId]: {
          name: `${selectedCaregiver.firstName} (${selectedCaregiver.gender})`,
          id: caregiverId,
        },
      });

      // Fetch caregiver details
      fetch(`http://localhost:5000/api/manager/caregivers/${caregiverId}`)
        .then((response) => response.json())
        .then((data) => {
          // setSelectedCaregiverDetails(data);
          setSelectedCaregiver(data);

          // Allocate caregiver to caretaker via API
          fetch(`http://localhost:5000/api/manager/allocateCaregiver`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              caretakerId: caretaker.caretakerId,
              caregiverId: caregiverId,
              requirementId: caretaker.requirementId,
              instruction: "Placeholder Instruction",
            }),
          })
            .then((response) => {
              if (response.ok) {
                console.log("Caregiver allocated successfully!");
              } else {
                console.error("Error allocating caregiver:", response.status);
              }
            })
            .catch((error) => console.error("Error:", error));
        })
        .catch((error) => console.error("Error:", error));
    }
  };

  // Calculate age from date of birth
  const calculateAge = (dobString) => {
    if (!dobString) {
      return "N/A";
    }
    const dob = dayjs(dobString);
    const now = dayjs();
    return now.diff(dob, "year");
  };

  // Get user details from local storage
  const getUserfromLocalStorage = localStorage.getItem("userDetails")
    ? JSON.parse(localStorage.getItem("userDetails"))
    : null;

  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar for navigation */}
      <Sidebar userType={getUserfromLocalStorage?.userType} />
      <div style={{ flex: 1 }}>
        <Navbar />
        <div className="mgd-main" style={{ padding: "20px" }}>
          <Container fluid>
            <Row>
              <Col>
                {/* Table to display caretakers */}
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
                          {dayjs(caretaker.startDate).format("YYYY-MM-DD")}
                        </td>
                        <td>{dayjs(caretaker.endDate).format("YYYY-MM-DD")}</td>
                        <td>{caretaker.mediCondition}</td>
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
                                ?.name || "Select Caregiver"}
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
                        </td>
                        <td>{caretaker.preffGender}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Col>
            </Row>

            <Row>
              <Col>
                {/* Dropdown to watch caregivers */}
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

            {/* Display caretaker details */}
            {caretakerDetails && (
              <Row>
                <Col className="caretaker details section">
                  <Card>
                    <Card.Body>
                      <Card.Title>Caretaker Information</Card.Title>
                      <Card.Text>
                        <p>
                          Name:{" "}
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
                        Age: {calculateAge(caretakerDetails.formattedDob)}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>

                {/* Display caregiver details */}
                <Col>
                  {selectedCaregiverDetails && (
                    <Card>
                      <Card.Body>
                        <Card.Title>Caregiver Information</Card.Title>
                        <Card.Text>
                          <p>
                            Name:{" "}
                            {`${selectedCaregiverDetails.firstName} ${selectedCaregiverDetails.lastName}`}
                          </p>
                          <p>
                            Availability:{" "}
                            {selectedCaregiverDetails.availability ===
                            "AVAILABLE"
                              ? "Available"
                              : "Unavailable"}
                          </p>
                          <p>Gender: {selectedCaregiverDetails.gender}</p>
                          <p>Mobile No: {selectedCaregiverDetails.mobileNo}</p>
                          <p>
                            Age:{" "}
                            {calculateAge(
                              selectedCaregiverDetails.formattedDob
                            )}
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
