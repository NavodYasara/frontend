import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import img1 from '/Users/USER/Desktop/serene-care-solution/frontend/Serene-care-frontend/src/Resources/img1.png'; // Corrected import path
// import { Link } from 'react-router-dom';

function BasicExample() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">
          <img
            alt=""
            src={img1} // Use the imported image
            width="30"
            height="30"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <img src="" alt="" />
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Our Services</Nav.Link>
            <Nav.Link href="#link">Contact Us</Nav.Link>
            <Nav.Link href="/src/Pages/Login.jsx">Login</Nav.Link> 
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}



export default BasicExample;
