import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Navbar from "../NavigationBar";
import { usePhysicalTherapyInfoContext } from "../../context/PhysicalTherapyInfoContext";
import { usePatientContext } from "../../context/PatientContext";

function PhysicalTherapyForm() {
  const location = useLocation();
  const {
    createPhysicalTherapyInfo,
    getPhysicalTherapyInfo,
    updatePhysicalTherapyInfo,
  } = usePhysicalTherapyInfoContext();
  const { getPatient } = usePatientContext();
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
    const loadPhysicalTherapyInfo = async () => {
      if (params.id) {
        const loadedPhysicalTherapyInfo = await getPhysicalTherapyInfo(params.id);
        setPhysicalTherapyInfo(loadedPhysicalTherapyInfo);
      } else {
        //Get professional name
      }
    };
    loadPhysicalTherapyInfo();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPhysicalTherapyInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (params.id) {
      await updatePhysicalTherapyInfo(params.id, physicalTherapyInfo);
    } else {
      await createPhysicalTherapyInfo(physicalTherapyInfo);
    }
    navigate(`/physicalTherapyDashboard/${location.state.id}`);
    setPhysicalTherapyInfo({
      patient_id:"",
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
    <Navbar/>
    <div style={{ display: "block", margin: "auto", width: 400, padding: 30 }}>
      <Form onSubmit={handleSubmit}>
      <h1 className="text-center mb-4">
                    {params.id ? "Editar referencia interna" : "Nueva Terapia física"}
                </h1>
      <Form.Group controlId="professional">
          <Form.Label>TEST</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter professional's name"
            value={physicalTherapyInfo.patient_id}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="professional" className="mb-3">
          <Form.Label>Profesional</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter professional's name"
            value={physicalTherapyInfo.professional}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="clinicalDiagnosis" className="mb-3">
          <Form.Label>Diagnóstico Clínico</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Ingrese diagnóstico clínico"
            value={physicalTherapyInfo.clinical_diagnosis}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="clinicalHistory" className="mb-3">
          <Form.Label>Historia Clínica</Form.Label>
          <Form.Control
            as="select"
            value={physicalTherapyInfo.clinical_history}
            onChange={handleChange}
          >
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
            onChange={() => setPhysicalTherapyInfo({ ...physicalTherapyInfo, edema: true })}
        />
        <Form.Check 
            inline
            type="radio"
            label="No"
            name="edema"
            value="No"
            checked={physicalTherapyInfo.edema === false}
            onChange={() => setPhysicalTherapyInfo({ ...physicalTherapyInfo, edema: false })}
        />
    </div>
</Form.Group>


<Form.Group controlId="edemaLocation">
    <Form.Label>Donde:</Form.Label>
    <Form.Control
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
            onChange={() => setPhysicalTherapyInfo({ ...physicalTherapyInfo, ulcer: true })}
        />
        <Form.Check 
            inline
            type="radio"
            label="No"
            name="ulcer"
            value="No"
            checked={physicalTherapyInfo.ulcer === false}
            onChange={() => setPhysicalTherapyInfo({ ...physicalTherapyInfo, ulcer: false })}
        />
    </div>
        </Form.Group>

        <Form.Group controlId="ulcerLocation">
          <Form.Label>Donde:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese la ubicación de la úlcera"
            value={physicalTherapyInfo.ulcer_location}
            onChange={handleChange}
            disabled={!physicalTherapyInfo.ulcer}
          />
        </Form.Group>

        <Form.Group controlId="activitiesOfDailyLiving">
        <Form.Label>Actividades de la vida diaria (A.V.D)</Form.Label>
    <div>
        <Form.Check 
            inline
            type="radio"
            label="Sí"
            name="activitiesOfDailyLiving"
            value="Yes"
            checked={physicalTherapyInfo.activities_of_daily_living === true}
            onChange={() => setPhysicalTherapyInfo({ ...physicalTherapyInfo, activities_of_daily_living: true })}
        />
        <Form.Check 
            inline
            type="radio"
            label="No"
            name="activitiesOfDailyLiving"
            value="No"
            checked={physicalTherapyInfo.activities_of_daily_living === false}
            onChange={() => setPhysicalTherapyInfo({ ...physicalTherapyInfo, activities_of_daily_living: false })}
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
            onChange={() => setPhysicalTherapyInfo({ ...physicalTherapyInfo, pain: true })}
        />
        <Form.Check 
            inline
            type="radio"
            label="No"
            name="pain"
            value="No"
            checked={physicalTherapyInfo.pain === false}
            onChange={() => setPhysicalTherapyInfo({ ...physicalTherapyInfo, pain: false })}
        />
    </div>
        </Form.Group>

        <Form.Group controlId="painLocation">
          <Form.Label>Donde:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese la ubicación del dolor"
            value={physicalTherapyInfo.pain_location}
            onChange={handleChange}
            disabled={!physicalTherapyInfo.pain}
          />
        </Form.Group>

        <Form.Group controlId="muscleStrength">
          <Form.Label>Fuerza muscular</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese la fuerza muscular"
            value={physicalTherapyInfo.muscle_strength}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="rangeOfMotion">
          <Form.Label>Arcos movilidad</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese los arcos de movilidad"
            value={physicalTherapyInfo.range_of_motion}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="balance">
          <Form.Label>Equilibrio</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese el equilibrio"
            value={physicalTherapyInfo.balance}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="externalSupport">
    <Form.Label>External Support</Form.Label>
    <Form.Select 
        value={physicalTherapyInfo.external_support !== 'Bastón' && 
                physicalTherapyInfo.external_support !== 'Andadera' && 
                physicalTherapyInfo.external_support !== 'Silla de ruedas' && 
                physicalTherapyInfo.external_support ? 'Otro' : physicalTherapyInfo.external_support}
        onChange={(e) => {
            setPhysicalTherapyInfo({ ...physicalTherapyInfo, external_support: e.target.value === 'Otro' ? '' : e.target.value });
        }}
    >
        <option value="">Select an option</option>
        <option value="Bastón">Bastón</option>
        <option value="Andadera">Andadera</option>
        <option value="Silla de ruedas">Silla de ruedas</option>
        <option value="Otro">Otro</option>
    </Form.Select>
    {physicalTherapyInfo.external_support === 'Otro' && (
        <Form.Control
            type="text"
            placeholder="Specify external support"
            value={physicalTherapyInfo.external_support}
            onChange={(e) =>
                setPhysicalTherapyInfo({ ...physicalTherapyInfo, external_support: e.target.value })
            }
        />
    )}
</Form.Group>


        <Form.Group controlId="additionalExternalSupportInfo">
          <Form.Label>Additional External Support Info</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter additional external support info"
            value={physicalTherapyInfo.additional_external_support_info}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="workPlan">
          <Form.Label>Work Plan</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter work plan"
            value={physicalTherapyInfo.work_plan}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="physicalTherapyTreatment">
          <Form.Label>Physical Therapy Treatment</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter physical therapy treatment"
            value={physicalTherapyInfo.physical_therapy_treatment}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="treatmentObjectives">
          <Form.Label>Treatment Objectives</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter treatment objectives"
            value={physicalTherapyInfo.treatment_objectives}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="exercises">
          <Form.Label>Exercises</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter exercises"
            value={physicalTherapyInfo.exercises}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="physicalAgents">
          <Form.Label>Physical Agents</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter physical agents"
            value={physicalTherapyInfo.physical_agents}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="posturalHygiene">
          <Form.Label>Postural Hygiene</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter postural hygiene"
            value={physicalTherapyInfo.postural_hygiene}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
    </>
  );
}

export default PhysicalTherapyForm;
