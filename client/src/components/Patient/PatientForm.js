import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Navbar from "../NavigationBar";
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
    const [customPatientStatus, setCustomPatientStatus] = useState('');
    const params = useParams();
    const navigate = useNavigate();

    const handleCustomPatientStatusChange = (e) => {
        setCustomPatientStatus(e.target.value);
      };
    const formatDate = (dateString) => {
        if (!dateString) return '';

        const date = new Date(dateString);
        const year = String(date.getFullYear()).padStart(4, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    useEffect(() => {
        const loadPatient = async () => {
            if (params.id) {
                const loadedPatient = await getPatient(params.id);
                setPatient(loadedPatient);
            } else {
                const todayFormatted = formatDate(new Date());
                setPatient(prevPatient => ({
                    ...prevPatient,
                    admission_date: todayFormatted,
                }));
            }
        };
        loadPatient();
    }, []);

    const prepareDataForSubmission = () => {
        if(patient.patient_status === "Otro") {
            return {
                ...patient,
                patient_status: customPatientStatus,
            };
        }
        return patient;
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "date_of_birth") {
            setPatient((prevPatient) => ({
                ...prevPatient,
                date_of_birth: formatDate(value),
            }));
        }
        setPatient((prevPatient) => ({
            ...prevPatient,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        /*let patientData = { ...patient };
        patientData.admission_date = formatDate(patient.admission_date);
        patientData.date_of_birth = formatDate(patient.date_of_birth);*/    

        const updatedInfo = prepareDataForSubmission();
        setPatient(updatedInfo);
        console.log(updatedInfo);
        /*if (params.id) {
            await updatePatient(params.id, updatedInfo);
        } else {
            await createPatient(updatedInfo);
        }
        navigate(`/patientSearch`);
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
        });*/
    };

    useEffect(() => {
        console.log(patient.admission_date)
        console.log(patient.patient_status)
    },[patient.admission_date, patient.patient_status]);

    return (
        <>
        <Navbar />
        <div style={{ display: 'block', margin: 'auto', width: 400, padding: 30 }}>
            <Form onSubmit={handleSubmit}>
                <h1 className="text-center mb-4">
                    {params.id ? "Edit Patient Information" : "Nuevo Paciente"}
                </h1>
                <Form.Group controlId="formAdmissionDate" className="mb-3">
                    <Form.Label>Fecha de ingreso</Form.Label>
                    <Form.Control
                        type="date"
                        name="admission_date"
                        onChange={handleChange}
                        value={patient.admission_date}
                    />
                </Form.Group>
                <Form.Group controlId="formName" className="mb-3">
                    <Form.Label>Nombre completo</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        placeholder="Ingrese el nombre completo"
                        onChange={handleChange}
                        value={patient.name}
                    />
                </Form.Group>
                <Form.Group controlId="formIdNumber" className="mb-3">
                    <Form.Label>Cédula</Form.Label>
                    <Form.Control
                        type="text"
                        name="id_number"
                        placeholder="Ingrese el número de cédula"
                        onChange={handleChange}
                        value={patient.id_number}
                    />
                </Form.Group>
                <Form.Group controlId="formReligion" className="mb-3">
                    <Form.Label>Religión</Form.Label>
                    <Form.Control
                        type="text"
                        name="religion"
                        placeholder="Ingrese religión"
                        onChange={handleChange}
                        value={patient.religion}
                    />
                </Form.Group>
                <Form.Group controlId="formEducationLevel" className="mb-3">
                    <Form.Label>Escolaridad</Form.Label>
                    <Form.Control
                        type="text"
                        name="education_level"
                        placeholder="Ingrese su nivel de escolaridad"
                        onChange={handleChange}
                        value={patient.education_level}
                    />
                </Form.Group>
                <Form.Group controlId="formOccupation" className="mb-3">
                    <Form.Label>Ocupación</Form.Label>
                    <Form.Control
                        type="text"
                        name="occupation"
                        placeholder="Ingrese su ocupación"
                        onChange={handleChange}
                        value={patient.occupation}
                    />
                </Form.Group>
                <Form.Group controlId="formDateOfBirth" className="mb-3">
                    <Form.Label>Fecha de nacimiento</Form.Label>
                    <Form.Control
                        type="date"
                        name="date_of_birth"
                        onChange={handleChange}
                        value={patient.date_of_birth}
                    />
                </Form.Group>
                <Form.Group controlId="formAge" className="mb-3">
                    <Form.Label>Edad</Form.Label>
                    <Form.Control
                        type="number"
                        name="age"
                        placeholder="Ingrese edad"
                        onChange={handleChange}
                        value={patient.age}
                    />
                </Form.Group>
                <Form.Group controlId="formMaritalStatus" className="mb-3">
                    <Form.Label>Estado Civil</Form.Label>
                    <Form.Control
                        as="select"
                        name="marital_status"
                        placeholder="Enter marital status"
                        onChange={handleChange}
                        value={patient.marital_status}
                        >
                        <option value="">Seleccione una opción</option>
                        <option value="Casado/a">Casado/a</option>
                        <option value="Viudo/a">Viudo/a</option>
                        <option value="Soltero/a">Soltero/a</option>
                        <option value="Separado/a">Separado/a</option>
                        <option value="Unión libre">Unión libre</option>
                        <option value="Divorciado/a">Divorciado/a</option>
                      </Form.Control>
                </Form.Group>
                <Form.Group controlId="formChildren" className="mb-3">
                    <Form.Label>Hijos</Form.Label>
                    <Form.Control
                        type="number"
                        name="children"
                        placeholder="Ingrese cantidad de hijos"
                        onChange={handleChange}
                        value={patient.children}
                    />
                </Form.Group>
                <Form.Group controlId="formHomePhone" className="mb-3">
                    <Form.Label>Teléfono casa</Form.Label>
                    <Form.Control
                        type="text"
                        name="home_phone"
                        placeholder="Ingrese teléfono de casa"
                        onChange={handleChange}
                        value={patient.home_phone}
                    />
                </Form.Group>
                <Form.Group controlId="formCellPhone" className="mb-3">
                    <Form.Label>Celular</Form.Label>
                    <Form.Control
                        type="text"
                        name="cell_phone"
                        placeholder="Ingrese número de celular"
                        onChange={handleChange}
                        value={patient.cell_phone}
                    />
                </Form.Group>
                <Form.Group controlId="formEmail" className="mb-3">
                    <Form.Label>Correo electrónico</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        placeholder="Ingrese el correo electrónico"
                        onChange={handleChange}
                        value={patient.email}
                    />
                </Form.Group>
                <Form.Group controlId="formNationality" className="mb-3">
                    <Form.Label>Nacionalidad</Form.Label>
                    <Form.Control
                        type="text"
                        name="nationality"
                        placeholder="Ingrese nacionalidad"
                        onChange={handleChange}
                        value={patient.nationality}
                    />
                </Form.Group>
                <Form.Group controlId="formAddress" className="mb-3">
                    <Form.Label>Domicilio</Form.Label>
                    <Form.Control
                        type="text"
                        name="address"
                        placeholder="Ingrese su dirección de domicilio"
                        onChange={handleChange}
                        value={patient.address}
                    />
                </Form.Group>
                <Form.Group controlId="formPatientStatus" className="mb-3">
                    <Form.Label>Paciente</Form.Label>
                    <Form.Select
                        value={patient.patient_status}
                        onChange={(e) => {
                            setPatient({...patient, patient_status: e.target.value});
                        }}
                    >
                        <option value="">Seleccione una opción</option>
                        <option value="Oncológico">Oncológico</option>
                        <option value="No Oncológico">No Oncológico</option>
                        <option value="Otro">Otro</option>
                </Form.Select>
                {patient.patient_status === "Otro" && (
                    <Form.Control
                        type="text"
                        placeholder="Especifique qué otro"
                        value={customPatientStatus}
                        onChange={handleCustomPatientStatusChange}
                    />
                    )}
                </Form.Group>
                <Form.Group controlId="formClinicalDiagnosis" className="mb-3">
                    <Form.Label>Diagnóstico Clínico</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={4}
                        name="clinical_diagnosis"
                        placeholder="Ingrese diagnóstico clínico"
                        onChange={handleChange}
                        value={patient.clinical_diagnosis}
                    />
                </Form.Group>
                <Form.Group controlId="formReferredBy" className="mb-3">
                    <Form.Label>Referido por</Form.Label>
                    <Form.Control
                        type="text"
                        name="referred_by"
                        placeholder="Nombre de la persona que refiere"
                        onChange={handleChange}
                        value={patient.referred_by}
                    />
                </Form.Group>
                <Form.Group controlId="formClinicalHistory" className="mb-3">
                    <Form.Label>Historia Clínica</Form.Label>
                    <Form.Control
                        as="select"
                        name="clinical_history"
                        onChange={handleChange}
                        value={patient.clinical_history}
                        >
                        <option value="">Seleccione una opción</option>
                        <option value="Visita domiciliar">Visita domiciliar</option>
                        <option value="Consulta externa">Consulta externa</option>
                      </Form.Control>
                </Form.Group>
                <Form.Group controlId="formMedications" className="mb-3">
                    <Form.Label>Medicamentos</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={4}
                        name="medications"
                        placeholder="Ingrese medicamentos"
                        onChange={handleChange}
                        value={patient.medications}
                    />
                </Form.Group>
                <Form.Group controlId="formSocialSupportNetwork" className="mb-3">
                    <Form.Label>Red de apoyo social</Form.Label>
                    <Form.Control
                        type="text"
                        name="social_support_network"
                        placeholder="Ingrese red de apoyo social"
                        onChange={handleChange}
                        value={patient.social_support_network}
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

export default PatientForm;