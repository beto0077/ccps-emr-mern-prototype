import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { usePatientContext } from '../../context/PatientContext'; // Assuming there is a function to search patients
import Navbar from '../NavigationBar'; // Assuming you have a Navbar component
import Footer from '../Footer'; // Assuming you have a Footer component
import 'bootstrap/dist/css/bootstrap.min.css';

function PatientSearch() {
  const [idNumber, setIdNumber] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { searchPatientById } = usePatientContext(); // This function needs to be implemented in your context

  const handleSearch = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const patient = await searchPatientById(idNumber);
      if (patient) {
        navigate(`/patientProfile/${patient.patient_id}`);
      } else {
        setError('No patient found with that ID number.');
      }
    } catch (error) {
      setError('An error occurred while searching for the patient.');
    }
  };

  return (
    <div className="bg-dark">
      <Navbar />
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={6}>
            <Card>
              <Card.Body>
                <h2 className="text-center mb-4">Search Patient</h2>
                <Form onSubmit={handleSearch}>
                  <Form.Group controlId="patientId">
                    <Form.Label>Patient ID Number</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter ID number"
                      value={idNumber}
                      onChange={(e) => setIdNumber(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Search
                  </Button>
                </Form>
                {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}

export default PatientSearch;
