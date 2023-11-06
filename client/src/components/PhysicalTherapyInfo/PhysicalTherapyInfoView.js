import React, { useState, useEffect } from 'react';
import Navbar from '../NavigationBar';
import Footer from '../Footer';
import { Container, Row, Col, Table, Card, Image } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import { usePhysicalTherapyInfoContext } from '../../context/PhysicalTherapyInfoContext'; // Assuming a new context for PhysicalTherapy

function PhysicalTherapyInfoView() {
    const { getPhysicalTherapyInfo } = usePhysicalTherapyInfoContext();
    const [therapyInfo, setTherapyInfo] = useState({
        professional: '',
        clinical_diagnosis: '',
        clinical_history: '',
        edema: false,
        edema_location: '',
        ulcer: false,
        ulcer_location: '',
        activities_of_daily_living: false,
        pain: false,
        pain_location: '',
        muscle_strength: '',
        range_of_motion: '',
        balance: '',
        external_support: '',
        additional_external_support_info: '',
        work_plan: '',
        physical_therapy_treatment: '',
        treatment_objectives: '',
        exercises: '',
        physical_agents: '',
        postural_hygiene: ''
    });

    const params = useParams();
    useEffect(() => {
        const loadPhysicalTherapyInfo = async () => {
            if (params.id) {
                const details = await getPhysicalTherapyInfo(params.id);
                setTherapyInfo(details);
            }
        };
        loadPhysicalTherapyInfo();
    }, []);

    return (
        <div className="bg-dark">
            <Navbar />
            <h2 className="text-white my-3 text-center" style={{ marginTop: '75px' }}>
                Physical Therapy Information
            </h2>
            <Container>
                <Row>
                    <Col>
                        <Card className="mt-5" style={{ backgroundColor: '#e0e0e0' }}>
                            <Card.Body>
                                <h2 className="text-primary">Physical Therapy Details</h2>
                                <Table striped bordered responsive>
                                    <tbody>
                                        <tr>
                                            <td>Professional</td>
                                            <td>{therapyInfo.professional}</td>
                                        </tr>
                                        <tr>
                                            <td>Clinical Diagnosis</td>
                                            <td>{therapyInfo.clinical_diagnosis}</td>
                                        </tr>
                                        <tr>
                                            <td>Clinical History</td>
                                            <td>{therapyInfo.clinical_history}</td>
                                        </tr>
                                        <tr>
                                            <td>Edema</td>
                                            <td>{therapyInfo.edema ? 'Yes' : 'No'}</td>
                                        </tr>
                                        <tr>
                                            <td>Edema Location</td>
                                            <td>{therapyInfo.edema_location}</td>
                                        </tr>
                                        <tr>
                                            <td>Ulcer</td>
                                            <td>{therapyInfo.ulcer ? 'Yes' : 'No'}</td>
                                        </tr>
                                        <tr>
                                            <td>Ulcer Location</td>
                                            <td>{therapyInfo.ulcer_location}</td>
                                        </tr>
                                        <tr>
                                            <td>Activities of Daily Living</td>
                                            <td>{therapyInfo.activities_of_daily_living ? 'Yes' : 'No'}</td>
                                        </tr>
                                        <tr>
                                            <td>Pain</td>
                                            <td>{therapyInfo.pain ? 'Yes' : 'No'}</td>
                                        </tr>
                                        <tr>
                                            <td>Pain Location</td>
                                            <td>{therapyInfo.pain_location}</td>
                                        </tr>
                                        <tr>
                                            <td>Muscle Strength</td>
                                            <td>{therapyInfo.muscle_strength}</td>
                                        </tr>
                                        <tr>
                                            <td>Range of Motion</td>
                                            <td>{therapyInfo.range_of_motion}</td>
                                        </tr>
                                        <tr>
                                            <td>Balance</td>
                                            <td>{therapyInfo.balance}</td>
                                        </tr>
                                        <tr>
                                            <td>External Support</td>
                                            <td>{therapyInfo.external_support}</td>
                                        </tr>
                                        <tr>
                                            <td>Additional External Support Info</td>
                                            <td>{therapyInfo.additional_external_support_info}</td>
                                        </tr>
                                        <tr>
                                            <td>Work Plan</td>
                                            <td>{therapyInfo.work_plan}</td>
                                        </tr>
                                        <tr>
                                            <td>Physical Therapy Treatment</td>
                                            <td>{therapyInfo.physical_therapy_treatment}</td>
                                        </tr>
                                        <tr>
                                            <td>Treatment Objectives</td>
                                            <td>{therapyInfo.treatment_objectives}</td>
                                        </tr>
                                        <tr>
                                            <td>Exercises</td>
                                            <td>{therapyInfo.exercises}</td>
                                        </tr>
                                        <tr>
                                            <td>Physical Agents</td>
                                            <td>{therapyInfo.physical_agents}</td>
                                        </tr>
                                        <tr>
                                            <td>Postural Hygiene</td>
                                            <td>{therapyInfo.postural_hygiene}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </div>
    );
}

export default PhysicalTherapyInfoView;