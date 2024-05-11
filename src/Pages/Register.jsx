import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    date_of_birth: "",
    gender: "",
    address: "",
    catagory_carataker: "",
    usertype: "caretaker",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/server/registercaretaker",
        form
      );
      console.log(response.data);
      navigate("/Login");
    } catch (error) {
      console.error(error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <Container className="mt-5">
      <Col md="6" className="mx-auto">
        <Card>
          <Card.Body>
            <div className="title mb-4 text-center">
              <h3>Register</h3>
            </div>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-4">
                <Form.Label>User Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your username"
                  name="username"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  name="password"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your first name"
                  name="first_name"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your last name"
                  name="last_name"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label>Contact Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your contact number"
                  name="phone_number"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control
                  type="date"
                  name="date_of_birth"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label>Gender</Form.Label>
                <Form.Control as="select" name="gender" onChange={handleChange}>
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </Form.Control>
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your address"
                  name="address"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label>User Type</Form.Label>
                <Form.Control
                  as="select"
                  name="catagory_carataker"
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="MENTAL">MENTAL</option>
                  <option value="DISABILITY">DISABILITY</option>
                  <option value="ELDERING">ELDERING</option>
                </Form.Control>
              </Form.Group>
              <Row>
                <Col md="12">
                  <Button
                    className="w-100 mb-4"
                    size="md"
                    variant="primary"
                    type="submit"
                  >
                    Sign Up
                  </Button>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Container>
  );
};

export default Register;

// import React, { useState } from 'react';
// import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Register = () => {
//   const [form, setForm] = useState({
//     username: '',
//     password: '',
//     firstname: '',
//     lastname: '',
//     contactNumber: '',
//     dob: '',
//     gender: '',
//     address: ''
//   });

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setForm({
//       ...form,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       console.log((await axios.post('http://localhost:5000/server/registercaretaker', form)).data);
//       navigate('/Login');
//     } catch (error) {
//       console.error(error);
//       alert("Registration failed. Please try again.");
//     }
//   };

//   return (
//     <Container className='mt-5'>
//       <Col md='6' className='mx-auto'>
//         <Card>
//           <Card.Body>
//             <div className="title mb-4 text-center">
//               <h3>Register</h3>
//             </div>
//             <Form onSubmit={handleSubmit}>
//               <Form.Group className='mb-4'>
//                 <Form.Label>User Name</Form.Label>
//                 <Form.Control type='text' placeholder='Enter your username' name='username' onChange={handleChange} />
//               </Form.Group>
//               <Form.Group className='mb-4'>
//                 <Form.Label>Password</Form.Label>
//                 <Form.Control type='password' placeholder='Enter your password' name='password' onChange={handleChange} />
//               </Form.Group>
//               <Form.Group className='mb-4'>
//                 <Form.Label>first Name</Form.Label>
//                 <Form.Control type='text' placeholder='Enter your first name' name='firstname' onChange={handleChange} />
//               </Form.Group>
//               <Form.Group className='mb-4'>
//                 <Form.Label>Last Name</Form.Label>
//                 <Form.Control type='text' placeholder='Enter your last name' name='lastname' onChange={handleChange} />
//               </Form.Group>
//               <Form.Group className='mb-4'>
//                 <Form.Label>Contact Number</Form.Label>
//                 <Form.Control type='text' placeholder='Enter your contact number' name='contactNumber' onChange={handleChange} />
//               </Form.Group>
//               <Form.Group className='mb-4'>
//                 <Form.Label>Date of Birth</Form.Label>
//                 <Form.Control type='date' name='dob' onChange={handleChange} />
//               </Form.Group>
//               <Form.Group className='mb-4'>
//                 <Form.Label>Gender</Form.Label>
//                 <Form.Control as='select' name='gender' onChange={handleChange}>
//                   <option>Male</option>
//                   <option>Female</option>
//                   <option>Other</option>
//                 </Form.Control>
//               </Form.Group>
//               <Form.Group className='mb-4'>
//                 <Form.Label>Address</Form.Label>
//                 <Form.Control type='text' placeholder='Enter your address' name='address' onChange={handleChange} />
//               </Form.Group>
//               <Row>
//                 <Col md='12'>
//                   <Button className='w-100 mb-4' size='md' variant='primary' type='submit'>Sign Up</Button>
//                 </Col>
//               </Row>
//             </Form>
//           </Card.Body>
//         </Card>
//       </Col>
//     </Container>
//   );
// };

// export default Register;
