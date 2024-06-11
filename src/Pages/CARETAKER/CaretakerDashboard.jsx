import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../Components/Sidebar";
import Navbar from "../../Components/Navbar/Navbar";
import {
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

const ProfileAndFeedbackPage = () => {
  const [profileEditMode, setProfileEditMode] = useState(false);
  const [originalProfileData, setOriginalProfileData] = useState({});
  const [profileData, setProfileData] = useState({});
  const [open, setOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("userDetails"));

  useEffect(() => {
    const fetchCaretakerData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/user/getCaretakerData",
          {
            params: { userId: user.userId },
          }
        );
        setOriginalProfileData(response.data);
        setProfileData(response.data);
      } catch (error) {
        console.error("Error fetching caretaker data:", error);
      }
    };

    fetchCaretakerData();
  }, [user.userId]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setProfileData({ ...originalProfileData });
    setProfileEditMode(false);
    setOpen(false);
  };

  const handleProfileSave = async () => {
    try {
      const updatedProfileData = {
        ...profileData,
        userId: user.userId,
      };
      await axios.post(
        "http://localhost:5000/api/user/registerCaretaker",
        updatedProfileData
      );
      setOriginalProfileData({ ...profileData });
      setProfileEditMode(false);
      setOpen(false);

      // Save the profile data to local storage
      localStorage.setItem("profileData", JSON.stringify(updatedProfileData));
    } catch (error) {
      console.error("Error saving profile data:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      <div style={{ display: "flex" }}>
        <Sidebar userType={user.userType} />
        <div style={{ flex: 1 }}>
          <Navbar />
          <div className="mgd-main" style={{ padding: "20px" }}>
            <Container maxWidth="sm">
              <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12}>
                  <Paper elevation={3} style={{ padding: "16px" }}>
                    <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
                      Caretaker's Profile
                    </h2>
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TableCell style={{ fontWeight: "bold" }}>
                            First Name:
                          </TableCell>
                          <TableCell>{profileData.firstName}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell style={{ fontWeight: "bold" }}>
                            Last Name:
                          </TableCell>
                          <TableCell>{profileData.lastName}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell style={{ fontWeight: "bold" }}>
                            Medicare Number:
                          </TableCell>
                          <TableCell>{profileData.nationalId}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell style={{ fontWeight: "bold" }}>
                            Contact Number:
                          </TableCell>
                          <TableCell>{profileData.mobileNo}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell style={{ fontWeight: "bold" }}>
                            Date of Birth:
                          </TableCell>
                          <TableCell>{profileData.dob}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell style={{ fontWeight: "bold" }}>
                            Address:
                          </TableCell>
                          <TableCell>{profileData.address}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell style={{ fontWeight: "bold" }}>
                            Medical Condition:
                          </TableCell>
                          <TableCell>{profileData.mediCondition}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell style={{ fontWeight: "bold" }}>
                            Emergency Contact:
                          </TableCell>
                          <TableCell>{profileData.emergCont}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell style={{ fontWeight: "bold" }}>
                            Caretaker Category:
                          </TableCell>
                          <TableCell>{profileData.category}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                    <div className="text-center mt-4">
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleClickOpen}
                      >
                        Edit Profile
                      </Button>
                    </div>
                  </Paper>
                </Grid>
              </Grid>
            </Container>
          </div>
        </div>
      </div>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="First Name"
                type="text"
                name="firstName"
                value={profileData.firstName}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Last Name"
                type="text"
                name="lastName"
                value={profileData.lastName}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Medicare Number"
                type="text"
                name="nationalId"
                value={profileData.nationalId}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Contact Number"
                type="text"
                name="mobileNo"
                value={profileData.mobileNo}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Date of Birth"
                type="date"
                name="dob"
                value={profileData.dob}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Address"
                type="text"
                name="address"
                value={profileData.address}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Medical Condition"
                type="text"
                name="mediCondition"
                value={profileData.mediCondition}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Emergency Contact"
                type="text"
                name="emergCont"
                value={profileData.emergCont}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                  labelId="category-label"
                  name="category"
                  value={profileData.category}
                  onChange={(e) =>
                    setProfileData((prevState) => ({
                      ...prevState,
                      category: e.target.value,
                    }))
                  }
                >
                  <MenuItem value={"mental"}>Mental</MenuItem>
                  <MenuItem value={"disabled"}>Disabled</MenuItem>
                  <MenuItem value={"eldering"}>Eldering</MenuItem>
                  <MenuItem value={"others"}>Other needs</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleProfileSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProfileAndFeedbackPage;

// import React, { useState, useEffect } from "react";
// import Sidebar from "../../Components/Sidebar";
// import {
//   Container,
//   Table,
//   TableBody,
//   TableCell,
//   TableRow,
//   Paper,
//   Select,
//   Grid,
//   TextField,
//   Button,
//   MenuItem,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   FormControl,
//   InputLabel,
// } from "@mui/material";
// import TableContainer from "@mui/material/TableContainer";
// import axios from "axios";
// import Navbar from "../../Components/Navbar/Navbar";

// function ProfileAndFeedbackPage() {
//   const [profileEditMode, setProfileEditMode] = useState(false);
//   const [originalProfileData, setOriginalProfileData] = useState({
//     firstName: "",
//     lastName: "",
//     nationalId: "",
//     dob: "",
//     address: "",
//     mobileNo: "",
//     category: "",
//     mediCondition: "",
//     emergCont: "",
//   });
//   const [profileData, setProfileData] = useState({
//     firstName: "",
//     lastName: "",
//     nationalId: "",
//     dob: "",
//     address: "",
//     mobileNo: "",
//     category: "",
//     mediCondition: "",
//     emergCont: "",
//     preffGender: "",
//   });
//   const [open, setOpen] = useState(false);

//   const getUserfromLocalStorage = localStorage.getItem("userDetails")
//     ? JSON.parse(localStorage.getItem("userDetails"))
//     : null;

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setProfileData({ ...originalProfileData });
//     setProfileEditMode(false);
//     setOpen(false);
//   };

//   const handleProfileSave = async () => {
//     try {
//       const updatedProfileData = {
//         ...profileData,
//         userId: getUserfromLocalStorage.userId,
//       };
//       console.log("Frontend data", updatedProfileData);
//       await axios.post(
//         "http://localhost:5000/api/user/registerPatient",
//         updatedProfileData
//       );
//       setOriginalProfileData({ ...profileData });
//       setProfileEditMode(false);
//       setOpen(false);

//       // Save the profile data to local storage
//       localStorage.setItem("profileData", JSON.stringify(updatedProfileData));
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProfileData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   return (
//     <>
//       <div style={{ display: "flex" }}>
//         <Sidebar userType={getUserfromLocalStorage.userType} />
//         <div style={{ flex: 1 }}>
//           <Navbar />
//           <div className="mgd-main" style={{ padding: "20px" }}>
//             <Container maxWidth="sm">
//               <Grid container spacing={3} justifyContent="center">
//                 <Grid item xs={12}>
//                   <Paper elevation={3} style={{ padding: "16px" }}>
//                     <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
//                       Patient's Profile
//                     </h2>
//                     <TableContainer component={Paper}>
//                       <Table>
//                         <TableBody>
//                           <TableRow>
//                             <TableCell style={{ fontWeight: "bold" }}>
//                               First Name:
//                             </TableCell>
//                             <TableCell>{profileData.firstName}</TableCell>
//                           </TableRow>
//                           <TableRow>
//                             <TableCell style={{ fontWeight: "bold" }}>
//                               Last Name:
//                             </TableCell>
//                             <TableCell>{profileData.lastName}</TableCell>
//                           </TableRow>
//                           <TableRow>
//                             <TableCell style={{ fontWeight: "bold" }}>
//                               Medicare Number:
//                             </TableCell>
//                             <TableCell>{profileData.nationalId}</TableCell>
//                           </TableRow>
//                           <TableRow>
//                             <TableCell style={{ fontWeight: "bold" }}>
//                               Contact Number:
//                             </TableCell>
//                             <TableCell>{profileData.mobileNo}</TableCell>
//                           </TableRow>
//                           <TableRow>
//                             <TableCell style={{ fontWeight: "bold" }}>
//                               Date of Birth:
//                             </TableCell>
//                             <TableCell>{profileData.dob}</TableCell>
//                           </TableRow>
//                           <TableRow>
//                             <TableCell style={{ fontWeight: "bold" }}>
//                               Address:
//                             </TableCell>
//                             <TableCell>{profileData.address}</TableCell>
//                           </TableRow>
//                           <TableRow>
//                             <TableCell style={{ fontWeight: "bold" }}>
//                               Medical Condition:
//                             </TableCell>
//                             <TableCell>{profileData.mediCondition}</TableCell>
//                           </TableRow>
//                           <TableRow>
//                             <TableCell style={{ fontWeight: "bold" }}>
//                               Emergency Contact:
//                             </TableCell>
//                             <TableCell>{profileData.emergCont}</TableCell>
//                           </TableRow>
//                           <TableRow>
//                             <TableCell style={{ fontWeight: "bold" }}>
//                               Caretaker Category:
//                             </TableCell>
//                             <TableCell>{profileData.category}</TableCell>
//                           </TableRow>
//                         </TableBody>
//                       </Table>
//                     </TableContainer>
//                     <div className="text-center mt-4">
//                       <Button
//                         variant="contained"
//                         color="primary"
//                         onClick={handleClickOpen}
//                       >
//                         Edit Profile
//                       </Button>
//                     </div>
//                   </Paper>
//                 </Grid>
//               </Grid>
//             </Container>
//           </div>
//         </div>
//       </div>

//       <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
//         <DialogTitle>Edit Profile</DialogTitle>
//         <DialogContent>
//           <Grid container spacing={2}>
//             <Grid item xs={12}>
//               <TextField
//                 label="First Name"
//                 type="text"
//                 name="firstName"
//                 value={profileData.firstName}
//                 onChange={handleChange}
//                 fullWidth
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 label="Last Name"
//                 type="text"
//                 name="lastName"
//                 value={profileData.lastName}
//                 onChange={handleChange}
//                 fullWidth
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 label="National ID"
//                 type="text"
//                 name="nationalId"
//                 value={profileData.nationalId}
//                 onChange={handleChange}
//                 fullWidth
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 label="Contact Number"
//                 type="text"
//                 name="mobileNo"
//                 value={profileData.mobileNo}
//                 onChange={handleChange}
//                 fullWidth
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 label="Date of Birth"
//                 type="date"
//                 name="dob"
//                 value={profileData.dob}
//                 onChange={handleChange}
//                 fullWidth
//                 InputLabelProps={{
//                   shrink: true,
//                 }}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 label="Address"
//                 type="text"
//                 name="address"
//                 value={profileData.address}
//                 onChange={handleChange}
//                 fullWidth
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 label="Medical Condition"
//                 type="text"
//                 name="mediCondition"
//                 value={profileData.mediCondition}
//                 onChange={handleChange}
//                 fullWidth
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 label="Emergency Contact"
//                 type="text"
//                 name="emergCont"
//                 value={profileData.emergCont}
//                 onChange={handleChange}
//                 fullWidth
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <FormControl fullWidth>
//                 <InputLabel id="category-label">Category</InputLabel>
//                 <Select
//                   labelId="category-label"
//                   name="category"
//                   value={profileData.category}
//                   onChange={(e) =>
//                     setProfileData((prevState) => ({
//                       ...prevState,
//                       category: e.target.value,
//                     }))
//                   }
//                 >
//                   <MenuItem value={"mental"}>Mental</MenuItem>
//                   <MenuItem value={"disabled"}>Disabled</MenuItem>
//                   <MenuItem value={"eldering"}>Eldering</MenuItem>
//                   <MenuItem value={"others"}>Other needs</MenuItem>
//                 </Select>
//               </FormControl>
//             </Grid>
//           </Grid>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose} color="primary">
//             Cancel
//           </Button>
//           <Button onClick={handleProfileSave} color="primary">
//             Save
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// }

// export default ProfileAndFeedbackPage;

// import React, { useState, useEffect } from "react";
// import Sidebar from "../../Components/Sidebar";
// import {
//   Container,
//   Table,
//   TableBody,
//   TableCell,
//   TableRow,
//   Paper,
//   Select,
//   Grid,
//   TextField,
//   Button,
//   MenuItem,
// } from "@mui/material";
// import TableContainer from "@mui/material/TableContainer";
// import axios from "axios";
// import Navbar from "../../Components/Navbar/Navbar";
// import { red } from "@mui/material/colors";

// function ProfileAndFeedbackPage() {
//   const [profileEditMode, setProfileEditMode] = useState(false);
//   const [originalProfileData, setOriginalProfileData] = useState({
//     firstName: "",
//     lastName: "",
//     nationalId: "",
//     dob: "",
//     address: "",
//     mobileNo: "",
//     category: "",
//     mediCondition: "",
//     emergCont: "",
//   });
//   const [profileData, setProfileData] = useState({
//     firstName: "",
//     lastName: "",
//     nationalId: "",
//     dob: "",
//     address: "",
//     mobileNo: "",
//     category: "",
//     mediCondition: "",
//     emergCont: "",
//     preffGender: "",
//   });
//   const [caregivers, setCaregivers] = useState([]);

//   const getUserfromLocalStorage = localStorage.getItem("userDetails")
//     ? JSON.parse(localStorage.getItem("userDetails"))
//     : null;

//   const handleEditProfile = () => {
//     setProfileEditMode(true);
//   };

//   const handleProfileCancel = () => {
//     setProfileData({ ...originalProfileData });
//     setProfileEditMode(false);
//   };

//   const handleProfileSave = async () => {
//     try {
//       const updatedProfileData = {
//         ...profileData,
//         userId: getUserfromLocalStorage.userId,
//       };
//       console.log("Frontend data", updatedProfileData);
//       await axios.post(
//         "http://localhost:5000/api/user/registerPatient",
//         updatedProfileData
//       );
//       setOriginalProfileData({ ...profileData });
//       setProfileEditMode(false);

//       // Save the profile data to local storage
//       localStorage.setItem("profileData", JSON.stringify(updatedProfileData));
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProfileData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   return (
//     <>
//       <div style={{ display: "flex" }}>
//         <Sidebar userType={getUserfromLocalStorage.userType} />
//         <div style={{ flex: 1 }}>
//           <Navbar />
//           <div className="mgd-main" style={{ padding: "20px" }}>
//             <Container>
//               <Grid container spacing={3} justifyContent="center">
//                 <Grid item xs={12} md={8} >
//                   <Paper elevation={3} className="p-2">
//                     <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
//                       Patient's Profile
//                     </h2>
//                     <TableContainer component={Paper}>
//                       <Table>
//                         <TableBody>
//                           <TableRow>
//                             <TableCell className="table-cell-bold">
//                               First Name:
//                             </TableCell>
//                             <TableCell className="table-cell">
//                               {profileEditMode ? (
//                                 <TextField
//                                   type="text"
//                                   name="firstName"
//                                   value={profileData.firstName}
//                                   onChange={handleChange}
//                                   fullWidth
//                                 />
//                               ) : (
//                                 profileData.firstName
//                               )}
//                             </TableCell>
//                           </TableRow>
//                           <TableRow>
//                             <TableCell className="table-cell-bold">
//                               Last Name:
//                             </TableCell>
//                             <TableCell className="table-cell">
//                               {profileEditMode ? (
//                                 <TextField
//                                   type="text"
//                                   name="lastName"
//                                   value={profileData.lastName}
//                                   onChange={handleChange}
//                                   fullWidth
//                                 />
//                               ) : (
//                                 profileData.lastName
//                               )}
//                             </TableCell>
//                           </TableRow>
//                           <TableRow>
//                             <TableCell className="table-cell-bold">
//                               National ID:
//                             </TableCell>
//                             <TableCell className="table-cell">
//                               {profileEditMode ? (
//                                 <TextField
//                                   type="text"
//                                   name="nationalId"
//                                   value={profileData.nationalId}
//                                   onChange={handleChange}
//                                   fullWidth
//                                 />
//                               ) : (
//                                 profileData.nationalId
//                               )}
//                             </TableCell>
//                           </TableRow>
//                           <TableRow>
//                             <TableCell className="table-cell-bold">
//                               Contact Number:
//                             </TableCell>
//                             <TableCell className="table-cell">
//                               {profileEditMode ? (
//                                 <TextField
//                                   type="text"
//                                   name="mobileNo"
//                                   value={profileData.mobileNo}
//                                   onChange={handleChange}
//                                   fullWidth
//                                 />
//                               ) : (
//                                 profileData.mobileNo
//                               )}
//                             </TableCell>
//                           </TableRow>
//                           <TableRow>
//                             <TableCell className="table-cell-bold">
//                               Date of Birth:
//                             </TableCell>
//                             <TableCell className="table-cell">
//                               {profileEditMode ? (
//                                 <TextField
//                                   type="date"
//                                   name="dob"
//                                   value={profileData.dob}
//                                   onChange={handleChange}
//                                   fullWidth
//                                   InputLabelProps={{
//                                     shrink: true,
//                                   }}
//                                 />
//                               ) : (
//                                 profileData.dob
//                               )}
//                             </TableCell>
//                           </TableRow>
//                           <TableRow>
//                             <TableCell className="table-cell-bold">
//                               Address:
//                             </TableCell>
//                             <TableCell className="table-cell">
//                               {profileEditMode ? (
//                                 <TextField
//                                   type="text"
//                                   name="address"
//                                   value={profileData.address}
//                                   onChange={handleChange}
//                                   fullWidth
//                                 />
//                               ) : (
//                                 profileData.address
//                               )}
//                             </TableCell>
//                           </TableRow>
//                           <TableRow>
//                             <TableCell className="table-cell-bold">
//                               Medical Condition:
//                             </TableCell>
//                             <TableCell className="table-cell">
//                               {profileEditMode ? (
//                                 <TextField
//                                   type="text"
//                                   name="mediCondition"
//                                   value={profileData.mediCondition}
//                                   onChange={handleChange}
//                                   fullWidth
//                                 />
//                               ) : (
//                                 profileData.mediCondition
//                               )}
//                             </TableCell>
//                           </TableRow>
//                           <TableRow>
//                             <TableCell className="table-cell-bold">
//                               Emergency Contact:
//                             </TableCell>
//                             <TableCell className="table-cell">
//                               {profileEditMode ? (
//                                 <TextField
//                                   type="text"
//                                   name="emergCont"
//                                   value={profileData.emergCont}
//                                   onChange={handleChange}
//                                   fullWidth
//                                 />
//                               ) : (
//                                 profileData.emergCont
//                               )}
//                             </TableCell>
//                           </TableRow>
//                           <TableRow>
//                             <TableCell className="table-cell-bold">
//                               Caretaker Category:
//                             </TableCell>
//                             <TableCell className="table-cell">
//                               {profileEditMode ? (
//                                 <Select
//                                   name="category"
//                                   value={profileData.category}
//                                   onChange={(e) =>
//                                     setProfileData((prevState) => ({
//                                       ...prevState,
//                                       category: e.target.value,
//                                     }))
//                                   }
//                                   fullWidth
//                                 >
//                                   <MenuItem value={"mental"}>Mental</MenuItem>
//                                   <MenuItem value={"disabled"}>
//                                     Disabled
//                                   </MenuItem>
//                                   <MenuItem value={"eldering"}>
//                                     Eldering
//                                   </MenuItem>
//                                   <MenuItem value={"others"}>
//                                     Other needs
//                                   </MenuItem>
//                                 </Select>
//                               ) : (
//                                 profileData.category
//                               )}
//                             </TableCell>
//                           </TableRow>
//                         </TableBody>
//                       </Table>
//                     </TableContainer>
//                     <div className="text-center mt-4">
//                       {profileEditMode ? (
//                         <>
//                           <Button
//                             variant="contained"
//                             color="primary"
//                             className="me-2"
//                             onClick={handleProfileSave}
//                           >
//                             Save
//                           </Button>
//                           <Button
//                             variant="contained"
//                             color="secondary"
//                             onClick={handleProfileCancel}
//                           >
//                             Cancel
//                           </Button>
//                         </>
//                       ) : (
//                         <Button
//                           variant="contained"
//                           color="primary"
//                           onClick={handleEditProfile}
//                         >
//                           Edit Profile
//                         </Button>
//                       )}
//                     </div>
//                   </Paper>
//                 </Grid>
//               </Grid>
//             </Container>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default ProfileAndFeedbackPage;
