import React, { useState, useEffect } from 'react';
import Navbar from '../NavigationBar';
import Footer from '../Footer';
import 'mdbreact';
import { Container, Row, Col, Table, Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useControlNoteContext } from '../../context/ControlNoteContext';

function ControlNote() {
    const { getControlNote } = useControlNoteContext();
    const [controlNoteInfo, setControlNoteInfo] = useState({
        control_note_id: '',
        physical_therapy_id: '',
        date: '',
        patient_name: '',
        control_notes: ''
    });
    const [availableHeight, setAvailableHeight] = useState(window.innerHeight);

    const params = useParams();
    const formatDate = (dateString) => {
        if (!dateString) return '';
    
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    useEffect(() => {
        const loadControlNote = async () => {
            if(params.id) {
                const details = await getControlNote(params.id);
                setControlNoteInfo(details);
            }
        };
        loadControlNote();

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
        <div className="bg-white" style={{ minHeight: `${availableHeight}px` }}>
            
            <h2 className="text-black my-3 mt-5 text-center" style={{ marginTop: '75px' }}>
                Nota de control de Terapia Fisica
            </h2>
            <Container>
                <Row>
                    <Col>
                        <div className="container ml-3">
                            <Card className="mt-5" style={{ backgroundColor: '#e0e0e0' }}>
                                <Card.Body>
                                    <h2 className="text-primary">Datos</h2>
                                    <Table striped bordered responsive>
                                        <tbody>
                                            <tr>
                                                <td>Fecha</td>
                                                <td>{formatDate(controlNoteInfo.date)}</td>
                                            </tr>
                                            <tr>
                                                <td>Nombre del paciente</td>
                                                <td>{controlNoteInfo.patient_name}</td>
                                            </tr>
                                            <tr>
                                                <td>Nota</td>
                                                <td>{controlNoteInfo.control_notes}</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </Card.Body>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
        </>
    );
}

export default ControlNote;