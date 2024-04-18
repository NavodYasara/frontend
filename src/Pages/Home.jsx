import React from 'react';
import Title from '../Components/Title';
import Carousel from 'react-bootstrap/Carousel';
import { Card, Button } from "react-bootstrap";
import img2 from '../Assets/img2.webp';
import img3 from '../Assets/img3.webp';
import img4 from '../Assets/img4.webp';

export default function Home() {
  const services = [
    {
      title: 'Service 1',
      description: 'Description of Service 1',
      link: '/service1'
    },
    {
      title: 'Service 2',
      description: 'Description of Service 2',
      link: '/service2'
    },
    {
      title: 'Service 3',
      description: 'Description of Service 3',
      link: '/service3'
    }
  ];

  return (

    <div style={{ backgroundColor: '#f0f0f0' }}>
      <div className="container-fluid">
      <Title />

      {/* Carousel */}
      <div className='container d-flex justify-content-center'>
        <Carousel fade>
          <Carousel.Item>
            <img className="d-block w-100" src={img3} alt="First slide" />
            <Carousel.Caption></Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src={img4} alt="Second slide" />
            <Carousel.Caption></Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src={img2} alt="Third slide" />
            <Carousel.Caption></Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>

      {/* What We Offer Section */}
      <div id="what-we-offer" style={{ marginTop: '20px' }}>
        <section className="what-we-offer">
          <h2 className="text-center">What We Offer</h2>
          <div className="services-container d-flex justify-content-center flex-wrap">
            {services.map((service, index) => (
              <Card key={index} style={{ width: '18rem', margin: '1rem', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                <Card.Body>
                  <Card.Title>{service.title}</Card.Title>
                  <Card.Text>{service.description}</Card.Text>
                  <Button variant="primary" href={service.link}>More</Button>
                </Card.Body>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>  
    </div>

    
  );
}
