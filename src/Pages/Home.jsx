import React from 'react';
import Title from '../Components/Title';
import Carousel from 'react-bootstrap/Carousel';
import img2 from '../Assets/img2.webp'; // Import the images
import img3 from '../Assets/img3.webp';
import img4 from '../Assets/img4.webp';

export default function Home() {
  return (
    <>
      <div>
        <Title />
      </div>

      {/* carousal */}

      <div className='carouselbox d-flex justify-content-center'>
      <Carousel data-bs-theme="dark" className="w-75">
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={img2} // Use the imported image
            alt="First slide"
          />
          <Carousel.Caption>
            <h5>First slide label</h5>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={img3} // Use the imported image
            alt="Second slide"
          />
          <Carousel.Caption>
            <h5>Second slide label</h5>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={img4} // Use the imported image
            alt="Third slide"
          />
          <Carousel.Caption>
            <h5>Third slide label</h5>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
</div>

    </>
  );
}
