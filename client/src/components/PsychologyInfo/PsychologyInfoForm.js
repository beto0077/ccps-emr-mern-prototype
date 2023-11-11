import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Navbar from "../NavigationBar";
import { usePsychologyInfoContext } from "../../context/PsychologyInfoContext";

function PsychologyInfoForm() {
  const location = useLocation();
  const { createPsychologyInfo, getPsychologyInfo, updatePsychologyInfo } =
    usePsychologyInfoContext();
  const [info, setInfo] = useState({
    patient_id: location.state?.id || "",
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
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [customInputs, setCustomInputs] = useState({});

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

  //USEEFFECCT DE PRUEBA
  useEffect(() => {
    /*console.log(customInputs)
    console.log("test")
    console.log(diagnosisOncologicalConditions)
    const finalConditions = getFinalDiagnosisConditions();
    console.log(finalConditions);
    console.log(diseaseStatuses);*/
    console.log(info.diagnosis_knowledge);
  }, [info.diagnosis_knowledge]);

  const getFinalDiagnosisConditions = () => {
    return diagnosisOncologicalConditions.map((condition, index) => {
      if (condition === "Other" && customInputs[index]) {
        return customInputs[index];
      }
      return condition;
    });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalConditions = getFinalDiagnosisConditions();
    const formData = {
      ...info,
      finalConditions,
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
    navigate(`/PsychologyDashboard/${info.patient_id}`);
    setInfo({
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
    <>
    <Navbar/>
    <div style={{ display: "block", margin: "auto", width: 400, padding: 30 }}>
      <Form onSubmit={handleSubmit}>
        <h1 className="text-center mb-4">
          {params.id ? "Edit Psychology Info" : "Nueva información de psicología"}
        </h1>
        <Form.Group controlId="professional" className="mb-3">
          <Form.Label>Profesional</Form.Label>
          <Form.Control
            type="text"
            name="professional"
            placeholder="Nombre del profesional espacialista"
            value={info.professional}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="evaluation_for" className="mb-3">
          <Form.Label>Se atendió a</Form.Label>
          <Form.Control
            as="select"
            name="evaluation_for"
            value={info.evaluation_for}
            onChange={handleChange}
            required
            >
            <option value="">Seleccione una opción</option>
            <option value="Paciente">Paciente</option>
            <option value="Familiar">Familiar</option>
            <option value="Paciente y Familiar">Paciente y Familiar</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="family_structure" className="mb-3">
          <Form.Label>Estructura Familiar (Cuidador Primario CP)</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            name="family_structure"
            value={info.family_structure}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="family_functionality" className="mb-3">
        <Form.Label>Familia</Form.Label>
        <div>
          <Form.Check
              inline
              type="radio"
              label="Funcional"
              name="family_functionality"
              value="Yes"
              checked={info.family_functionality === true}
              onChange={()=>setInfo({...info, family_functionality: true})}
          />
          <Form.Check
              inline
              type="radio"
              label="Disfuncional"
              name="family_functionality"
              value="No"
              checked={info.family_functionality === false}
              onChange={()=>setInfo({...info, family_functionality: false})}
          />
        </div>
        </Form.Group>
        <Form.Group controlId="spiritual_support" className="mb-3">
        <Form.Label>Soporte espiritual</Form.Label>
        <div>
          <Form.Check
              inline
              type="radio"
              label="Sí"
              name="spiritual_support"
              value="Yes"
              checked={info.spiritual_support === true}
              onChange={()=>setInfo({...info, spiritual_support: true})}
          />
          <Form.Check
              inline
              type="radio"
              label="No"
              name="spiritual_support"
              value="No"
              checked={info.spiritual_support === false}
              onChange={()=>setInfo({...info, spiritual_support: false})}
          />
        </div>
        </Form.Group>
        <Form.Group controlId="clinical_history" className="mb-3">
          <Form.Label>Historia Clínica</Form.Label>
          <Form.Control
            as="select"
            name="clinical_history"
            value={info.clinical_history}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione una opción</option>
            <option value="Visita domiciliar">Visita domiciliar</option>
            <option value="Consulta externa">Consulta externa</option>
          </Form.Control>
        </Form.Group>
        <h3 className="text-center mb-4">
          Información del paciente
        </h3>
        <Form.Group controlId="diagnosis_knowledge" className="mb-3">
          <Form.Label>Diagnóstico</Form.Label>
          <Form.Control
            as="select"
            name="diagnosis_knowledge"
            value={info.diagnosis_knowledge}
            onChange={handleChange}
            required
            >
            <option value="">Seleccione una opción</option>
            <option value="No lo conoce">No lo conoce</option>
            <option value="Confuso">Confuso</option>
            <option value="Ligeramente sabe">Ligeramente sabe</option>
            <option value="Buena información">Buena información</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="treatment_knowledge" className="mb-3">
          <Form.Label>Tratamiento</Form.Label>
          <Form.Control
            as="select"
            name="treatment_knowledge"
            value={info.treatment_knowledge}
            onChange={handleChange}
            required
            >
            <option value="">Seleccione una opción</option>
            <option value="No lo conoce">No lo conoce</option>
            <option value="Confuso">Confuso</option>
            <option value="Ligeramente sabe">Ligeramente sabe</option>
            <option value="Buena información">Buena información</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="prognosis_knowledge" className="mb-3">
          <Form.Label>Pronóstico</Form.Label>
          <Form.Control
            as="select"
            name="prognosis_knowledge"
            value={info.prognosis_knowledge}
            onChange={handleChange}
            required
            >
            <option value="">Seleccione una opción</option>
            <option value="No lo conoce">No lo conoce</option>
            <option value="Confuso">Confuso</option>
            <option value="Ligeramente sabe">Ligeramente sabe</option>
            <option value="Buena información">Buena información</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="diagnosisOncologicalConditions" className="mb-3">
  <Form.Label><h3 className="text-center mb-4">
  Diagnóstico Oncológico
        </h3></Form.Label>
  {diagnosisOncologicalConditions.map((condition, index) => (
    <div key={index}>
      <Form.Select
        aria-label="Select Diagnosis"
        value={condition === "Other" ? condition : customInputs[index] || condition}
        onChange={(e) => {
          const newConditions = [...diagnosisOncologicalConditions];
          if (e.target.value === "Other") {
            newConditions[index] = "Other";
            setCustomInputs({ ...customInputs, [index]: "" });
          } else {
            newConditions[index] = e.target.value;
            const newCustomInputs = { ...customInputs };
            delete newCustomInputs[index];
            setCustomInputs(newCustomInputs);
          }
          setDiagnosisOncologicalConditions(newConditions);
        }}
      >
        <option value="">Seleccione una opción</option>
        <option value="CA de mama">CA de mama</option>
        <option value="CA de ovario">CA de ovario</option>
        <option value="Lymphoma">Lymphoma</option>
        <option value="Other">Other</option>
      </Form.Select>

      {condition === "Other" && (
        <Form.Control
          type="text"
          placeholder="Enter Custom Diagnosis"
          value={customInputs[index] || ''}
          onChange={(e) => {
            setCustomInputs({ ...customInputs, [index]: e.target.value });
          }}
        />
      )}

      <Button
        variant="danger"
        onClick={() => {
          const newConditions = [...diagnosisOncologicalConditions];
          newConditions.splice(index, 1);
          setDiagnosisOncologicalConditions(newConditions);
          const newCustomInputs = { ...customInputs };
          delete newCustomInputs[index];
          setCustomInputs(newCustomInputs);
        }}
      >
        Remove
      </Button>
    </div>
  ))}
  <Button
    variant="primary"
    onClick={() => {
      setDiagnosisOncologicalConditions([...diagnosisOncologicalConditions, ""]);
    }}
  >
    Agregar diagnóstico
  </Button>
</Form.Group>


        <Form.Group controlId="date_of_diagnosis">
          <Form.Label>Fecha de diagnóstico</Form.Label>
          <Form.Control
            type="date"
            name="date_of_diagnosis"
            value={info.date_of_diagnosis}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="diseaseStatuses">
  <Form.Label>Actualización de enfermedad médica</Form.Label>
  {diseaseStatuses.map((status, index) => (
    <div key={index}>
      <Form.Select
        value={status.selected_status}
        onChange={(e) => {
          const newStatuses = [...diseaseStatuses];
          newStatuses[index].selected_status = e.target.value;
          setDiseaseStatuses(newStatuses);
        }}
      >
        <option value="">Select a Status</option>
        <option value="Stable">Stable</option>
        <option value="Improving">Improving</option>
        <option value="Worsening">Worsening</option>
        {/* Add more predefined options here */}
      </Form.Select>
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
      <Form.Select
        value={history.treatment_type}
        onChange={(e) => {
          const newHistories = [...treatmentHistories];
          newHistories[index].treatment_type = e.target.value;
          setTreatmentHistories(newHistories);
        }}
      >
        <option value="">Seleccione una opción</option>
        <option value="Surgery">Surgery</option>
        <option value="Chemotherapy">Chemotherapy</option>
        <option value="Radiotherapy">Radiotherapy</option>
        <option value="Other">Other</option>
      </Form.Select>

      <Form.Select
        value={history.treatment_status}
        onChange={(e) => {
          const newHistories = [...treatmentHistories];
          newHistories[index].treatment_status = e.target.value;
          setTreatmentHistories(newHistories);
        }}
      >
        <option value="">Seleccione una opción</option>
        <option value="Previous Treatment">Previous Treatment</option>
        <option value="Current Treatment">Current Treatment</option>
        <option value="Future Treatment">Future Treatment</option>
      </Form.Select>

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
        { treatment_type: "", treatment_status: "", additional_information: "" },
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

        <div className="d-flex justify-content-between">
                    <Button style={{marginTop: '30px'}} variant="primary" type="submit">
                        Guardar
                    </Button>
                    <Button style={{marginTop: '30px'}} variant="outline-secondary" type="button" onClick={() => navigate(-1)}>
                        Cancelar
                    </Button>
                </div>
      </Form>
    </div>
    </>
  );
}

export default PsychologyInfoForm;