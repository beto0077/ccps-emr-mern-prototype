import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Alert,
} from "react-bootstrap";
import { usePatientContext } from "../../context/PatientContext";
import Navbar from "../NavigationBar";
import Footer from "../Footer";
import "bootstrap/dist/css/bootstrap.min.css";

function PatientSearch() {
  const [idNumber, setIdNumber] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { searchPatientById } = usePatientContext();
  const [availableHeight, setAvailableHeight] = useState(window.innerHeight);

  const handleSearch = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const patient = await searchPatientById(idNumber);
      if (patient) {
        navigate(`/patientProfile/${patient.patient_id}`);
      } else {
        setError("No patient found with that ID number.");
      }
    } catch (error) {
      setError("An error occurred while searching for the patient.");
    }
  };

  useEffect(() => {
    const updateAvailableHeight = () => {
      // Get the height of the navbar by its ref or class name
      const navbarHeight = document.querySelector(".navbar").offsetHeight;
      // Calculate the available height by subtracting the navbar height from the window inner height
      const newAvailableHeight = window.innerHeight - navbarHeight;
      setAvailableHeight(newAvailableHeight);
    };

    // Update the available height on mount and whenever the window is resized
    window.addEventListener("resize", updateAvailableHeight);
    updateAvailableHeight();

    // Cleanup the event listener when the component is unmounted
    return () => window.removeEventListener("resize", updateAvailableHeight);
  }, []);

  return (
    <>
      <Navbar />
      <div
        className="bg-dark"
        style={{
          display: "flex",
          flexDirection: "column",
          height: `${availableHeight}px`,
        }}
      >
        <Container
          className="py-5"
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Row className="justify-content-center">
            <Col md={6}>
              <Card>
                <Card.Body>
                  <h2 className="text-center mb-4">Buscar paciente</h2>
                  <Form onSubmit={handleSearch}>
                    <Form.Group controlId="patientId">
                      <Form.Label>Número de cédula</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Ingrese el número de cédula del paciente"
                        value={idNumber}
                        onChange={(e) => setIdNumber(e.target.value)}
                        required
                      />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="mt-3">
                      Buscar
                    </Button>
                  </Form>
                  {error && (
                    <Alert variant="danger" className="mt-3">
                      {error}
                    </Alert>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default PatientSearch;
