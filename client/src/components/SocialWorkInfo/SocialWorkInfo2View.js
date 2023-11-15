import React, { useState, useEffect } from "react";
import Navbar from "../NavigationBar";
import { Container, Row, Col, Table, Card, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useSocialWorkInfo2Context } from "../../context/SocialWorkInfo2Context";
import { useUserContext } from "../../context/UserContext";

function SocialWorkInfo2View() {
  const { getSocialWorkInfo2 } = useSocialWorkInfo2Context();
  const { getUser } = useUserContext();
  const [activeUser, setActiveUser] = useState({
    user_name: "",
    role: "",
    specialty: "",
  });
  const [socialWorkInfo2, setSocialWorkInfo2] = useState({
    patient_id: "",
    total_income: "",
    total_expenses: "",
    per_capita_income: "",
    per_capita_expenses: "",
    poverty_line: "",
    monthly_incomes: [],
    monthly_expenses: [],
  });
  const [error, setError] = useState(false);

  const params = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const loadActiveUser = async () => {
      try {
        const userDataString = sessionStorage.getItem("userData");
        if (!userDataString) {
          throw new Error("No user data found in session storage");
        }

        const userData = JSON.parse(userDataString);
        if (!userData.userId) {
          throw new Error("No user ID found in session storage");
        }

        const details = await getUser(userData.userId);
        setActiveUser({
          user_name: details.user_name,
          role: details.role,
          specialty: details.specialty,
        });
      } catch (error) {
        console.error("Failed to load user info:", error);
        navigate(`/unauthorized`);
      }
    };
    loadActiveUser();
    const fetchData = async () => {
      try {
        const response = await getSocialWorkInfo2(params.id);
        if (
          response &&
          response.socialWorkInfo2 &&
          Object.keys(response.socialWorkInfo2).length > 0
        ) {
          setSocialWorkInfo2({
            ...response.socialWorkInfo2[0],
            monthly_incomes: response.monthlyIncome,
            monthly_expenses: response.monthlyExpenses,
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
      {error ? (
        <>
          <Navbar />
          <div className="text-center mt-5">
            <Button
              disabled={
                activeUser.specialty === "Trabajo Social" ? false : true
              }
              variant="primary"
              size="lg"
              onClick={() =>
                navigate(`/createSocialWorkInfo2`, { state: { id: params.id } })
              }
              className="mx-2 my-2 my-lg-3"
            >
              Generar Información
            </Button>
          </div>
        </>
      ) : (
        <div>
          <Navbar />
          <Container>
            <Row className="justify-content-md-center">
              <Col md="auto">
                <Card style={{ width: "36rem" }}>
                  <Card.Body>
                    <Card.Title>
                      <h3>Resumen de situación socio-económica</h3>
                    </Card.Title>
                    <Table striped bordered hover>
                      <tbody>
                        <tr>
                          <td>Total ingresos</td>
                          <td>{socialWorkInfo2.total_income}</td>
                        </tr>
                        <tr>
                          <td>Total egresos</td>
                          <td>{socialWorkInfo2.total_expenses}</td>
                        </tr>
                        <tr>
                          <td>Ingreso percapita</td>
                          <td>{socialWorkInfo2.per_capita_income}</td>
                        </tr>
                        <tr>
                          <td>Egreso percapita</td>
                          <td>{socialWorkInfo2.per_capita_expenses}</td>
                        </tr>
                        <tr>
                          <td>Linea de pobreza en Costa Rica</td>
                          <td>{socialWorkInfo2.poverty_line}</td>
                        </tr>
                      </tbody>
                    </Table>
                    <Card.Title>Ingresos mensuales</Card.Title>
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>Concepto</th>
                          <th>Monto</th>
                        </tr>
                      </thead>
                      <tbody>
                        {socialWorkInfo2.monthly_incomes.map(
                          (income, index) => (
                            <tr key={index}>
                              <td>{income.concept}</td>
                              <td>{income.amount}</td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </Table>
                    <Card.Title>Egresos mensuales</Card.Title>
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>Concepto</th>
                          <th>Monto</th>
                        </tr>
                      </thead>
                      <tbody>
                        {socialWorkInfo2.monthly_expenses.map(
                          (expense, index) => (
                            <tr key={index}>
                              <td>{expense.concept}</td>
                              <td>{expense.amount}</td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      )}
    </>
  );
}

export default SocialWorkInfo2View;
