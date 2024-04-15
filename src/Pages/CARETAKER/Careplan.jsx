import React from 'react';
import Sidebar from '../../Components/Sidebar2';
import { Container, Table } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import { useState } from 'react';

function Careplan() {
  const [selectedCategory, setSelectedCategory] = useState(''); // Define setSelectedCategory using useState hook

  return (
    <div style={{ display: 'flex' }}>
      <div>
        <Sidebar />
      </div>

      <div>
        <Container fluid className="vh-100 d-flex" style={{ width: '100%' }}>
          <div className="flex-grow-2">
            <div className="d-flex justify-content-center align-items-center h-100 ">
              <div className="text-center p-4 shadow rounded" style={{ width: '80vw' }}> {/* Increased width to accommodate content */}

                {/* Client Information Section */}
                <h5 className="mb-3">Client Information</h5>
                <Table borderless className="invisible-table">
                  <tbody>
                    <tr>
                      <td>Name:</td>
                      <td>[Client's Name]</td>
                    </tr>
                    <tr>
                      <td>Age:</td>
                      <td>[Client's Age]</td>
                    </tr>
                    <tr>
                      <td>Diagnosis:</td>
                      <td>[Type of Mental Disability]</td>
                    </tr>
                    <tr>
                      <td>Date of Assessment:</td>
                      <td>[Date]</td>
                    </tr>
                  </tbody>
                </Table>
                
                {/* Goals and Objectives Section */}
                <h5 className="mt-4 mb-3">Goals and Objectives</h5>
                <p>
                  - Improve daily living skills and independence.
                  <br />
                  - Manage symptoms and behaviors associated with the mental disability.
                  <br />
                  - Enhance socialization and community integration.
                  <br />
                  - Ensure safety and well-being in the home environment.
                </p>

                {/* Other Sections (similar structure as Goals and Objectives) */}
                <h5 className="mt-4 mb-3">Personal Care</h5>
                <p>
                  - Assist with bathing, grooming, and dressing as needed.
                  <br />
                  - Provide support with toileting and personal hygiene routines.
                  <br />
                  - Encourage independence in self-care tasks whenever possible.
                </p>

                {/* ... Add similar sections for Medication Management, Behavioral Support, Socialization and Activities, Nutrition and Meal Planning, Safety and Environment, Communication and Collaboration, Documentation and Reporting, Training and Support, Regular Reviews and Updates */}

              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default Careplan;
