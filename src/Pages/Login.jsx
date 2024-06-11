import React, { useState } from "react";
import {
  Container,
  Card,
  TextField,
  Button,
  Snackbar,
  Alert,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../Components/Navbar/Navbar";

function Login() {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    // Basic validation
    if (!userName || !password) {
      setError("Please enter both username and password.");
      setOpenSnackbar(true);
      return;
    }

    try {
      const response = await axios.post("/api/user/login", {
        userName,
        password,
      });

      if (response.status === 200) {
        const userType = response.data.userType;
        localStorage.setItem(
          "userDetails",
          JSON.stringify(response.data.userDetails)
        );

        switch (userType) {
          case "caretaker":
            navigate("/CaretakerDashboard");
            break;
          case "caregiver":
            navigate("/CaregiverDashboard");
            break;
          case "manager":
            navigate("/ManagerDashboard");
            break;
          case "admin":
            navigate("/AdminDashboard");
            break;
          default:
            setError("Invalid user type.");
            setOpenSnackbar(true);
            break;
        }
      } else {
        setError("Invalid login credentials.");
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred while logging in.");
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <>
      <Navbar />
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 8,
        }}
      >
        <Card sx={{ p: 3, mt: 5, width: "100%" }}>
          <Box textAlign="center" mb={4}>
            <h3>Login</h3>
          </Box>
          <form onSubmit={handleLogin}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="User Name"
              name="userName"
              value={userName}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              type="password"
              label="Password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </form>
        </Card>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity="error"
            sx={{ width: "100%" }}
          >
            {error}
          </Alert>
        </Snackbar>
      </Container>
    </>
  );
}

export default Login;

// import React, { useState } from "react";
// import { Container, Col, Card, Form, Button } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import Navbar from "../Components/Navbar/Navbar";

// function Login() {
//   const [userName, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (event) => {
//     event.preventDefault();

//     try {

//       console.log(userName);

//       const response = await axios.post("/api/user/login", {
//         userName,
//         password,
//       });

//       if (response.status === 200) {
//         const userType = response.data.userType;
//         console.log(response.data.userDetails);
//         localStorage.setItem("userDetails", JSON.stringify(response.data.userDetails));

//         // const userType = "caregiver";
//         switch (userType) {
//           case "caretaker":
//             navigate("/CaretakerDashboard");
//             break;
//           case "caregiver":
//             navigate("/CaregiverDashboard");
//             break;
//           case "manager":
//             navigate("/ManagerDashboard");
//             break;
//             case "admin":
//             navigate("/AdminDashboard");
//             break;
//           default:
//             setError("Invalid user type.");
//             break;
//         }
//       } else {
//         setError("Invalid login credentials.");
//       }
//     } catch (error) {
//       console.error(error);
//       setError("An error occurred while logging in.");
//     }
//   };

//   return (
//     <>
//       <div>
//         <Navbar />
//       </div>
//       <div>
//         <Container className="d-flex justify-content-center align-items-center vh-100">
//           <Col md="6">
//             <Card className="my-5">
//               <Card.Body className="p-5">
//                 <div className="title mb-4 text-center">
//                   <h3>Login</h3>
//                 </div>

//                 <Form.Group className="mb-4">
//                   <Form.Label>User Name</Form.Label>
//                   <Form.Control
//                     type="text"
//                     placeholder="Enter your username"
//                     value={userName}
//                     onChange={(e) => setUsername(e.target.value)}
//                   />
//                 </Form.Group>
//                 <Form.Group className="mb-4">
//                   <Form.Label>Password</Form.Label>
//                   <Form.Control
//                     type="password"
//                     placeholder="Enter your password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                   />
//                 </Form.Group>
//                 {error && <div className="text-danger mb-3">{error}</div>}
//                 <Button
//                   className="btn-login w-100 mb-4"
//                   size="md"
//                   variant="primary"
//                   onClick={handleLogin}
//                 >
//                   Sign In
//                 </Button>
//               </Card.Body>
//             </Card>
//           </Col>
//         </Container>
//       </div>
//     </>
//   );
// }

// export default Login;
