import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import Navber from "../NavigationBar";
import { useEquipmentLoanContext } from "../../context/EquipmentLoanContext";

function EquipmentLoanList() {
    const { loans,
        loadLoans,
        deleteLoan } = useEquipmentLoanContext();
    const navigate = useNavigate();
    const params = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [availableHeight, setAvailableHeight] = useState(window.innerHeight);

    useEffect(() => {
        loadLoans(params.id);
        setIsLoading(false);

        const updateAvailableHeight = () => {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const newAvailableHeight = window.innerHeight - navbarHeight;
            setAvailableHeight(newAvailableHeight);
          };
      
        window.addEventListener('resize', updateAvailableHeight);
        updateAvailableHeight();
      
        return () => window.removeEventListener('resize', updateAvailableHeight);
    }, []);

    const activeLoans = loans.filter(loan => !loan.loan_completed);
    const completedLoans = loans.filter(loan => loan.loan_completed);

    return (
        <>
        <Navber />
        <div className="bg-dark" style={{ minHeight: `${availableHeight}px` }}>
            
            <br />
            <h2 className="text-white text-center">
                Prestamos de equipo general
            </h2>
            <br />
            <div className="text-center">
                <Button
            variant="primary"
            size="lg"
            onClick={() => navigate(`/createEquipmentLoan`, { state: { id: params.id } })}
            className="mx-2 my-2 my-lg-3"
          >
            Crear nuevo prestamo
          </Button>
            </div>
            <Container>
                <Row>
                    <Col>
                        <div className="jumbotron mt-5 mb-5" style={{ backgroundColor: "#e0e0e0" }}>
                            <h2 className="text-primary">Prestamos activos</h2>
                            <Table striped bordered hover responsive>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Fecha entrega</th>
                                        <th>Descripción</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {!isLoading ? (
                                        activeLoans.map((loan) => (
                                            <tr key={loan.loan_id}>
                                                <td>{loan.loan_id}</td>
                                                <td>{loan.delivery_date}</td>
                                                <td>{loan.description}</td>
                                                <td>
                                                    <Button
                                                        variant="outline-secondary"
                                                        className="mr-2"
                                                        onClick={() => navigate(`/equipmentLoan/${loan.loan_id}`)}
                                                    >
                                                        Más detalles
                                                    </Button>
                                                    <Button
                                                        variant="outline-secondary"
                                                        className="mr-2"
                                                        onClick={() => navigate(`/editEquipmentLoan/${loan.loan_id}`)}
                                                    >
                                                        Editar
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5">
                                                <h4>Cargando...</h4>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                            <h2 className="text-primary">Prestamos completados</h2>
                            <Table striped bordered hover responsive>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Fecha entrega</th>
                                        <th>Descripción</th>
                                        <th>Fecha devolución</th>
                                        <th>Ver</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {!isLoading ? (
                                        completedLoans.map((loan) => (
                                            <tr key={loan.loan_id}>
                                                <td>{loan.loan_id}</td>
                                                <td>{loan.delivery_date}</td>
                                                <td>{loan.description}</td>
                                                <td>{loan.return_date}</td>
                                                <td>
                                                    <Button
                                                        variant="outline-secondary"
                                                        className="mr-2"
                                                        onClick={() => navigate(`/equipmentLoan/${loan.loan_id}`)}
                                                    >
                                                        Más detalles
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5">
                                                <h4>Cargando...</h4>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
        </>
    );
}

export default EquipmentLoanList;