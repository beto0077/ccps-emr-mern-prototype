import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { usePatientContext } from "../../context/PatientContext";

function PatientForm() {
    const { createPatient, getPatient, updatePatient } = usePatientContext();
    const [patient, setPatient] = useState({
        admission_date: "",
        name: "",
        id_number: "",
        religion: "",
        education_level: "",
        occupation: "",
        date_of_birth: "",
        age: "",
        marital_status: "",
        children: "",
        home_phone: "",
        cell_phone: "",
        email: "",
        nationality: "",
        address: "",
        patient_status: "",
        clinical_diagnosis: "",
        referred_by: "",
        clinical_history: "",
        medications: "",
        social_support_network: "",
        alive_status: true
    });
    const params = useParams();
    const navigate = useNavigate();

    const formatDate = (dateString) => {
        if (!dateString) return '';

        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    useEffect(() => {
        const loadPatient = async () => {
            if (params.id) {
                const loadedPatient = await getPatient(params.id);
                setPatient(loadedPatient);
            }
        };
        loadPatient();
    }, [params.id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPatient((prevPatient) => ({
            ...prevPatient,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let patientData = { ...patient };

        patientData.admission_date = formatDate(patient.admission_date);
        patientData.date_of_birth = formatDate(patient.date_of_birth);    

        if (params.id) {
            await updatePatient(params.id, patientData);
        } else {
            await createPatient(patientData);
        }
        navigate(`/patientProfile/${params.id}`);
        setPatient({
            admission_date: "",
            name: "",
            id_number: "",
            religion: "",
            education_level: "",
            occupation: "",
            date_of_birth: "",
            age: "",
            marital_status: "",
            children: "",
            home_phone: "",
            cell_phone: "",
            email: "",
            nationality: "",
            address: "",
            patient_status: "",
            clinical_diagnosis: "",
            referred_by: "",
            clinical_history: "",
            medications: "",
            social_support_network: "",
            alive_status: true
        });
    };

    return (
        <div style={{ display: 'block', margin: 'auto', width: 400, padding: 30 }}>
            <Form onSubmit={handleSubmit}>
                <h1 className="text-center mb-4">
                    {params.id ? "Edit Patient Information" : "New Patient Information"}
                </h1>
                <Form.Group controlId="formAdmissionDate">
                    <Form.Label>Admission Date</Form.Label>
                    <Form.Control
                        type="date"
                        name="admission_date"
                        onChange={handleChange}
                        value={formatDate(patient.admission_date)}
                    />
                </Form.Group>
                <Form.Group controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        placeholder="Enter full name"
                        onChange={handleChange}
                        value={patient.name}
                    />
                </Form.Group>
                <Form.Group controlId="formIdNumber">
                    <Form.Label>ID Number</Form.Label>
                    <Form.Control
                        type="text"
                        name="id_number"
                        placeholder="Enter ID number"
                        onChange={handleChange}
                        value={patient.id_number}
                    />
                </Form.Group>
                <Form.Group controlId="formReligion">
                    <Form.Label>Religion</Form.Label>
                    <Form.Control
                        type="text"
                        name="religion"
                        placeholder="Enter religion"
                        onChange={handleChange}
                        value={patient.religion}
                    />
                </Form.Group>
                <Form.Group controlId="formEducationLevel">
                    <Form.Label>Education Level</Form.Label>
                    <Form.Control
                        type="text"
                        name="education_level"
                        placeholder="Enter education level"
                        onChange={handleChange}
                        value={patient.education_level}
                    />
                </Form.Group>
                <Form.Group controlId="formOccupation">
                    <Form.Label>Occupation</Form.Label>
                    <Form.Control
                        type="text"
                        name="occupation"
                        placeholder="Enter occupation"
                        onChange={handleChange}
                        value={patient.occupation}
                    />
                </Form.Group>
                <Form.Group controlId="formDateOfBirth">
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control
                        type="date"
                        name="date_of_birth"
                        onChange={handleChange}
                        value={formatDate(patient.date_of_birth)}
                    />
                </Form.Group>
                <Form.Group controlId="formAge">
                    <Form.Label>Age</Form.Label>
                    <Form.Control
                        type="number"
                        name="age"
                        placeholder="Enter age"
                        onChange={handleChange}
                        value={patient.age}
                    />
                </Form.Group>
                <Form.Group controlId="formMaritalStatus">
                    <Form.Label>Marital Status</Form.Label>
                    <Form.Control
                        type="text"
                        name="marital_status"
                        placeholder="Enter marital status"
                        onChange={handleChange}
                        value={patient.marital_status}
                    />
                </Form.Group>
                <Form.Group controlId="formChildren">
                    <Form.Label>Number of Children</Form.Label>
                    <Form.Control
                        type="number"
                        name="children"
                        placeholder="Enter number of children"
                        onChange={handleChange}
                        value={patient.children}
                    />
                </Form.Group>
                <Form.Group controlId="formHomePhone">
                    <Form.Label>Home Phone</Form.Label>
                    <Form.Control
                        type="text"
                        name="home_phone"
                        placeholder="Enter home phone number"
                        onChange={handleChange}
                        value={patient.home_phone}
                    />
                </Form.Group>
                <Form.Group controlId="formCellPhone">
                    <Form.Label>Cell Phone</Form.Label>
                    <Form.Control
                        type="text"
                        name="cell_phone"
                        placeholder="Enter cell phone number"
                        onChange={handleChange}
                        value={patient.cell_phone}
                    />
                </Form.Group>
                <Form.Group controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        onChange={handleChange}
                        value={patient.email}
                    />
                </Form.Group>
                <Form.Group controlId="formNationality">
                    <Form.Label>Nationality</Form.Label>
                    <Form.Control
                        type="text"
                        name="nationality"
                        placeholder="Enter nationality"
                        onChange={handleChange}
                        value={patient.nationality}
                    />
                </Form.Group>
                <Form.Group controlId="formAddress">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        type="text"
                        name="address"
                        placeholder="Enter address"
                        onChange={handleChange}
                        value={patient.address}
                    />
                </Form.Group>
                <Form.Group controlId="formPatientStatus">
                    <Form.Label>Patient Status</Form.Label>
                    <Form.Control
                        type="text"
                        name="patient_status"
                        placeholder="Enter patient status"
                        onChange={handleChange}
                        value={patient.patient_status}
                    />
                </Form.Group>
                <Form.Group controlId="formClinicalDiagnosis">
                    <Form.Label>Clinical Diagnosis</Form.Label>
                    <Form.Control
                        type="text"
                        name="clinical_diagnosis"
                        placeholder="Enter clinical diagnosis"
                        onChange={handleChange}
                        value={patient.clinical_diagnosis}
                    />
                </Form.Group>
                <Form.Group controlId="formReferredBy">
                    <Form.Label>Referred By</Form.Label>
                    <Form.Control
                        type="text"
                        name="referred_by"
                        placeholder="Enter referred by"
                        onChange={handleChange}
                        value={patient.referred_by}
                    />
                </Form.Group>
                <Form.Group controlId="formClinicalHistory">
                    <Form.Label>Clinical History</Form.Label>
                    <Form.Control
                        as="select"
                        name="clinical_history"
                        onChange={handleChange}
                        value={patient.clinical_history}
                    >
                        <option value="Home visit">Home visit</option>
                        <option value="External consultation">External consultation</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="formMedications">
                    <Form.Label>Medications</Form.Label>
                    <Form.Control
                        type="text"
                        name="medications"
                        placeholder="Enter medications"
                        onChange={handleChange}
                        value={patient.medications}
                    />
                </Form.Group>
                <Form.Group controlId="formSocialSupportNetwork">
                    <Form.Label>Social Support Network</Form.Label>
                    <Form.Control
                        type="text"
                        name="social_support_network"
                        placeholder="Enter social support network"
                        onChange={handleChange}
                        value={patient.social_support_network}
                    />
                </Form.Group>
                <Form.Group controlId="formAliveStatus">
                    <Form.Label>Alive Status</Form.Label>
                    <Form.Check 
                        type="checkbox"
                        name="alive_status"
                        label="Is Alive"
                        onChange={(e) => setPatient({...patient, alive_status: e.target.checked})}
                        checked={patient.alive_status}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Save
                </Button>
            </Form>
        </div>
    );    
}

export default PatientForm;