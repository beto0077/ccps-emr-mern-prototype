import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import Navber from "../NavigationBar";
import { useOxygenTankLoanContext } from "../../context/OxygenTankLoanContext";

function OxygenTankLoanList() {
    const { oxygenTankLoans,
        loadOxygenTankLoans,
        deleteOxygenTankLoan } = useOxygenTankLoanContext();
    const navigate = useNavigate();
    const params = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [availableHeight, setAvailableHeight] = useState(window.innerHeight);

    const formatDate = (dateString) => {
        if (!dateString) return '';
    
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    useEffect(() => {
        loadOxygenTankLoans(params.id);
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

    const activeOxygenTankLoans = oxygenTankLoans.filter(loan => !loan.loan_completed);
    const completedOxygenTankLoans = oxygenTankLoans.filter(loan => loan.loan_completed);

    return (
        <>
        <Navber />
        <div className="bg-dark" style={{ minHeight: `${availableHeight}px` }}>
            
            <br />
            <h2 className="text-white text-center">
                Prestamos de tanques de oxígeno
            </h2>
            <br />
            <div className="text-center">
                <Button
            variant="primary"
            size="lg"
            onClick={() => navigate(`/createOxygenTankLoan`, { state: { id: params.id } })}
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
                                        activeOxygenTankLoans.map((loan) => (
                                            <tr key={loan.oxygen_loan_id}>
                                                <td>{loan.oxygen_loan_id}</td>
                                                <td>{formatDate(loan.delivery_date)}</td>
                                                <td>{loan.description}</td>
                                                <td>
                                                    <Button
                                                        variant="outline-secondary"
                                                        className="mr-2"
                                                        onClick={() => navigate(`/oxygenTankLoan/${loan.oxygen_loan_id}`)}
                                                    >
                                                        Más detalles
                                                    </Button>
                                                    <Button
                                                        variant="outline-secondary"
                                                        className="mr-2"
                                                        onClick={() => navigate(`/editOxygenTankLoan/${loan.oxygen_loan_id}`)}
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
                                        completedOxygenTankLoans.map((loan) => (
                                            <tr key={loan.oxygen_loan_id}>
                                                <td>{loan.oxygen_loan_id}</td>
                                                <td>{formatDate(loan.delivery_date)}</td>
                                                <td>{loan.description}</td>
                                                <td>{formatDate(loan.return_date)}</td>
                                                <td>
                                                    <Button
                                                        variant="outline-secondary"
                                                        className="mr-2"
                                                        onClick={() => navigate(`/oxygenTankLoan/${loan.oxygen_loan_id}`)}
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

export default OxygenTankLoanList;