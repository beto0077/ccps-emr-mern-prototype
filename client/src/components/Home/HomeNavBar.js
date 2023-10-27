import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
//import './Navber.css';

function HomeNavBar() {
  const [prevScrollpos, setPrevScrollpos] = useState(window.pageYOffset);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const isVisible = prevScrollpos > currentScrollPos;
      setPrevScrollpos(currentScrollPos);
      setVisible(isVisible);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollpos]);

  return (
    <div>
      <Navbar className={classnames("navbar", {
        "navbar--hidden": !visible
      })} bg="primary" text="white" expand="lg">
        <Navbar.Brand style={{color: "white"}}>New Hope Hospital Ltd</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto ms-auto">
            <Nav.Link className="text-white" href="/">Home</Nav.Link>
            <Nav.Link className="text-white" href="/createPatient">TestPatient</Nav.Link>
            <Nav.Link className="text-white" href="/WIPPage">Gallery</Nav.Link>
            <Nav.Link className="text-white" href="/WIPPage">Contact Us</Nav.Link>
            
            <NavDropdown title="Login" id="basic-nav-dropdown" className="mr-5" align="end">
              
              <NavDropdown.Item href="/doctors/login">Doctor Login</NavDropdown.Item>
              <NavDropdown.Item href="/superAdministrator/login">Super Admin Login</NavDropdown.Item>
              <NavDropdown.Item href="/administrator/login">Admin Login</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default HomeNavBar;