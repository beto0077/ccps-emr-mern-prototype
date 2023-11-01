import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { usePsychologyInfo2Context } from "../../context/PsychologyInfo2Context";

function PsychologyInfo2Form() {
    const { createPsychologyInfo2, getPsychologyInfo2, updatePsychologyInfo2 } = usePsychologyInfo2Context();
    const [info, setInfo] = useState({
        psychology_info2_id: '',
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

    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const loadInfo = async () => {
            if (params.id) {
                const details = await getPsychologyInfo2(params.id);
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
        if (params.id) {
            await updatePsychologyInfo2(params.id, info);
        } else {
            await createPsychologyInfo2(info);
        }
        navigate("/PsychologyInfo2Home");
        setInfo({
            psychology_info2_id: '',
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
        <div style={{ display: 'block', margin: 'auto', width: 400, padding: 30 }}>
            <Form onSubmit={handleSubmit}>
                <h1 className="text-center mb-4">
                    {params.id ? "Edit Psychology Info" : "New Psychology Info"}
                </h1>
                <Form.Group controlId="formFullName">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="full_name"
                        placeholder="Enter full name"
                        onChange={handleChange}
                        value={info.full_name}
                    />
                </Form.Group>
                <Form.Group controlId="formEvaluationDate">
                    <Form.Label>Evaluation Date</Form.Label>
                    <Form.Control
                        type="date"
                        name="evaluation_date"
                        onChange={handleChange}
                        value={info.evaluation_date}
                    />
                </Form.Group>
                <Form.Group controlId="formDateOfBirth">
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control
                        type="date"
                        name="date_of_birth"
                        onChange={handleChange}
                        value={info.date_of_birth}
                    />
                </Form.Group>
                <Form.Group controlId="formAge">
                    <Form.Label>Age</Form.Label>
                    <Form.Control
                        type="number"
                        name="age"
                        placeholder="Enter age"
                        onChange={handleChange}
                        value={info.age}
                    />
                </Form.Group>
                <Form.Group controlId="formMaritalStatus">
                    <Form.Label>Marital Status</Form.Label>
                    <Form.Control
                        type="text"
                        name="marital_status"
                        placeholder="Enter marital status"
                        onChange={handleChange}
                        value={info.marital_status}
                    />
                </Form.Group>
                <Form.Group controlId="formOccupation">
                    <Form.Label>Occupation</Form.Label>
                    <Form.Control
                        type="text"
                        name="occupation"
                        placeholder="Enter occupation"
                        onChange={handleChange}
                        value={info.occupation}
                    />
                </Form.Group>
                <Form.Group controlId="formReligion">
                    <Form.Label>Religion</Form.Label>
                    <Form.Control
                        type="text"
                        name="religion"
                        placeholder="Enter religion"
                        onChange={handleChange}
                        value={info.religion}
                    />
                </Form.Group>
                <Form.Group controlId="formFamilyGroup">
                    <Form.Label>Family Group</Form.Label>
                    <Form.Control
                        type="text"
                        name="family_group"
                        placeholder="Enter family group"
                        onChange={handleChange}
                        value={info.family_group}
                    />
                </Form.Group>
                <Form.Group controlId="formTypeOfTherapy">
                    <Form.Label>Type of Therapy</Form.Label>
                    <Form.Check
                        type="checkbox"
                        name="type_of_therapy"
                        label="Yes"
                        onChange={(e) => setInfo({ ...info, type_of_therapy: e.target.checked })}
                        checked={info.type_of_therapy}
                    />
                </Form.Group>
                <Form.Group controlId="formMedicalDiagnosis">
                    <Form.Label>Medical Diagnosis</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        name="medical_diagnosis"
                        placeholder="Enter medical diagnosis"
                        onChange={handleChange}
                        value={info.medical_diagnosis}
                    />
                </Form.Group>
                <Form.Group controlId="formMentalState">
                    <Form.Label>Mental State</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        name="mental_state"
                        placeholder="Enter mental state"
                        onChange={handleChange}
                        value={info.mental_state}
                    />
                </Form.Group>
                <Form.Group controlId="formPersonalHistory">
                    <Form.Label>Personal History</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        name="personal_history"
                        placeholder="Enter personal history"
                        onChange={handleChange}
                        value={info.personal_history}
                    />
                </Form.Group>
                <Form.Group controlId="formEmotionalFactors">
                    <Form.Label>Emotional Factors</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        name="emotional_factors"
                        placeholder="Enter emotional factors"
                        onChange={handleChange}
                        value={info.emotional_factors}
                    />
                </Form.Group>
                <Form.Group controlId="formOccupationalEducationalAspects">
                    <Form.Label>Occupational/Educational Aspects</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        name="occupational_educational_aspects"
                        placeholder="Enter occupational/educational aspects"
                        onChange={handleChange}
                        value={info.occupational_educational_aspects}
                    />
                </Form.Group>
                <Form.Group controlId="formFamilyAspectsFamilyDiagram">
                    <Form.Label>Family Aspects/Family Diagram</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        name="family_aspects_family_diagram"
                        placeholder="Enter family aspects/family diagram"
                        onChange={handleChange}
                        value={info.family_aspects_family_diagram}
                    />
                </Form.Group>
                <Form.Group controlId="formApproachPlan">
                    <Form.Label>Approach Plan</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        name="approach_plan"
                        placeholder="Enter approach plan"
                        onChange={handleChange}
                        value={info.approach_plan}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Save
                </Button>
            </Form>
        </div>
    );
}

export default PsychologyInfo2Form;