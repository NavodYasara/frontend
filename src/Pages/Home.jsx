import React from 'react';
import Title from '../Components/Title';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';
import img2 from '../Assets/img2.webp';
import img3 from '../Assets/img3.webp';
import img4 from '../Assets/img4.webp';


function Home() {
  return (
    <div>
      <div className='justift-content-center w-50 m-auto'>
      <div className="carousel container my-5">
        <Carousel data-bs-theme="dark">
          
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={img2} 
            alt="First slide"
          />
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src={img3} 
            alt="Second slide"
          />
        </Carousel.Item>
        
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={img4}
            alt="Third slide"
          />
        </Carousel.Item>
        </Carousel>
      </div>
      </div>
      
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
