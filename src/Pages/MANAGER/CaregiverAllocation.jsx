import React from "react";
import { Container, Row, Col, Button, Form, Card } from "react-bootstrap";


export const CaregiverAllocation = () => {
  return (
    <Container className="caregiver-allocation">
      <Row className="justify-content-center">
        <Col xs={12} className="text-center mb-5">
          <h1>Allocate caregivers</h1>
          {/* <img className="line" alt="Line" src="" /> */}
        </Col>
      </Row>
      <Card className="box">
        <Card.Body className="rectangle">
          <Row className="justify-content-center">
            <Col xs={12} lg={10}>
              <Form>
                <Row className="mb-3">
                  <Col xs={12} md={6} lg={3}>
                    <Form.Group>
                      <Form.Label>Caretaker Name</Form.Label>
                      <Form.Control type="text" />
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={6} lg={3}>
                    <Form.Group>
                      <Form.Label>Start Date</Form.Label>
                      <Form.Control type="date" />
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={6} lg={3}>
                    <Form.Group>
                      <Form.Label>End Date</Form.Label>
                      <Form.Control type="date" />
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={6} lg={3}>
                    <div className="d-flex align-items-center">
                      <span className="text-wrapper-6">TO</span>
                    </div>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col xs={12} md={6} lg={3}>
                    <Form.Group>
                      <Form.Label>Caregiver Name</Form.Label>
                      <Form.Control type="text" />
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={6} lg={3}>
                    <Form.Group>
                      <Form.Label>Start Date</Form.Label>
                      <Form.Control type="date" />
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={6} lg={3}>
                    <Form.Group>
                      <Form.Label>End Date</Form.Label>
                      <Form.Control type="date" />
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={6} lg={3}>
                    <div className="d-flex align-items-center">
                      <span className="text-wrapper-6">TO</span>
                    </div>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col xs={12} className="text-center">
              {/* <img className="img" alt="Group" src="" /> */}
            </Col>
          </Row>
        </Card.Body>
      </Card>
      ;
      <Row className="justify-content-center">
        <Col xs={12} md={6} lg={4}>
          <Button variant="success" className="w-100 mb-3">
            Save
          </Button>
        </Col>
        <Col xs={12} md={6} lg={4}>
          <Button variant="danger" className="w-100 mb-3">
            Delete
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default CaregiverAllocation;


// import React from "react";
// import { Container, Row, Col, Button, Form, Card } from "react-bootstrap";
// import "./CaregiverAllocation.css";

// export const CaregiverAllocation = () => {
//   return (
//     <Container className="caregiver-allocation">
//       <Row className="justify-content-center">
//         <Col xs={12} className="text-center mb-5">
//           <h1>Allocate caregivers</h1>
//           {/* <img className="line" alt="Line" src="" /> */}
//         </Col>
//       </Row>
//       <Card className="box">
//         <Card.Body className="rectangle">
//           <Row className="justify-content-center">
//             <Col xs={12} lg={10}>
//               <Form>
//                 <Row className="mb-3">
//                   <Col xs={12} md={6} lg={2}>
//                     <Form.Group>
//                       <Form.Label>Caretaker Name</Form.Label>
//                       <Form.Control type="text" />
//                     </Form.Group>
//                   </Col>
//                   <Col xs={12} md={6} lg={2}></Col>
//                   <Col xs={12} md={6} lg={2}>
//                     <div className="d-flex align-items-center">
//                       <span className="text-wrapper-6">TO</span>
//                     </div>
//                   </Col>
//                   <Col xs={12} md={6} lg={2}></Col>
//                   <Col xs={12} md={6} lg={2}>
//                     <Form.Group>
//                       <Form.Label>Caregiver Name</Form.Label>
//                       <Form.Control type="text" />
//                     </Form.Group>
//                   </Col>
//                 </Row>
//                 <Row className="mb-3">
//                   <Col xs={12} md={6} lg={2}></Col>
//                   <Col xs={12} md={6} lg={2}>
//                     <Form.Group>
//                       <Form.Label>Start Date</Form.Label>
//                       <Form.Control type="date" />
//                     </Form.Group>
//                   </Col>
//                   <Col xs={12} md={6} lg={3}>
//                     <Form.Group>
//                       <Form.Label>End Date</Form.Label>
//                       <Form.Control type="date" />
//                     </Form.Group>
//                   </Col>
//                   <Col xs={12} md={6} lg={3}></Col>
//                 </Row>
//               </Form>
//             </Col>
//           </Row>
//           <Row className="justify-content-center">
//             <Col xs={12} className="text-center">
//               {/* <img className="img" alt="Group" src="" /> */}
//             </Col>
//           </Row>
//         </Card.Body>
//       </Card>
//       ;
//       <Row className="justify-content-center">
//         <Col xs={12} md={6} lg={4}>
//           <Button variant="success" className="w-100 mb-3">
//             Save
//           </Button>
//         </Col>
//         <Col xs={12} md={6} lg={4}>
//           <Button variant="danger" className="w-100 mb-3">
//             Delete
//           </Button>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default CaregiverAllocation;
