import React, { useState, useEffect } from 'react';
import Navbar from './PsychologyInfo3Navbar'; // Assuming you'll have a navbar for PsychologyInfo3
import Footer from '../Footer';
import { Container, Row, Col, Table, Card, Image } from 'react-bootstrap';
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
    }, []);

    return (
        <div className="bg-dark">
            <Navbar />
            <h2 className="text-white my-3 text-center" style={{ marginTop: '75px' }}>
                Psychology Info 3 Home
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
                                    <h2 className="text-primary">Psychology Info 3 Details</h2>
                                    <Table striped bordered responsive>
                                        <tbody>
                                            <tr>
                                                <td>Name</td>
                                                <td>{psychologyInfo.name}</td>
                                            </tr>
                                            <tr>
                                                <td>ID</td>
                                                <td>{psychologyInfo.id}</td>
                                            </tr>
                                            <tr>
                                                <td>Progress</td>
                                                <td>{psychologyInfo.progress}</td>
                                            </tr>
                                            <tr>
                                                <td>Treatment</td>
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
            <Footer />
        </div>
    );
}

export default PsychologyInfo3View;
