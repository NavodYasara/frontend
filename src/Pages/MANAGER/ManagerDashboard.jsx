import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";


const ManagerDashboard = () => {
  const [caretakers, setCaretakers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/caretakerDetails")
      .then((response) => response.json())
      .then((data) => setCaretakers(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
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
    },
    // Add more sample data as needed
  ];

  return (
    <>
      <div className="mgd-main" style={{ alignItems: "center" }}>
        <div className="calenderview">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer
              components={[
                "DatePicker",
                "MobileDatePicker",
                "DesktopDatePicker",
                "StaticDatePicker",
              ]}
            >
              <div className="bg-primary">
                <DemoItem label="Static variant">
                  <StaticDatePicker defaultValue={dayjs("2022-04-17")} />
                </DemoItem>
              </div>
            </DemoContainer>
          </LocalizationProvider>
        </div>

        <div className="section-2">
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
                      <th>#</th>
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
                    {sampleCaretakers.map((caretaker, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{caretaker.caretakerid}</td>
                        <td>{caretaker.firstName}</td>
                        <td>
                          {dayjs(caretaker.startDate).format("YYYY-MM-DD")}
                        </td>
                        <td>
                          {dayjs(caretaker.endDate).format("YYYY-MM-DD")}
                        </td>
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
          </Container>
        </div>
      </div>
    </>
  );
};

export default ManagerDashboard;
