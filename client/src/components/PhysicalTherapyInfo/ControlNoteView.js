import React, { useState, useEffect } from 'react';
import Navbar from '../NavigationBar';
import Footer from '../Footer';
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

    const params = useParams();
    useEffect(() => {
        const loadControlNote = async () => {
            if(params.id) {
                const details = await getControlNote(params.id);
                setControlNoteInfo(details);
            }
        };
        loadControlNote();
    }, []);

    return (
        <div className="bg-dark">
            <Navbar />
            <h2 className="text-white my-3 text-center" style={{ marginTop: '75px' }}>
                Control Note Home
            </h2>
            <h3 className="text-white my-3 text-center">
                Welcome!
            </h3>
            <Container>
                <Row>
                    <Col>
                        <div className="container ml-3">
                            <Card className="mt-5" style={{ backgroundColor: '#e0e0e0' }}>
                                <Card.Body>
                                    <h2 className="text-primary">Control Note Information</h2>
                                    <Table striped bordered responsive>
                                        <tbody>
                                            <tr>
                                                <td>Date</td>
                                                <td>{controlNoteInfo.date}</td>
                                            </tr>
                                            <tr>
                                                <td>Patient Name</td>
                                                <td>{controlNoteInfo.patient_name}</td>
                                            </tr>
                                            <tr>
                                                <td>Control Notes</td>
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
            <Footer />
        </div>
    );
}

export default ControlNote;