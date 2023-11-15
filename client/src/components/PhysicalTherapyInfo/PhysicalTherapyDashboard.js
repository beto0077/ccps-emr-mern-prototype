import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Container, Dropdown } from 'react-bootstrap';
import Navbar from '../NavigationBar'; // Adjust the import path as necessary
import 'bootstrap/dist/css/bootstrap.min.css';

function PhysicalTherapyDashboard() {
  const params = useParams();
  const navigate = useNavigate();
  const [availableHeight, setAvailableHeight] = useState(window.innerHeight);

  useEffect(() => {
    const updateAvailableHeight = () => {
      const navbarHeight = document.querySelector('.navbar').offsetHeight;
      const newAvailableHeight = window.innerHeight - navbarHeight;
      setAvailableHeight(newAvailableHeight);
    };

    window.addEventListener('resize', updateAvailableHeight);
    updateAvailableHeight();

    return () => window.removeEventListener('resize', updateAvailableHeight);
  }, []);

  return (
    <>
      <Navbar />
      <Container style={{ height: `${availableHeight}px`, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '1rem' }}>
        <h1 className="mb-4 mb-lg-5">Terapia Física</h1>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginBottom: '2rem' }}>
          <Button variant="primary" size="lg" onClick={() => navigate(`/physicalTherapyInfo/${params.id}`)} className="mx-2 my-2 my-lg-3">
            Información General
          </Button>
          <Button variant="secondary" size="lg" onClick={() => navigate(`/controlNoteList/${params.id}`)} className="mx-2 my-2 my-lg-3">
            Notas de control
          </Button>
        </div>
        <Dropdown className="mt-2 mt-lg-4">
          <Dropdown.Toggle id="dropdown-basic">
            Consultar
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => navigate(`/patientProfile/${params.id}`)}>Perfil de paciente</Dropdown.Item>
            <Dropdown.Item onClick={() => navigate(`/socialWorkDashboard/${params.id}`)}>Trabajo Social</Dropdown.Item>
            <Dropdown.Item onClick={() => navigate(`/psychologyDashboard/${params.id}`)}>Psicología</Dropdown.Item>
            <Dropdown.Item onClick={() => navigate(`/internalReferenceDashboard/${params.id}`)}>Referencias internas</Dropdown.Item>
            <Dropdown.Item onClick={() => navigate(`/loansDashboard/${params.id}`)}>Prestamos de equipo</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Container>
    </>
  );
}

export default PhysicalTherapyDashboard;
