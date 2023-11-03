import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { usePsychologyInfoContext } from "../../context/PsychologyInfoContext";

function PsychologyInfoForm() {
  const { createPsychologyInfo, getPsychologyInfo, updatePsychologyInfo } =
    usePsychologyInfoContext();
  const [info, setInfo] = useState({
    psychology_info_id: "",
    patient_id: "",
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
    pain_scale: "",
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

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const loadInfo = async () => {
      if (params.id) {
        const details = await getPsychologyInfo(params.id);
        setInfo(details);
      }
    };
    loadInfo();
  }, [params.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      ...info,
      diagnosisOncologicalConditions,
      diseaseStatuses,
      treatmentHistories,
      emotionalPsychologicalSymptoms,
      treatmentPlans,
    };

    if (params.id) {
      await updatePsychologyInfo(params.id, formData);
    } else {
      await createPsychologyInfo(formData);
    }
    navigate("/PsychologyInfoHome");
    setInfo({
      psychology_info_id: "",
      patient_id: "",
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
      pain_scale: "",
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
    setDiagnosisOncologicalConditions([]);
    setDiseaseStatuses([]);
    setTreatmentHistories([]);
    setEmotionalPsychologicalSymptoms([]);
    setTreatmentPlans([]);
  };

  return (
    <div style={{ display: "block", margin: "auto", width: 400, padding: 30 }}>
      <Form onSubmit={handleSubmit}>
        <h1 className="text-center mb-4">
          {params.id ? "Edit Psychology Info" : "New Psychology Info"}
        </h1>
        <Form.Group controlId="professional">
          <Form.Label>Professional</Form.Label>
          <Form.Control
            type="text"
            name="professional"
            value={info.professional}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="evaluation_for">
          <Form.Label>Evaluation For</Form.Label>
          <Form.Control
            type="text"
            name="evaluation_for"
            value={info.evaluation_for}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="family_structure">
          <Form.Label>Family Structure</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="family_structure"
            value={info.family_structure}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="family_functionality">
          <Form.Check
            type="checkbox"
            label="Family Functionality"
            name="family_functionality"
            checked={info.family_functionality}
            onChange={(e) =>
              setInfo({ ...info, family_functionality: e.target.checked })
            }
          />
        </Form.Group>
        <Form.Group controlId="spiritual_support">
          <Form.Check
            type="checkbox"
            label="Spiritual Support"
            name="spiritual_support"
            checked={info.spiritual_support}
            onChange={(e) =>
              setInfo({ ...info, spiritual_support: e.target.checked })
            }
          />
        </Form.Group>
        <Form.Group controlId="clinical_history">
          <Form.Label>Clinical History</Form.Label>
          <Form.Control
            as="select"
            name="clinical_history"
            value={info.clinical_history}
            onChange={handleChange}
            required
          >
            <option value="Home visit">Home visit</option>
            <option value="External consultation">External consultation</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="diagnosis_knowledge">
          <Form.Label>Diagnosis Knowledge</Form.Label>
          <Form.Control
            type="text"
            name="diagnosis_knowledge"
            value={info.diagnosis_knowledge}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="treatment_knowledge">
          <Form.Label>Treatment Knowledge</Form.Label>
          <Form.Control
            type="text"
            name="treatment_knowledge"
            value={info.treatment_knowledge}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="prognosis_knowledge">
          <Form.Label>Prognosis Knowledge</Form.Label>
          <Form.Control
            type="text"
            name="prognosis_knowledge"
            value={info.prognosis_knowledge}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="date_of_diagnosis">
          <Form.Label>Date of Diagnosis</Form.Label>
          <Form.Control
            type="date"
            name="date_of_diagnosis"
            value={info.date_of_diagnosis}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="pain_scale">
          <Form.Label>Pain Scale</Form.Label>
          <Form.Control
            type="number"
            name="pain_scale"
            value={info.pain_scale}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="pain_localization">
          <Form.Label>Pain Localization</Form.Label>
          <Form.Control
            type="text"
            name="pain_localization"
            value={info.pain_localization}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="pain_type">
          <Form.Label>Pain Type</Form.Label>
          <Form.Control
            type="text"
            name="pain_type"
            value={info.pain_type}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="mental_state">
          <Form.Label>Mental State</Form.Label>
          <Form.Control
            type="text"
            name="mental_state"
            value={info.mental_state}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="mental_state_description">
          <Form.Label>Mental State Description</Form.Label>
          <Form.Control
            type="text"
            name="mental_state_description"
            value={info.mental_state_description}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="psychological_psychiatric_history">
          <Form.Label>Psychological/Psychiatric History</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="psychological_psychiatric_history"
            value={info.psychological_psychiatric_history}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="subjective_evaluation">
          <Form.Label>Subjective Evaluation</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="subjective_evaluation"
            value={info.subjective_evaluation}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="objective_evaluation">
          <Form.Label>Objective Evaluation</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="objective_evaluation"
            value={info.objective_evaluation}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="diagnostic_impression">
          <Form.Label>Diagnostic Impression</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="diagnostic_impression"
            value={info.diagnostic_impression}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="recommendations">
          <Form.Label>Recommendations</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="recommendations"
            value={info.recommendations}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="diagnosisOncologicalConditions">
          <Form.Label>Diagnosis Oncological Conditions</Form.Label>
          {diagnosisOncologicalConditions.map((condition, index) => (
            <div key={index}>
              <Form.Control
                type="text"
                placeholder="Enter Diagnosis Condition"
                value={condition.selected_diagnosis}
                onChange={(e) => {
                  const newConditions = [...diagnosisOncologicalConditions];
                  newConditions[index].selected_diagnosis = e.target.value;
                  setDiagnosisOncologicalConditions(newConditions);
                }}
              />
              <Button
                variant="danger"
                onClick={() => {
                  const newConditions = [...diagnosisOncologicalConditions];
                  newConditions.splice(index, 1);
                  setDiagnosisOncologicalConditions(newConditions);
                }}
              >
                Remove
              </Button>
            </div>
          ))}
          <Button
            variant="primary"
            onClick={() => {
              setDiagnosisOncologicalConditions([
                ...diagnosisOncologicalConditions,
                { selected_diagnosis: "" },
              ]);
            }}
          >
            Add Diagnosis Condition
          </Button>
        </Form.Group>
        <Form.Group controlId="diseaseStatuses">
          <Form.Label>Disease Status</Form.Label>
          {diseaseStatuses.map((status, index) => (
            <div key={index}>
              <Form.Control
                type="text"
                placeholder="Enter Disease Status"
                value={status.selected_status}
                onChange={(e) => {
                  const newStatuses = [...diseaseStatuses];
                  newStatuses[index].selected_status = e.target.value;
                  setDiseaseStatuses(newStatuses);
                }}
              />
              <Button
                variant="danger"
                onClick={() => {
                  const newStatuses = [...diseaseStatuses];
                  newStatuses.splice(index, 1);
                  setDiseaseStatuses(newStatuses);
                }}
              >
                Remove
              </Button>
            </div>
          ))}
          <Button
            variant="primary"
            onClick={() => {
              setDiseaseStatuses([...diseaseStatuses, { selected_status: "" }]);
            }}
          >
            Add Disease Status
          </Button>
        </Form.Group>
        <Form.Group controlId="treatmentHistories">
          <Form.Label>Treatment History</Form.Label>
          {treatmentHistories.map((history, index) => (
            <div key={index}>
              <Form.Control
                type="text"
                placeholder="Enter Treatment Type"
                value={history.treatment_type}
                onChange={(e) => {
                  const newHistories = [...treatmentHistories];
                  newHistories[index].treatment_type = e.target.value;
                  setTreatmentHistories(newHistories);
                }}
              />
              <Form.Control
                type="text"
                placeholder="Enter Treatment Status"
                value={history.treatment_status}
                onChange={(e) => {
                  const newHistories = [...treatmentHistories];
                  newHistories[index].treatment_status = e.target.value;
                  setTreatmentHistories(newHistories);
                }}
              />
              <Form.Control
                type="text"
                placeholder="Enter Additional Information"
                value={history.additional_information}
                onChange={(e) => {
                  const newHistories = [...treatmentHistories];
                  newHistories[index].additional_information = e.target.value;
                  setTreatmentHistories(newHistories);
                }}
              />
              <Button
                variant="danger"
                onClick={() => {
                  const newHistories = [...treatmentHistories];
                  newHistories.splice(index, 1);
                  setTreatmentHistories(newHistories);
                }}
              >
                Remove
              </Button>
            </div>
          ))}
          <Button
            variant="primary"
            onClick={() => {
              setTreatmentHistories([
                ...treatmentHistories,
                {
                  treatment_type: "",
                  treatment_status: "",
                  additional_information: "",
                },
              ]);
            }}
          >
            Add Treatment History
          </Button>
        </Form.Group>
        <Form.Group controlId="emotionalPsychologicalSymptoms">
          <Form.Label>Emotional Psychological Symptoms</Form.Label>
          {emotionalPsychologicalSymptoms.map((symptom, index) => (
            <div key={index}>
              <Form.Control
                type="text"
                placeholder="Enter Symptom"
                value={symptom.symptom}
                onChange={(e) => {
                  const newSymptoms = [...emotionalPsychologicalSymptoms];
                  newSymptoms[index].symptom = e.target.value;
                  setEmotionalPsychologicalSymptoms(newSymptoms);
                }}
              />
              <Form.Control
                type="text"
                placeholder="Enter Description"
                value={symptom.description}
                onChange={(e) => {
                  const newSymptoms = [...emotionalPsychologicalSymptoms];
                  newSymptoms[index].description = e.target.value;
                  setEmotionalPsychologicalSymptoms(newSymptoms);
                }}
              />
              <Button
                variant="danger"
                onClick={() => {
                  const newSymptoms = [...emotionalPsychologicalSymptoms];
                  newSymptoms.splice(index, 1);
                  setEmotionalPsychologicalSymptoms(newSymptoms);
                }}
              >
                Remove
              </Button>
            </div>
          ))}
          <Button
            variant="primary"
            onClick={() => {
              setEmotionalPsychologicalSymptoms([
                ...emotionalPsychologicalSymptoms,
                { symptom: "", description: "" },
              ]);
            }}
          >
            Add Symptom
          </Button>
        </Form.Group>
        <Form.Group controlId="treatmentPlans">
          <Form.Label>Treatment Plan</Form.Label>
          {treatmentPlans.map((plan, index) => (
            <div key={index}>
              <Form.Control
                type="text"
                placeholder="Enter Intervention"
                value={plan.selected_intervention}
                onChange={(e) => {
                  const newPlans = [...treatmentPlans];
                  newPlans[index].selected_intervention = e.target.value;
                  setTreatmentPlans(newPlans);
                }}
              />
              <Button
                variant="danger"
                onClick={() => {
                  const newPlans = [...treatmentPlans];
                  newPlans.splice(index, 1);
                  setTreatmentPlans(newPlans);
                }}
              >
                Remove
              </Button>
            </div>
          ))}
          <Button
            variant="primary"
            onClick={() => {
              setTreatmentPlans([
                ...treatmentPlans,
                { selected_intervention: "" },
              ]);
            }}
          >
            Add Intervention
          </Button>
        </Form.Group>

        <Button variant="primary" type="submit">
          Save
        </Button>
      </Form>
    </div>
  );
}

export default PsychologyInfoForm;