import React from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';

const Register = () => {
  return (
    <Container className='mt-5'>
      <Col md='6' className='mx-auto'>
        <Card>
          <Card.Body>
            <div className="title mb-4 text-center"> 
              <h3>Register</h3>
            </div>
            <Row className=''> 
              <Col md='12'>
                <Form.Group className='mb-4'>
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control type='text' placeholder='Enter your full name' />
                </Form.Group>
                <Form.Group className='mb-4'>
                  <Form.Label>Contact Number</Form.Label>
                  <Form.Control type='text' placeholder='Enter your contact number' />
                </Form.Group>
                <Form.Group className='mb-4'>
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control type='date' />
                </Form.Group>
                <Form.Group className='mb-4'>
                  <Form.Label>Gender</Form.Label>
                  <Form.Control as='select'>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group className='mb-4'>
                  <Form.Label>Address</Form.Label>
                  <Form.Control type='text' placeholder='Enter your address' />
                </Form.Group>
                <Form.Group className='mb-4'>
                  <Form.Label>User Name</Form.Label>
                  <Form.Control type='text' placeholder='Enter your username' />
                </Form.Group>
                <Form.Group className='mb-4'>
                  <Form.Label>Password</Form.Label>
                  <Form.Control type='password' placeholder='Enter your password' />
                </Form.Group>
                <Form.Group className='mb-4'>
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control type='password' placeholder='Confirm your password' />
                </Form.Group>
                <Form.Group className='mb-4'>
                  <Form.Label>Service Category</Form.Label>
                  <Form.Control as='select'>
                    <option>Service 1</option>
                    <option>Service 2</option>
                    <option>Service 3</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md='12'>
                <Button className='w-100 mb-4' size='md' variant='primary'>Sign Up</Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </Container>
  );
}

export default Register;