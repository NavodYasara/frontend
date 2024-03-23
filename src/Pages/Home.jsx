import React from 'react';
import Title from '../Components/Title';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';
import caroimg from '../Assets/caroimg.png';


function Home() {
  return (
    <div>
      <>
        <div className="carousel container my-5">
        <Carousel data-bs-theme="dark">
          

          <Carousel.Item>
            <img
              className="d-block w-100"
              src={caroimg} // Use the imported image
              alt="First slide"
            />
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block w-100"
              src={caroimg} // Use the imported image
              alt="First slide"
            />
          </Carousel.Item>
          
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={caroimg} // Use the imported image
              alt="First slide"
            />
          </Carousel.Item>
        </Carousel>
      </div>
      </>
      
      <div className='justify-content-center align-items-center'>
          <Title />
      </div>

      <div className="section">
        
      </div>
      <div className='boxone justify-content-center align-items-center'>
        <p className="herotext"> 
          Welcome to Serene Care Solutions' disability services, We are dedicated to providing high-quality care 
          solutions for individuals with disabilities. Our goal is to promote independence, dignity, and wellbeing 
          for our clients, and to offer support and guidance to their families.
        </p>
      </div>
  
    </div>
  );
}

export default Home;
