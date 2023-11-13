import React, { useState, useEffect } from 'react';
import Navbar from '../NavigationBar';
import Footer from '../Footer';
import { Container, Row, Col, Table, Card, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useSocialWorkInfo2Context } from '../../context/SocialWorkInfo2Context';

function SocialWorkInfo2View() {
    const { getSocialWorkInfo2 } = useSocialWorkInfo2Context();
    const [socialWorkInfo2, setSocialWorkInfo2] = useState({
        patient_id: '',
        total_income: '',
        total_expenses: '',
        per_capita_income: '',
        per_capita_expenses: '',
        poverty_line: '',
        monthly_incomes: [],
        monthly_expenses: []
    });
    const [error, setError] = useState(false);

    const params = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await getSocialWorkInfo2(params.social_work_info2_id);
            if (response && response.socialWorkInfo2 && Object.keys(response.socialWorkInfo2).length > 0) {
              setSocialWorkInfo2({
                ...response.socialWorkInfo2,
                monthly_incomes: response.monthlyIncome,
                monthly_expenses: response.monthlyExpenses
              });
              setError(false); // Reset the error state if data is loaded successfully
            } else {
              // If the response is empty, set the error state to true
              setError(true);
            }
          } catch (error) {
            console.error("Error fetching data:", error);
            setError(true); // Set the error state to true if there is an error fetching the data
          }
        };
      
        fetchData();
      }, []);

    return (
        <>
        <Navbar />
        {error ? (
            <div className="text-center">
                <Button
            variant="primary"
            size="lg"
            onClick={() => navigate(`/createSocialWorkInfo2`, { state: { id: params.id } })}
            className="mx-2 my-2 my-lg-3"
          >
            Generar Información
          </Button>
            </div>
        ) : (
            <div>
            <Navbar />
            <Container>
                <Row className="justify-content-md-center">
                    <Col md="auto">
                        <Card style={{ width: '36rem' }}>
                            <Card.Body>
                                <Card.Title>Social Work Information 2</Card.Title>
                                <Table striped bordered hover>
                                    <tbody>
                                        <tr>
                                            <td>Total Income</td>
                                            <td>{socialWorkInfo2.total_income}</td>
                                        </tr>
                                        <tr>
                                            <td>Total Expenses</td>
                                            <td>{socialWorkInfo2.total_expenses}</td>
                                        </tr>
                                        <tr>
                                            <td>Per Capita Income</td>
                                            <td>{socialWorkInfo2.per_capita_income}</td>
                                        </tr>
                                        <tr>
                                            <td>Per Capita Expenses</td>
                                            <td>{socialWorkInfo2.per_capita_expenses}</td>
                                        </tr>
                                        <tr>
                                            <td>Poverty Line</td>
                                            <td>{socialWorkInfo2.poverty_line}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                                <Card.Title>Monthly Incomes</Card.Title>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Type</th>
                                            <th>Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {socialWorkInfo2.monthly_incomes.map((income, index) => (
                                            <tr key={index}>
                                                <td>{income.type}</td>
                                                <td>{income.amount}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                                <Card.Title>Monthly Expenses</Card.Title>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Type</th>
                                            <th>Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {socialWorkInfo2.monthly_expenses.map((expense, index) => (
                                            <tr key={index}>
                                                <td>{expense.type}</td>
                                                <td>{expense.amount}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </div>
        )}
        </>
    );
}

export default SocialWorkInfo2View;
