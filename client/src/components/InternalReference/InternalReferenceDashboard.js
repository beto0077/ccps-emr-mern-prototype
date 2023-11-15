import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col, Table, Button, Dropdown } from "react-bootstrap";
import Navber from "../NavigationBar";
import { useInternalReferenceContext } from "../../context/InternalReferenceContext";
import { useUserContext } from "../../context/UserContext";

function InternalReferenceDashboard() {
  const { getUser } = useUserContext();
  const [activeUser, setActiveUser] = useState({
    user_name: "",
    role: "",
    specialty: "",
  });
  const {
    internalReferences,
    loadInternalReferences,
    deleteInternalReference,
  } = useInternalReferenceContext();
  const navigate = useNavigate();
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [availableHeight, setAvailableHeight] = useState(window.innerHeight);

  const formatDate = (dateString) => {
    if (!dateString) return "";

    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
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
    //ACTIVAR LUEGO
    //loadActiveUser();
    loadInternalReferences(params.id);
    setIsLoading(false);

    const updateAvailableHeight = () => {
      const navbarHeight = document.querySelector(".navbar").offsetHeight;
      const newAvailableHeight = window.innerHeight - navbarHeight;
      setAvailableHeight(newAvailableHeight);
    };

    window.addEventListener("resize", updateAvailableHeight);
    updateAvailableHeight();

    return () => window.removeEventListener("resize", updateAvailableHeight);
  }, []);

  return (
    <>
      <Navber />
      <div className="bg-dark" style={{ minHeight: `${availableHeight}px` }}>
        <br />
        <h2 className="text-white text-center">Referencias internas</h2>
        <br />
        <Dropdown className="mt-2 mb-2">
          <Dropdown.Toggle id="dropdown-basic">Consultar</Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item
              onClick={() => navigate(`/patientProfile/${params.id}`)}
            >
              Perfil de paciente
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => navigate(`/physicalTherapyDashboard/${params.id}`)}
            >
              Terapia Física
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => navigate(`/socialWorkDashboard/${params.id}`)}
            >
              Trabajo Social
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => navigate(`/psychologyDashboard/${params.id}`)}
            >
              Psicología
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => navigate(`/loansDashboard/${params.id}`)}
            >
              Prestamos de equipo
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <div className="text-center">
          <Button
            disabled={activeUser.role === "superAdmin"}
            variant="primary"
            size="lg"
            onClick={() =>
              navigate(`/createInternalReference`, { state: { id: params.id } })
            }
            className="mx-2 my-2 my-lg-3"
          >
            Crear referencia interna
          </Button>
        </div>
        <Container>
          <Row>
            <Col>
              <div
                className="jumbotron mt-5 mb-5"
                style={{ backgroundColor: "#e0e0e0" }}
              >
                <h2 className="text-primary">Referencias</h2>
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Fecha</th>
                      <th>Referido a</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {!isLoading ? (
                      internalReferences.map((internalReference) => (
                        <tr key={internalReference.internal_reference_id}>
                          <td>{internalReference.internal_reference_id}</td>
                          <td>{formatDate(internalReference.date)}</td>
                          <td>{internalReference.referred_to}</td>
                          <td>
                            <Button
                              variant="outline-secondary"
                              className="mr-2"
                              onClick={() =>
                                navigate(
                                  `/internalReference/${internalReference.internal_reference_id}`
                                )
                              }
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

export default InternalReferenceDashboard;
