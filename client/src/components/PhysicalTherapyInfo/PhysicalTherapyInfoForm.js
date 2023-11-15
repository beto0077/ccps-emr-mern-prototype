import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Navbar from "../NavigationBar";
import { usePhysicalTherapyInfoContext } from "../../context/PhysicalTherapyInfoContext";
import { useUserContext } from "../../context/UserContext";

function PhysicalTherapyForm() {
  const location = useLocation();
  const { getUser } = useUserContext();
  const [activeUser, setActiveUser] = useState({
    user_name: "",
    role: "",
    specialty: "",
  });
  const {
    createPhysicalTherapyInfo,
    getPhysicalTherapyInfo,
    updatePhysicalTherapyInfo,
  } = usePhysicalTherapyInfoContext();
  const [customSupport, setCustomSupport] = useState("");
  const [physicalTherapyInfo, setPhysicalTherapyInfo] = useState({
    patient_id: location.state?.id || "",
    professional: "",
    clinical_diagnosis: "",
    clinical_history: "",
    edema: false,
    edema_location: "",
    ulcer: false,
    ulcer_location: "",
    activities_of_daily_living: false,
    pain: false,
    pain_location: "",
    muscle_strength: "",
    range_of_motion: "",
    balance: "",
    external_support: "",
    additional_external_support_info: "",
    work_plan: "",
    physical_therapy_treatment: "",
    treatment_objectives: "",
    exercises: "",
    physical_agents: "",
    postural_hygiene: "",
  });

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
    const loadPhysicalTherapyInfo = async () => {
      if (params.id) {
        const loadedPhysicalTherapyInfo = await getPhysicalTherapyInfo(
          params.id
        );
        setPhysicalTherapyInfo(loadedPhysicalTherapyInfo);
      } else {
        const userProfessional = activeUser.user_name;
        setPhysicalTherapyInfo((prevState) => ({
          ...prevState,
          professional: userProfessional,
        }));
      }
    };
    loadPhysicalTherapyInfo();
  }, []);

  const handleCustomSupportChange = (e) => {
    setCustomSupport(e.target.value);
  };

  const prepareDataForSubmission = () => {
    if (physicalTherapyInfo.external_support === "Otro") {
      return {
        ...physicalTherapyInfo,
        external_support: customSupport,
      };
    }
    return physicalTherapyInfo;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPhysicalTherapyInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedInfo = prepareDataForSubmission();
    setPhysicalTherapyInfo(updatedInfo);
    if (params.id) {
      await updatePhysicalTherapyInfo(params.id, updatedInfo);
    } else {
      await createPhysicalTherapyInfo(updatedInfo);
    }
    navigate(`/physicalTherapyDashboard/${physicalTherapyInfo.patient_id}`);
    setPhysicalTherapyInfo({
      patient_id: "",
      professional: "",
      clinical_diagnosis: "",
      clinical_history: "",
      edema: false,
      edema_location: "",
      ulcer: false,
      ulcer_location: "",
      activities_of_daily_living: false,
      pain: false,
      pain_location: "",
      muscle_strength: "",
      range_of_motion: "",
      balance: "",
      external_support: "",
      additional_external_support_info: "",
      work_plan: "",
      physical_therapy_treatment: "",
      treatment_objectives: "",
      exercises: "",
      physical_agents: "",
      postural_hygiene: "",
    });
  };

  return (
    <>
      <Navbar />
      <div
        style={{ display: "block", margin: "auto", width: 400, padding: 30 }}
      >
        <Form onSubmit={handleSubmit}>
          <h1 className="text-center mb-4">
            {params.id ? "Editar referencia interna" : "Nueva Terapia física"}
          </h1>

          <Form.Group controlId="professional" className="mb-3">
            <Form.Label>Profesional</Form.Label>
            <Form.Control
              type="text"
              name="professional"
              placeholder="Nombre del profesional espacialista"
              value={physicalTherapyInfo.professional}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="clinicalDiagnosis" className="mb-3">
            <Form.Label>Diagnóstico Clínico</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="clinical_diagnosis"
              placeholder="Ingrese diagnóstico clínico"
              value={physicalTherapyInfo.clinical_diagnosis}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="clinicalHistory" className="mb-3">
            <Form.Label>Historia Clínica</Form.Label>
            <Form.Control
              name="clinical_history"
              as="select"
              value={physicalTherapyInfo.clinical_history}
              onChange={handleChange}
            >
              <option value="">Seleccione una opción</option>
              <option value="Visita domiciliar">Visita domiciliar</option>
              <option value="Consulta externa">Consulta externa</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="edema">
            <Form.Label>Edema</Form.Label>
            <div>
              <Form.Check
                inline
                type="radio"
                label="Sí"
                name="edema"
                value="Yes"
                checked={physicalTherapyInfo.edema === true}
                onChange={() =>
                  setPhysicalTherapyInfo({
                    ...physicalTherapyInfo,
                    edema: true,
                  })
                }
              />
              <Form.Check
                inline
                type="radio"
                label="No"
                name="edema"
                value="No"
                checked={physicalTherapyInfo.edema === false}
                onChange={() =>
                  setPhysicalTherapyInfo({
                    ...physicalTherapyInfo,
                    edema: false,
                  })
                }
              />
            </div>
          </Form.Group>

          <Form.Group controlId="edemaLocation" className="mb-3">
            <Form.Label>Donde:</Form.Label>
            <Form.Control
              name="edema_location"
              type="text"
              placeholder="Ingrese la ubicación del edema"
              value={physicalTherapyInfo.edema_location}
              onChange={handleChange}
              disabled={!physicalTherapyInfo.edema}
            />
          </Form.Group>

          <Form.Group controlId="ulcer">
            <Form.Label>Úlcera</Form.Label>
            <div>
              <Form.Check
                inline
                type="radio"
                label="Sí"
                name="ulcer"
                value="Yes"
                checked={physicalTherapyInfo.ulcer === true}
                onChange={() =>
                  setPhysicalTherapyInfo({
                    ...physicalTherapyInfo,
                    ulcer: true,
                  })
                }
              />
              <Form.Check
                inline
                type="radio"
                label="No"
                name="ulcer"
                value="No"
                checked={physicalTherapyInfo.ulcer === false}
                onChange={() =>
                  setPhysicalTherapyInfo({
                    ...physicalTherapyInfo,
                    ulcer: false,
                  })
                }
              />
            </div>
          </Form.Group>

          <Form.Group controlId="ulcerLocation" className="mb-3">
            <Form.Label>Donde:</Form.Label>
            <Form.Control
              name="ulcer_location"
              type="text"
              placeholder="Ingrese la ubicación de la úlcera"
              value={physicalTherapyInfo.ulcer_location}
              onChange={handleChange}
              disabled={!physicalTherapyInfo.ulcer}
            />
          </Form.Group>

          <Form.Group controlId="activitiesOfDailyLiving" className="mb-3">
            <Form.Label>Actividades de la vida diaria (A.V.D)</Form.Label>
            <div>
              <Form.Check
                inline
                type="radio"
                label="Sí"
                name="activities_of_daily_living"
                value="Yes"
                checked={
                  physicalTherapyInfo.activities_of_daily_living === true
                }
                onChange={() =>
                  setPhysicalTherapyInfo({
                    ...physicalTherapyInfo,
                    activities_of_daily_living: true,
                  })
                }
              />
              <Form.Check
                inline
                type="radio"
                label="No"
                name="activities_of_daily_living"
                value="No"
                checked={
                  physicalTherapyInfo.activities_of_daily_living === false
                }
                onChange={() =>
                  setPhysicalTherapyInfo({
                    ...physicalTherapyInfo,
                    activities_of_daily_living: false,
                  })
                }
              />
            </div>
          </Form.Group>

          <Form.Group controlId="pain">
            <Form.Label>Dolor</Form.Label>
            <div>
              <Form.Check
                inline
                type="radio"
                label="Sí"
                name="pain"
                value="Yes"
                checked={physicalTherapyInfo.pain === true}
                onChange={() =>
                  setPhysicalTherapyInfo({ ...physicalTherapyInfo, pain: true })
                }
              />
              <Form.Check
                inline
                type="radio"
                label="No"
                name="pain"
                value="No"
                checked={physicalTherapyInfo.pain === false}
                onChange={() =>
                  setPhysicalTherapyInfo({
                    ...physicalTherapyInfo,
                    pain: false,
                  })
                }
              />
            </div>
          </Form.Group>

          <Form.Group controlId="painLocation" className="mb-3">
            <Form.Label>Donde:</Form.Label>
            <Form.Control
              name="pain_location"
              type="text"
              placeholder="Ingrese la ubicación del dolor"
              value={physicalTherapyInfo.pain_location}
              onChange={handleChange}
              disabled={!physicalTherapyInfo.pain}
            />
          </Form.Group>

          <Form.Group controlId="muscleStrength" className="mb-3">
            <Form.Label>Fuerza muscular</Form.Label>
            <Form.Control
              name="muscle_strength"
              type="text"
              placeholder="Ingrese la fuerza muscular"
              value={physicalTherapyInfo.muscle_strength}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="rangeOfMotion" className="mb-3">
            <Form.Label>Arcos movilidad</Form.Label>
            <Form.Control
              name="range_of_motion"
              type="text"
              placeholder="Ingrese los arcos de movilidad"
              value={physicalTherapyInfo.range_of_motion}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="balance" className="mb-3">
            <Form.Label>Equilibrio</Form.Label>
            <Form.Control
              name="balance"
              type="text"
              placeholder="Ingrese el equilibrio"
              value={physicalTherapyInfo.balance}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="externalSupport" className="mb-3">
            <Form.Label>Apoyo externo</Form.Label>
            <Form.Select
              value={physicalTherapyInfo.external_support}
              onChange={(e) => {
                setPhysicalTherapyInfo({
                  ...physicalTherapyInfo,
                  external_support: e.target.value,
                });
              }}
            >
              <option value="Ninguno">Ninguno</option>
              <option value="Bastón">Bastón</option>
              <option value="Andadera">Andadera</option>
              <option value="Silla de ruedas">Silla de ruedas</option>
              <option value="Otro">Otro</option>
            </Form.Select>
            {physicalTherapyInfo.external_support === "Otro" && (
              <Form.Control
                type="text"
                placeholder="Especifique el apoyo externo"
                value={customSupport}
                onChange={handleCustomSupportChange}
              />
            )}
          </Form.Group>

          <Form.Group
            controlId="additionalExternalSupportInfo"
            className="mb-3"
          >
            <Form.Label>Justificación del apoyo externo</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="additional_external_support_info"
              placeholder="Justifique el apoyo externo"
              value={physicalTherapyInfo.additional_external_support_info}
              onChange={handleChange}
              disabled={
                physicalTherapyInfo.external_support === "Ninguno" ||
                physicalTherapyInfo.external_support === ""
              }
            />
          </Form.Group>

          <Form.Group controlId="workPlan" className="mb-3">
            <Form.Label>Plan de trabajo</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="work_plan"
              placeholder="Ingrese el plan de trabajo"
              value={physicalTherapyInfo.work_plan}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="physicalTherapyTreatment" className="mb-3">
            <Form.Label>Tratamiento fisioterapeuta</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="physical_therapy_treatment"
              placeholder="Ingrese el tratamiento fisioterapeuta"
              value={physicalTherapyInfo.physical_therapy_treatment}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="treatmentObjectives" className="mb-3">
            <Form.Label>Objetivos de tratamiento</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="treatment_objectives"
              placeholder="Ingrese los objetivos del tratamiento"
              value={physicalTherapyInfo.treatment_objectives}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="exercises" className="mb-3">
            <Form.Label>Ejercicios</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="exercises"
              placeholder="Ingreses ejercicios"
              value={physicalTherapyInfo.exercises}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="physicalAgents" className="mb-3">
            <Form.Label>Agente físicos</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="physical_agents"
              placeholder="Ingrese agentes físicos"
              value={physicalTherapyInfo.physical_agents}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="posturalHygiene" className="mb-3">
            <Form.Label>Higiene postural</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="postural_hygiene"
              placeholder="Ingrese la higiene postural"
              value={physicalTherapyInfo.postural_hygiene}
              onChange={handleChange}
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

export default PhysicalTherapyForm;
