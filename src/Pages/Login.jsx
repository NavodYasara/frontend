import React from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox,
  MDBIcon
} from 'mdb-react-ui-kit';

function FormDisabledInputExample() {
  return (
    <MDBContainer className="d-flex justify-content-center align-items-center vh-100">
      <MDBCol md='6'>
        <MDBCard className='my-5'>
          <MDBCardBody className='p-5'>
            <MDBInput wrapperClass='mb-4' label='User Name' id='form1' type='text'/>
            <MDBInput wrapperClass='mb-4' label='Email' id='form1' type='email'/>
            <MDBInput wrapperClass='mb-4' label='Password' id='form1' type='password'/>

            {/* <div className='d-flex justify-content-center mb-4'>
              <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Subscribe to our newsletter' />
            </div> */}
            
            <MDBBtn className='w-100 mb-4' size='md'>sign up</MDBBtn>
            
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </MDBContainer>
  );
}

export default FormDisabledInputExample;
