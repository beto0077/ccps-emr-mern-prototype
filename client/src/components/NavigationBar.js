//Has to be fixed later, I just copy the navbar of Doctors for test the patient home page

import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import { useNavigate } from 'react-router-dom';
//import '../Navber/Navber.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

function PatientNavbar() {
  const [userDirection, setUserDirection] = useState('')
  const navigate = useNavigate();
  /*useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("userData"));
    console.log(user)
    console.log(user.superAdminId)
    console.log(user.doctorId)
    if(user.superAdminId !== undefined) {
      const dirtn = '/ManagePatients'
      setUserDirection(dirtn)
    } else if (user.doctorId !== undefined) {
      const dirtn = '/actualDoc'
      setUserDirection(dirtn)
    } else if(user.adminId !== undefined) {
      const dirtn = '/ManagePatients'
      setUserDirection(dirtn)
    }
  }, [])*/

  const handleLogout = () => {
    sessionStorage.removeItem("usertoken");
    sessionStorage.removeItem("userData");
    navigate("/");
  };

  return (
    <div>
      <Navbar className="navbar" bg="success" text="white" var="lg">
        <Navbar.Brand style={{ color: "white" }}>Centro de Cuidados Paliativos de Sarchí</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto ms-auto">
            <Nav.Link className="text-white" onClick={() => navigate(-1)} >Atrás</Nav.Link>
            <Nav.Link className="text-white" href="/patientSearch">Buscar Paciente</Nav.Link>
            <Nav.Link className="text-white" onClick={handleLogout}>Cerrar sesión</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default PatientNavbar;