import React, { useState, useEffect } from "react";
import Navbar from "../NavigationBar";
import "mdbreact";
import { Container, Row, Col, Table, Card, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { usePsychologyInfo2Context } from "../../context/PsychologyInfo2Context";
import { useUserContext } from "../../context/UserContext";

function PsychologyInfo2() {
  const { getUser } = useUserContext();
  const [activeUser, setActiveUser] = useState({
    user_name: "",
    role: "",
    specialty: "",
  });
  const { getPsychologyInfo2 } = usePsychologyInfo2Context();
  const [info, setInfo] = useState({
    full_name: "",
    evaluation_date: "",
    date_of_birth: "",
    age: "",
    marital_status: "",
    occupation: "",
    religion: "",
    family_group: "",
    type_of_therapy: false,
    medical_diagnosis: "",
    mental_state: "",
    personal_history: "",
    emotional_factors: "",
    occupational_educational_aspects: "",
    family_aspects_family_diagram: "",
    approach_plan: "",
  });
  const [error, setError] = useState(false);

  const params = useParams();
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    if (!dateString) return "";

    const date = new Date(dateString);
    const year = String(date.getFullYear()).padStart(4, "0");
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
    loadActiveUser();
    const loadInfo = async () => {
      if (params.id) {
        try {
          const details = await getPsychologyInfo2(params.id);
          if (!details || Object.keys(details).length === 0) {
            // If the response is empty, set the error state to true
            setError(true);
          } else {
            // If there is data, set the info state with the fetched data
            setInfo(details);
            setError(false); // Reset the error state
          }
        } catch (error) {
          console.error("Error fetching psychology info: ", error);
          setError(true); // Set the error state to true if there is an error fetching the data
        }
      }
    };

    loadInfo();
  }, []);

  return (
    <>
      {error ? (
        <>
          <Navbar />
          <div className="text-center mt-5">
            <Button
              disabled={activeUser.specialty === "Psicología" ? false : true}
              variant="primary"
              size="lg"
              onClick={() =>
                navigate(`/createPsychologyInfo2`, { state: { id: params.id } })
              }
              className="mx-2 my-2 my-lg-3"
            >
              Generar Información
            </Button>
          </div>
        </>
      ) : (
        <div className="bg-dark">
          <Navbar />
          <h2
            className="text-white my-3 text-center"
            style={{ marginTop: "75px" }}
          >
            Formulario de evaluación
          </h2>
          <Container>
            <Row>
              <Col>
                <div className="container ml-3 mb-4">
                  <Card className="mt-5" style={{ backgroundColor: "#e0e0e0" }}>
                    <Card.Body>
                      <h2 className="text-primary">Información del paciente</h2>
                      <Table striped bordered responsive>
                        <tbody>
                          <tr>
                            <td>Nombre completo</td>
                            <td>{info.full_name}</td>
                          </tr>
                          <tr>
                            <td>Fecha de evaluación</td>
                            <td>{formatDate(info.evaluation_date)}</td>
                          </tr>
                          <tr>
                            <td>Fecha de nacimiento</td>
                            <td>{formatDate(info.date_of_birth)}</td>
                          </tr>
                          <tr>
                            <td>Edad</td>
                            <td>{info.age}</td>
                          </tr>
                          <tr>
                            <td>Estado Civil</td>
                            <td>{info.marital_status}</td>
                          </tr>
                          <tr>
                            <td>Ocupación</td>
                            <td>{info.occupation}</td>
                          </tr>
                          <tr>
                            <td>Religión</td>
                            <td>{info.religion}</td>
                          </tr>
                          <tr>
                            <td>Grupo Familiar</td>
                            <td>{info.family_group}</td>
                          </tr>
                          <tr>
                            <td>Tipo de Terapia</td>
                            <td>
                              {info.type_of_therapy ? "Familiar" : "Individual"}
                            </td>
                          </tr>
                          <tr>
                            <td>Diagnóstico médico</td>
                            <td>{info.medical_diagnosis}</td>
                          </tr>
                          <tr>
                            <td>Estado mental</td>
                            <td>{info.mental_state}</td>
                          </tr>
                          <tr>
                            <td>Historia Personal</td>
                            <td>{info.personal_history}</td>
                          </tr>
                          <tr>
                            <td>Factores emocionales</td>
                            <td>{info.emotional_factors}</td>
                          </tr>
                          <tr>
                            <td>Aspectos laborales/educativos</td>
                            <td>{info.occupational_educational_aspects}</td>
                          </tr>
                          <tr>
                            <td>Aspectos familiares/Familiograma</td>
                            <td>{info.family_aspects_family_diagram}</td>
                          </tr>
                          <tr>
                            <td>Plan de abordaje</td>
                            <td>{info.approach_plan}</td>
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
      )}
    </>
  );
}

export default PsychologyInfo2;
