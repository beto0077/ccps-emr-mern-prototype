import React, { useState, useEffect } from 'react';
import Navbar from './PsychologyInfo2Navbar';
import Footer from '../Footer';
import { Container, Row, Col, Table, Card, Image } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import { usePsychologyInfo2Context } from '../../context/PsychologyInfo2Context';

function PsychologyInfo2() {
    const { getPsychologyInfo2 } = usePsychologyInfo2Context();
    const [info, setInfo] = useState({
        full_name: '',
        evaluation_date: '',
        date_of_birth: '',
        age: '',
        marital_status: '',
        occupation: '',
        religion: '',
        family_group: '',
        type_of_therapy: false,
        medical_diagnosis: '',
        mental_state: '',
        personal_history: '',
        emotional_factors: '',
        occupational_educational_aspects: '',
        family_aspects_family_diagram: '',
        approach_plan: ''
    });

    const params = useParams();
    useEffect(() => {
        const loadInfo = async () => {
            if (params.id) {
                const details = await getPsychologyInfo2(params.id);
                setInfo(details);
            }
        };
        loadInfo();
    }, []);

    return (
        <div className="bg-dark">
            <Navbar />
            <h2 className="text-white my-3 text-center" style={{ marginTop: '75px' }}>
                Psychology Info 2 Home
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
                                    <h2 className="text-primary">Psychology Information</h2>
                                    <Table striped bordered responsive>
                                        <tbody>
                                            <tr>
                                                <td>Name</td>
                                                <td>{info.full_name}</td>
                                            </tr>
                                            <tr>
                                                <td>Evaluation Date</td>
                                                <td>{info.evaluation_date}</td>
                                            </tr>
                                            <tr>
                                                <td>Date of Birth</td>
                                                <td>{info.date_of_birth}</td>
                                            </tr>
                                            <tr>
                                                <td>Age</td>
                                                <td>{info.age}</td>
                                            </tr>
                                            <tr>
                                                <td>Marital Status</td>
                                                <td>{info.marital_status}</td>
                                            </tr>
                                            <tr>
                                                <td>Occupation</td>
                                                <td>{info.occupation}</td>
                                            </tr>
                                            <tr>
                                                <td>Religion</td>
                                                <td>{info.religion}</td>
                                            </tr>
                                            <tr>
                                                <td>Family Group</td>
                                                <td>{info.family_group}</td>
                                            </tr>
                                            <tr>
                                                <td>Type of Therapy</td>
                                                <td>{info.type_of_therapy ? 'Yes' : 'No'}</td>
                                            </tr>
                                            <tr>
                                                <td>Medical Diagnosis</td>
                                                <td>{info.medical_diagnosis}</td>
                                            </tr>
                                            <tr>
                                                <td>Mental State</td>
                                                <td>{info.mental_state}</td>
                                            </tr>
                                            <tr>
                                                <td>Personal History</td>
                                                <td>{info.personal_history}</td>
                                            </tr>
                                            <tr>
                                                <td>Emotional Factors</td>
                                                <td>{info.emotional_factors}</td>
                                            </tr>
                                            <tr>
                                                <td>Occupational/Educational Aspects</td>
                                                <td>{info.occupational_educational_aspects}</td>
                                            </tr>
                                            <tr>
                                                <td>Family Aspects/Family Diagram</td>
                                                <td>{info.family_aspects_family_diagram}</td>
                                            </tr>
                                            <tr>
                                                <td>Approach Plan</td>
                                                <td>{info.approach_plan}</td>
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

export default PsychologyInfo2;