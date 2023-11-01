import React, { useState, useEffect } from 'react';
import Navbar from './InternalReferenceNavbar'; // Assuming you have a navbar for this component
import Footer from '../Footer';
import { Container, Row, Col, Table, Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import { useInternalReferencesContext } from '../../context/InternalReferencesContext';

function InternalReferenceView() {
    const { getInternalReference } = useInternalReferencesContext();
    const [referenceInfo, setReferenceInfo] = useState({
        date: '',
        full_name: '',
        id_number: '',
        religion: '',
        education_level: '',
        occupation: '',
        date_of_birth: '',
        age: '',
        marital_status: '',
        children: '',
        phone_number: '',
        nationality: '',
        address: '',
        service_of_care: '',
        referred_to: '',
        clinical_diagnosis: '',
        management_plan: '',
        reason_for_referral: ''
    });

    const params = useParams();
    useEffect(() => {
        const loadInternalReference = async () => {
            if (params.id) {
                const details = await getInternalReference(params.id);
                setReferenceInfo(details);
            }
        };
        loadInternalReference();
    }, []);

    return (
        <div className="bg-dark">
            <Navbar />
            <h2 className="text-white my-3 text-center" style={{ marginTop: '75px' }}>
                Internal Reference Home
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
                                    <h2 className="text-primary">Internal Reference Information</h2>
                                    <Table striped bordered responsive>
                                        <tbody>
                                            <tr>
                                                <td>DATE</td>
                                                <td>{referenceInfo.date}</td>
                                            </tr>
                                            <tr>
                                                <td>FULL NAME</td>
                                                <td>{referenceInfo.full_name}</td>
                                            </tr>
                                            <tr>
                                                <td>ID NUMBER</td>
                                                <td>{referenceInfo.id_number}</td>
                                            </tr>
                                            <tr>
                                                <td>RELIGION</td>
                                                <td>{referenceInfo.religion}</td>
                                            </tr>
                                            <tr>
                                                <td>EDUCATION LEVEL</td>
                                                <td>{referenceInfo.education_level}</td>
                                            </tr>
                                            <tr>
                                                <td>OCCUPATION</td>
                                                <td>{referenceInfo.occupation}</td>
                                            </tr>
                                            <tr>
                                                <td>DATE OF BIRTH</td>
                                                <td>{referenceInfo.date_of_birth}</td>
                                            </tr>
                                            <tr>
                                                <td>AGE</td>
                                                <td>{referenceInfo.age}</td>
                                            </tr>
                                            <tr>
                                                <td>MARITAL STATUS</td>
                                                <td>{referenceInfo.marital_status}</td>
                                            </tr>
                                            <tr>
                                                <td>CHILDREN</td>
                                                <td>{referenceInfo.children}</td>
                                            </tr>
                                            <tr>
                                                <td>PHONE NUMBER</td>
                                                <td>{referenceInfo.phone_number}</td>
                                            </tr>
                                            <tr>
                                                <td>NATIONALITY</td>
                                                <td>{referenceInfo.nationality}</td>
                                            </tr>
                                            <tr>
                                                <td>ADDRESS</td>
                                                <td>{referenceInfo.address}</td>
                                            </tr>
                                            <tr>
                                                <td>SERVICE OF CARE</td>
                                                <td>{referenceInfo.service_of_care}</td>
                                            </tr>
                                            <tr>
                                                <td>REFERRED TO</td>
                                                <td>{referenceInfo.referred_to}</td>
                                            </tr>
                                            <tr>
                                                <td>CLINICAL DIAGNOSIS</td>
                                                <td>{referenceInfo.clinical_diagnosis}</td>
                                            </tr>
                                            <tr>
                                                <td>MANAGEMENT PLAN</td>
                                                <td>{referenceInfo.management_plan}</td>
                                            </tr>
                                            <tr>
                                                <td>REASON FOR REFERRAL</td>
                                                <td>{referenceInfo.reason_for_referral}</td>
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

export default InternalReferenceView;