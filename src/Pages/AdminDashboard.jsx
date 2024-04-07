import React, { useState } from 'react';
import { Container, Row, Col, Navbar, Nav } from 'react-bootstrap';
import { FaBars } from 'react-icons/fa';

const drawerWidth = 240;

const ResponsiveDrawer = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <Navbar
        className={`d-block d-sm-none ${mobileOpen ? '' : 'invisible'}`}
        expand="lg"
        variant="dark"
        bg="dark"
        style={{ width: drawerWidth, flexShrink: 0 }}
      >
        <Navbar.Brand href="#">Sidebar</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="flex-column">
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
              <Nav.Link key={text} href="#" className="p-3">
                {text}
              </Nav.Link>
            ))}
            <Nav.Link href="#" className="p-3">All mail</Nav.Link>
            <Nav.Link href="#" className="p-3">Trash</Nav.Link>
            <Nav.Link href="#" className="p-3">Spam</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* Content */}
      
      <div className="flex-grow-1">
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home">Responsive drawer</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={handleDrawerToggle}>
            <FaBars />
          </Navbar.Toggle>
        </Navbar>
        <Container fluid className="p-3">
          <Row>
            <Col>
              <h1>Content</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
                enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
                imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
                Convallis convallis tellus id interdum velit laoreet id donec ultrices.
                Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
                adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra
                nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum
                leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis
                feugiat vivamus at augue. At augue eget arcu dictum varius duis at
                consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
                sapien faucibus et molestie ac.
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default ResponsiveDrawer;
