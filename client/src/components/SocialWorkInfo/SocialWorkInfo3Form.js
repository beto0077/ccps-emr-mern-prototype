import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useSocialWorkInfo3Context } from "../../context/SocialWorkInfo3Context";

function SocialWorkInfo3Form() {
    const { createSocialWorkInfo, getSocialWorkInfo, updateSocialWorkInfo } = useSocialWorkInfo3Context();
    const [socialWorkInfo, setSocialWorkInfo] = useState({
        patient_id: "",
        patient_name: "",
        id: "",
        address: "",
        evolution: "",
        treatment: ""
    });
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const loadSocialWorkInfo = async () => {
            if (params.id) {
                const loadedInfo = await getSocialWorkInfo(params.id);
                setSocialWorkInfo(loadedInfo);
            }
        };
        loadSocialWorkInfo();
    }, [params.id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSocialWorkInfo((prevInfo) => ({
            ...prevInfo,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (params.id) {
            await updateSocialWorkInfo(params.id, socialWorkInfo);
        } else {
            await createSocialWorkInfo(socialWorkInfo);
        }
        navigate("/socialWorkInfo3");
        setSocialWorkInfo({
            patient_id: "",
            patient_name: "",
            id: "",
            address: "",
            evolution: "",
            treatment: ""
        });
    };

    return (
        <div style={{ display: 'block', margin: 'auto', width: 400, padding: 30 }}>
            <Form onSubmit={handleSubmit}>
                <h1 className="text-center mb-4">
                    {params.id ? "Edit Social Work Info" : "New Social Work Info"}
                </h1>
                <Form.Group controlId="formPatientID">
                    <Form.Label>Patient ID</Form.Label>
                    <Form.Control
                        type="number"
                        name="patient_id"
                        placeholder="Enter patient ID"
                        onChange={handleChange}
                        value={socialWorkInfo.patient_id}
                    />
                </Form.Group>
                <Form.Group controlId="formPatientName">
                    <Form.Label>Patient Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="patient_name"
                        placeholder="Enter patient name"
                        onChange={handleChange}
                        value={socialWorkInfo.patient_name}
                    />
                </Form.Group>
                <Form.Group controlId="formID">
                    <Form.Label>ID</Form.Label>
                    <Form.Control
                        type="text"
                        name="id"
                        placeholder="Enter ID"
                        onChange={handleChange}
                        value={socialWorkInfo.id}
                    />
                </Form.Group>
                <Form.Group controlId="formAddress">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        type="text"
                        name="address"
                        placeholder="Enter address"
                        onChange={handleChange}
                        value={socialWorkInfo.address}
                    />
                </Form.Group>
                <Form.Group controlId="formEvolution">
                    <Form.Label>Evolution</Form.Label>
                    <Form.Control
                        type="text"
                        name="evolution"
                        placeholder="Enter evolution"
                        onChange={handleChange}
                        value={socialWorkInfo.evolution}
                    />
                </Form.Group>
                <Form.Group controlId="formTreatment">
                    <Form.Label>Treatment</Form.Label>
                    <Form.Control
                        type="text"
                        name="treatment"
                        placeholder="Enter treatment"
                        onChange={handleChange}
                        value={socialWorkInfo.treatment}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Save
                </Button>
            </Form>
        </div>
    );
}

export default SocialWorkInfo3Form;