import React from 'react';
import Sidebar from '../../Components/Sidebar2';
import { Container, Row, Col, Image } from 'react-bootstrap';

const ManagerDashboard = ({ manager }) => {
  return (
    <>
      <div style={{ display: 'flex' }}>
        <div>
          <Sidebar />
        </div>

        <div>
          <Container fluid className="d-flex" style={{ width: '100%' }}>
            <div className="flex-grow-2">
              <div className="d-flex justify-content-center align-items-center h-100 ">
                <div className="text-center p-4 shadow rounded" style={{ width: '80vw' }}>
                  {/* Profile Picture */}
                  <Image src={manager.profilePicture} roundedCircle style={{ width: '150px', height: '150px', marginBottom: '20px' }} />

                  {/* Personal Information Section */}
                  <h5 className="mb-3">Personal Information</h5>
                  <Row>
                    <Col sm={6}>Name:</Col>
                    <Col sm={6}>{manager.name}</Col>
                  </Row>
                  <Row>
                    <Col sm={6}>Age:</Col>
                    <Col sm={6}>{manager.age}</Col>
                  </Row>
                  <Row>
                    <Col sm={6}>Gender:</Col>
                    <Col sm={6}>{manager.gender}</Col>
                  </Row>
                  <Row>
                    <Col sm={6}>Contact Number:</Col>
                    <Col sm={6}>{manager.contactNumber}</Col>
                  </Row>
                  <Row>
                    <Col sm={6}>Email:</Col>
                    <Col sm={6}>{manager.email}</Col>
                  </Row>
                  <Row>
                    <Col sm={6}>Address:</Col>
                    <Col sm={6}>{manager.address}</Col>
                  </Row>

                  {/* Additional Details Section */}
                  <h5 className="mt-4 mb-3">Additional Details</h5>
                  <Row>
                    <Col sm={6}>Department:</Col>
                    <Col sm={6}>{manager.department}</Col>
                  </Row>
                  <Row>
                    <Col sm={6}>Hiring Date:</Col>
                    <Col sm={6}>{manager.hiringDate}</Col>
                  </Row>
                  <Row>
                    <Col sm={6}>Salary:</Col>
                    <Col sm={6}>{manager.salary}</Col>
                  </Row>
                  <Row>
                    <Col sm={6}>Performance Rating:</Col>
                    <Col sm={6}>{manager.performanceRating}</Col>
                  </Row>
                  <Row>
                    <Col sm={6}>Projects:</Col>
                    <Col sm={6}>{manager.projects}</Col>
                  </Row>
                </div>
              </div>
            </div>
          </Container>
        </div>

      </div>
    </>
  );
}

export default ManagerDashboard;
