import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useInternalReferencesContext } from "../../context/InternalReferencesContext";

function InternalReferenceForm() {
    const { createInternalReference, getInternalReference, updateInternalReference } = useInternalReferencesContext();
    const [reference, setReference] = useState({
        date: '',
        full_name: '',
        id_number: '',
        religion: '',
        education_level: '',
        occupation: '',
        date_of_birth: '',
        age: '',
        marital_status: '',
        children: '',
        phone_number: '',
        nationality: '',
        address: '',
        service_of_care: '',
        referred_to: '',
        clinical_diagnosis: '',
        management_plan: '',
        reason_for_referral: ''
    });

    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const loadReference = async () => {
            if (params.id) {
                const loadedReference = await getInternalReference(params.id);
                setReference(loadedReference);
            }
        };
        loadReference();
    }, [params.id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setReference((prevReference) => ({
            ...prevReference,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (params.id) {
            await updateInternalReference(params.id, reference);
        } else {
            await createInternalReference(reference);
        }
        navigate("/internalReferencesHome"); // Assuming you have a route for this
        setReference({
            date: '',
            full_name: '',
            id_number: '',
            religion: '',
            education_level: '',
            occupation: '',
            date_of_birth: '',
            age: '',
            marital_status: '',
            children: '',
            phone_number: '',
            nationality: '',
            address: '',
            service_of_care: '',
            referred_to: '',
            clinical_diagnosis: '',
            management_plan: '',
            reason_for_referral: ''
        });
    };

    return (
        <div style={{ display: 'block', margin: 'auto', width: 400, padding: 30 }}>
            <Form onSubmit={handleSubmit}>
                <h1 className="text-center mb-4">
                    {params.id ? "Edit Internal Reference" : "New Internal Reference"}
                </h1>
                <Form.Group controlId="formDate">
                    <Form.Label>Date</Form.Label>
                    <Form.Control
                        type="date"
                        name="date"
                        onChange={handleChange}
                        value={reference.date}
                    />
                </Form.Group>
                <Form.Group controlId="formFullName">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="full_name"
                        placeholder="Enter full name"
                        onChange={handleChange}
                        value={reference.full_name}
                    />
                </Form.Group>
                <Form.Group controlId="formIdNumber">
                    <Form.Label>ID Number</Form.Label>
                    <Form.Control
                        type="text"
                        name="id_number"
                        placeholder="Enter ID number"
                        onChange={handleChange}
                        value={reference.id_number}
                    />
                </Form.Group>
                <Form.Group controlId="formReligion">
                    <Form.Label>Religion</Form.Label>
                    <Form.Control
                        type="text"
                        name="religion"
                        placeholder="Enter religion"
                        onChange={handleChange}
                        value={reference.religion}
                    />
                </Form.Group>
                <Form.Group controlId="formEducationLevel">
                    <Form.Label>Education Level</Form.Label>
                    <Form.Control
                        type="text"
                        name="education_level"
                        placeholder="Enter education level"
                        onChange={handleChange}
                        value={reference.education_level}
                    />
                </Form.Group>
                <Form.Group controlId="formOccupation">
                    <Form.Label>Occupation</Form.Label>
                    <Form.Control
                        type="text"
                        name="occupation"
                        placeholder="Enter occupation"
                        onChange={handleChange}
                        value={reference.occupation}
                    />
                </Form.Group>
                <Form.Group controlId="formDateOfBirth">
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control
                        type="date"
                        name="date_of_birth"
                        onChange={handleChange}
                        value={reference.date_of_birth}
                    />
                </Form.Group>
                <Form.Group controlId="formAge">
                    <Form.Label>Age</Form.Label>
                    <Form.Control
                        type="number"
                        name="age"
                        placeholder="Enter age"
                        onChange={handleChange}
                        value={reference.age}
                    />
                </Form.Group>
                <Form.Group controlId="formMaritalStatus">
                    <Form.Label>Marital Status</Form.Label>
                    <Form.Control
                        type="text"
                        name="marital_status"
                        placeholder="Enter marital status"
                        onChange={handleChange}
                        value={reference.marital_status}
                    />
                </Form.Group>
                <Form.Group controlId="formChildren">
                    <Form.Label>Children</Form.Label>
                    <Form.Control
                        type="number"
                        name="children"
                        placeholder="Enter number of children"
                        onChange={handleChange}
                        value={reference.children}
                    />
                </Form.Group>
                <Form.Group controlId="formPhoneNumber">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                        type="text"
                        name="phone_number"
                        placeholder="Enter phone number"
                        onChange={handleChange}
                        value={reference.phone_number}
                    />
                </Form.Group>
                <Form.Group controlId="formNationality">
                    <Form.Label>Nationality</Form.Label>
                    <Form.Control
                        type="text"
                        name="nationality"
                        placeholder="Enter nationality"
                        onChange={handleChange}
                        value={reference.nationality}
                    />
                </Form.Group>
                <Form.Group controlId="formAddress">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        type="text"
                        name="address"
                        placeholder="Enter address"
                        onChange={handleChange}
                        value={reference.address}
                    />
                </Form.Group>
                <Form.Group controlId="formServiceOfCare">
                    <Form.Label>Service of Care</Form.Label>
                    <Form.Control
                        type="text"
                        name="service_of_care"
                        placeholder="Enter service of care"
                        onChange={handleChange}
                        value={reference.service_of_care}
                    />
                </Form.Group>
                <Form.Group controlId="formReferredTo">
                    <Form.Label>Referred To</Form.Label>
                    <Form.Control
                        type="text"
                        name="referred_to"
                        placeholder="Enter referred to"
                        onChange={handleChange}
                        value={reference.referred_to}
                    />
                </Form.Group>
                <Form.Group controlId="formClinicalDiagnosis">
                    <Form.Label>Clinical Diagnosis</Form.Label>
                    <Form.Control
                        type="text"
                        name="clinical_diagnosis"
                        placeholder="Enter clinical diagnosis"
                        onChange={handleChange}
                        value={reference.clinical_diagnosis}
                    />
                </Form.Group>
                <Form.Group controlId="formManagementPlan">
                    <Form.Label>Management Plan</Form.Label>
                    <Form.Control
                        type="text"
                        name="management_plan"
                        placeholder="Enter management plan"
                        onChange={handleChange}
                        value={reference.management_plan}
                    />
                </Form.Group>
                <Form.Group controlId="formReasonForReferral">
                    <Form.Label>Reason for Referral</Form.Label>
                    <Form.Control
                        type="text"
                        name="reason_for_referral"
                        placeholder="Enter reason for referral"
                        onChange={handleChange}
                        value={reference.reason_for_referral}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Save
                </Button>
            </Form>
        </div>
    );
}

export default InternalReferenceForm;
