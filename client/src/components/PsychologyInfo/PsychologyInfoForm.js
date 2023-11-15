import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Navbar from "../NavigationBar";
import { usePsychologyInfoContext } from "../../context/PsychologyInfoContext";
import { useUserContext } from "../../context/UserContext";

function PsychologyInfoForm() {
  const location = useLocation();
  const { getUser } = useUserContext();
  const [activeUser, setActiveUser] = useState({
    user_name: "",
    role: "",
    specialty: "",
  });
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
  const [customInputs, setCustomInputs] = useState({});
  const [customTreatmentInputs, setCustomTreatmentInputs] = useState({});

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
        setInfo((prevInfo) => ({
          ...prevInfo,
          professional: details.user_name,
        }));
      } catch (error) {
        console.error("Failed to load user info:", error);
        navigate(`/unauthorized`);
      }
    };
    loadActiveUser();
    const loadInfo = async () => {
      if (params.id) {
        const details = await getPsychologyInfo(params.id);
        setInfo(details);
      }
    };
    loadInfo();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "";

    const date = new Date(dateString);
    const year = String(date.getFullYear()).padStart(4, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate() + 1).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const getFinalDiagnosisConditions = () => {
    return diagnosisOncologicalConditions.map((condition, index) => {
      if (condition === "Other" && customInputs[index]) {
        return customInputs[index];
      }
      return condition;
    });
  };
  const getFinalTreatmentPlans = () => {
    return treatmentPlans.map((plan, index) => {
      if (
        plan.selected_intervention === "Other" &&
        customTreatmentInputs[index]
      ) {
        return { ...plan, selected_intervention: customTreatmentInputs[index] };
      }
      return plan;
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
    const finalPlans = getFinalTreatmentPlans();
    const formData = {
      ...info,
      finalConditions,
      diseaseStatuses,
      treatmentHistories,
      emotionalPsychologicalSymptoms,
      finalPlans,
    };

    if (params.id) {
      await updatePsychologyInfo(params.id, formData);
    } else {
      await createPsychologyInfo(formData);
    }
    navigate(`/psychologyDashboard/${info.patient_id}`);
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
      <Navbar />
      <div
        style={{ display: "block", margin: "auto", width: 400, padding: 30 }}
      >
        <Form onSubmit={handleSubmit}>
          <h1 className="text-center mb-4">
            {params.id
              ? "Edit Psychology Info"
              : "Nueva información de psicología"}
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
                onChange={() =>
                  setInfo({ ...info, family_functionality: true })
                }
              />
              <Form.Check
                inline
                type="radio"
                label="Disfuncional"
                name="family_functionality"
                value="No"
                checked={info.family_functionality === false}
                onChange={() =>
                  setInfo({ ...info, family_functionality: false })
                }
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
                onChange={() => setInfo({ ...info, spiritual_support: true })}
              />
              <Form.Check
                inline
                type="radio"
                label="No"
                name="spiritual_support"
                value="No"
                checked={info.spiritual_support === false}
                onChange={() => setInfo({ ...info, spiritual_support: false })}
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
          <h3 className="text-center mb-4">Información del paciente</h3>
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
          <Form.Group
            controlId="diagnosisOncologicalConditions"
            className="mb-3"
          >
            <Form.Label>
              <h3 className="text-center mb-2 mt-2">Diagnóstico Oncológico</h3>
            </Form.Label>
            {diagnosisOncologicalConditions.map((condition, index) => (
              <div key={index}>
                <Form.Select
                  aria-label="Select Diagnosis"
                  value={
                    condition === "Other"
                      ? condition
                      : customInputs[index] || condition
                  }
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
                  <option value="CA de Ovario">CA de ovario</option>
                  <option value="CA de cérvico-uterino">
                    CA cérvico-uterino
                  </option>
                  <option value="CA gástrico">CA gástrico</option>
                  <option value="CA de colon">CA de colon</option>
                  <option value="CA de testículo">CA de testículo</option>
                  <option value="CA de próstata">CA de próstata</option>
                  <option value="Leucemia">Leucemia</option>
                  <option value="Linfoma">Linfoma</option>
                  <option value="CA cabeza y cuello">CA cabeza y cuello</option>
                  <option value="CA piel y partes blandas">
                    CA piel y partes blandas
                  </option>
                  <option value="Tumores del SNC">Tumores del SNC</option>
                  <option value="Tumores oseos">Tumores oseos</option>
                  <option value="Other">Otro</option>
                </Form.Select>

                {condition === "Other" && (
                  <Form.Control
                    type="text"
                    placeholder="Especifique el diagnóstico"
                    value={customInputs[index] || ""}
                    onChange={(e) => {
                      setCustomInputs({
                        ...customInputs,
                        [index]: e.target.value,
                      });
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
                  Remover
                </Button>
              </div>
            ))}
            <Button
              variant="primary"
              onClick={() => {
                setDiagnosisOncologicalConditions([
                  ...diagnosisOncologicalConditions,
                  "",
                ]);
              }}
            >
              Agregar diagnóstico
            </Button>
          </Form.Group>

          <Form.Group controlId="date_of_diagnosis" className="mt-3">
            <Form.Label>Fecha de diagnóstico</Form.Label>
            <Form.Control
              type="date"
              name="date_of_diagnosis"
              onChange={handleChange}
              value={formatDate(info.date_of_diagnosis)}
              required
            />
          </Form.Group>
          <Form.Group controlId="diseaseStatuses">
            <Form.Label>
              <h3 className="text-center mb-2 mt-2">
                Actualización de enfermedad médica
              </h3>{" "}
            </Form.Label>
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
                  <option value="">Seleccione una opción</option>
                  <option value="Recién diagnosticado">
                    Recién diagnosticado
                  </option>
                  <option value="En tratamiento">En tratamiento</option>
                  <option value="En remisión">En remisión</option>
                  <option value="En recurrencia">En recurrencia</option>
                  <option value="Metástasis">Metástasis</option>
                  <option value="Etapa avanzada">Etapa avanzada</option>
                  <option value="Seguimiento">Seguimiento</option>
                </Form.Select>
                <Button
                  variant="danger"
                  onClick={() => {
                    const newStatuses = [...diseaseStatuses];
                    newStatuses.splice(index, 1);
                    setDiseaseStatuses(newStatuses);
                  }}
                >
                  Remover
                </Button>
              </div>
            ))}
            <Button
              variant="primary"
              onClick={() => {
                setDiseaseStatuses([
                  ...diseaseStatuses,
                  { selected_status: "" },
                ]);
              }}
            >
              Agregar estado
            </Button>
          </Form.Group>

          <Form.Group controlId="treatmentHistories" className="mt-3">
            <Form.Label>
              <h3>Tratamientos</h3>
            </Form.Label>
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
                  <option value="">Seleccione un tipo</option>
                  <option value="Cirugía">Cirugía</option>
                  <option value="Quimioterapia">Quimioterapia</option>
                  <option value="Radioterapia">Radioterapia</option>
                  <option value="Other">Otros</option>
                </Form.Select>

                <Form.Select
                  value={history.treatment_status}
                  onChange={(e) => {
                    const newHistories = [...treatmentHistories];
                    newHistories[index].treatment_status = e.target.value;
                    setTreatmentHistories(newHistories);
                  }}
                >
                  <option value="">Seleccione un estado</option>
                  <option value="Tratamiento previo">Tratamiento previo</option>
                  <option value="Tratamiento actual">Tratamiento actual</option>
                  <option value="Tratamiento futuro">Tratamiento futuro</option>
                </Form.Select>

                <Form.Control
                  type="text"
                  placeholder="Ingrese información adicional"
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
                  Remover
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
              Agregar tratamiento
            </Button>
          </Form.Group>
          <Form.Group
            controlId="emotionalPsychologicalSymptoms"
            className="mt-3"
          >
            <Form.Label>
              <h3>Síntomas afectivos</h3>
            </Form.Label>
            {emotionalPsychologicalSymptoms.map((symptom, index) => (
              <div key={index}>
                <Form.Select
                  value={symptom.symptom}
                  onChange={(e) => {
                    const newSymptoms = [...emotionalPsychologicalSymptoms];
                    newSymptoms[index].symptom = e.target.value;
                    setEmotionalPsychologicalSymptoms(newSymptoms);
                  }}
                >
                  <option value="">Seleccione un síntoma</option>
                  <option value="Estado de ánimo">Estado de ánimo</option>
                  <option value="Negación a la enfermedad">
                    Negación a la enfermedad
                  </option>
                  <option value="Miedo">Miedo</option>
                  <option value="Tristeza">Tristeza</option>
                  <option value="Enojo">Enojo</option>
                  <option value="Llanto fácil">Llanto fácil</option>
                  <option value="Incertidumbre">Incertidumbre</option>
                  <option value="Sentimientos de culpa">
                    Sentimientos de culpa
                  </option>
                  <option value="Ansiedad">Ansiedad</option>
                  <option value="Depresión">Depresión</option>
                  <option value="Preocupación">Preocupación</option>
                  <option value="Náuseas y vómitos anticipados">
                    Náuseas y vómitos anticipados
                  </option>
                  <option value="Pérdida de imagen corporal">
                    Pérdida de imagen corporal
                  </option>
                  <option value="Alteración del apetito">
                    Alteración del apetito
                  </option>
                  <option value="Alteraciones del sueño">
                    Alteraciones del sueño
                  </option>
                  <option value="Alteración en la sexualidad">
                    Alteración en la sexualidad
                  </option>
                  <option value="Alteración en relación de pareja">
                    Alteración en relación de pareja
                  </option>
                  <option value="Alteraciones en la relación familiar">
                    Alteraciones en la relación familiar
                  </option>
                  <option value="Ideas de abandono a tratamientos">
                    Ideas de abandono a tratamientos
                  </option>
                  <option value="Cansacio vital">Cansacio vital</option>
                </Form.Select>
                <Form.Control
                  type="text"
                  placeholder="Ingrese una descripción"
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
                  Remover
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
              Agregar síntoma
            </Button>
          </Form.Group>

          <Form.Group controlId="pain_scale" className="mt-4">
            <Form.Label>Escala de dolor</Form.Label>
            <Form.Control
              as="select"
              name="pain_scale"
              value={info.pain_scale}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione del 1 al 10</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="pain_localization" className="mt-2">
            <Form.Label>Localización del dolor</Form.Label>
            <Form.Control
              type="text"
              name="pain_localization"
              value={info.pain_localization}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="pain_type" className="mt-2">
            <Form.Label>Tipo de dolor</Form.Label>
            <Form.Control
              type="text"
              name="pain_type"
              value={info.pain_type}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="mental_state" className="mt-4">
            <Form.Label>Estado mental</Form.Label>
            <Form.Control
              as="select"
              name="mental_state"
              value={info.mental_state}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione una opción</option>
              <option value="Intacto">Intacto</option>
              <option value="Deterioro leve">Deterioro leve</option>
              <option value="Deterioro moderado">Deterioro moderado</option>
              <option value="Deterioro severo">Deterioro severo</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="mental_state_description" className="mt-2">
            <Form.Label>Descripción del estado mental</Form.Label>
            <Form.Control
              type="text"
              name="mental_state_description"
              value={info.mental_state_description}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group
            controlId="psychological_psychiatric_history"
            className="mt-4"
          >
            <Form.Label>Antecedentes psicológicos y psiquiátricos</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              name="psychological_psychiatric_history"
              value={info.psychological_psychiatric_history}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="subjective_evaluation" className="mt-2">
            <Form.Label>Evaluación subjetiva</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              name="subjective_evaluation"
              value={info.subjective_evaluation}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="objective_evaluation" className="mt-2">
            <Form.Label>Evaluación objetiva</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              name="objective_evaluation"
              value={info.objective_evaluation}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="diagnostic_impression" className="mt-2">
            <Form.Label>Impresión diagnóstica</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              name="diagnostic_impression"
              value={info.diagnostic_impression}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="treatmentPlans" className="mt-4">
            <Form.Label>
              <h3 className="text-center mb-4">Plan</h3>
            </Form.Label>
            {treatmentPlans.map((plan, index) => (
              <div key={index}>
                <Form.Select
                  aria-label="Select Intervention"
                  value={
                    plan.selected_intervention === "Other"
                      ? plan.selected_intervention
                      : customTreatmentInputs[index] ||
                        plan.selected_intervention
                  }
                  onChange={(e) => {
                    const newPlans = [...treatmentPlans];
                    if (e.target.value === "Other") {
                      newPlans[index].selected_intervention = "Other";
                      setCustomTreatmentInputs({
                        ...customTreatmentInputs,
                        [index]: "",
                      });
                    } else {
                      newPlans[index].selected_intervention = e.target.value;
                      const newCustomInputs = { ...customTreatmentInputs };
                      delete newCustomInputs[index];
                      setCustomTreatmentInputs(newCustomInputs);
                    }
                    setTreatmentPlans(newPlans);
                  }}
                >
                  <option value="">Seleccione una opción</option>
                  <option value="Intervención en crisis">
                    Intervención en crisis
                  </option>
                  <option value="Contención emocional">
                    Contención emocional
                  </option>
                  <option value="Soporte emocional">Soporte emocional</option>
                  <option value="Psicoeducación">Psicoeducación</option>
                  <option value="Técnicas de relajación">
                    Técnicas de relajación
                  </option>
                  <option value="Reestructuración cognitiva">
                    Reestructuración cognitiva
                  </option>
                  <option value="Técnicas de manejo y control de la atención">
                    Técnicas de manejo y control de la atención
                  </option>
                  <option value="Manejo de técnicas de comunicación">
                    Manejo de técnicas de comunicación
                  </option>
                  <option value="Técnicas de manejo de duelo y paliativo">
                    Técnicas de manejo de duelo y paliativo
                  </option>
                  <option value="Duelo anticipatorio">
                    Duelo anticipatorio
                  </option>
                  <option value="Other">Otro</option>
                </Form.Select>

                {plan.selected_intervention === "Other" && (
                  <Form.Control
                    type="text"
                    placeholder="Especifique la intervención"
                    value={customTreatmentInputs[index] || ""}
                    onChange={(e) => {
                      setCustomTreatmentInputs({
                        ...customTreatmentInputs,
                        [index]: e.target.value,
                      });
                    }}
                  />
                )}

                <Button
                  variant="danger"
                  onClick={() => {
                    const newPlans = [...treatmentPlans];
                    newPlans.splice(index, 1);
                    setTreatmentPlans(newPlans);
                    const newCustomInputs = { ...customTreatmentInputs };
                    delete newCustomInputs[index];
                    setCustomTreatmentInputs(newCustomInputs);
                  }}
                >
                  Remover
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
              Agregar intervención
            </Button>
          </Form.Group>

          <Form.Group controlId="recommendations">
            <Form.Label>
              <h3>Recomendaciones</h3>
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              name="recommendations"
              value={info.recommendations}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <div className="d-flex justify-content-between">
            <Button
              style={{ marginTop: "30px" }}
              variant="primary"
              type="submit"
            >
              Guardar
            </Button>
            <Button
              style={{ marginTop: "30px" }}
              variant="outline-secondary"
              type="button"
              onClick={() => navigate(-1)}
            >
              Cancelar
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
}

export default PsychologyInfoForm;
