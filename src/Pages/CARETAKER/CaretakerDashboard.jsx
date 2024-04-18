
import React from 'react';
import Sidebar from '../../Components/Sidebar2'
import { Container, Table} from 'react-bootstrap';
// import Avatar from '@mui/material/Avatar';
import Dropdown from 'react-bootstrap/Dropdown';
import { useState } from 'react';

function CaretakerDashboard() {
    const [selectedCategory, setSelectedCategory] = useState(''); // Define setSelectedCategory using useState hook

    return (
        <div style={{ display: 'flex' }}>
            <div>
                <Sidebar/>
            </div>

            <div fluid className="vh-100 d-flex " style={{width:'100%', marginTop: '100px'}}>
                <Container >
                    <div className="flex-grow-2">
                        <div className="d-flex justify-content-center align-items-center h-100 " >
                            <div className="text-center p-4 shadow rounded" style={{ width: '50vw' }}>
                                {/* <Avatar alt="Profile Picture" src="" sx={{ width: 100, height: 100, marginBottom: 20 }} /> */}
                                <Table borderless className="invisible-table">
                                    <tbody>
                                        <tr>
                                            <td className="fw-bold">First Name:</td>
                                            <td>John</td>
                                        </tr>
                                        <tr>
                                            <td className="fw-bold">Last Name:</td>
                                            <td>Doe</td>
                                        </tr>
                                        <tr>
                                            <td className="fw-bold">Age:</td>
                                            <td>30</td>
                                        </tr>
                                        <tr>
                                            <td className="fw-bold">Address:</td>
                                            <td>123 Main St, City</td>
                                        </tr>
                                        <tr>
                                            <td className="fw-bold">Contact Number:</td>
                                            <td>123-456-7890</td>
                                        </tr>
                                        <tr>
                                            <td className="fw-bold">
                                                <Dropdown>
                                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                                        Disble Catagory
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu>
                                                        <Dropdown.Item onClick={() => setSelectedCategory('Mental disorders')}>Mental disorders</Dropdown.Item>
                                                        <Dropdown.Item onClick={() => setSelectedCategory('Physical Disability')}>Physical Disability</Dropdown.Item>
                                                        <Dropdown.Item onClick={() => setSelectedCategory('Eldering')}>Eldering</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </td>
                                            <td>
                                                {selectedCategory}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="fw-bold">Your requirements:</td>
                                            <td>Bla bla bla</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    );
}

export default CaretakerDashboard;