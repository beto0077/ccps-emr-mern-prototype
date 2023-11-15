import React, { useState, useEffect } from "react";
import Navber from "../NavigationBar";
import Footer from "../Footer";
import "mdbreact";
import {
  Container,
  Row,
  Col,
  Table,
  Card,
  Dropdown,
  Button,
} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { usePatientContext } from "../../context/PatientContext";
import { useUserContext } from "../../context/UserContext";

function PatientView() {
  const { getUser } = useUserContext();
  const { getPatient, toggleAliveStatus } = usePatientContext();
  const [patientInfo, setPatientInfo] = useState({
    admission_date: "",
    name: "",
    id_number: "",
    religion: "",
    education_level: "",
    occupation: "",
    date_of_birth: "",
    age: "",
    marital_status: "",
    children: "",
    home_phone: "",
    cell_phone: "",
    email: "",
    nationality: "",
    address: "",
    patient_status: "",
    clinical_diagnosis: "",
    referred_by: "",
    clinical_history: "",
    medications: "",
    social_support_network: "",
    alive_status: "",
  });

  const [activeUser, setActiveUser] = useState({
    user_name: "",
    role: "",
    specialty: "",
  });
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${day}-${month}-${year}`;
  };

  const handleToggleAliveStatus = async () => {
    await toggleAliveStatus(params.id, patientInfo, setPatientInfo);
  };
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
    const loadPatient = async () => {
      if (params.id) {
        const details = await getPatient(params.id);
        setPatientInfo(details);
      }
    };
    loadPatient();
  }, []);

  return (
    <div className="bg-white">
      <Navber />
      <h2 className="text-black my-3 text-center" style={{ marginTop: "75px" }}>
        Paciente: {patientInfo.id_number}
      </h2>
      <h3 className="text-black my-3 text-center">{patientInfo.name}</h3>
      <Dropdown className="mt-2 mt-lg-4">
        <Dropdown.Toggle id="dropdown-basic">Consultar</Dropdown.Toggle>
        <Dropdown.Menu>
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
            onClick={() => navigate(`/internalReferenceDashboard/${params.id}`)}
          >
            Referencias internas
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => navigate(`/loansDashboard/${params.id}`)}
          >
            Prestamos de equipo
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Container>
        <Row>
          <Col>
            <Row>
              <Col>
                <div className="container ml-3 mb-3">
                  <Card className="mt-5" style={{ backgroundColor: "#e0e0e0" }}>
                    <Card.Body>
                      <h2 className="text-black">Información general</h2>
                      <Table striped bordered responsive>
                        <tbody>
                          <tr>
                            <td>Fecha de ingreso</td>
                            <td>{formatDate(patientInfo.admission_date)}</td>
                          </tr>
                          <tr>
                            <td>Historia Clínica</td>
                            <td>{patientInfo.clinical_history}</td>
                          </tr>
                          <tr>
                            <td>Nombre completo</td>
                            <td>{patientInfo.name}</td>
                          </tr>
                          <tr>
                            <td>Cédula</td>
                            <td>{patientInfo.id_number}</td>
                          </tr>
                          <tr>
                            <td>Religión</td>
                            <td>{patientInfo.religion}</td>
                          </tr>
                          <tr>
                            <td>Escolaridad</td>
                            <td>{patientInfo.education_level}</td>
                          </tr>
                          <tr>
                            <td>Ocupación</td>
                            <td>{patientInfo.occupation}</td>
                          </tr>
                          <tr>
                            <td>Fecha de nacimiento</td>
                            <td>{formatDate(patientInfo.date_of_birth)}</td>
                          </tr>
                          <tr>
                            <td>Edad</td>
                            <td>{patientInfo.age}</td>
                          </tr>
                          <tr>
                            <td>Estado Civil</td>
                            <td>{patientInfo.marital_status}</td>
                          </tr>
                          <tr>
                            <td>Hijos</td>
                            <td>{patientInfo.children}</td>
                          </tr>
                          <tr>
                            <td>Teléfono casa</td>
                            <td>{patientInfo.home_phone}</td>
                          </tr>
                          <tr>
                            <td>Celular</td>
                            <td>{patientInfo.cell_phone}</td>
                          </tr>
                          <tr>
                            <td>Correo electrónico</td>
                            <td>{patientInfo.email}</td>
                          </tr>
                          <tr>
                            <td>Nacionalidad</td>
                            <td>{patientInfo.nationality}</td>
                          </tr>
                          <tr>
                            <td>Domicilio</td>
                            <td>{patientInfo.address}</td>
                          </tr>
                          <tr>
                            <td>Paciente</td>
                            <td>{patientInfo.patient_status}</td>
                          </tr>
                          <tr>
                            <td>Diagnóstico Clínico</td>
                            <td>{patientInfo.clinical_diagnosis}</td>
                          </tr>
                          <tr>
                            <td>Referido por</td>
                            <td>{patientInfo.referred_by}</td>
                          </tr>
                          <tr>
                            <td>Medicamentos</td>
                            <td>{patientInfo.medications}</td>
                          </tr>
                          <tr>
                            <td>Red de apoyo social</td>
                            <td>{patientInfo.social_support_network}</td>
                          </tr>
                          <tr>
                            <td>Estado del paciente</td>
                            <td>
                              {patientInfo.alive_status ? "Vivo" : "Fallecido"}
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </Card.Body>
                  </Card>
                </div>
                <Button
                  hidden={
                    !(
                      activeUser.role === "superAdmin" ||
                      activeUser.role === "Administrador"
                    )
                  }
                  className="mt-4 mb-5"
                  variant="outline-secondary"
                  type="button"
                  onClick={handleToggleAliveStatus}
                >
                  {patientInfo.alive_status
                    ? "Marcar como fallecido"
                    : "Mark as Alive"}
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default PatientView;
