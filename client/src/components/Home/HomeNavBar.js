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
        <Navbar.Brand style={{color: "white"}}>Asociación Cuidados Paliativos de Sarchí</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto ms-auto">
            <Nav.Link className="text-white" href="/">Inicio</Nav.Link>
            <Nav.Link className="text-white" href="/login">
              Iniciar sesión
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default HomeNavBar;