import React, { useState } from "react";
import { Container, Col, Card, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../Components/Navbar/Navbar";

function Login() {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {

      console.log(userName);

      const response = await axios.post("/api/user/login", {
        userName,
        password,
      });
      
      if (response.status === 200) {
        const userType = response.data.userType;
        console.log(response.data.userDetails);
        localStorage.setItem("userDetails", JSON.stringify(response.data.userDetails));

        // const userType = "caregiver";
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
            break;
        }
      } else {
        setError("Invalid login credentials.");
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred while logging in.");
    }
  };

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div>
        <Container className="d-flex justify-content-center align-items-center vh-100">
          <Col md="6">
            <Card className="my-5">
              <Card.Body className="p-5">
                <div className="title mb-4 text-center">
                  <h3>Login</h3>
                </div>

                <Form.Group className="mb-4">
                  <Form.Label>User Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your username"
                    value={userName}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                {error && <div className="text-danger mb-3">{error}</div>}
                <Button
                  className="btn-login w-100 mb-4"
                  size="md"
                  variant="primary"
                  onClick={handleLogin}
                >
                  Sign In
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Container>
      </div>
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
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [userType, setUserType] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (event) => {
//   event.preventDefault();

//   try {
//     const response = await axios.post("/api/login", {
//       username,
//       password,
//     });

//     if (response.status === 200) {
//       const userType = response.data.userType;

//       switch (userType) {
//         case "caretaker":
//           navigate("/CaretakerDashboard");
//           break;
//         case "caregiver":
//           navigate("/CaregiverDashboard");
//           break;
//         case "manager":
//           navigate("/ManagerDashboard");
//           break;
//         default:
//           setError("Invalid user type.");
//           break;
//       }
//     } else {
//       setError("Invalid login credentials.");
//     }
//   } catch (error) {
//     console.error(error);
//     setError("An error occurred while logging in.");
//   }
// };

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
//                     value={username}
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
//                   {userType ? `Sign in as ${userType}` : "Sign In"}
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
