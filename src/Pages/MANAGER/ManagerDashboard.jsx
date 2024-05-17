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
    {
      caretakerid: 2,
      firstName: "Bob",
      startDate: "2023-02-01",
      endDate: "2023-11-30",
      gender: "Male",
      caregiver: "Sample Caregiver B",
    },
    {
      caretakerid: 3,
      firstName: "Charlie",
      startDate: "2023-03-01",
      endDate: "2023-10-31",
      gender: "Male",
      caregiver: "Sample Caregiver C",
    },
    {
      caretakerid: 4,
      firstName: "David",
      startDate: "2023-04-01",
      endDate: "2023-09-30",
      gender: "Male",
      caregiver: "Sample Caregiver D",
    },
    {
      caretakerid: 5,
      firstName: "Eve",
      startDate: "2023-05-01",
      endDate: "2023-08-31",
      gender: "Female",
      caregiver: "Sample Caregiver E",
    },
    {
      caretakerid: 6,
      firstName: "Frank",
      startDate: "2023-06-01",
      endDate: "2023-07-31",
      gender: "Male",
      caregiver: "Sample Caregiver F",
    },
    {
      caretakerid: 7,
      firstName: "Grace",
      startDate: "2023-07-01",
      endDate: "2023-12-31",
      gender: "Female",
      caregiver: "Sample Caregiver G",
    },
    {
      caretakerid: 8,
      firstName: "Hank",
      startDate: "2023-08-01",
      endDate: "2023-11-30",
      gender: "Male",
      caregiver: "Sample Caregiver H",
    },
    {
      caretakerid: 9,
      firstName: "Ivy",
      startDate: "2023-09-01",
      endDate: "2023-10-31",
      gender: "Female",
      caregiver: "Sample Caregiver I",
    },
    {
      caretakerid: 10,
      firstName: "Jack",
      startDate: "2023-10-01",
      endDate: "2023-12-31",
      gender: "Male",
      caregiver: "Sample Caregiver J",
    },
    {
      caretakerid: 11,
      firstName: "Kathy",
      startDate: "2023-11-01",
      endDate: "2023-12-31",
      gender: "Female",
      caregiver: "Sample Caregiver K",
    },
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
                      <tr>
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


// import React, { useState, useEffect } from "react";
// import Container from "react-bootstrap/Container";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
// import Form from "react-bootstrap/Form";
// import Table from "react-bootstrap/Table";
// import Dropdown from "react-bootstrap/Dropdown";
// import dayjs from "dayjs";
// import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";


// const ManagerDashboard = () => {
//   const [caretakers, setCaretakers] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");

//   useEffect(() => {
//     fetch("http://localhost:5000/caretakerDetails")
//       .then((response) => response.json())
//       .then((data) => setCaretakers(data))
//       .catch((error) => console.error("Error:", error));
//   }, []);

//   const handleSearch = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   const filteredCaretakers = caretakers.filter((caretaker) =>
//     caretaker.firstName.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // Sample data for demonstration
//   const sampleCaretakers = [
//     {
//       caretakerid: 1,
//       firstName: "Alice",
//       startDate: "2023-01-01",
//       endDate: "2023-12-31",
//       gender: "Female",
//       caregiver: "Sample Caregiver",
//     },
//     // Add more sample data as needed
//   ];

//   return (
//     <>
//       <div className="mgd-main" style={{ alignItems: "center" }}>
//         <div className="calenderview">
//           <LocalizationProvider dateAdapter={AdapterDayjs}>
//             <DemoContainer
//               components={[
//                 "DatePicker",
//                 "MobileDatePicker",
//                 "DesktopDatePicker",
//                 "StaticDatePicker",
//               ]}
//             >
//               <div className="bg-primary">
//                 <DemoItem label="Static variant">
//                   <StaticDatePicker defaultValue={dayjs("2022-04-17")} />
//                 </DemoItem>
//               </div>
//             </DemoContainer>
//           </LocalizationProvider>
//         </div>

//         <div className="section-2">
//           <Container fluid>
//             <Row>
//               <Col>
//                 <Form>
//                   <Form.Group controlId="caretakerSearch">
//                     <Form.Label>Search Caretaker</Form.Label>
//                     <Form.Control
//                       type="text"
//                       placeholder="Enter name"
//                       value={searchTerm}
//                       onChange={handleSearch}
//                     />
//                   </Form.Group>
//                 </Form>
//                 <Table striped bordered hover>
//                   <thead>
//                     <tr>
//                       <th>#</th>
//                       <th>Caretaker ID</th>
//                       <th>Caretaker's Name</th>
//                       <th>Start Date</th>
//                       <th>End Date</th>
//                       <th>Preferred Gender</th>
//                       <th>Caregiver</th>
//                       <th>Gender</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {sampleCaretakers.map((caretaker, index) => (
//                       <tr key={index}>
//                         <td>{index + 1}</td>
//                         <td>{caretaker.caretakerid}</td>
//                         <td>{caretaker.firstName}</td>
//                         <td>
//                           {dayjs(caretaker.startDate).format("YYYY-MM-DD")}
//                         </td>
//                         <td>
//                           {dayjs(caretaker.endDate).format("YYYY-MM-DD")}
//                         </td>
//                         <td>{caretaker.gender}</td>
//                         <td>
//                           <Dropdown>
//                             <Dropdown.Toggle variant="secondary" id="dropdown-basic">
//                               {caretaker.caregiver}
//                             </Dropdown.Toggle>

//                             <Dropdown.Menu>
//                               <Dropdown.Item>Action</Dropdown.Item>
//                               {/* Add more dropdown items as needed */}
//                             </Dropdown.Menu>
//                           </Dropdown>
//                         </td>
//                         <td>{caretaker.gender}</td>
//                       </tr>
                      
//                     ))}
//                   </tbody>
//                 </Table>
//               </Col>
              
//             </Row>
//           </Container>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ManagerDashboard;
