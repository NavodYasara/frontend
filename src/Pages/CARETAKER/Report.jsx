import React from 'react';
import Sidebar from '../../Components/Sidebar';
import { Container, Row, Col, Image, Table } from 'react-bootstrap';

function Report() {
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
          <Container fluid className="vh-90 d-flex" style={{ width: '100%' }}>
            <div className="flex-grow-2">
              <div className="d-flex justify-content-center align-items-center h-100 ">
                <div className="text-center p-4 shadow rounded" style={{ width: '80vw' }}>
                  {/* Report Heading (consider using a more descriptive title) */}
                  <h2 className="mb-4">Caregiver Report: {caregiver.name}</h2>

                  {/* Profile Picture (optional) */}
                  <Image src={caregiver.profilePicture} roundedCircle style={{ width: '150px', height: '150px', marginBottom: '20px' }} />

                  {/* Personal Information Section */}
                  <h5 className="mb-3">Personal Information</h5>
                  <Table bordered hover size="sm">
                  {/* <Table borderless className="invisible-table"> */}
                    <tbody>
                      <tr>
                        <td>Name:</td>
                        <td>{caregiver.name}</td>
                      </tr>
                      <tr>
                        <td>Age:</td>
                        <td>{caregiver.age}</td>
                      </tr>
                      <tr>
                        <td>Gender:</td>
                        <td>{caregiver.gender}</td>
                      </tr>
                      <tr>
                        <td>Contact Number:</td>
                        <td>{caregiver.contactNumber}</td>
                      </tr>
                      <tr>
                        <td>Email:</td>
                        <td>{caregiver.email}</td>
                      </tr>
                      <tr>
                        <td>Address:</td>
                        <td>{caregiver.address}</td>
                      </tr>
                    </tbody>
                  </Table>

                  {/* Other Sections with Clear Headings and Structured Content */}
                  <h5 className="mt-4 mb-3">Qualifications and Experience</h5>
                  <Table bordered hover size="sm">
                    <tbody>
                      <tr>
                        <td>Education:</td>
                        <td>{caregiver.education}</td>
                      </tr>
                      <tr>
                        <td>Certifications:</td>
                        <td>{caregiver.certifications}</td>
                      </tr>
                      <tr>
                        <td>Experience:</td>
                        <td>{caregiver.experience} years</td>
                      </tr>
                    </tbody>
                  </Table>

                  <h5 className="mt-4 mb-3">Skills and Abilities</h5>
                  <Table bordered hover size="sm">
                    <tbody>
                      <tr>
                        <td>Languages:</td>
                        <td>{caregiver.languages}</td>
                      </tr>
                      <tr>
                        <td>Special Skills:</td>
                        <td>{caregiver.specialSkills}</td>
                      </tr>
                      <tr>
                        <td>Interests:</td>
                        <td>{caregiver.interests}</td>
                      </tr>
                    </tbody>
                  </Table>

                  {/* Work History Section with clear subheadings */}
                  <h5 className="mt-4 mb-3">Work History</h5>
                  {caregiver.workHistory.map((job, index) => (
                    <div key={index}>
                      <h6>{`Job ${index + 1}`}</h6>
                      <Table bordered hover size="sm">
                        <tbody>
                          <tr>
                            <td>Employer:</td>
                            <td>{job.employer}</td>
                          </tr>
                          <tr>
                            <td>Job Role:</td>
                            <td>{job.jobRole}</td>
                          </tr>
                          <tr>
                            <td>Responsibilities:</td>
                            <td>{job.responsibilities}</td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                  ))}

                  {/* References Section with separate subsections for Professional and Personal References */}
                  <h5 className="mt-4 mb-3">References</h5>
                  <h6>Professional References:</h6>
                  {caregiver.professionalReferences.map((reference, index) => (
                    <div key={index}>
                      <Table bordered hover size="sm">
                        <tbody>
                          <tr>
                            <td>Name:</td>
                            <td>{reference.name}</td>
                          </tr>
                          <tr>
                            <td>Contact Number:</td>
                            <td>{reference.contactNumber}</td>
                          </tr>
                          <tr>
                            <td>Email:</td>
                            <td>{reference.email}</td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                  ))}

                  <h6 className="mt-4">Personal References:</h6>
                  {caregiver.personalReferences.map((reference, index) => (
                    <div key={index}>
                      <Table bordered hover size="sm">
                        <tbody>
                          <tr>
                            <td>Name:</td>
                            <td>{reference.name}</td>
                          </tr>
                          <tr>
                            <td>Contact Number:</td>
                            <td>{reference.contactNumber}</td>
                          </tr>
                          <tr>
                            <td>Email:</td>
                            <td>{reference.email}</td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                  ))}

                  {/* Additional Details Section */}
                  <h5 className="mt-4 mb-3">Additional Details</h5>
                  <Table bordered hover size="sm">
                    <tbody>
                      <tr>
                        <td>Travel Availability:</td>
                        <td>{caregiver.travelAvailability}</td>
                      </tr>
                      <tr>
                        <td>Driving License:</td>
                        <td>{caregiver.drivingLicense}</td>
                      </tr>
                      <tr>
                        <td>Criminal Background Check:</td>
                        <td>{caregiver.criminalBackgroundCheck}</td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </>
  );
}

export default Report;
