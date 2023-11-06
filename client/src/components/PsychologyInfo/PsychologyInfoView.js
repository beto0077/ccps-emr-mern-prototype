import React, { useState, useEffect } from "react";
import Navbar from "../NavigationBar";
import Footer from "../Footer";
import { Container, Row, Col, Table, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
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

  const { getPsychologyInfo } = usePsychologyInfoContext();
  const params = useParams();

  useEffect(() => {
    const fetchPsychologyInfo = async () => {
      try {
        setLoading(true);
        const response = await getPsychologyInfo(params.id);
        const {
          psychologyInfo,
          diagnosisOncologicalConditions,
          diseaseStatus,
          treatmentHistory,
          emotionalPsychologicalSymptoms,
          treatmentPlan
        } = response.data;
  
        setInfo(psychologyInfo);
        setDiagnosisOncologicalConditions(diagnosisOncologicalConditions);
        setDiseaseStatuses(diseaseStatus);
        setTreatmentHistories(treatmentHistory);
        setEmotionalPsychologicalSymptoms(emotionalPsychologicalSymptoms);
        setTreatmentPlans(treatmentPlan);
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchPsychologyInfo();
  }, []);
  

  return (
    <div className="bg-dark">
      <Navbar />
      <h2 className="text-white my-3 text-center" style={{ marginTop: "75px" }}>
        Psychology Info Home
      </h2>
      <h3 className="text-white my-3 text-center">Welcome!</h3>
      <Container>
        <Row className="my-4">
          <Col>
            <Card>
              <Card.Header className="font-weight-bold">
                Psychology Info
              </Card.Header>
              <Card.Body>
                <Table striped bordered hover>
                  <tbody>
                    <tr>
                      <td>Professional</td>
                      <td>{info.professional}</td>
                    </tr>
                    <tr>
                      <td>Evaluation For</td>
                      <td>{info.evaluation_for}</td>
                    </tr>
                    <tr>
                      <td>Family Structure</td>
                      <td>{info.family_structure}</td>
                    </tr>
                    <tr>
                      <td>Family Functionality</td>
                      <td>{info.family_functionality ? "Yes" : "No"}</td>
                    </tr>
                    <tr>
                      <td>Spiritual Support</td>
                      <td>{info.spiritual_support ? "Yes" : "No"}</td>
                    </tr>
                    <tr>
                      <td>Clinical History</td>
                      <td>{info.clinical_history}</td>
                    </tr>
                    <tr>
                      <td>Diagnosis Knowledge</td>
                      <td>{info.diagnosis_knowledge}</td>
                    </tr>
                    <tr>
                      <td>Treatment Knowledge</td>
                      <td>{info.treatment_knowledge}</td>
                    </tr>
                    <tr>
                      <td>Prognosis Knowledge</td>
                      <td>{info.prognosis_knowledge}</td>
                    </tr>
                    <tr>
                      <td>Date of Diagnosis</td>
                      <td>{info.date_of_diagnosis}</td>
                    </tr>
                    <tr>
                      <td>Pain Scale</td>
                      <td>{info.pain_scale}</td>
                    </tr>
                    <tr>
                      <td>Pain Localization</td>
                      <td>{info.pain_localization}</td>
                    </tr>
                    <tr>
                      <td>Pain Type</td>
                      <td>{info.pain_type}</td>
                    </tr>
                    <tr>
                      <td>Mental State</td>
                      <td>{info.mental_state}</td>
                    </tr>
                    <tr>
                      <td>Mental State Description</td>
                      <td>{info.mental_state_description}</td>
                    </tr>
                    <tr>
                      <td>Psychological/Psychiatric History</td>
                      <td>{info.psychological_psychiatric_history}</td>
                    </tr>
                    <tr>
                      <td>Subjective Evaluation</td>
                      <td>{info.subjective_evaluation}</td>
                    </tr>
                    <tr>
                      <td>Objective Evaluation</td>
                      <td>{info.objective_evaluation}</td>
                    </tr>
                    <tr>
                      <td>Diagnostic Impression</td>
                      <td>{info.diagnostic_impression}</td>
                    </tr>
                    <tr>
                      <td>Recommendations</td>
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
                Diagnosis Oncological Conditions
              </Card.Header>
              <Card.Body>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Selected Diagnosis</th>
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
                Disease Status
              </Card.Header>
              <Card.Body>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Selected Status</th>
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
                Treatment History
              </Card.Header>
              <Card.Body>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Treatment Type</th>
                      <th>Treatment Status</th>
                      <th>Additional Information</th>
                      <th>Identifier</th>
                    </tr>
                  </thead>
                  <tbody>
                    {treatmentHistories.map((history, index) => (
                      <tr key={index}>
                        <td>{history.treatment_type}</td>
                        <td>{history.treatment_status}</td>
                        <td>{history.additional_information}</td>
                        <td>{history.identifier}</td>
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
                Emotional Psychological Symptoms
              </Card.Header>
              <Card.Body>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Symptom</th>
                      <th>Description</th>
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
                Treatment Plan
              </Card.Header>
              <Card.Body>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Selected Intervention</th>
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
  );
}

export default PsychologyInfoView;
