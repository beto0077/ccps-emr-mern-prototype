import React, { useState, useEffect } from "react";
import Navbar from "../NavigationBar";
import Footer from "../Footer";
import 'mdbreact';
import { Container, Row, Col, Table, Card, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { usePsychologyInfoContext } from "../../context/PsychologyInfoContext";

function PsychologyInfoView() {
  const [info, setInfo] = useState({
    professional: "",
    evaluation_for: "",
    family_structure: "",
    family_functionality: false,
    spiritual_support: false,
    clinical_history: "",
    diagnosis_knowledge: "",
    treatment_knowledge: "",
    prognosis_knowledge: "",
    date_of_diagnosis: "",
    pain_scale: 0,
    pain_localization: "",
    pain_type: "",
    mental_state: "",
    mental_state_description: "",
    psychological_psychiatric_history: "",
    subjective_evaluation: "",
    objective_evaluation: "",
    diagnostic_impression: "",
    recommendations: "",
  });
  const [diagnosisOncologicalConditions, setDiagnosisOncologicalConditions] =
    useState([]);
  const [diseaseStatuses, setDiseaseStatuses] = useState([]);
  const [treatmentHistories, setTreatmentHistories] = useState([]);
  const [emotionalPsychologicalSymptoms, setEmotionalPsychologicalSymptoms] =
    useState([]);
  const [treatmentPlans, setTreatmentPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { getPsychologyInfo } = usePsychologyInfoContext();
  const params = useParams();
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    if (!dateString) return '';

    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate() + 1).padStart(2, '0');
    return `${year}-${month}-${day}`;
};
  useEffect(() => {
    const fetchPsychologyInfo = async () => {
      try {
        setLoading(true);
        console.log(params.id);
        const response = await getPsychologyInfo(params.id);
        console.log(response.psychologyInfo);
        const {
          psychologyInfo,
          diagnosisOncologicalConditions,
          diseaseStatus,
          treatmentHistory,
          emotionalPsychologicalSymptoms,
          treatmentPlan
        } = response;
  
        console.log(psychologyInfo[0]);
        if (!psychologyInfo || Object.keys(psychologyInfo).length === 0) {
          setError(true); // Set the error state to true if no data is found
        } else {
          setInfo(psychologyInfo[0]);
          setDiagnosisOncologicalConditions(diagnosisOncologicalConditions);
          setDiseaseStatuses(diseaseStatus);
          setTreatmentHistories(treatmentHistory);
          setEmotionalPsychologicalSymptoms(emotionalPsychologicalSymptoms);
          setTreatmentPlans(treatmentPlan);
          setError(false); // Reset error state if data is loaded successfully
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
        setError(true); // Set the error state to true when an actual error occurs
      } finally {
        setLoading(false);
      }
    };
  
    fetchPsychologyInfo();
  }, []);
  

  return (
    <>
        {error ? (
          <>
          <Navbar />
            <div className="text-center">
                <Button
            variant="primary"
            size="lg"
            onClick={() => navigate(`/createPsychologyInfo`, { state: { id: params.id } })}
            className="mx-2 my-2 my-lg-3"
          >
            Generar Información
          </Button>
            </div>
            </>
        ) : (
          <div className="bg-dark">
      <Navbar />
      <h2 className="text-white my-3 text-center" style={{ marginTop: "75px" }}>
        Información general de psicología
      </h2>
      <Container>
        <Row className="my-4">
          <Col>
            <Card>
              <Card.Header className="font-weight-bold">
                <h3>Información del paciente</h3>
              </Card.Header>
              <Card.Body>
                <Table striped bordered hover>
                  <tbody>
                    <tr>
                      <td>Profesional</td>
                      <td>{info.professional}</td>
                    </tr>
                    <tr>
                      <td>Se atendió a</td>
                      <td>{info.evaluation_for}</td>
                    </tr>
                    <tr>
                      <td>Estructura Familiar (Cuidador Primario CP)</td>
                      <td>{info.family_structure}</td>
                    </tr>
                    <tr>
                      <td>Familia</td>
                      <td>{info.family_functionality ? "Funcional" : "Disfuncional"}</td>
                    </tr>
                    <tr>
                      <td>Soporte espiritual</td>
                      <td>{info.spiritual_support ? "Sí" : "No"}</td>
                    </tr>
                    <tr>
                      <td>Historia Clínica</td>
                      <td>{info.clinical_history}</td>
                    </tr>
                    <tr>
                      <td>Conocimiento de su diagnóstico</td>
                      <td>{info.diagnosis_knowledge}</td>
                    </tr>
                    <tr>
                      <td>Conocimiento de su tratamiento</td>
                      <td>{info.treatment_knowledge}</td>
                    </tr>
                    <tr>
                      <td>Conocimiento de su pronóstico</td>
                      <td>{info.prognosis_knowledge}</td>
                    </tr>
                    <tr>
                      <td>Fecha de diagnóstico</td>
                      <td>{formatDate(info.date_of_diagnosis)}</td>
                    </tr>
                    <tr>
                      <td>Escala de dolor</td>
                      <td>{info.pain_scale}</td>
                    </tr>
                    <tr>
                      <td>Localización del dolor</td>
                      <td>{info.pain_localization}</td>
                    </tr>
                    <tr>
                      <td>Tipo de dolor</td>
                      <td>{info.pain_type}</td>
                    </tr>
                    <tr>
                      <td>Estado mental</td>
                      <td>{info.mental_state}</td>
                    </tr>
                    <tr>
                      <td>Descripción del estado mental</td>
                      <td>{info.mental_state_description}</td>
                    </tr>
                    <tr>
                      <td>Antecedentes psicológicos y psiquiátricos</td>
                      <td>{info.psychological_psychiatric_history}</td>
                    </tr>
                    <tr>
                      <td>Evaluación subjetiva</td>
                      <td>{info.subjective_evaluation}</td>
                    </tr>
                    <tr>
                      <td>Evaluación objetiva</td>
                      <td>{info.objective_evaluation}</td>
                    </tr>
                    <tr>
                      <td>Impresión diagnóstica</td>
                      <td>{info.diagnostic_impression}</td>
                    </tr>
                    <tr>
                      <td>Recomendaciones</td>
                      <td>{info.recommendations}</td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="my-4">
          <Col>
            <Card>
              <Card.Header className="font-weight-bold">
                <h3>Diagnóstico Oncológico</h3>
              </Card.Header>
              <Card.Body>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Diagnósticos del paciente</th>
                    </tr>
                  </thead>
                  <tbody>
                    {diagnosisOncologicalConditions.map((condition, index) => (
                      <tr key={index}>
                        <td>{condition.selected_diagnosis}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="my-4">
          <Col>
            <Card>
              <Card.Header className="font-weight-bold">
                <h3>Actualización de enfermedad médica</h3>
              </Card.Header>
              <Card.Body>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {diseaseStatuses.map((status, index) => (
                      <tr key={index}>
                        <td>{status.selected_status}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="my-4">
          <Col>
            <Card>
              <Card.Header className="font-weight-bold">
                <h3>Tratamientos</h3>
              </Card.Header>
              <Card.Body>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Tipo de tratamiento</th>
                      <th>Estado</th>
                      <th>Información adicional</th>
                    </tr>
                  </thead>
                  <tbody>
                    {treatmentHistories.map((history, index) => (
                      <tr key={index}>
                        <td>{history.treatment_type}</td>
                        <td>{history.treatment_status}</td>
                        <td>{history.additional_information}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="my-4">
          <Col>
            <Card>
              <Card.Header className="font-weight-bold">
                <h3>Síntomas afectivos</h3>
              </Card.Header>
              <Card.Body>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Síntoma</th>
                      <th>Descripción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {emotionalPsychologicalSymptoms.map((symptom, index) => (
                      <tr key={index}>
                        <td>{symptom.symptom}</td>
                        <td>{symptom.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="my-4">
          <Col>
            <Card>
              <Card.Header className="font-weight-bold">
                <h3>Plan</h3>
              </Card.Header>
              <Card.Body>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Acciones elegidas</th>
                    </tr>
                  </thead>
                  <tbody>
                    {treatmentPlans.map((plan, index) => (
                      <tr key={index}>
                        <td>{plan.selected_intervention}</td>
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

export default PsychologyInfoView;
