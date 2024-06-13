import React, { useState, useEffect } from "react";
import { Container, Button, Modal, FormControl, InputLabel, Select, MenuItem, TextField } from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
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
    const userId = getUserFromLocalStorage ? getUserFromLocalStorage.userId : null;
    if (userId) {
      try {
        const response = await fetch(`http://localhost:5000/api/feedback/getcaretakers/${userId}`);
        if (!response.ok) throw new Error("Network response was not ok");
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
      const response = await fetch(`http://localhost:5000/api/feedback/getcaregivers/${caretakerId}`);
      if (!response.ok) throw new Error("Network response was not ok");
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
    const response = await fetch("http://localhost:5000/api/feedback/addfeedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: getUserFromLocalStorage.userId,
        caregiver: selectedCaregiver,
        feedback: feedback,
      }),
    });

    if (!response.ok) throw new Error("Network response was not ok");

    setShowFeedbackModal(false);
  };

  const handleLeaveFeedback = (caregiver) => {
    setSelectedCaregiver(caregiver);
    setFeedback("");
    setShowFeedbackModal(true);
  };

  const handleViewPastFeedback = async (caregiver) => {
    try {
      const response = await fetch(`http://localhost:5000/api/feedback/getFeedbackHistory/${getUserFromLocalStorage.userId}`);
      if (!response.ok) throw new Error("Network response was not ok");
      const feedbackData = await response.json();
      setPastFeedback(feedbackData);
      setSelectedCaregiver(caregiver);
      setShowFeedbackModal(false);
      setShowPastFeedbackModal(true);
    } catch (error) {
      console.error("Error fetching feedback history:", error);
    }
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
                  <Typography variant="h4" align="center" className="mb-4">
                    Allocated Caregivers
                  </Typography>

                  <FormControl fullWidth>
                    <InputLabel>Select caretaker</InputLabel>
                    <Select value={selectedCaretaker} onChange={handleCaretakerChange}>
                      <MenuItem value=""><em>Select a caretaker</em></MenuItem>
                      {caretakers.map((caretaker) => (
                        <MenuItem key={caretaker.caretakerId} value={caretaker.caretakerId}>
                          {caretaker.ctName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <TableContainer component={Paper} className="mt-4">
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
                              <IconButton onClick={() => handleLeaveFeedback(caregiver)}>
                                <FeedbackIcon />
                              </IconButton>
                              <Button variant="text" onClick={() => handleViewPastFeedback(caregiver)}>
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

      <Modal open={showFeedbackModal} onClose={() => setShowFeedbackModal(false)}>
        <div style={{ padding: '20px', background: 'white', margin: '20px auto', maxWidth: '500px' }}>
          <Typography variant="h6">
            Leave Feedback for {selectedCaregiver?.fullName}
          </Typography>
          <TextField
            label="Feedback"
            multiline
            rows={4}
            fullWidth
            value={feedback}
            onChange={handleFeedbackChange}
            variant="outlined"
            className="mt-3"
          />
          <div className="mt-4" style={{ textAlign: 'right' }}>
            <Button variant="contained" color="secondary" onClick={() => setShowFeedbackModal(false)} className="mr-2">
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={handleFeedbackSubmit}>
              Submit
            </Button>
          </div>
        </div>
      </Modal>

      <Modal open={showPastFeedbackModal} onClose={() => setShowPastFeedbackModal(false)}>
        <div style={{ padding: '20px', background: 'white', margin: '20px auto', maxWidth: '500px' }}>
          <Typography variant="h6">
            Past Feedback for {selectedCaregiver?.fullName}
          </Typography>
          {pastFeedback.length > 0 ? (
            <ul className="mt-4">
              {pastFeedback.map((fb, index) => (
                <li key={index}>{fb.feedback} - {fb.date}</li>
              ))}
            </ul>
          ) : (
            <Typography variant="body1">No past feedback available.</Typography>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default AddFeedbackPage;





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
//   const [caretakers, setCaretakers] = useState([]);
//   const [selectedCaretaker, setSelectedCaretaker] = useState(null);
//   const [selectedCaregiver, setSelectedCaregiver] = useState(null);
//   const [caregivers, setCaregivers] = useState([]);
//   const [pastFeedback, setPastFeedback] = useState([]);

//   useEffect(() => {
//     fetchCaretakers();

//   }, []);

//   const fetchCaretakers = async () => {
//     const userId = getUserFromLocalStorage
//       ? getUserFromLocalStorage.userId
//       : null;
//     if (userId) {
//       try {
//         const response = await fetch(
//           `http://localhost:5000/api/feedback/getcaretakers/${userId}`
//         );
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         const caretakersData = await response.json();
//         setCaretakers(caretakersData);
//       } catch (error) {
//         console.error("Error fetching caretakers:", error);
//       }
//     } else {
//       console.error("No user ID found in local storage.");
//     }
//   };

//   const fetchCaregivers = async (caretakerId) => {
//     try {
//       const response = await fetch(
//         `http://localhost:5000/api/feedback/getcaregivers/${caretakerId}`
//       );
//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }
//       const caregiversData = await response.json();
//       setCaregivers(caregiversData);
//     } catch (error) {
//       console.error("Error fetching caregivers:", error);
//     }
//   };

//   const handleCaretakerChange = (event) => {
//     const selectedCaretakerId = event.target.value;
//     setSelectedCaretaker(selectedCaretakerId);
//     fetchCaregivers(selectedCaretakerId);
//   };

//   const handleFeedbackChange = (event) => {
//     setFeedback(event.target.value);
//   };

//   const handleFeedbackSubmit = async () => {
//     const response = await fetch(
//       "http://localhost:5000/api/feedback/addfeedback",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           userId: getUserFromLocalStorage.userId,
//           caregiver: selectedCaregiver,
//           feedback: feedback,
//         }),
//       }
//     );

//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }

//     setShowFeedbackModal(false);
//   };

//   const handleLeaveFeedback = async (caregiver) => {
//     setSelectedCaregiver(caregiver);
//     setFeedback("");
//     setShowFeedbackModal(true);
//   };

//   const handleViewPastFeedback = async (caregiver) => {
//     console.log(getUserFromLocalStorage.userId);
//     try {
//       const response = await fetch(
//         `http://localhost:5000/api/feedback/getFeedbackHistory/${getUserFromLocalStorage.userId}`
//       );

//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }
//       const feedbackData = await response.json();
//       setPastFeedback(feedbackData);
//       console.log(feedbackData);
//       setSelectedCaregiver(caregiver);
//       setShowFeedbackModal(false);
//       setShowPastFeedbackModal(true);
//     } catch (error) {
//       console.error("Error fetching feedback history:", error);
//     }
//   };

//   // const handleViewPastFeedback = async (caregiver) => {
//   //   try {
//   //     const response = await fetch(
//   //       `http://localhost:5000/api/feedback/getFeedbackHistory/${caregiver.requirementId}`
//   //     );
//   //     console.log(caregiver.requirementId);
//   //     if (!response.ok) {
//   //       throw new Error("Network response was not ok");
//   //     }
//   //     const feedbackData = await response.json();
//   //     setPastFeedback(feedbackData);
//   //     setSelectedCaregiver(caregiver);
//   //     setShowFeedbackModal(false);
//   //     setShowPastFeedbackModal(true);
//   //   } catch (error) {
//   //     console.error("Error fetching feedback history:", error);
//   //   }
//   // };

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

//                   <Form.Group controlId="caregiverDropdown">
//                     <Form.Label>Select caretaker</Form.Label>
//                     <Form.Select onChange={handleCaretakerChange}>
//                       <option value="">Select a caretaker</option>
//                       {caretakers.map((caretaker) => (
//                         <option
//                           key={caretaker.caretakerId}
//                           value={caretaker.caretakerId}
//                         >
//                           {caretaker.ctName}
//                         </option>
//                       ))}
//                     </Form.Select>
//                   </Form.Group>
//                   <TableContainer component={Paper}>
//                     <Table>
//                       <TableHead>
//                         <TableRow>
//                           <TableCell>Name</TableCell>
//                           <TableCell>Gender</TableCell>
//                           <TableCell>Contact</TableCell>
//                           <TableCell>Feedback</TableCell>
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

