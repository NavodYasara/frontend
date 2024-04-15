import React from 'react';
import Sidebar from '../../Components/Sidebar2';
import { Container, Row, Col, Image } from 'react-bootstrap';

function CaregiverDetail() {
  // You can replace these with actual data from your application
  const caregiver = {
    name: '[Caregiver\'s Full Name]',
    age: '[Caregiver\'s Age]',
    gender: '[Caregiver\'s Gender]',
    contactNumber: '[Caregiver\'s Contact Number]',
    email: '[Caregiver\'s Email Address]',
    address: '[Caregiver\'s Address]',
    education: '[Highest Level of Education Attained]',
    certifications: '[Any Relevant Certifications or Training]',
    experience: '[Number of Years of Experience in Caregiving]',
    specializations: '[Areas of Expertise or Specialized Training]',
    schedule: '[Caregiver\'s Availability for Shifts or Appointments]',
    preferredHours: '[Preferred Time Slots for Work]',
    languages: '[Languages Spoken by the Caregiver]',
    specialSkills: '[Any Special Skills or Talents Relevant to Caregiving]',
    interests: '[Personal Interests or Hobbies]',
    workHistory: [
      {
        employer: '[Previous Employer Name]',
        jobRole: '[Job Title]',
        responsibilities: '[Description of Job Responsibilities]',
      },
      // Add more work history objects as needed
    ],
    professionalReferences: [
      // Add objects with contact information for professional references
    ],
    personalReferences: [
      // Add objects with contact information for personal references
    ],
    travelAvailability: '[Yes/No]',
    drivingLicense: '[Yes/No]',
    criminalBackgroundCheck: '[Yes/No]',
    profilePicture: '[Image URL or path]', // Replace with actual image URL
  };

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
                  <Image src={caregiver.profilePicture} roundedCircle style={{ width: '150px', height: '150px', marginBottom: '20px' }} />

                  {/* Personal Information Section */}
                  <h5 className="mb-3">Personal Information</h5>
                  <Row>
                    <Col sm={6}>Name:</Col>
                    <Col sm={6}>{caregiver.name}</Col>
                  </Row>
                  <Row>
                    <Col sm={6}>Age:</Col>
                    <Col sm={6}>{caregiver.age}</Col>
                  </Row>
                  <Row>
                    <Col sm={6}>Gender:</Col>
                    <Col sm={6}>{caregiver.gender}</Col>
                  </Row>
                  <Row>
                    <Col sm={6}>Contact Number:</Col>
                    <Col sm={6}>{caregiver.contactNumber}</Col>
                  </Row>
                  <Row>
                    <Col sm={6}>Email:</Col>
                    <Col sm={6}>{caregiver.email}</Col>
                  </Row>
                  <Row>
                    <Col sm={6}>Address:</Col>
                    <Col sm={6}>{caregiver.address}</Col>
                  </Row>

                  {/* Other Sections (similar structure as Personal Information) */}
                  <h5 className="mt-4 mb-3">Qualifications and Experience</h5>
                  <Row>
                    <Col sm={6}>Education:</Col>
                    <Col sm={6}>{caregiver.education}</Col>
                  </Row>
                  <Row>
                    <Col sm={6}>Certifications:</Col>
                    <Col sm={6}>{caregiver.certifications}</Col>
                  </Row>
                  <Row>
                    <Col sm={6}>Experience:</Col>
                    <Col sm={6}>{caregiver.experience} years</Col>
                  </Row>
                  <Row>
                    <Col sm={6}>Specializations:</Col>
                    <Col sm={6}>{caregiver.specializations}</Col>
                  </Row>
                  <Row>
                    <Col sm={6}>Schedule:</Col>
                    <Col sm={6}>{caregiver.schedule}</Col>
                  </Row>
                  <Row>
                    <Col sm={6}>Preferred Hours:</Col>
                    <Col sm={6}>{caregiver.preferredHours}</Col>
                  </Row>
                  <Row>
                    <Col sm={6}>Languages:</Col>
                    <Col sm={6}>{caregiver.languages}</Col>
                  </Row>
                  <Row>
                    <Col sm={6}>Special Skills:</Col>
                    <Col sm={6}>{caregiver.specialSkills}</Col>
                  </Row>
                  <Row>
                    <Col sm={6}>Interests:</Col>
                    <Col sm={6}>{caregiver.interests}</Col>
                  </Row>

                  {/* Work History Section */}
                  <h5 className="mt-4 mb-3">Work History</h5>
                  {caregiver.workHistory.map((job, index) => (
                    <div key={index}>
                      <h6>{`Job ${index + 1}`}</h6>
                      <Row>
                        <Col sm={6}>Employer:</Col>
                        <Col sm={6}>{job.employer}</Col>
                      </Row>
                      <Row>
                        <Col sm={6}>Job Role:</Col>
                        <Col sm={6}>{job.jobRole}</Col>
                      </Row>
                      <Row>
                        <Col sm={6}>Responsibilities:</Col>
                        <Col sm={6}>{job.responsibilities}</Col>
                      </Row>
                    </div>
                  ))}

                  {/* References Section */}
                  <h5 className="mt-4 mb-3">References</h5>
                  <h6>Professional References:</h6>
                  {caregiver.professionalReferences.map((reference, index) => (
                    <div key={index}>
                      <Row>
                        <Col sm={6}>Name:</Col>
                        <Col sm={6}>{reference.name}</Col>
                      </Row>
                      <Row>
                        <Col sm={6}>Contact Number:</Col>
                        <Col sm={6}>{reference.contactNumber}</Col>
                      </Row>
                      <Row>
                        <Col sm={6}>Email:</Col>
                        <Col sm={6}>{reference.email}</Col>
                      </Row>
                    </div>
                  ))}

                  <h6 className="mt-4">Personal References:</h6>
                  {caregiver.personalReferences.map((reference, index) => (
                    <div key={index}>
                      <Row>
                        <Col sm={6}>Name:</Col>
                        <Col sm={6}>{reference.name}</Col>
                      </Row>
                      <Row>
                        <Col sm={6}>Contact Number:</Col>
                        <Col sm={6}>{reference.contactNumber}</Col>
                      </Row>
                      <Row>
                        <Col sm={6}>Email:</Col>
                        <Col sm={6}>{reference.email}</Col>
                      </Row>
                    </div>
                  ))}

                  {/* Additional Details Section */}
                  <h5 className="mt-4 mb-3">Additional Details</h5>
                  <Row>
                    <Col sm={6}>Travel Availability:</Col>
                    <Col sm={6}>{caregiver.travelAvailability}</Col>
                  </Row>
                  <Row>
                    <Col sm={6}>Driving License:</Col>
                    <Col sm={6}>{caregiver.drivingLicense}</Col>
                  </Row>
                  <Row>
                    <Col sm={6}>Criminal Background Check:</Col>
                    <Col sm={6}>{caregiver.criminalBackgroundCheck}</Col>
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

export default CaregiverDetail;
