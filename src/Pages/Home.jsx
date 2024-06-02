import React from "react";
import { Container, Grid, Typography } from "@mui/material";
import { Card, CardContent, CardHeader, CardMedia, Box } from "@mui/material";
import { Carousel } from "react-bootstrap";
import Navbar from "../Components/Navbar/Navbar";
import img2 from "../Assets/img2.webp";
import img3 from "../Assets/img3.webp";
import img4 from "../Assets/img4.webp";

export default function Home() {
  return (
    <>
      <Navbar />
      <Box sx={{ backgroundColor: "#f0f0f0", paddingTop: "20px" }}>
        <Container>
          <Typography variant="h3" align="center" gutterBottom>
            Welcome to Serene Care Solutions
          </Typography>
          <Typography variant="body1" align="center" paragraph>
            Serene Care Solutions is dedicated to providing high-quality care
            solutions for individuals with disabilities. Our goal is to promote
            independence, dignity, and wellbeing for our clients, and to offer
            support and guidance to their families.
          </Typography>
          <Typography variant="body1" align="center" paragraph>
            At Serene Care, our core mission is to prioritize the independence
            and lifestyle choices of individuals receiving disability services.
            With a focus on empowerment, we provide a wide range of attendant
            care supports to facilitate independent living and assist clients in
            achieving their goals.
          </Typography>

          {/* Carousel */}
          <Grid container justifyContent="center" sx={{ mb: 4 }}>
            <Grid item xs={12} md={8}>
              <Carousel fade>
                <Carousel.Item>
                  <img className="d-block w-100" src={img3} alt="First slide" />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={img4}
                    alt="Second slide"
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img className="d-block w-100" src={img2} alt="Third slide" />
                </Carousel.Item>
              </Carousel>
            </Grid>
          </Grid>

          {/* What We Offer Section */}
          <Typography variant="h4" align="center" gutterBottom>
            Our Services
          </Typography>
          <Grid container justifyContent="center" spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ height: "100%" }}>
                <CardHeader title="Personal Care" />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    Assistance with showering, grooming, dressing, meal
                    preparation, and toileting.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ height: "100%" }}>
                <CardHeader title="Domestic Care" />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    Household cleaning and maintenance.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ height: "100%" }}>
                <CardHeader title="Community Access" />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    Support in accessing and participating in the community.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ height: "100%" }}>
                <CardHeader title="Respite" />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    In-home or community-based respite services.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ height: "100%" }}>
                <CardHeader title="Therapy Support" />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    Assistance in accessing therapy sessions and maximizing
                    well-being.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ height: "100%" }}>
                <CardHeader title="Skill Development" />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    Guidance and support to enhance various skills.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}

// import React from "react";
// import Title from "../Components/Title";
// import Carousel from "react-bootstrap/Carousel";
// import { Card, Container, Row, Col } from "react-bootstrap";
// import Navbar from "../Components/Navbar/Navbar";
// import img2 from "../Assets/img2.webp";
// import img3 from "../Assets/img3.webp";
// import img4 from "../Assets/img4.webp";

// export default function Home() {
//   return (
//     <>
//       <Navbar />
//       <div style={{ backgroundColor: "#f0f0f0", paddingTop: "20px" }}>
//         <Container>
//           <Title />

//           {/* Carousel */}
//           <Row className="justify-content-center">
//             <Col>
//               <Carousel fade>
//                 <Carousel.Item>
//                   <img className="d-block w-100" src={img3} alt="First slide" />
//                 </Carousel.Item>
//                 <Carousel.Item>
//                   <img
//                     className="d-block w-100"
//                     src={img4}
//                     alt="Second slide"
//                   />
//                 </Carousel.Item>
//                 <Carousel.Item>
//                   <img className="d-block w-100" src={img2} alt="Third slide" />
//                 </Carousel.Item>
//               </Carousel>
//             </Col>
//           </Row>

//           {/* What We Offer Section */}
//           <div style={{ marginTop: "40px" }}>
//             <h2 className="text-center mb-4">
//               Welcome to Serene Care Solutions
//             </h2>
//             <p className="text-center">
//               Serene Care Solutions is dedicated to providing high-quality care
//               solutions for individuals with disabilities. Our goal is to
//               promote independence, dignity, and wellbeing for our clients, and
//               to offer support and guidance to their families.
//             </p>
//             <p className="text-center">
//               At Serene Care, our core mission is to prioritize the independence
//               and lifestyle choices of individuals receiving disability
//               services. With a focus on empowerment, we provide a wide range of
//               attendant care supports to facilitate independent living and
//               assist clients in achieving their goals.
//             </p>

//             <h3 className="mt-5 mb-3 text-center">Our Services</h3>
//             <Row className="justify-content-center">
//               <Col md={6} lg={4} className="mb-4">
//                 <Card className="h-100">
//                   <Card.Body>
//                     <Card.Title>Personal Care</Card.Title>
//                     <Card.Text>
//                       Assistance with showering, grooming, dressing, meal
//                       preparation, and toileting.
//                     </Card.Text>
//                   </Card.Body>
//                 </Card>
//               </Col>
//               <Col md={6} lg={4} className="mb-4">
//                 <Card className="h-100">
//                   <Card.Body>
//                     <Card.Title>Domestic Care</Card.Title>
//                     <Card.Text>Household cleaning and maintenance.</Card.Text>
//                   </Card.Body>
//                 </Card>
//               </Col>
//               <Col md={6} lg={4} className="mb-4">
//                 <Card className="h-100">
//                   <Card.Body>
//                     <Card.Title>Community Access</Card.Title>
//                     <Card.Text>
//                       Support in accessing and participating in the community.
//                     </Card.Text>
//                   </Card.Body>
//                 </Card>
//               </Col>
//               <Col md={6} lg={4} className="mb-4">
//                 <Card className="h-100">
//                   <Card.Body>
//                     <Card.Title>Respite</Card.Title>
//                     <Card.Text>
//                       In-home or community-based respite services.
//                     </Card.Text>
//                   </Card.Body>
//                 </Card>
//               </Col>
//               <Col md={6} lg={4} className="mb-4">
//                 <Card className="h-100">
//                   <Card.Body>
//                     <Card.Title>Therapy Support</Card.Title>
//                     <Card.Text>
//                       Assistance in accessing therapy sessions and maximizing
//                       well-being.
//                     </Card.Text>
//                   </Card.Body>
//                 </Card>
//               </Col>
//               <Col md={6} lg={4} className="mb-4">
//                 <Card className="h-100">
//                   <Card.Body>
//                     <Card.Title>Skill Development</Card.Title>
//                     <Card.Text>
//                       Guidance and support to enhance various skills.
//                     </Card.Text>
//                   </Card.Body>
//                 </Card>
//               </Col>
//               {/* <Col md={6} lg={4} className="mb-4">
//                 <Card className="h-100">
//                   <Card.Body>
//                     <Card.Title>Advocacy Support</Card.Title>
//                     <Card.Text>
//                       Ensuring client rights and amplifying their voice in all
//                       aspects of care.
//                     </Card.Text>
//                   </Card.Body>
//                 </Card>
//               </Col> */}
//             </Row>
//           </div>
//         </Container>
//       </div>
//     </>
//   );
// }
