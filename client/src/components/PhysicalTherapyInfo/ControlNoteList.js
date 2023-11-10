import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import Navber from "../NavigationBar";
import { useControlNoteContext } from "../../context/ControlNoteContext";
import { usePhysicalTherapyInfoContext } from "../../context/PhysicalTherapyInfoContext";

function ControlNoteList() {
    const { getPhysicalTherapyInfo } = usePhysicalTherapyInfoContext();
    const { controlNotes, loadControlNotes, deleteControlNote } = useControlNoteContext();
    const navigate = useNavigate();
    const params = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    const [therapyInfoId, setTherapyInfoId] = useState('');
    const [availableHeight, setAvailableHeight] = useState(window.innerHeight);

    const formatDate = (dateString) => {
        if (!dateString) return '';
    
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    useEffect(() => {
        const loadPhysicalTherapyInfo = async () => {
            if (params.id) {
                try {
                    const details = await getPhysicalTherapyInfo(params.id);
                    if (Object.keys(details).length === 0) { // Check if the response is empty
                        setError(true); // Set error state to true
                    } else {
                        setTherapyInfoId(details.physical_therapy_id);
                        setError(false); // Reset error state if data is loaded successfully
                    }
                } catch (error) {
                    console.error('Failed to load physical therapy info:', error);
                    setError(true); // Set error state to true on catch
                }
            }
        };
        loadPhysicalTherapyInfo();
        loadControlNotes(therapyInfoId);
        setIsLoading(false);

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
        <Navber />
        {error ? (
            <div className="text-center">
                <h2 className="text-black text-center">
                Se debe completar información general primero
            </h2>
                <Button
            variant="primary"
            size="lg"
            onClick={() => navigate(-1)}
            className="mx-2 my-2 my-lg-3"
          >
            Volver
          </Button>
            </div>
        ) : (
        <div className="bg-dark" style={{ minHeight: `${availableHeight}px` }}>
            
            <br />
            <h2 className="text-white text-center">
                Notas de control de terapia física
            </h2>
            <br />
            <div className="text-center">
                <Button
            variant="primary"
            size="lg"
            onClick={() => navigate(`/createInternalReference`, { state: { id: params.id } })}
            className="mx-2 my-2 my-lg-3"
          >
            Crear nota de control
          </Button>
            </div>
            <Container>
                <Row>
                    <Col>
                        <div className="jumbotron mt-5 mb-5" style={{ backgroundColor: "#e0e0e0" }}>
                            <h2 className="text-primary">Notas</h2>
                            <Table striped bordered hover responsive>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Fecha</th>
                                        <th>Nota</th>
                                        <th>Ver</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {!isLoading ? (
                                        controlNotes.map((controlNote) => (
                                            <tr key={controlNote.control_note_id}>
                                                <td>{controlNote.control_note_id}</td>
                                                <td>{formatDate(controlNote.date)}</td>
                                                <td>{controlNote.control_notes}</td>
                                                <td>
                                                    <Button
                                                        variant="outline-secondary"
                                                        className="mr-2"
                                                        onClick={() => navigate(`/internalReference/${controlNote.internal_reference_id}`)}
                                                    >
                                                        Más detalles
                                                    </Button>
                                                    
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5">
                                                <h4>Cargando...</h4>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
        )}
        </>
    );
}

export default ControlNoteList;