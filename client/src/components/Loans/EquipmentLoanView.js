import React, { useState, useEffect } from 'react';
import Navbar from '../NavigationBar';
import Footer from '../Footer';
import 'mdbreact';
import { Container, Row, Col, Table, Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useEquipmentLoanContext } from '../../context/EquipmentLoanContext';

function EquipmentLoanView() {
    const { getLoan } = useEquipmentLoanContext();
    const [loanInfo, setLoanInfo] = useState({
        loan_id: '',
        patient_id: '',
        delivery_date: '',
        return_date: '',
        description: '',
        plate: '',
        quantity: '',
        beneficiary: '',
        reference_issued_by_doctor: '',
        person_receiving_equipment: '',
        id_number: '',
        exact_address: '',
        phone_number: '',
        contract_number: '',
        justification: '',
        person_returning_equipment: '',
        prepared_by: '',
        preparation_date: '',
        loan_completed: ''
    });

    const params = useParams();
    useEffect(() => {
        const loadEquipmentLoan = async () => {
            if (params.id) {
                const details = await getLoan(params.id);
                setLoanInfo(details);
            }
        };
        loadEquipmentLoan();
    }, []);

    return (
        <div className="bg-dark">
            <Navbar />
            <h2 className="text-white my-3 text-center" style={{ marginTop: '75px' }}>
                Equipment Loan Details
            </h2>
            <Container>
                <Row>
                    <Col>
                        <Card className="mt-5" style={{ backgroundColor: '#e0e0e0' }}>
                            <Card.Body>
                                <h2 className="text-primary">Equipment Loan Information</h2>
                                <Table striped bordered responsive>
                                    <tbody>
                                        <tr>
                                            <td>Loan ID</td>
                                            <td>{loanInfo.loan_id}</td>
                                        </tr>
                                        <tr>
                                            <td>Patient ID</td>
                                            <td>{loanInfo.patient_id}</td>
                                        </tr>
                                        <tr>
                                            <td>Delivery Date</td>
                                            <td>{loanInfo.delivery_date}</td>
                                        </tr>
                                        <tr>
                                            <td>Return Date</td>
                                            <td>{loanInfo.return_date}</td>
                                        </tr>
                                        <tr>
                                            <td>Description</td>
                                            <td>{loanInfo.description}</td>
                                        </tr>
                                        <tr>
                                            <td>Plate</td>
                                            <td>{loanInfo.plate}</td>
                                        </tr>
                                        <tr>
                                            <td>Quantity</td>
                                            <td>{loanInfo.quantity}</td>
                                        </tr>
                                        <tr>
                                            <td>Beneficiary</td>
                                            <td>{loanInfo.beneficiary}</td>
                                        </tr>
                                        <tr>
                                            <td>Reference Issued By Doctor</td>
                                            <td>{loanInfo.reference_issued_by_doctor}</td>
                                        </tr>
                                        <tr>
                                            <td>Person Receiving Equipment</td>
                                            <td>{loanInfo.person_receiving_equipment}</td>
                                        </tr>
                                        <tr>
                                            <td>ID Number</td>
                                            <td>{loanInfo.id_number}</td>
                                        </tr>
                                        <tr>
                                            <td>Exact Address</td>
                                            <td>{loanInfo.exact_address}</td>
                                        </tr>
                                        <tr>
                                            <td>Phone Number</td>
                                            <td>{loanInfo.phone_number}</td>
                                        </tr>
                                        <tr>
                                            <td>Contract Number</td>
                                            <td>{loanInfo.contract_number}</td>
                                        </tr>
                                        <tr>
                                            <td>Justification</td>
                                            <td>{loanInfo.justification}</td>
                                        </tr>
                                        <tr>
                                            <td>Person Returning Equipment</td>
                                            <td>{loanInfo.person_returning_equipment}</td>
                                        </tr>
                                        <tr>
                                            <td>Prepared By</td>
                                            <td>{loanInfo.prepared_by}</td>
                                        </tr>
                                        <tr>
                                            <td>Preparation Date</td>
                                            <td>{loanInfo.preparation_date}</td>
                                        </tr>
                                        <tr>
                                            <td>Loan Completed</td>
                                            <td>{loanInfo.loan_completed ? "Yes" : "No"}</td>
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

export default EquipmentLoanView;