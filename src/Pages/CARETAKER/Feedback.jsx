import React, { useState, useEffect } from "react";
import { Container, Button, Modal, Form } from "react-bootstrap";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import FeedbackIcon from "@mui/icons-material/Feedback";
import Sidebar from "../../Components/Sidebar";
import Navbar from "../../Components/Navbar/Navbar";

const getUserFromLocalStorage = localStorage.getItem("userDetails")
  ? JSON.parse(localStorage.getItem("userDetails"))
  : null;

const AddFeedbackPage = () => {
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [showPastFeedbackModal, setShowPastFeedbackModal] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [caretakers, setCaretakers] = useState([]);
  const [selectedCaretaker, setSelectedCaretaker] = useState(null);
  const [selectedCaregiver, setSelectedCaregiver] = useState(null);
  const [caregivers, setCaregivers] = useState([]);
  const [pastFeedback, setPastFeedback] = useState([]);

  useEffect(() => {
    fetchCaretakers();
  }, []);

  const fetchCaretakers = async () => {
    const userId = getUserFromLocalStorage
      ? getUserFromLocalStorage.userId
      : null;
    if (userId) {
      try {
        const response = await fetch(
          `http://localhost:5000/api/feedback/getcaretakers/${userId}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const caretakersData = await response.json();
        setCaretakers(caretakersData);
      } catch (error) {
        console.error("Error fetching caretakers:", error);
      }
    } else {
      console.error("No user ID found in local storage.");
    }
  };

  const fetchCaregivers = async (caretakerId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/feedback/getcaregivers/${caretakerId}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const caregiversData = await response.json();
      setCaregivers(caregiversData);
    } catch (error) {
      console.error("Error fetching caregivers:", error);
    }
  };

  const handleCaretakerChange = (event) => {
    const selectedCaretakerId = event.target.value;
    setSelectedCaretaker(selectedCaretakerId);
    fetchCaregivers(selectedCaretakerId);
  };

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleFeedbackSubmit = async () => {
    const response = await fetch(
      "http://localhost:5000/api/feedback/addfeedback",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: getUserFromLocalStorage.userId,
          caregiver: selectedCaregiver,
          feedback: feedback,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
  
    setShowFeedbackModal(false);
  };

  const handleLeaveFeedback = async (caregiver) => {
    setSelectedCaregiver(caregiver);
    setFeedback("");
    setShowFeedbackModal(true);
  };

  const handleViewPastFeedback = (caregiver) => {
    const feedbackData = [
      { feedback: "Great service!", date: "2024-05-01" },
      { feedback: "Very helpful and kind.", date: "2024-05-15" },
    ];
    setPastFeedback(feedbackData);
    setSelectedCaregiver(caregiver);
    setShowFeedbackModal(false);
    setShowPastFeedbackModal(true);
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar userType={getUserFromLocalStorage.userType} />
      <div style={{ flex: 1 }}>
        <Navbar />
        <div className="mgd-main" style={{ padding: "20px" }}>
          <Container fluid>
            <Container className="mt-5">
              <div className="p-3 shadow rounded">
                <div className="row">
                  <h2 className="mb-4" style={{ textAlign: "center" }}>
                    Allocated Caregivers
                  </h2>

                  <Form.Group controlId="caregiverDropdown">
                    <Form.Label>Select caretaker</Form.Label>
                    <Form.Select onChange={handleCaretakerChange}>
                      <option value="">Select a caretaker</option>
                      {caretakers.map((caretaker) => (
                        <option
                          key={caretaker.caretakerId}
                          value={caretaker.caretakerId}
                        >
                          {caretaker.ctName}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Name</TableCell>
                          <TableCell>Gender</TableCell>
                          <TableCell>Contact</TableCell>
                          <TableCell>Feedback</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {caregivers.map((caregiver, index) => (
                          <TableRow key={index}>
                            <TableCell>{caregiver.fullName}</TableCell>
                            <TableCell>{caregiver.gender}</TableCell>
                            <TableCell>{caregiver.mobileNo}</TableCell>
                            <TableCell>
                              <IconButton
                                onClick={() => handleLeaveFeedback(caregiver)}
                              >
                                <FeedbackIcon />
                              </IconButton>
                              <Button
                                variant="link"
                                onClick={() =>
                                  handleViewPastFeedback(caregiver)
                                }
                              >
                                View Past Feedback
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
              </div>
            </Container>
          </Container>
        </div>
      </div>

      <Modal
        show={showFeedbackModal}
        onHide={() => setShowFeedbackModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Leave Feedback for {selectedCaregiver?.fullName}
          </Modal.Title>
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

      <Modal
        show={showPastFeedbackModal}
        onHide={() => setShowPastFeedbackModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Past Feedback for {selectedCaregiver?.fullName}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {pastFeedback.length > 0 ? (
            <div className="mt-4">
              <h5>Past Feedback</h5>
              <ul>
                {pastFeedback.map((fb, index) => (
                  <li key={index}>
                    {fb.feedback} - {fb.date}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>No past feedback available.</p>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AddFeedbackPage;













//***************************************************************************************************** */

// import React, { useState, useEffect } from "react";
// import { Container, Button, Modal, Form } from "react-bootstrap";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   IconButton,
// } from "@mui/material";
// import FeedbackIcon from "@mui/icons-material/Feedback";
// import Sidebar from "../../Components/Sidebar";
// import Navbar from "../../Components/Navbar/Navbar";

// const getUserFromLocalStorage = localStorage.getItem("userDetails")
//   ? JSON.parse(localStorage.getItem("userDetails"))
//   : null;

// const AddFeedbackPage = () => {
//   const [showFeedbackModal, setShowFeedbackModal] = useState(false);
//   const [showPastFeedbackModal, setShowPastFeedbackModal] = useState(false);
//   const [feedback, setFeedback] = useState("");
//   const [selectedCaregiver, setSelectedCaregiver] = useState(null);
//   const [caregivers, setCaregivers] = useState([]);
//   const [pastFeedback, setPastFeedback] = useState([]);

//   useEffect(() => {
//     // Fetch caregivers data from server
//     fetchCaregivers();
//   }, []);

//   const fetchCaregivers = async () => {
//     const userId = getUserFromLocalStorage
//       ? getUserFromLocalStorage.userId
//       : null;
//     if (userId) {
//       try {
//         const response = await fetch(
//           `http://localhost:5000/api/feedback/getcaregiver/${userId}`
//         );
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         const caregiversData = await response.json();
//         setCaregivers(caregiversData);
//       } catch (error) {
//         console.error("Error fetching caregivers:", error);
//       }
//     } else {
//       console.error("No user ID found in local storage.");
//     }
//   };

//   const handleFeedbackChange = (event) => {
//     setFeedback(event.target.value);
//   };

//   const handleFeedbackSubmit = async () => {
//     const response = await fetch('https://your-server-url/feedback', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             caregiver: selectedCaregiver,
//             feedback: feedback
//         })
//     });

//     if (!response.ok) {
//         throw new Error('Network response was not ok');
//     }

//     setShowFeedbackModal(false);
//   };

//   // const handleLeaveFeedback = (caregiver) => {
//   //   setSelectedCaregiver(caregiver);
//   //   setFeedback("");
//   //   setShowFeedbackModal(true);
//   //   setShowPastFeedbackModal(false);
//   // };

//   const handleLeaveFeedback = async (caregiver) => {
//     setSelectedCaregiver(caregiver);

//     // Fetch the requirement details for the selected caregiver
//     try {
//       const response = await fetch(
//         `http://localhost:5000/api/feedback/getcaregiver/${getUserFromLocalStorage.userId}`
//       );
//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }
//       const caregiversData = await response.json();
//       setCaregivers(caregiversData);
//     } catch (error) {
//       console.error("Error fetching caregivers:", error);
//     }

//     setFeedback("");
//     setShowFeedbackModal(true);
//   };

//   const handleViewPastFeedback = (caregiver) => {
//     // Fetch past feedback for the selected caregiver
//     // Replace with actual API call
//     const feedbackData = [
//       { feedback: "Great service!", date: "2024-05-01" },
//       { feedback: "Very helpful and kind.", date: "2024-05-15" },
//     ];
//     setPastFeedback(feedbackData);
//     setSelectedCaregiver(caregiver);
//     setShowFeedbackModal(false);
//     setShowPastFeedbackModal(true);
//   };

//   return (
//     <div style={{ display: "flex" }}>
//       <Sidebar userType={getUserFromLocalStorage.userType} />
//       <div style={{ flex: 1 }}>
//         <Navbar />
//         <div className="mgd-main" style={{ padding: "20px" }}>
//           <Container fluid>
//             <Container className="mt-5">
//               <div className="p-3 shadow rounded">
//                 <div className="row">
//                   <h2 className="mb-4" style={{ textAlign: "center" }}>
//                     Allocated Caregivers
//                   </h2>
//                   <TableContainer component={Paper}>
//                     <Table>
//                       <TableHead>
//                         <TableRow>
//                           <TableCell>Name</TableCell>
//                           <TableCell>Gender</TableCell>
//                           <TableCell>Contact</TableCell>
//                           <TableCell>Actions</TableCell>
//                         </TableRow>
//                       </TableHead>
//                       <TableBody>
//                         {caregivers.map((caregiver, index) => (
//                           <TableRow key={index}>
//                             <TableCell>{caregiver.fullName}</TableCell>
//                             <TableCell>{caregiver.gender}</TableCell>
//                             <TableCell>{caregiver.mobileNo}</TableCell>
//                             <TableCell>
//                               <IconButton
//                                 onClick={() => handleLeaveFeedback(caregiver)}
//                               >
//                                 <FeedbackIcon />
//                               </IconButton>
//                               <Button
//                                 variant="link"
//                                 onClick={() =>
//                                   handleViewPastFeedback(caregiver)
//                                 }
//                               >
//                                 View Past Feedback
//                               </Button>
//                             </TableCell>
//                           </TableRow>
//                         ))}
//                       </TableBody>
//                     </Table>
//                   </TableContainer>
//                 </div>
//               </div>
//             </Container>
//           </Container>
//         </div>
//       </div>

//       {/* Feedback Modal */}
//       <Modal
//         show={showFeedbackModal}
//         onHide={() => setShowFeedbackModal(false)}
//       >
//         <Modal.Header closeButton>
//           <Modal.Title>
//             Leave Feedback for {selectedCaregiver?.fullName}
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group controlId="formFeedback">
//               <Form.Label>Feedback</Form.Label>
//               <Form.Control
//                 as="textarea"
//                 rows={3}
//                 value={feedback}
//                 onChange={handleFeedbackChange}
//               />
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button
//             variant="secondary"
//             onClick={() => setShowFeedbackModal(false)}
//           >
//             Cancel
//           </Button>
//           <Button variant="primary" onClick={handleFeedbackSubmit}>
//             Submit
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       {/* Past Feedback Modal */}
//       <Modal
//         show={showPastFeedbackModal}
//         onHide={() => setShowPastFeedbackModal(false)}
//       >
//         <Modal.Header closeButton>
//           <Modal.Title>
//             Past Feedback for {selectedCaregiver?.fullName}
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {pastFeedback.length > 0 ? (
//             <div className="mt-4">
//               <h5>Past Feedback</h5>
//               <ul>
//                 {pastFeedback.map((fb, index) => (
//                   <li key={index}>
//                     {fb.feedback} - {fb.date}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ) : (
//             <p>No past feedback available.</p>
//           )}
//         </Modal.Body>
//       </Modal>
//     </div>
//   );
// };

// export default AddFeedbackPage;
