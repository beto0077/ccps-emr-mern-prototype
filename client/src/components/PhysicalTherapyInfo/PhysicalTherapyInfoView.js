import React, { useState, useEffect } from 'react';
import Navbar from '../NavigationBar';
import 'mdbreact';
import { Container, Row, Col, Table, Card, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { usePhysicalTherapyInfoContext } from '../../context/PhysicalTherapyInfoContext'; // Assuming a new context for PhysicalTherapy
import { useUserContext } from '../../context/UserContext';

function PhysicalTherapyInfoView() {
    const { getUser } = useUserContext();
    const { getPhysicalTherapyInfo } = usePhysicalTherapyInfoContext();
    const [activeUser, setActiveUser] = useState({
        user_name: "",
        role: "",
        specialty: "",
      });
    const [therapyInfo, setTherapyInfo] = useState({
        professional: '',
        clinical_diagnosis: '',
        clinical_history: '',
        edema: false,
        edema_location: '',
        ulcer: false,
        ulcer_location: '',
        activities_of_daily_living: false,
        pain: false,
        pain_location: '',
        muscle_strength: '',
        range_of_motion: '',
        balance: '',
        external_support: '',
        additional_external_support_info: '',
        work_plan: '',
        physical_therapy_treatment: '',
        treatment_objectives: '',
        exercises: '',
        physical_agents: '',
        postural_hygiene: ''
    });

    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const params = useParams();
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
        const loadPhysicalTherapyInfo = async () => {
            if (params.id) {
                try {
                    const details = await getPhysicalTherapyInfo(params.id);
                    if (Object.keys(details).length === 0) { // Check if the response is empty
                        setError(true); // Set error state to true
                    } else {
                        setTherapyInfo(details);
                        setError(false); // Reset error state if data is loaded successfully
                    }
                } catch (error) {
                    console.error('Failed to load physical therapy info:', error);
                    setError(true); // Set error state to true on catch
                }
            }
        };
        loadPhysicalTherapyInfo();
    }, []);

    return (
        <>
        
        {error ? (
            <>
            <Navbar />
            <div className="text-center mt-5">
                <Button
                disabled={activeUser.specialty === "Terapia fisica" ? false : true}
            variant="primary"
            size="lg"
            onClick={() => navigate(`/createPhysicalTherapyInfo`, { state: { id: params.id } })}
            className="mx-2 my-2 my-lg-3"
          >
            Generar Información
          </Button>
            </div>
            </>
        ) : (
            <div className="bg-dark">
            <Navbar />
            <h2 className="text-white my-3 text-center" style={{ marginTop: '75px' }}>
                Información de Terapia Física
            </h2>
            <Container>
                <Row>
                    <Col>
                    <div className="container ml-3 mb-4">
                        <Card className="mt-5" style={{ backgroundColor: '#e0e0e0' }}>
                            <Card.Body>
                                <h2 className="text-primary">Datos del paciente</h2>
                                <Table striped bordered responsive>
                                    <tbody>
                                        <tr>
                                            <td>Profesional</td>
                                            <td>{therapyInfo.professional}</td>
                                        </tr>
                                        <tr>
                                            <td>Diagnóstico Clínico</td>
                                            <td>{therapyInfo.clinical_diagnosis}</td>
                                        </tr>
                                        <tr>
                                            <td>Historia Clínica</td>
                                            <td>{therapyInfo.clinical_history}</td>
                                        </tr>
                                        <tr>
                                            <td>Edema</td>
                                            <td>{therapyInfo.edema ? 'Sí' : 'No'}</td>
                                        </tr>
                                        <tr>
                                            <td>Ubicación del Edema</td>
                                            <td>{therapyInfo.edema_location}</td>
                                        </tr>
                                        <tr>
                                            <td>Úlcera</td>
                                            <td>{therapyInfo.ulcer ? 'Sí' : 'No'}</td>
                                        </tr>
                                        <tr>
                                            <td>Ubicación de la úlcera</td>
                                            <td>{therapyInfo.ulcer_location}</td>
                                        </tr>
                                        <tr>
                                            <td>Actividades de la vida diaria (A.V.D)</td>
                                            <td>{therapyInfo.activities_of_daily_living ? 'Sí' : 'No'}</td>
                                        </tr>
                                        <tr>
                                            <td>Dolor</td>
                                            <td>{therapyInfo.pain ? 'Sí' : 'No'}</td>
                                        </tr>
                                        <tr>
                                            <td>Ubicación del dolor</td>
                                            <td>{therapyInfo.pain_location}</td>
                                        </tr>
                                        <tr>
                                            <td>Fuerza muscular</td>
                                            <td>{therapyInfo.muscle_strength}</td>
                                        </tr>
                                        <tr>
                                            <td>Arcos movilidad</td>
                                            <td>{therapyInfo.range_of_motion}</td>
                                        </tr>
                                        <tr>
                                            <td>Equilibrio</td>
                                            <td>{therapyInfo.balance}</td>
                                        </tr>
                                        <tr>
                                            <td>Apoyo externo</td>
                                            <td>{therapyInfo.external_support}</td>
                                        </tr>
                                        <tr>
                                            <td>Justificación del apoyo externo</td>
                                            <td>{therapyInfo.additional_external_support_info}</td>
                                        </tr>
                                        <tr>
                                            <td>Plan de trabajo</td>
                                            <td>{therapyInfo.work_plan}</td>
                                        </tr>
                                        <tr>
                                            <td>Tratamiento fisioterapeuta</td>
                                            <td>{therapyInfo.physical_therapy_treatment}</td>
                                        </tr>
                                        <tr>
                                            <td>Objetivos de tratamiento</td>
                                            <td>{therapyInfo.treatment_objectives}</td>
                                        </tr>
                                        <tr>
                                            <td>Ejercicios</td>
                                            <td>{therapyInfo.exercises}</td>
                                        </tr>
                                        <tr>
                                            <td>Agente físicos</td>
                                            <td>{therapyInfo.physical_agents}</td>
                                        </tr>
                                        <tr>
                                            <td>Higiene postural</td>
                                            <td>{therapyInfo.postural_hygiene}</td>
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

export default PhysicalTherapyInfoView;