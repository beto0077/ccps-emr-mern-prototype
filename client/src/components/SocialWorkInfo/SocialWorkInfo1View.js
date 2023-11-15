// SocialWorkInfo1View.js
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col, Table, Card, Button } from "react-bootstrap";
import { useSocialWorkInfo1Context } from "../../context/SocialWorkInfo1Context";
import Navbar from "../NavigationBar";
import { useUserContext } from "../../context/UserContext";

function SocialWorkInfo1View() {
  const { getSocialWorkInfo1 } = useSocialWorkInfo1Context();
  const { getUser } = useUserContext();
  const [activeUser, setActiveUser] = useState({
    user_name: "",
    role: "",
    specialty: "",
  });
  const [socialWorkInfo1, setSocialWorkInfo1] = useState({
    patient_id: "",
    professional: "",
    interview_date: "",
    clinical_history: "",
    people_interviewed: "",
    patient_name: "",
    age: "",
    date_of_birth: "",
    gender: "",
    medical_condition: "",
    insurance: "",
    insurance_type: "",
    id: "",
    pension: "",
    pension_type: "",
    support_network: "",
    support_type: "",
    housing: "",
    diagnosis: "",
    phone_number: "",
    religion: "",
    nationality: "",
    occupation: "",
    educational_level: "",
    immigration_status: "",
    knows_diagnosis: "",
    referred_by: "",
    head_of_family: "",
    marital_status: "",
    primary_caregiver: "",
    family_type: "",
  });
  const [familyGroup, setFamilyGroup] = useState([]);
  const [error, setError] = useState(false);

  const params = useParams();
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    if (!dateString) return '';

    const date = new Date(dateString);
    const year = String(date.getFullYear()).padStart(4, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
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
    const loadSocialWorkInfo1 = async () => {
      if (params.id) {
        try {
          const response = await getSocialWorkInfo1(params.id);
          const { socialWorkInfo1, familyGroup } = response;
          
          if (!socialWorkInfo1 || Object.keys(socialWorkInfo1).length === 0) {
            // If the response is empty, set the error state to true
            setError(true);
          } else {
            // If there is data, set the state with the fetched data
            setSocialWorkInfo1(socialWorkInfo1[0]);
            setFamilyGroup(familyGroup);
            setError(false); // Reset the error state
          }
        } catch (error) {
          console.error("Error fetching social work info: ", error);
          setError(true); // Set the error state to true if there is an error fetching the data
        }
      }
    };
  
    loadSocialWorkInfo1();
  }, [params.id, getSocialWorkInfo1]);

  return (
    <>
        
        {error ? (
          <>
          <Navbar />
            <div className="text-center mt-5">
                <Button
                disabled={activeUser.specialty === "Trabajo Social" ? false : true}
            variant="primary"
            size="lg"
            onClick={() => navigate(`/createSocialWorkInfo1`, { state: { id: params.id } })}
            className="mx-2 my-2 my-lg-3"
          >
            Generar Información
          </Button>
            </div>
            </>
        ) : (
          <div className="bg-dark">
      <Navbar />
          <Container>
      <Row>
        <Col>
          <Card className="mt-4 mb-4">
            <Card.Header>
              <h3>Información general de trabajo social</h3>
            </Card.Header>
            <Card.Body>
              <Table>
                <tbody>
                  <tr>
                    <th>Profesional</th>
                    <td>{socialWorkInfo1.professional}</td>
                  </tr>
                  <tr>
                    <th>Fecha de la entrevista</th>
                    <td>{formatDate(socialWorkInfo1.interview_date)}</td>
                  </tr>
                  <tr>
                    <th>Historia Clínica</th>
                    <td>{socialWorkInfo1.clinical_history}</td>
                  </tr>
                  <tr>
                    <th>Personas entrevistadas</th>
                    <td>{socialWorkInfo1.people_interviewed}</td>
                  </tr>
                  <tr>
                    <th>Nombre completo de paciente</th>
                    <td>{socialWorkInfo1.patient_name}</td>
                  </tr>
                  <tr>
                    <th>Cédula</th>
                    <td>{socialWorkInfo1.id}</td>
                  </tr>
                  <tr>
                    <th>Edad</th>
                    <td>{socialWorkInfo1.age}</td>
                  </tr>
                  <tr>
                    <th>Fecha de nacimiento</th>
                    <td>{formatDate(socialWorkInfo1.date_of_birth)}</td>
                  </tr>
                  <tr>
                    <th>Género</th>
                    <td>{socialWorkInfo1.gender}</td>
                  </tr>
                  <tr>
                    <th>Condición</th>
                    <td>{socialWorkInfo1.medical_condition}</td>
                  </tr>
                  <tr>
                    <th>Seguro médico</th>
                    <td>{socialWorkInfo1.insurance ? "Sí" : "No"}</td>
                  </tr>
                  <tr>
                    <th>Tipo de seguro</th>
                    <td>{socialWorkInfo1.insurance_type}</td>
                  </tr>
                  
                  <tr>
                    <th>Pensión</th>
                    <td>{socialWorkInfo1.pension ? "Sí" : "No"}</td>
                  </tr>
                  <tr>
                    <th>Tipo de pensión</th>
                    <td>{socialWorkInfo1.pension_type}</td>
                  </tr>
                  <tr>
                    <th>Red apoyo</th>
                    <td>{socialWorkInfo1.support_network ? "Sí" : "No"}</td>
                  </tr>
                  <tr>
                    <th>Tipo de red apoyo</th>
                    <td>{socialWorkInfo1.support_type}</td>
                  </tr>
                  <tr>
                    <th>Vivienda</th>
                    <td>{socialWorkInfo1.housing}</td>
                  </tr>
                  <tr>
                    <th>Diagnóstico</th>
                    <td>{socialWorkInfo1.diagnosis}</td>
                  </tr>
                  <tr>
                    <th>Número de teléfono</th>
                    <td>{socialWorkInfo1.phone_number}</td>
                  </tr>
                  <tr>
                    <th>Religión</th>
                    <td>{socialWorkInfo1.religion}</td>
                  </tr>
                  <tr>
                    <th>Nacionalidad</th>
                    <td>{socialWorkInfo1.nationality}</td>
                  </tr>
                  <tr>
                    <th>Profesión u oficio</th>
                    <td>{socialWorkInfo1.occupation}</td>
                  </tr>
                  <tr>
                    <th>Nivel académico</th>
                    <td>{socialWorkInfo1.educational_level}</td>
                  </tr>
                  <tr>
                    <th>Estado migratorio</th>
                    <td>{socialWorkInfo1.immigration_status}</td>
                  </tr>
                  <tr>
                    <th>Conoce su diagnóstico</th>
                    <td>{socialWorkInfo1.knows_diagnosis ? "Sí" : "No"}</td>
                  </tr>
                  <tr>
                    <th>Referido por</th>
                    <td>{socialWorkInfo1.referred_by}</td>
                  </tr>
                  <tr>
                    <th>Jefe de familia</th>
                    <td>{socialWorkInfo1.head_of_family ? "Sí" : "No"}</td>
                  </tr>
                  <tr>
                    <th>Estado civil</th>
                    <td>{socialWorkInfo1.marital_status}</td>
                  </tr>
                  <tr>
                    <th>Cuidador(a) principal</th>
                    <td>{socialWorkInfo1.primary_caregiver}</td>
                  </tr>
                  <tr>
                    <th>Tipo de familia</th>
                    <td>{socialWorkInfo1.family_type}</td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card className="mb-4">
            <Card.Header>
              <h3>Grupo Familiar</h3>
            </Card.Header>
            <Card.Body>
              <Table>
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Parentesco</th>
                    <th>Edad</th>
                    <th>Nacionalidad</th>
                    <th>Oficio</th>
                    <th>Cédula</th>
                  </tr>
                </thead>
                <tbody>
                  {familyGroup.map((member, index) => (
                    <tr key={index}>
                      <td>{member.name}</td>
                      <td>{member.relationship}</td>
                      <td>{member.age}</td>
                      <td>{member.nationality}</td>
                      <td>{member.occupation}</td>
                      <td>{member.id}</td>
                    </tr>
                  ))}
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

export default SocialWorkInfo1View;