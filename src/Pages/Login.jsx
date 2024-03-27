import { style } from '@mui/system';
import React from 'react';
import { Container, Col, Card, Form, Button, Dropdown } from 'react-bootstrap';

function FormDisabledInputExample() {
  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Col md='6'>
        <Card className='my-5'>
          <Card.Body className='p-5'>
            <h3 className='text-center'>login</h3>
            <Form.Group className='mb-4'>
              <Form.Label>User Type</Form.Label>
              <Dropdown>
                <Dropdown.Toggle variant="secondary">
                  Select User Type
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>Admin</Dropdown.Item>
                  <Dropdown.Item>Caretaker</Dropdown.Item>
                  <Dropdown.Item>Caregiver</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>
            <Form.Group className='mb-4'>
              <Form.Label>User Name</Form.Label>
              <Form.Control type='text' placeholder='Enter your username' />
            </Form.Group>
            <Form.Group className='mb-4'>
              <Form.Label>Email</Form.Label>
              <Form.Control type='email' placeholder='Enter your email' />
            </Form.Group>
            <Form.Group className='mb-4'>
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' placeholder='Enter your password' />
            </Form.Group>
            <Button className='w-100 mb-4' size='md' variant='primary'>Sign In</Button>
          </Card.Body>
        </Card>
      </Col>
    </Container>
  );
}

export default FormDisabledInputExample;

