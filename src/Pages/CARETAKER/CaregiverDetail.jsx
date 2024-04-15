
import React from 'react';
import Sidebar from '../../Components/Sidebar2'
import { Container, } from 'react-bootstrap';
import { useState } from 'react';

function CaregiverDetail() {
    
    return (
     <>
        <div style={{ display: 'flex' }}>
            <div>
                <Sidebar/>
            </div>

            <div style={{marginLeft:'280px'}}>
                <Container fluid className="vh-100 d-flex " style={{width:'100%'}}>
                    <div className="flex-grow-2">
                        <div className="d-flex justify-content-center align-items-center h-100 " >
                            <div className="text-center p-4 shadow rounded" style={{ width: '50vw' }}>
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