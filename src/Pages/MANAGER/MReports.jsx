// import React, { useState, useEffect } from "react";
// import {
//   Container,
//   Typography,
//   Paper,
//   Grid,
//   Card,
//   CardContent,
//   CardHeader,
// } from "@mui/material";
// import Sidebar from "../../Components/Sidebar";
// import Navbar from "../../Components/Navbar/Navbar";
// import axios from "axios";

// const ReportPage = () => {
//   const getUserFromLocalStorage = localStorage.getItem("userDetails")
//     ? JSON.parse(localStorage.getItem("userDetails"))
//     : null;

//   const [dueThisMonth, setDueThisMonth] = useState("");
//   const [recurring, setRecurring] = useState([]);
//   const [startedThisMonth, setStartedThisMonth] = useState("");
//   const [assigned, setAssigned] = useState([]);
//   const [completedRequirements, setCompletedRequirements] = useState([]);
//   const [caretakersServed, setCaretakersServed] = useState("");
//   const [feedback, setFeedback] = useState("");

//   const fetchReportDetails = async () => {
//     try {
//       const { data: dueThisMonthData } = await axios.get(
//         "http://localhost:5000/api/report/requirements-due-this-month"
//       );
//       setDueThisMonth(dueThisMonthData.due_this_month);

//       const { data: recurringData } = await axios.get(
//         "http://localhost:5000/api/report/recurring-requirements"
//       );
//       setRecurring(recurringData);

//       const { data: startedThisMonthData } = await axios.get(
//         "http://localhost:5000/api/report/requirements-started-this-month"
//       );
//       setStartedThisMonth(startedThisMonthData.started_this_month);

//       const { data: assignedData } = await axios.get(
//         "http://localhost:5000/api/report/requirements-Assigned-To-Each-Caretaker"
//       );
//       setAssigned(assignedData);

//       const { data: completedRequirementsData } = await axios.get(
//         "http://localhost:5000/api/report/requirements-Completed-By-EachCaretaker"
//       );
//       setCompletedRequirements(completedRequirementsData);

//       const { data: totalCaretakersServedData } = await axios.get(
//         "http://localhost:5000/api/report/total-caretakers-served"
//       );
//       setCaretakersServed(totalCaretakersServedData.total_caretakers_served);

//       const { data: feedbackThisMonthData } = await axios.get(
//         "http://localhost:5000/api/report/feedback-this-month"
//       );
//       setFeedback(feedbackThisMonthData.feedback_this_month);
//     } catch (error) {
//       console.error("Error fetching report details:", error);
//     }
//   };

//   useEffect(() => {
//     fetchReportDetails();
//   }, []);

//   return (
//     <div style={{ display: "flex" }}>
//       <Sidebar userType={getUserFromLocalStorage?.userType} />
//       <div style={{ flex: 1 }}>
//         <Navbar />
//         <div className="mgd-main" style={{ padding: "10px" }}>
//           <Container maxWidth="lg">
//             <Typography variant="h5" gutterBottom>
//               Monthly Care Plan Report
//             </Typography>

//             <Paper elevation={3} style={{ padding: "10px", marginTop: "10px" }}>
//               <Grid container spacing={2}>
//                 <Grid item xs={12} sm={6} md={4}>
//                   <Card>
//                     <CardHeader
//                       title="Due This Month"
//                       titleTypographyProps={{ variant: "subtitle1" }}
//                     />
//                     <CardContent>
//                       <Typography variant="body1" component="div">
//                         {dueThisMonth}
//                       </Typography>
//                     </CardContent>
//                   </Card>
//                 </Grid>

//                 <Grid item xs={12} sm={6} md={4}>
//                   <Card>
//                     <CardHeader
//                       title="Recurring"
//                       titleTypographyProps={{ variant: "subtitle1" }}
//                     />
//                     <CardContent>
//                       {recurring.map((item, index) => (
//                         <Typography key={index} variant="body1" component="div">
//                           {item.ctName} {}
//                           {item.recurring_requirements}
//                         </Typography>
//                       ))}
//                     </CardContent>
//                   </Card>
//                 </Grid>

//                 <Grid item xs={12} sm={6} md={4}>
//                   <Card>
//                     <CardHeader
//                       title="Started This Month"
//                       titleTypographyProps={{ variant: "subtitle1" }}
//                     />
//                     <CardContent>
//                       <Typography variant="body1" component="div">
//                         {startedThisMonth}
//                       </Typography>
//                     </CardContent>
//                   </Card>
//                 </Grid>

//                 <Grid item xs={12} sm={6} md={4}>
//                   <Card>
//                     <CardHeader
//                       title="Assigned"
//                       titleTypographyProps={{ variant: "subtitle1" }}
//                     />
//                     <CardContent>
//                       {assigned.map((item, index) => (
//                         <Typography key={index} variant="body1" component="div">
//                           Caretaker ID: {item.caretakerId}, Name: {item.ctName},
//                           Assigned: {item.requirements_assigned}
//                         </Typography>
//                       ))}
//                     </CardContent>
//                   </Card>
//                 </Grid>

//                 <Grid item xs={12} sm={6} md={4}>
//                   <Card>
//                     <CardHeader
//                       title="Completed"
//                       titleTypographyProps={{ variant: "subtitle1" }}
//                     />
//                     <CardContent>
//                       {completedRequirements.map((item, index) => (
//                         <Typography key={index} variant="body1" component="div">
//                           Caregiver ID: {item.caregiverId}, Completed:{" "}
//                           {item.completed_requirements}
//                         </Typography>
//                       ))}
//                     </CardContent>
//                   </Card>
//                 </Grid>

//                 <Grid item xs={12} sm={6} md={4}>
//                   <Card>
//                     <CardHeader
//                       title="Caretakers Served"
//                       titleTypographyProps={{ variant: "subtitle1" }}
//                     />
//                     <CardContent>
//                       <Typography variant="body1" component="div">
//                         {caretakersServed}
//                       </Typography>
//                     </CardContent>
//                   </Card>
//                 </Grid>

//                 <Grid item xs={12} sm={6} md={4}>
//                   <Card>
//                     <CardHeader
//                       title="Feedback"
//                       titleTypographyProps={{ variant: "subtitle1" }}
//                     />
//                     <CardContent>
//                       <Typography variant="body1" component="div">
//                         {feedback}
//                       </Typography>
//                     </CardContent>
//                   </Card>
//                 </Grid>
//               </Grid>
//             </Paper>
//           </Container>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ReportPage;

import React, { useState, useEffect } from "react";
import { Container, Typography, Paper, Grid } from "@mui/material";
import Sidebar from "../../Components/Sidebar";
import Navbar from "../../Components/Navbar/Navbar";
import axios from "axios";

const ReportPage = () => {
  const getUserFromLocalStorage = localStorage.getItem("userDetails")
    ? JSON.parse(localStorage.getItem("userDetails"))
    : null;

  const [dueThisMonth, setDueThisMonth] = useState("");
  const [recurring, setRecurring] = useState([]);
  const [startedThisMonth, setStartedThisMonth] = useState("");
  const [assigned, setAssigned] = useState([]);
  const [completedRequirements, setCompletedRequirements] = useState([]);
  const [caretakersServed, setCaretakersServed] = useState("");
  const [feedback, setFeedback] = useState("");

  const fetchReportDetails = async () => {
    try {
      const { data: dueThisMonthData } = await axios.get(
        "http://localhost:5000/api/report/requirements-due-this-month"
      );
      setDueThisMonth(dueThisMonthData.due_this_month);

      const { data: recurringData } = await axios.get(
        "http://localhost:5000/api/report/recurring-requirements"
      );
      setRecurring(recurringData);

      const { data: startedThisMonthData } = await axios.get(
        "http://localhost:5000/api/report/requirements-started-this-month"
      );
      setStartedThisMonth(startedThisMonthData.started_this_month);

      const { data: assignedData } = await axios.get(
        "http://localhost:5000/api/report/requirements-Assigned-To-Each-Caretaker"
      );
      setAssigned(assignedData);

      const { data: completedRequirementsData } = await axios.get(
        "http://localhost:5000/api/report/requirements-Completed-By-EachCaretaker"
      );
      setCompletedRequirements(completedRequirementsData);

      const { data: totalCaretakersServedData } = await axios.get(
        "http://localhost:5000/api/report/total-caretakers-served"
      );
      setCaretakersServed(totalCaretakersServedData.total_caretakers_served);

      const { data: feedbackThisMonthData } = await axios.get(
        "http://localhost:5000/api/report/feedback-this-month"
      );
      setFeedback(feedbackThisMonthData.feedback_this_month);
    } catch (error) {
      console.error("Error fetching report details:", error);
    }
  };

  useEffect(() => {
    fetchReportDetails();
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <Sidebar userType={getUserFromLocalStorage?.userType} />
      <div style={{ flex: 1 }}>
        <Navbar />
        <div className="mgd-main" style={{ padding: "20px" }}>
          <Container maxWidth="lg">
            <Typography variant="h4" gutterBottom>
              Monthly Care Plan Report
            </Typography>
            <Paper elevation={4} style={{ padding: "20px", marginTop: "20px" }}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={4}>
                  <Paper elevation={3} style={{ padding: "10px" }}>
                    <Typography variant="h6" gutterBottom>
                      Due This Month
                    </Typography>
                    <Typography variant="body1">{dueThisMonth}</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Paper elevation={3} style={{ padding: "10px" }}>
                    <Typography variant="h6" gutterBottom>
                      Recurring
                    </Typography>
                    {recurring.map((item, index) => (
                      <Typography key={index} variant="body1">
                        {item.ctName}: {item.recurring_requirements}
                      </Typography>
                    ))}
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Paper elevation={3} style={{ padding: "10px" }}>
                    <Typography variant="h6" gutterBottom>
                      Started This Month
                    </Typography>
                    <Typography variant="body1">{startedThisMonth}</Typography>
                  </Paper>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <Paper elevation={3} style={{ padding: "10px" }}>
                    <Typography variant="h6" gutterBottom>
                      Assigned
                    </Typography>
                    {assigned.map((item, index) => (
                      <Typography key={index} variant="body1">
                        Name: {item.ctName}, Assigned:{" "}
                        {item.requirements_assigned}
                      </Typography>
                    ))}
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Paper elevation={3} style={{ padding: "10px" }}>
                    <Typography variant="h6" gutterBottom>
                      Completed
                    </Typography>
                    {completedRequirements.map((item, index) => (
                      <Typography key={index} variant="body1">
                        Caregiver ID: {item.caregiverId}, Completed:{" "}
                        {item.completed_requirements}
                      </Typography>
                    ))}
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Paper elevation={3} style={{ padding: "10px" }}>
                    <Typography variant="h6" gutterBottom>
                      Caretakers Served
                    </Typography>
                    <Typography variant="body1">{caretakersServed}</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Paper elevation={3} style={{ padding: "10px" }}>
                    <Typography variant="h6" gutterBottom>
                      Feedback
                    </Typography>
                    <Typography variant="body1">{feedback}</Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Paper>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default ReportPage;
