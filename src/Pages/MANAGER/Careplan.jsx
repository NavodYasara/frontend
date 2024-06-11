import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Table, Typography, Paper, Box } from "@mui/material";
import Sidebar from "../../Components/Sidebar";
import Navbar from "../../Components/Navbar/Navbar";

function Careplan() {
  const [careplans, setCareplans] = useState([]);
  const [caretakerStatuses, setCaretakerStatuses] = useState({});
  const getUserfromLocalStorage = localStorage.getItem("userDetails")
    ? JSON.parse(localStorage.getItem("userDetails"))
    : null;

  useEffect(() => {
    async function fetchCareplans() {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/careplan/getCareplans"
        );
        setCareplans(response.data);
      } catch (error) {
        console.error("Error fetching care plans:", error);
      }
    }

    fetchCareplans();
  }, []);

  const getCaretakerStatus = async (caretakerId) => {
    try {
      const response = await axios.get(`/api/caretakers/${caretakerId}`);
      const caretaker = response.data;

      let status =
        caretaker.status === "available"
          ? "available"
          : caretaker.status === "onprocess"
          ? "onprocess"
          : "pending";

      setCaretakerStatuses((prevStatuses) => ({
        ...prevStatuses,
        [caretakerId]: status,
      }));
    } catch (error) {
      console.error(error.message);
      setCaretakerStatuses((prevStatuses) => ({
        ...prevStatuses,
        [caretakerId]: "Error fetching caretaker information",
      }));
    }
  };

  useEffect(() => {
    careplans.forEach((careplan) => {
      getCaretakerStatus(careplan.caretakerId);
    });
  }, [careplans]);

  return (
    <div style={{ display: "flex" }}>
      <Sidebar userType={getUserfromLocalStorage.userType} />
      <div style={{ flex: 1 }}>
        <Navbar />
        <Container style={{ padding: "20px" }}>
          <Typography variant="h4" gutterBottom>
            Current Care Plans
          </Typography>
          {careplans.map((careplan) => (
            <Paper
              key={careplan.careplanId}
              style={{ padding: "20px", marginBottom: "20px" }}
            >
              <Box>
                <Typography variant="h6">
                  Care Plan ID: {careplan.careplanId}
                </Typography>
                <Table>
                  <tbody>
                    <tr>
                      <td>Caregiver:</td>
                      <td>
                        {careplan.caregiverFirstName}{" "}
                        {careplan.caregiverLastName}
                      </td>
                    </tr>
                    <tr>
                      <td>Caretaker:</td>
                      <td>
                        {careplan.caretakerFirstName}{" "}
                        {careplan.caretakerLastName}
                      </td>
                    </tr>
                    <tr>
                      <td>Started On:</td>
                      <td>
                        {new Date(careplan.startDate).toLocaleDateString()}
                      </td>
                    </tr>
                    <tr>
                      <td>Requirement:</td>
                      <td>{careplan.instruction}</td>
                    </tr>
                    <tr>
                      <td>Caretaker Status:</td>
                      <td>{caretakerStatuses[careplan.caretakerId]}</td>
                    </tr>
                  </tbody>
                </Table>
              </Box>
            </Paper>
          ))}
        </Container>
      </div>
    </div>
  );
}

export default Careplan;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Container, Table, Typography, Paper, Box } from "@mui/material";
// import Sidebar from "../../Components/Sidebar";
// import Navbar from "../../Components/Navbar/Navbar";

// function Careplan() {
//   const [careplans, setCareplans] = useState([]);
//   const [caretakerStatuses, setCaretakerStatuses] = useState({});
//   const getUserfromLocalStorage = localStorage.getItem("userDetails")
//     ? JSON.parse(localStorage.getItem("userDetails"))
//     : null;

//   useEffect(() => {
//     async function fetchCareplans() {
//       try {
//         const response = await axios.get(
//           "http://localhost:5000/api/careplan/getCareplans"
//         );
//         setCareplans(response.data);
//       } catch (error) {
//         console.error("Error fetching care plans:", error);
//       }
//     }

//     fetchCareplans();
//   }, []);

//  const getCaretakerStatus = async (caretakerId) => {
//     try {
//       const response = await axios.get(`/api/caretakers/${caretakerId}`);
//       const caretaker = response.data;

//       let status =
//         caretaker.status === "Accepted"
//           ? "Accepted"
//           : caretaker.status === "Started"
//           ? "Started"
//           : "not assigned";

//       setCaretakerStatuses((prevStatuses) => ({
//         ...prevStatuses,
//         [caretakerId]: status,
//       }));
//     } catch (error) {
//       console.error(error.message);
//       setCaretakerStatuses((prevStatuses) => ({
//         ...prevStatuses,
//         [caretakerId]: "Error fetching caretaker information",
//       }));
//     }
//   };

//   useEffect(() => {
//     careplans.forEach((careplan) => {
//       getCaretakerStatus(careplan.caretakerId);
//     });
//   }, [careplans]);

//   return (
//     <div style={{ display: "flex" }}>
//       <Sidebar userType={getUserfromLocalStorage.userType} />
//       <div style={{ flex: 1 }}>
//         <Navbar />
//         <Container style={{ padding: "20px" }}>
//           <Typography variant="h4" gutterBottom>
//             Current Care Plans
//           </Typography>
//           {careplans.map((careplan) => (
//             <Paper
//               key={careplan.careplanId}
//               style={{ padding: "20px", marginBottom: "20px" }}
//             >
//               <Box>
//                 <Typography variant="h6">
//                   Care Plan ID: {careplan.careplanId}
//                 </Typography>
//                 <Table>
//                   <tbody>
//                     <tr>
//                       <td>Caregiver:</td>
//                       <td>
//                         {careplan.caregiverFirstName}{" "}
//                         {careplan.caregiverLastName}
//                       </td>
//                     </tr>
//                     <tr>
//                       <td>Caretaker:</td>
//                       <td>
//                         {careplan.caretakerFirstName}{" "}
//                         {careplan.caretakerLastName}
//                       </td>
//                     </tr>
//                     <tr>
//                       <td>Started On:</td>
//                       <td>
//                         {new Date(careplan.startDate).toLocaleDateString()}
//                       </td>
//                     </tr>
//                     <tr>
//                       <td>Requirement:</td>
//                       <td>{careplan.instruction}</td>
//                     </tr>
//                     <tr>
//                       <td>Caretaker Status:</td>
//                       <td>{caretakerStatuses[careplan.caretakerId]}</td>
//                     </tr>
//                   </tbody>
//                 </Table>
//               </Box>
//             </Paper>
//           ))}
//         </Container>
//       </div>
//     </div>
//   );
// }

// export default Careplan;
