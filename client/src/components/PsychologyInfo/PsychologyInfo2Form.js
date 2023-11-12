import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Navbar from '../NavigationBar';
import { usePsychologyInfo2Context } from "../../context/PsychologyInfo2Context";
import { usePatientContext } from "../../context/PatientContext";

function PsychologyInfo2Form() {
    const location = useLocation();
    const { createPsychologyInfo2, getPsychologyInfo2, updatePsychologyInfo2 } = usePsychologyInfo2Context();
    const { getPatient } = usePatientContext();
    const [info, setInfo] = useState({
        patient_id: location.state?.id || '',
        evaluation_date: '',
        date_of_birth: '',
        full_name: '',
        age: '',
        marital_status: '',
        occupation: '',
        religion: '',
        family_group: '',
        type_of_therapy: false,
        medical_diagnosis: '',
        mental_state: '',
        personal_history: '',
        emotional_factors: '',
        occupational_educational_aspects: '',
        family_aspects_family_diagram: '',
        approach_plan: ''
    });

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
        const loadInfo = async () => {
            if (params.id) {
                const details = await getPsychologyInfo2(params.id);
                setInfo(details);
            } else {
                const patient = await getPatient(location.state?.id);
                const todayFormatted = formatDate(new Date());
                setInfo(prevInfo => ({
                    ...prevInfo,
                    evaluation_date: todayFormatted,
                    date_of_birth: formatDate(patient.date_of_birth),
                    full_name: patient.name,
                    age: patient.age,
                    marital_status: patient.marital_status,
                    occupation: patient.occupation,
                    religion: patient.religion,
                }));
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
        if (params.id) {
            await updatePsychologyInfo2(params.id, info);
        } else {
            await createPsychologyInfo2(info);
        }
        navigate(`/psychologyDashboard/${info.patient_id}`);
        setInfo({
            patient_id: '',
            evaluation_date: '',
            date_of_birth: '',
            full_name: '',
            age: '',
            marital_status: '',
            occupation: '',
            religion: '',
            family_group: '',
            type_of_therapy: false,
            medical_diagnosis: '',
            mental_state: '',
            personal_history: '',
            emotional_factors: '',
            occupational_educational_aspects: '',
            family_aspects_family_diagram: '',
            approach_plan: ''
        });
    };

    return (
        <>
        <Navbar />
        <div style={{ display: 'block', margin: 'auto', width: 400, padding: 30 }}>
            <Form onSubmit={handleSubmit}>
                <h1 className="text-center mb-4">
                    {params.id ? "Edit Psychology Info" : "Nuevo formulario de evaluación"}
                </h1>
                <Form.Group controlId="formFullName" className="mb-3">
                    <Form.Label>Nombre completo</Form.Label>
                    <Form.Control
                        type="text"
                        name="full_name"
                        placeholder="Ingrese nombre completo"
                        onChange={handleChange}
                        value={info.full_name}
                    />
                </Form.Group>
                <Form.Group controlId="formEvaluationDate" className="mb-3">
                    <Form.Label>Fecha de evaluación</Form.Label>
                    <Form.Control
                        type="date"
                        name="evaluation_date"
                        onChange={handleChange}
                        value={info.evaluation_date}
                    />
                </Form.Group>
                <Form.Group controlId="formDateOfBirth" className="mb-3">
                    <Form.Label>Fecha de nacimiento</Form.Label>
                    <Form.Control
                        type="date"
                        name="date_of_birth"
                        onChange={handleChange}
                        value={info.date_of_birth}
                    />
                </Form.Group>
                <Form.Group controlId="formAge" className="mb-3">
                    <Form.Label>Edad</Form.Label>
                    <Form.Control
                        type="number"
                        name="age"
                        placeholder="Ingrese edad"
                        onChange={handleChange}
                        value={info.age}
                    />
                </Form.Group>
                <Form.Group controlId="formMaritalStatus" className="mb-3">
                    <Form.Label>Estado Civil</Form.Label>
                    <Form.Control
                        type="text"
                        name="marital_status"
                        placeholder="Ingrese estado civil"
                        onChange={handleChange}
                        value={info.marital_status}
                    />
                </Form.Group>
                <Form.Group controlId="formOccupation" className="mb-3">
                    <Form.Label>Ocupación</Form.Label>
                    <Form.Control
                        type="text"
                        name="occupation"
                        placeholder="Ingrese ocupación"
                        onChange={handleChange}
                        value={info.occupation}
                    />
                </Form.Group>
                <Form.Group controlId="formReligion" className="mb-3">
                    <Form.Label>Religión</Form.Label>
                    <Form.Control
                        type="text"
                        name="religion"
                        placeholder="Ingrese religión"
                        onChange={handleChange}
                        value={info.religion}
                    />
                </Form.Group>
                <Form.Group controlId="formFamilyGroup" className="mb-3">
                    <Form.Label>Grupo Familiar</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={2}
                        name="family_group"
                        placeholder="Ingrese grupo familiar(Madre, Padre, Hijos, etc.)"
                        onChange={handleChange}
                        value={info.family_group}
                    />
                </Form.Group>
                <Form.Group controlId="formTypeOfTherapy" className="mb-4">
                    <Form.Label>Tipo de Terapia</Form.Label>
                    <div>
                        <Form.Check
                            inline
                            type="radio"
                            name="type_of_therapy"
                            label="Familiar"
                            value="Yes"
                            checked={info.type_of_therapy === true}
                            onChange={() => setInfo({ ...info, type_of_therapy: true })}
                        />
                        <Form.Check
                            inline
                            type="radio"
                            name="type_of_therapy"
                            label="Individual"
                            value="No"
                            checked={info.type_of_therapy === false}
                            onChange={() => setInfo({ ...info, type_of_therapy: false })}
                        />
                    </div>
                </Form.Group>
                <Form.Group controlId="formMedicalDiagnosis" className="mb-3">
                    <Form.Label>Diagnóstico médico</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={5}
                        name="medical_diagnosis"
                        placeholder="Ingrese diagnóstico médico"
                        onChange={handleChange}
                        value={info.medical_diagnosis}
                    />
                </Form.Group>
                <Form.Group controlId="formMentalState" className="mb-3">
                    <Form.Label>Estado mental</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={5}
                        name="mental_state"
                        placeholder="Ingrese estado mental"
                        onChange={handleChange}
                        value={info.mental_state}
                    />
                </Form.Group>
                <Form.Group controlId="formPersonalHistory" className="mb-3">
                    <Form.Label>Historia Personal</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={5}
                        name="personal_history"
                        placeholder="Ingrese historia personal"
                        onChange={handleChange}
                        value={info.personal_history}
                    />
                </Form.Group>
                <Form.Group controlId="formEmotionalFactors" className="mb-3">
                    <Form.Label>Factores emocionales</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={5}
                        name="emotional_factors"
                        placeholder="Ingrese factores emocionales"
                        onChange={handleChange}
                        value={info.emotional_factors}
                    />
                </Form.Group>
                <Form.Group controlId="formOccupationalEducationalAspects" className="mb-3">
                    <Form.Label>Aspectos laborales/educativos</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={5}
                        name="occupational_educational_aspects"
                        placeholder="Ingrese aspectos laborales/educativos"
                        onChange={handleChange}
                        value={info.occupational_educational_aspects}
                    />
                </Form.Group>
                <Form.Group controlId="formFamilyAspectsFamilyDiagram" className="mb-3">
                    <Form.Label>Aspectos familiares/Familiograma</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={5}
                        name="family_aspects_family_diagram"
                        placeholder="Ingrese aspectos familiares/Familiograma"
                        onChange={handleChange}
                        value={info.family_aspects_family_diagram}
                    />
                </Form.Group>
                <Form.Group controlId="formApproachPlan" className="mb-3">
                    <Form.Label>Plan de abordaje</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={5}
                        name="approach_plan"
                        placeholder="Ingrese plan de abordaje"
                        onChange={handleChange}
                        value={info.approach_plan}
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

export default PsychologyInfo2Form;