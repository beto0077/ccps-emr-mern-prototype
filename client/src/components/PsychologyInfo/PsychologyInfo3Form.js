import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { usePsychologyInfo3Context } from "../../context/PsychologyInfo3Context";

function PsychologyInfo3Form() {
    const { createPsychologyInfo3, getPsychologyInfo3, updatePsychologyInfo3 } = usePsychologyInfo3Context();
    const [psychologyInfo3, setPsychologyInfo3] = useState({
        patient_id: "",
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
        navigate("/psychologyInfo3List"); // Assuming you'll have a route for listing PsychologyInfo3
        setPsychologyInfo3({
            patient_id: "",
            name: "",
            id: "",
            progress: "",
            treatment: ""
        });
    };

    return (
        <div style={{ display: 'block', margin: 'auto', width: 400, padding: 30 }}>
            <Form onSubmit={handleSubmit}>
                <h1 className="text-center mb-4">
                    {params.id ? "Edit Psychology Info" : "New Psychology Info"}
                </h1>
                <Form.Group controlId="formPatientId">
                    <Form.Label>Patient ID</Form.Label>
                    <Form.Control
                        type="number"
                        name="patient_id"
                        placeholder="Enter patient ID"
                        onChange={handleChange}
                        value={psychologyInfo3.patient_id}
                    />
                </Form.Group>
                <Form.Group controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        placeholder="Enter name"
                        onChange={handleChange}
                        value={psychologyInfo3.name}
                    />
                </Form.Group>
                <Form.Group controlId="formId">
                    <Form.Label>ID</Form.Label>
                    <Form.Control
                        type="text"
                        name="id"
                        placeholder="Enter ID"
                        onChange={handleChange}
                        value={psychologyInfo3.id}
                    />
                </Form.Group>
                <Form.Group controlId="formProgress">
                    <Form.Label>Progress</Form.Label>
                    <Form.Control
                        type="text"
                        name="progress"
                        placeholder="Enter progress"
                        onChange={handleChange}
                        value={psychologyInfo3.progress}
                    />
                </Form.Group>
                <Form.Group controlId="formTreatment">
                    <Form.Label>Treatment</Form.Label>
                    <Form.Control
                        type="text"
                        name="treatment"
                        placeholder="Enter treatment"
                        onChange={handleChange}
                        value={psychologyInfo3.treatment}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Save
                </Button>
            </Form>
        </div>
    );
}

export default PsychologyInfo3Form;