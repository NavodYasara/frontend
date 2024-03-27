import React from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';

function FormDisabledInputExample() {
  return (
    <Container className="d-flex justify-content-center align-items-center ">
      <Col md='7'>
        <Card className='my-5'>
          <Card.Body className='p-5'>
            <Row>
              <div className="title  mb-4">
                <h3 className='text-center'>Register</h3>
              </div>
              
              <Col md='6'>
                <Form.Group className='mb-4'>
                  <Form.Label>First name</Form.Label>
                  <Form.Control type='text' placeholder='Enter your first name' />
                </Form.Group>
              </Col>
              <Col md='6'>
                <Form.Group className='mb-4'>
                  <Form.Label>Last name</Form.Label>
                  <Form.Control type='text' placeholder='Enter your last name' />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className='mb-4'>
              <Form.Label>Email</Form.Label>
              <Form.Control type='email' placeholder='Enter your email' />
            </Form.Group>
            <Form.Group className='mb-4'>
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' placeholder='Enter your password' />
            </Form.Group>
            <Button className='w-100 mb-4' size='md' variant='primary'>Sign Up</Button>
          </Card.Body>
        </Card>
      </Col>
    </Container>
  );
}

export default FormDisabledInputExample;
