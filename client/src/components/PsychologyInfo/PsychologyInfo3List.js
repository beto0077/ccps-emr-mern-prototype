import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import Navber from "../NavigationBar";
import { usePsychologyInfo3Context } from "../../context/PsychologyInfo3Context";
import { usePsychologyInfoContext } from "../../context/PsychologyInfoContext";
import { useUserContext } from "../../context/UserContext";

function PsychologyInfo3List() {
  const { getUser } = useUserContext();
  const [activeUser, setActiveUser] = useState({
    user_name: "",
    role: "",
    specialty: "",
  });
  const { getPsychologyInfo } = usePsychologyInfoContext();
  const { psychologyInfo3s, loadPsychologyInfo3s, deletePsychologyInfo3 } =
    usePsychologyInfo3Context();
  const navigate = useNavigate();
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [availableHeight, setAvailableHeight] = useState(window.innerHeight);

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

    const loadPsychologyInfo1 = async () => {
      if (params.id) {
        try {
          const details = await getPsychologyInfo(params.id);
          if (Object.keys(details).length === 0) {
            // Check if the response is empty
            setError(true); // Set error state to true
          } else {
            setError(false); // Reset error state if data is loaded successfully
          }
        } catch (error) {
          console.error("Failed to load physical therapy info:", error);
          setError(true); // Set error state to true on catch
        }
      }
    };
    loadPsychologyInfo1();

    loadPsychologyInfo3s(params.id);
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
      {error ? (
        <div className="text-center mt-5">
          <h2 className="text-black text-center">
            Se debe completar información general primero
          </h2>
          <Button
            variant="primary"
            size="lg"
            onClick={() => navigate(-1)}
            className="mx-2 my-2 my-lg-3"
          >
            Volver
          </Button>
        </div>
      ) : (
        <div className="bg-dark" style={{ minHeight: `${availableHeight}px` }}>
          <br />
          <h2 className="text-white text-center">Seguimientos de Psicología</h2>
          <br />
          <div className="text-center">
            <Button
              disabled={activeUser.specialty === "Psicología" ? false : true}
              variant="primary"
              size="lg"
              onClick={() =>
                navigate(`/createPsychologyInfo3`, { state: { id: params.id } })
              }
              className="mx-2 my-2 my-lg-3"
            >
              Crear nota nueva
            </Button>
          </div>
          <Container>
            <Row>
              <Col>
                <div
                  className="jumbotron mt-5 mb-5"
                  style={{ backgroundColor: "#e0e0e0" }}
                >
                  <h2 className="text-primary">Seguimientos</h2>
                  <Table striped bordered hover responsive>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Progreso</th>
                        <th>Tratamiento</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {!isLoading ? (
                        psychologyInfo3s.map((psychologyInfo) => (
                          <tr key={psychologyInfo.psychology_info3_id}>
                            <td>{psychologyInfo.psychology_info3_id}</td>
                            <td>{psychologyInfo.progress}</td>
                            <td>{psychologyInfo.treatment}</td>
                            <td>
                              <Button
                                variant="outline-secondary"
                                className="mr-2"
                                onClick={() =>
                                  navigate(
                                    `/psychologyInfo3/${psychologyInfo.psychology_info3_id}`
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
                <Button
                  variant="outline-primary"
                  type="button"
                  onClick={() => navigate(`/psychologyDashboard/${params.id}`)}
                >
                  Volver al panel
                </Button>
              </Col>
            </Row>
          </Container>
        </div>
      )}
    </>
  );
}

export default PsychologyInfo3List;
