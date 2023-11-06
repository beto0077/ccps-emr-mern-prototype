import React, { useState, useEffect } from 'react';
import Navbar from '../NavigationBar';
import Footer from '../Footer';
import { Container, Row, Col, Table, Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useSocialWorkInfo3Context } from '../../context/SocialWorkInfo3Context';

function SocialWorkInfo3View() {
    const { getSocialWorkInfo3 } = useSocialWorkInfo3Context();
    const [socialWorkInfo3, setSocialWorkInfo3] = useState({
        patient_name: '',
        id: '',
        address: '',
        evolution: '',
        treatment: ''
    });

    const params = useParams();
    useEffect(() => {
        const loadSocialWorkInfo3 = async () => {
            if (params.id) {
                const details = await getSocialWorkInfo3(params.id);
                setSocialWorkInfo3(details);
            }
        };
        loadSocialWorkInfo3();
    }, []);

    return (
        <div className="bg-dark">
            <Navbar />
            <h2 className="text-white my-3 text-center" style={{ marginTop: '75px' }}>
                Social Work Information
            </h2>
            <Container>
                <Row>
                    <Col>
                        <div className="container ml-3">
                            <Card className="mt-5" style={{ backgroundColor: '#e0e0e0' }}>
                                <Card.Body>
                                    <h2 className="text-primary">Social Work Information</h2>
                                    <Table striped bordered responsive>
                                        <tbody>
                                            <tr>
                                                <td>Patient Name</td>
                                                <td>{socialWorkInfo3.patient_name}</td>
                                            </tr>
                                            <tr>
                                                <td>ID</td>
                                                <td>{socialWorkInfo3.id}</td>
                                            </tr>
                                            <tr>
                                                <td>Address</td>
                                                <td>{socialWorkInfo3.address}</td>
                                            </tr>
                                            <tr>
                                                <td>Evolution</td>
                                                <td>{socialWorkInfo3.evolution}</td>
                                            </tr>
                                            <tr>
                                                <td>Treatment</td>
                                                <td>{socialWorkInfo3.treatment}</td>
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

export default SocialWorkInfo3View;