import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Navbar from '../NavigationBar';
import { usePsychologyInfo3Context } from "../../context/PsychologyInfo3Context";
import { usePatientContext } from "../../context/PatientContext";

function PsychologyInfo3Form() {
    const location = useLocation();
    const { createPsychologyInfo3, getPsychologyInfo3, updatePsychologyInfo3 } = usePsychologyInfo3Context();
    const { getPatient } = usePatientContext();
    const [psychologyInfo3, setPsychologyInfo3] = useState({
        patient_id: location.state?.id || "",
        name: "",
        id: "",
        progress: "",
        treatment: ""
    });

    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const loadPsychologyInfo3 = async () => {
            if (params.id) {
                const loadedPsychologyInfo3 = await getPsychologyInfo3(params.id);
                setPsychologyInfo3({
                    patient_id: loadedPsychologyInfo3.patient_id,
                    name: loadedPsychologyInfo3.name,
                    id: loadedPsychologyInfo3.id,
                    progress: loadedPsychologyInfo3.progress,
                    treatment: loadedPsychologyInfo3.treatment
                });
            } else {
                const patient = await getPatient(psychologyInfo3.patient_id);
                setPsychologyInfo3(prevInfo => ({
                    ...prevInfo,
                    name: patient.name,
                    id: patient.id_number
                }));
            }
        };
        loadPsychologyInfo3();
    }, [params.id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPsychologyInfo3((prevInfo) => ({
            ...prevInfo,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (params.id) {
            await updatePsychologyInfo3(params.id, psychologyInfo3);
        } else {
            await createPsychologyInfo3(psychologyInfo3);
        }
        navigate(`/psychologyInfo3List/${psychologyInfo3.patient_id}`); // Assuming you'll have a route for listing PsychologyInfo3
        setPsychologyInfo3({
            patient_id: "",
            name: "",
            id: "",
            progress: "",
            treatment: ""
        });
    };

    return (
        <>
        <Navbar />
        <div style={{ display: 'block', margin: 'auto', width: 400, padding: 30 }}>
            <Form onSubmit={handleSubmit}>
                <h1 className="text-center mb-4">
                    {params.id ? "Edit Psychology Info" : "Nuevo seguimiento de psicología"}
                </h1>
                <Form.Group controlId="formName" className="mb-3">
                    <Form.Label>Nombre del paciente</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        placeholder="Ingrese el nombre del paciente"
                        onChange={handleChange}
                        value={psychologyInfo3.name}
                    />
                </Form.Group>
                <Form.Group controlId="formId" className="mb-3">
                    <Form.Label>Cédula</Form.Label>
                    <Form.Control
                        type="text"
                        name="id"
                        placeholder="Ingrese la cédula"
                        onChange={handleChange}
                        value={psychologyInfo3.id}
                    />
                </Form.Group>
                <Form.Group controlId="formProgress" className="mb-3">
                    <Form.Label>Progreso</Form.Label>
                    <Form.Control
                        as="textarea" rows={5}
                        name="progress"
                        placeholder="Escriba el progreso"
                        onChange={handleChange}
                        value={psychologyInfo3.progress}
                    />
                </Form.Group>
                <Form.Group controlId="formTreatment" className="mb-3">
                    <Form.Label>Tratamiento</Form.Label>
                    <Form.Control
                        as="textarea" rows={5}
                        name="treatment"
                        placeholder="Ingrese el tratamiento"
                        onChange={handleChange}
                        value={psychologyInfo3.treatment}
                    />
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

export default PsychologyInfo3Form;