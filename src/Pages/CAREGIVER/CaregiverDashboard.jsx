import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import {
  Container,
  Grid,
  Button,
  Typography,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Sidebar from "../../Components/Sidebar";
import Navbar from "../../Components/Navbar/Navbar";
import axios from "axios";

const DateCalendarValue = () => {
  const [selectedDates, setSelectedDates] = useState([]);
  const [caretakers, setCaretakers] = useState([]);
  const [open, setOpen] = useState(false);

  const getUserFromLocalStorage = () => {
    const userDetails = localStorage.getItem("userDetails");
    return userDetails ? JSON.parse(userDetails) : null;
  };

  useEffect(() => {
    const fetchCaretakers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/caregiver/getrequestedcaretakers"
        );
        setCaretakers(response.data);
      } catch (error) {
        console.error("Error fetching requested caretakers:", error);
        setCaretakers([]);
      }
    };
    fetchCaretakers();
  }, []);

  const handleAcceptRequest = (caretakerId) => {
    console.log(`Accepted request for caretaker with ID ${caretakerId}`);
    // You can implement logic to update caretaker status here
  };

  const handleDateClick = (date) => {
    const dateString = date.format("YYYY-MM-DD");
    setSelectedDates((prevDates) => {
      if (prevDates.includes(dateString)) {
        return prevDates.filter((d) => d !== dateString);
      } else {
        return [...prevDates, dateString];
      }
    });
  };

  const handleClearDates = () => {
    setSelectedDates([]);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar userType={getUserFromLocalStorage()?.userType} />
      <div style={{ flex: 1 }}>
        <Navbar />
        <div className="mgd-main" style={{ padding: "20px" }}>
          <Container>
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={12} id="caretaker-section">
                {caretakers.length > 0 ? (
                  <Typography variant="h6" gutterBottom>
                    Caretaker Requests
                  </Typography>
                ) : (
                  <Typography variant="body1" gutterBottom>
                    No caretaker requests found.
                  </Typography>
                )}
                {caretakers.map((caretaker) => (
                  <Card key={caretaker.requirementId} sx={{ mb: 2 }}>
                    <CardContent>
                      <Grid
                        container
                        spacing={2}
                        className={`caretaker-row-${caretaker.requirementId}`}
                      >
                        <Grid item xs={3}>
                          <Typography variant="subtitle1">
                            {caretaker.caretakerName}
                          </Typography>
                          <Typography variant="body2">
                            Category: {caretaker.caretakerCategory}
                          </Typography>
                        </Grid>
                        <Grid item xs={3}>
                          <Typography variant="body2">
                            Start Date:{" "}
                            {dayjs(caretaker.startDate).format("YYYY-MM-DD")}
                          </Typography>
                          <Typography variant="body2">
                            End Date:{" "}
                            {dayjs(caretaker.endDate).format("YYYY-MM-DD")}
                          </Typography>
                        </Grid>
                        <Grid item xs={3}>
                          <Typography variant="body2">
                            Requirement: {caretaker.requirement}
                          </Typography>
                        </Grid>
                        <Grid item xs={3}>
                          {caretaker.status === "Pending" && (
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() =>
                                handleAcceptRequest(caretaker.caretakerId)
                              }
                              sx={{ mt: 1 }}
                            >
                              Accept Request
                            </Button>
                          )}
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                ))}
              </Grid>
            </Grid>

            <Grid container spacing={2} alignItems="center" justifyContent="center">
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">Unavailable Dates</Typography>
                    {selectedDates.length > 0 ? (
                      selectedDates.map((date, index) => (
                        <Typography variant="body2" key={index}>
                          {date}
                        </Typography>
                      ))
                    ) : (
                      <Typography variant="body2" style={{ marginTop: 8 }}>
                        No dates selected
                      </Typography>
                    )}
                    <Grid container spacing={1} justifyContent="center">
                      <Grid item>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={handleClearDates}
                          sx={{ mt: 2 }}
                        >
                          Clear Dates
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={handleOpen}
                          sx={{ mt: 2 }}
                        >
                          Add Dates
                        </Button>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Select Dates</DialogTitle>
              <DialogContent>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateCalendar
                    value={null}
                    onChange={handleDateClick}
                    renderDay={(day, _value, DayComponentProps) => {
                      const dateString = day.format("YYYY-MM-DD");
                      const isSelected = selectedDates.includes(dateString);
                      return (
                        <div
                          onClick={() => handleDateClick(day)}
                          style={{
                            backgroundColor: isSelected ? "#1976d2" : undefined,
                            borderRadius: isSelected ? "50%" : undefined,
                            color: isSelected ? "white" : undefined,
                            cursor: "pointer",
                            width: "36px",
                            height: "36px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {day.format("D")}
                        </div>
                      );
                    }}
                  />
                </LocalizationProvider>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Done
                </Button>
              </DialogActions>
            </Dialog>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default DateCalendarValue;


// import React, { useState, useEffect } from "react";
// import dayjs from "dayjs";
// import {
//   Container,
//   Grid,
//   Button,
//   Typography,
//   Card,
//   CardContent,
// } from "@mui/material";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import Sidebar from "../../Components/Sidebar";
// import Navbar from "../../Components/Navbar/Navbar";
// import axios from "axios"; // Import axios for API calls

// const DateCalendarValue = () => {
//   const [value, setValue] = useState(dayjs("2022-04-17"));
//   const [caretakers, setCaretakers] = useState([]); // State for fetched caretakers

//   // Example data arrays - will be replaced with fetched data
//   // ...

//   const getUserfromLocalStorage = () => {
//     const userDetails = localStorage.getItem("userDetails");
//     return userDetails ? JSON.parse(userDetails) : null;
//   };

//   // Fetch caretakers from the database on component mount
//   useEffect(() => {
//     const fetchCaretakers = async () => {
//       try {
//         // Replace with your actual API endpoint
//         const response = await axios.get("/api/caretakers");
//         setCaretakers(response.data);
//       } catch (error) {
//         console.error("Error fetching caretakers:", error);
//       }
//     };

//     fetchCaretakers();
//   }, []);

//   const handleAcceptRequest = (caretakerId) => {
//     // Handle accept request logic
//     console.log(`Accepted request for caretaker with ID ${caretakerId}`);
//   };

//   return (
//     <div style={{ display: "flex" }}>
//       <Sidebar userType={getUserfromLocalStorage()?.userType} />
//       <div style={{ flex: 1 }}>
//         <Navbar />
//         <div className="mgd-main" style={{ padding: "20px" }}>
//           <Container fluid>
//             {/* Grid for caretakers and accept request section */}
//             <Grid container spacing={2} sx={{ mb: 2 }}>
//               <Grid item xs={12} id="caretaker-section">
//                 {caretakers.map((caretaker) => (
//                   // Filter caretakers for pending status
//                   caretaker.status === "Pending" && (
//                     <Card key={caretaker.caretakerId} sx={{ mb: 2 }}>
//                       <CardContent>
//                         <Grid
//                           container
//                           spacing={2}
//                           className={`caretaker-row-${caretaker.caretakerId}`}
//                         >
//                           <Grid item xs={3}>
//                             {/* Display first name and last name */}
//                             <Typography variant="h6">
//                               {caretaker.firstName} {caretaker.lastName}
//                             </Typography>
//                             <Typography>Category: {caretaker.category}</Typography>
//                           </Grid>
//                           <Grid item xs={3}>
//                             <Typography>
//                               Start Date: {caretaker.startDate}
//                             </Typography>
//                             <Typography>End Date: {caretaker.endDate}</Typography>
//                           </Grid>
//                           <Grid item xs={3}>
//                             <Typography>Requirement: {caretaker.requirement}</Typography>
//                           </Grid>
//                           <Grid item xs={3}>
//                             {caretaker.status === "Pending" && (
//                               <Button
//                                 variant="contained"
//                                 color="primary"
//                                 onClick={() =>
//                                   handleAcceptRequest(caretaker.caretakerId)
//                                 }
//                                 sx={{ mt: 1 }}
//                               >
//                                 Accept Request
//                               </Button>
//                             )}
//                           </Grid>
//                         </Grid>
//                       </CardContent>
//                     </Card>
//                   )
//                 ))}
//               </Grid>
//             </Grid>

//             {/* Grid for calendar and unavailable dates section */}
//             <Grid
//               container
//               spacing={2}
//               alignItems="center"
//               justifyContent="center"
//               id="calendar-data-section"
//             >
//               {/* Calendar section */}
//               <Grid
//                 item
//                 xs={5}
//                 container
//                 justifyContent="center"
//                 id="calendar-section"
//               >
//                 <Card>
//                   <CardContent>
//                     <LocalizationProvider dateAdapter={AdapterDayjs}>
//                       <DateCalendar
//                         value={value}
//                         onChange={(newValue) => setValue(newValue)}
//                       />
//                     </LocalizationProvider>
//                   </CardContent>
//                 </Card>
//               </Grid>

//               {/* Placeholder for unavailable dates section */}
//               {/* Adjust as per your requirement for displaying unavailable dates */}
//               <Grid
//                 item
//                 xs={5}
//                 container
//                 direction="column"
//                 id="unavailable-dates-section"
//               >
//                 <Card>
//                   <CardContent>
//                     <Typography variant="h6">Unavailable Dates</Typography>
//                     {/* Placeholder for displaying unavailable dates */}
//                     {/* You can populate this with actual logic to display selected unavailable dates */}
//                   </CardContent>
//                 </Card>
//               </Grid>
//             </Grid>
//           </Container>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DateCalendarValue;
