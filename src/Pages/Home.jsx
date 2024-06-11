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
      <Box
        sx={{
          backgroundColor: "#f0f0f0",
          paddingTop: "20px",
          paddingBottom: "20px",
        }}
      >
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
            {[
              {
                title: "Personal Care",
                description:
                  "Assistance with showering, grooming, dressing, meal preparation, and toileting.",
              },
              {
                title: "Domestic Care",
                description: "Household cleaning and maintenance.",
              },
              {
                title: "Community Access",
                description:
                  "Support in accessing and participating in the community.",
              },
              {
                title: "Respite",
                description: "In-home or community-based respite services.",
              },
              {
                title: "Therapy Support",
                description:
                  "Assistance in accessing therapy sessions and maximizing well-being.",
              },
              {
                title: "Skill Development",
                description: "Guidance and support to enhance various skills.",
              },
            ].map((service, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card sx={{ height: "100%" }}>
                  <CardHeader title={service.title} />
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      {service.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </>
  );
}

