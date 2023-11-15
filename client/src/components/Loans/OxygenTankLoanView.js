import React, { useState, useEffect } from 'react';
import Navbar from '../NavigationBar';
import Footer from '../Footer';
import 'mdbreact';
import { Container, Row, Col, Table, Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useOxygenTankLoanContext } from '../../context/OxygenTankLoanContext';

function OxygenTankLoanView() {
    const { getOxygenTankLoan } = useOxygenTankLoanContext();
    const [loanInfo, setLoanInfo] = useState({
        oxygen_loan_id: '',
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

    const formatDate = (dateString) => {
        if (!dateString) return '';
    
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    useEffect(() => {
        const loadOxygenTankLoan = async () => {
            if (params.id) {
                const details = await getOxygenTankLoan(params.id);
                setLoanInfo(details);
            }
        };
        loadOxygenTankLoan();
    }, []);

    return (
        <div className="bg-dark">
            <Navbar />
            <h2 className="text-white my-3 text-center" style={{ marginTop: '75px' }}>
                Detalles de Prestamo de Tanque de Oxígeno
            </h2>
            <Container>
                <Row>
                    <Col>
                    <div className="container ml-3 mb-4">
                        <Card className="mt-5" style={{ backgroundColor: '#e0e0e0' }}>
                            <Card.Body>
                                <h2 className="text-primary">Prestamo</h2>
                                <Table striped bordered responsive>
                                    <tbody>
                                        <tr>
                                            <td>Fecha Entrega</td>
                                            <td>{formatDate(loanInfo.delivery_date)}</td>
                                        </tr>
                                        <tr>
                                            <td>Fecha Devolución</td>
                                            <td>{formatDate(loanInfo.return_date)}</td>
                                        </tr>
                                        <tr>
                                            <td>Descripción</td>
                                            <td>{loanInfo.description}</td>
                                        </tr>
                                        <tr>
                                            <td>Placa</td>
                                            <td>{loanInfo.plate}</td>
                                        </tr>
                                        <tr>
                                            <td>Cantidad</td>
                                            <td>{loanInfo.quantity}</td>
                                        </tr>
                                        <tr>
                                            <td>Beneficiario</td>
                                            <td>{loanInfo.beneficiary}</td>
                                        </tr>
                                        <tr>
                                            <td>Referencia emitida por el médico</td>
                                            <td>{loanInfo.reference_issued_by_doctor}</td>
                                        </tr>
                                        <tr>
                                            <td>Persona que recibe el equipo</td>
                                            <td>{loanInfo.person_receiving_equipment}</td>
                                        </tr>
                                        <tr>
                                            <td>Cédula de persona que recibe el equipo</td>
                                            <td>{loanInfo.id_number}</td>
                                        </tr>
                                        <tr>
                                            <td>Dirección exacta</td>
                                            <td>{loanInfo.exact_address}</td>
                                        </tr>
                                        <tr>
                                            <td>Número de teléfono</td>
                                            <td>{loanInfo.phone_number}</td>
                                        </tr>
                                        <tr>
                                            <td>Número de contrato</td>
                                            <td>{loanInfo.contract_number}</td>
                                        </tr>
                                        <tr>
                                            <td>Justificación</td>
                                            <td>{loanInfo.justification}</td>
                                        </tr>
                                        <tr>
                                            <td>Persona que devuelve el equipo</td>
                                            <td>{loanInfo.person_returning_equipment}</td>
                                        </tr>
                                        <tr>
                                            <td>Creado por</td>
                                            <td>{loanInfo.prepared_by}</td>
                                        </tr>
                                        <tr>
                                            <td>Fecha de creación</td>
                                            <td>{formatDate(loanInfo.preparation_date)}</td>
                                        </tr>
                                        <tr>
                                            <td>Prestamo completado</td>
                                            <td>{loanInfo.loan_completed ? "Sí" : "No"}</td>
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
    );
}

export default OxygenTankLoanView;