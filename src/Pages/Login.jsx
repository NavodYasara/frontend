
import React, { useState } from 'react';
import { Container, Col, Card, Form, Button, Dropdown } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function FormDisabledInputExample() {
  const [userType, setUserType] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    // Implement logic to validate username and password
    if (userType === 'Caretaker' /* && valid username and password */) {
      navigate('/CaretakerDashboard');
    } else {
      setError('Invalid login credentials or user type.');
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
                    {/* <Dropdown.Toggle variant="secondary">
                      {userType || 'Select User Type'}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onSelect={() => setUserType('Admin')}>Admin</Dropdown.Item>
                      <Dropdown.Item onSelect={() => setUserType('Caretaker')}>Caretaker</Dropdown.Item>
                      <Dropdown.Item onSelect={() => setUserType('Caregiver')}>Caregiver</Dropdown.Item>
                    </Dropdown.Menu> */}

                    <Dropdown onSelect={(value) => setUserType(value)}>
                      <Dropdown.Toggle variant="success" id="dropdown-basic">
                        {userType || 'Select User Type'}
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item eventKey="Caretaker">Caretaker</Dropdown.Item>
                        <Dropdown.Item eventKey="Caregiver">Caregiver</Dropdown.Item>
                        <Dropdown.Item eventKey="Admin">Admin</Dropdown.Item>
                        <Dropdown.Item eventKey="Manager">Manager</Dropdown.Item>
                          {/* Add more user types as needed */}
                      </Dropdown.Menu>
                    </Dropdown>

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

export default FormDisabledInputExample;
