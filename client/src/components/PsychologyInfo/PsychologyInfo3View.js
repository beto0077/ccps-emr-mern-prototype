import React, { useState, useEffect } from 'react';
import Navbar from '../NavigationBar';
import { Container, Row, Col, Table, Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { usePsychologyInfo3Context } from '../../context/PsychologyInfo3Context';

function PsychologyInfo3View() {
    const { getPsychologyInfo3 } = usePsychologyInfo3Context();
    const [psychologyInfo, setPsychologyInfo] = useState({
        name: '',
        id: '',
        progress: '',
        treatment: ''
    });
    const [availableHeight, setAvailableHeight] = useState(window.innerHeight);

    const params = useParams();
    useEffect(() => {
        const loadPsychologyInfo3 = async () => {
            if(params.id) {
                const details = await getPsychologyInfo3(params.id);
                setPsychologyInfo({
                    name: details.name,
                    id: details.id,
                    progress: details.progress,
                    treatment: details.treatment
                });
            }
        };
        loadPsychologyInfo3();
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
                Seguimiento de Psicología
            </h2>
            <Container>
                <Row>
                    <Col>
                        <div className="container ml-3">
                            <Card className="mt-5" style={{ backgroundColor: '#e0e0e0' }}>
                                <Card.Body>
                                    <h2 className="text-primary">Detalles</h2>
                                    <Table striped bordered responsive>
                                        <tbody>
                                            <tr>
                                                <td>Nombre del paciente</td>
                                                <td>{psychologyInfo.name}</td>
                                            </tr>
                                            <tr>
                                                <td>Cédula</td>
                                                <td>{psychologyInfo.id}</td>
                                            </tr>
                                            <tr>
                                                <td>Progreso</td>
                                                <td>{psychologyInfo.progress}</td>
                                            </tr>
                                            <tr>
                                                <td>Tratamiento</td>
                                                <td>{psychologyInfo.treatment}</td>
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

export default PsychologyInfo3View;
