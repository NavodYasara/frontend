import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import img1 from '../../Assets/img1.png'; // Import the image

function NavbarComponent() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">
          <img
            alt="LOGO"
            src={img1} // Use the imported image
            width="30"
            height="30"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="Home">Home</Nav.Link>
            <Nav.Link href="Register">Register</Nav.Link>
            <Nav.Link href="Login">Login</Nav.Link>  
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}



export default NavbarComponent;
