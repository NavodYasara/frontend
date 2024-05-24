import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Table,
  Dropdown,
  Card,
} from "react-bootstrap";
import dayjs from "dayjs";
import Sidebar from "../../Components/Sidebar";
import Navbar from "../../Components/Navbar/Navbar";

const ManagerDashboard = () => {
  const [caretakers, setCaretakers] = useState([]);
  const [selectedCaretaker, setSelectedCaretaker] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/manager/caretakerInformation")
      .then((response) => response.json())
      .then((data) => setCaretakers(Array.isArray(data) ? data : []))
      .catch((error) => console.error("Error:", error));
  }, []);

  const handleRowClick = (caretaker) => {
    setSelectedCaretaker(caretaker);
  };

  const selectedCaregiver = caretakers && Array.isArray(caretakers)
    ? caretakers.find(
        (caregiver) => caregiver.name === selectedCaretaker?.caregiver
      )
    : null;

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
                      <th>Preferred Gender</th>
                      <th>Caregiver</th>
                      <th>Gender</th>
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
                        <td>{caretaker.gender}</td>
                        <td>
                          <Dropdown>
                            <Dropdown.Toggle
                              variant="secondary"
                              id="dropdown-basic"
                            >
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
                        <p>Name: {`${selectedCaretaker.firstName} ${selectedCaretaker.lastName}`}</p>
                        <p>Medical Conditions: {selectedCaretaker.mediCondition || "N/A"}</p>
                        <p>Emergency Contact: {selectedCaretaker.emergCont || "N/A"}</p>
                        <p>Address: {selectedCaretaker.address}</p>
                        <p>Requirement: {selectedCaretaker.requirement}</p>
                        <p>Age: {dayjs().year() - dayjs(selectedCaretaker.dob).year()}</p>
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



// import React, { useState, useEffect } from "react";
// import {
//   Container,
//   Row,
//   Col,
//   Form,
//   Table,
//   Dropdown,
//   Card,
// } from "react-bootstrap";
// import dayjs from "dayjs";
// import Sidebar from "../../Components/Sidebar";
// import Navbar from "../../Components/Navbar/Navbar";

// const ManagerDashboard = () => {
//   const [caretakers, setCaretakers] = useState([]);
  
//   const [selectedCaretaker, setSelectedCaretaker] = useState(null);

//   useEffect(() => {
//     fetch("http://localhost:5000/api/manager/caretakerInformation")
//       .then((response) => response.json())
//       .then((data) => setCaretakers(data))
//       .catch((error) => console.error("Error:", error));
//   }, []);

  

//   const handleRowClick = (caretaker) => {
//     setSelectedCaretaker(caretaker);
//   };

//   // Remove the declaration and assignment of the filteredCaretakers variable
//   // caretakers.filter((caretaker) =>
//   //   caretaker.firstName.toLowerCase().includes(searchTerm.toLowerCase())
//   // );

//   // Sample data for demonstration
//   const sampleCaretakers = [
//     {
//       caretakerid: 1,
//       firstName: "Alice",
//       lastName: "Smith",
//       startDate: "2023-01-01",
//       endDate: "2023-12-31",
//       gender: "Female",
//       caregiver: "Sample Caregiver A",
//       mediCondition: "Condition A",
//       emergencyContact: "1234567890",
//       address: "123 Street A",
//       requirement: "Requirement A",
//       age: 30,
//     },
//     {
//       caretakerid: 2,
//       firstName: "Bob",
//       lastName: "Johnson",
//       startDate: "2023-02-01",
//       endDate: "2023-11-30",
//       gender: "Male",
//       caregiver: "Sample Caregiver B",
//       mediCondition: "Condition B",
//       emergencyContact: "0987654321",
//       address: "456 Street B",
//       requirement: "Requirement B",
//       age: 40,
//     },
//   ];

//   const sampleCaregivers = [
//     {
//       caregiverid: 1,
//       name: "Sample Caregiver A",
//       age: 35,
//       category: "Category A",
//       gender: "Female",
//       unavailableDates: ["2023-01-01", "2023-02-15"],
//     },
//     {
//       caregiverid: 2,
//       name: "Sample Caregiver B",
//       age: 45,
//       category: "Category B",
//       gender: "Male",
//       unavailableDates: ["2023-03-01", "2023-04-10"],
//     },
//   ];

//   const selectedCaregiver = sampleCaregivers.find(
//     (caregiver) => caregiver.name === selectedCaretaker?.caregiver
//   );

//   const getUserfromLocalStorage = localStorage.getItem("userDetails")
//     ? JSON.parse(localStorage.getItem("userDetails"))
//     : null;

//   return (
//     <div style={{ display: "flex" }}>
//       <Sidebar userType={getUserfromLocalStorage.userType} />
//       <div style={{ flex: 1 }}>
//         <Navbar />
//         <div className="mgd-main" style={{ padding: "20px" }}>
//           <Container fluid>
//             <Row>
//               <Col>
//                 <Table striped bordered hover>
//                   <thead>
//                     <tr>
//                       <th>Caretaker ID</th>
//                       <th> First Name</th>
//                       <th> Last Name</th>
//                       <th>Start Date</th>
//                       <th>End Date</th>
//                       <th>conditions</th>
//                       <th>Preferred Gender</th>
//                       <th>Caregiver</th>
//                       <th>Gender</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {sampleCaretakers.map((caretaker) => (
//                       <tr
//                         key={caretaker.caretakerid}
//                         onClick={() => handleRowClick(caretaker)}
//                       >
//                         <td>{caretaker.caretakerid}</td>
//                         <td>{caretaker.firstName}</td>
//                         <td>{caretaker.lastName}</td>
//                         <td>
//                           {dayjs(caretaker.startDate).format("YYYY-MM-DD")}
//                         </td>
//                         <td>{dayjs(caretaker.endDate).format("YYYY-MM-DD")}</td>
//                          <td>{caretaker.mediCondition}</td>
//                         <td>{caretaker.gender}</td>
//                         <td>
//                           <Dropdown>
//                             <Dropdown.Toggle
//                               variant="secondary"
//                               id="dropdown-basic"
//                             >
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

//             {selectedCaretaker && (
//               <Row>
//                 <Col>
//                   <Card>
//                     <Card.Body>
//                       <Card.Title>Caretaker Information</Card.Title>
//                       <Card.Text>
//                         <p>Name: {selectedCaretaker.userName}</p>
//                         <p>
//                           Medical Conditions:{" "}
//                           {selectedCaretaker.medicalConditions}
//                         </p>
//                         <p>
//                           Emergency Contact:{" "}
//                           {selectedCaretaker.emergencyContact}
//                         </p>
//                         <p>Address: {selectedCaretaker.address}</p>
//                         <p>Requirement: {selectedCaretaker.requirement}</p>
//                         <p>Age: {selectedCaretaker.age}</p>
//                       </Card.Text>
//                     </Card.Body>
//                   </Card>
//                 </Col>
//                 <Col>
//                   {selectedCaregiver && (
//                     <Card>
//                       <Card.Body>
//                         <Card.Title>Caregiver Information</Card.Title>
//                         <Card.Text>
//                           <p>Name: {selectedCaregiver.name}</p>
//                           <p>Age: {selectedCaregiver.age}</p>
//                           <p>Category: {selectedCaregiver.category}</p>
//                           <p>Gender: {selectedCaregiver.gender}</p>
//                           <p>
//                             Unavailable Dates:{" "}
//                             {selectedCaregiver.unavailableDates.join(", ")}
//                           </p>
//                         </Card.Text>
//                       </Card.Body>
//                     </Card>
//                   )}
//                 </Col>
//               </Row>
//             )}
//           </Container>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ManagerDashboard;



// import React, { useState, useEffect } from "react";
// import {
//   Container,
//   Row,
//   Col,
//   Form,
//   Table,
//   Dropdown,
//   Card,
// } from "react-bootstrap";
// import dayjs from "dayjs";
// import Sidebar from "../../Components/Sidebar";
// import Navbar from "../../Components/Navbar/Navbar";

// const ManagerDashboard = () => {
//   const [caretakers, setCaretakers] = useState([]);
  
//   const [selectedCaretaker, setSelectedCaretaker] = useState(null);

//   useEffect(() => {
//     fetch("http://localhost:5000/api/manager/caretakerInformation")
//       .then((response) => response.json())
//       .then((data) => setCaretakers(data))
//       .catch((error) => console.error("Error:", error));
//   }, []);

  

//   const handleRowClick = (caretaker) => {
//     setSelectedCaretaker(caretaker);
//   };


//   const selectedCaregiver = caretakers.find(
//     (caregiver) => caregiver.name === selectedCaretaker?.caregiver
//   );

//   const getUserfromLocalStorage = localStorage.getItem("userDetails")
//     ? JSON.parse(localStorage.getItem("userDetails"))
//     : null;

//   return (
//     <div style={{ display: "flex" }}>
//       <Sidebar userType={getUserfromLocalStorage.userType} />
//       <div style={{ flex: 1 }}>
//         <Navbar />
//         <div className="mgd-main" style={{ padding: "20px" }}>
//           <Container fluid>
//             <Row>
//               <Col>
//                 <Table striped bordered hover>
//                   <thead>
//                     <tr>
//                       <th>Caretaker ID</th>
//                       <th> First Name</th>
//                       <th> Last Name</th>
//                       <th>Start Date</th>
//                       <th>End Date</th>
//                       <th>conditions</th>
//                       <th>Preferred Gender</th>
//                       <th>Caregiver</th>
//                       <th>Gender</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {caretakers.map((caretaker) => (
//                       <tr
//                         key={caretaker.caretakerid}
//                         onClick={() => handleRowClick(caretaker)}
//                       >
//                         <td>{caretaker.caretakerid}</td>
//                         <td>{caretaker.firstName}</td>
//                         <td>{caretaker.lastName}</td>
//                         <td>
//                           {dayjs(caretaker.startDate).format("YYYY-MM-DD")}
//                         </td>
//                         <td>{dayjs(caretaker.endDate).format("YYYY-MM-DD")}</td>
//                          <td>{caretaker.mediCondition}</td>
//                         <td>{caretaker.gender}</td>
//                         <td>
//                           <Dropdown>
//                             <Dropdown.Toggle
//                               variant="secondary"
//                               id="dropdown-basic"
//                             >
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

//             {selectedCaretaker && (
//               <Row>
//                 <Col>
//                   <Card>
//                     <Card.Body>
//                       <Card.Title>Caretaker Information</Card.Title>
//                       <Card.Text>
//                         <p>Name: {selectedCaretaker.userName}</p>
//                         <p>
//                           Medical Conditions:{" "}
//                           {selectedCaretaker.medicalConditions}
//                         </p>
//                         <p>
//                           Emergency Contact:{" "}
//                           {selectedCaretaker.emergencyContact}
//                         </p>
//                         <p>Address: {selectedCaretaker.address}</p>
//                         <p>Requirement: {selectedCaretaker.requirement}</p>
//                         <p>Age: {selectedCaretaker.age}</p>
//                       </Card.Text>
//                     </Card.Body>
//                   </Card>
//                 </Col>
//                 <Col>
//                   {selectedCaregiver && (
//                     <Card>
//                       <Card.Body>
//                         <Card.Title>Caregiver Information</Card.Title>
//                         <Card.Text>
//                           <p>Name: {selectedCaregiver.name}</p>
//                           <p>Age: {selectedCaregiver.age}</p>
//                           <p>Category: {selectedCaregiver.category}</p>
//                           <p>Gender: {selectedCaregiver.gender}</p>
//                           <p>
//                             Unavailable Dates:{" "}
//                             {selectedCaregiver.unavailableDates.join(", ")}
//                           </p>
//                         </Card.Text>
//                       </Card.Body>
//                     </Card>
//                   )}
//                 </Col>
//               </Row>
//             )}
//           </Container>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ManagerDashboard;



