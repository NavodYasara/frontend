import React, { useState, useContext } from 'react';
import { Container, Col, Card, Form, Button, Dropdown } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from './UserContext';

function Login() {
  

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('/server/login', {
        username,
        password,
        usertype: userType,
      });

      if (response.status === 200) {
        setUserType(userType); // Set userType in context
        if (userType === 'caretaker') {
          navigate('/CaretakerDashboard');
        } else {
          // Handle other user types here
        }
      } else {
        setError('Invalid login credentials or user type.');
      }
    } catch (error) {
      console.error(error);
      setError('An error occurred while logging in.');
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Col md='6'>
        <Card className='my-5'>
          <Card.Body className='p-5'>
            <div className="title mb-4 text-center">
              <h3>Login</h3>
            </div>
            <Row className="justify-content-center mb-4">
              <Col md='6'>
                <Form.Group>
                  <Dropdown className='d-flex justify-content-center'>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      {userType || 'Select User Type'}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => setUserType('caretaker')}>Caretaker</Dropdown.Item>
                      <Dropdown.Item onClick={() => setUserType('caregiver')}>Caregiver</Dropdown.Item>
                      <Dropdown.Item onClick={() => setUserType('admin')}>Admin</Dropdown.Item>
                      <Dropdown.Item onClick={() => setUserType('manager')}>Manager</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className='mb-4'>
              <Form.Label>User Name</Form.Label>
              <Form.Control type='text' placeholder='Enter your username' value={username} onChange={(e) => setUsername(e.target.value)} />
            </Form.Group>
            <Form.Group className='mb-4'>
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
            {error && <div className="text-danger mb-3">{error}</div>}
            <Button className='btn-login w-100 mb-4' size='md' variant='primary' onClick={handleLogin}>
              {userType ? `Sign in as ${userType}` : 'Sign In'}
            </Button>
          </Card.Body>
        </Card>
      </Col>
    </Container>
  );
}

export default Login;
