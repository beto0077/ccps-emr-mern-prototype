import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Navbar from "../NavigationBar";
import { useInternalReferenceContext } from "../../context/InternalReferenceContext";
import { usePatientContext } from "../../context/PatientContext";

function InternalReferenceForm() {
  const location = useLocation();
  const {
    createInternalReference,
    getInternalReference,
    updateInternalReference,
  } = useInternalReferenceContext();
  const { getPatient } = usePatientContext();
  const [reference, setReference] = useState({
    patient_id: location.state?.id || "",
    date: "",
    full_name: "",
    id_number: "",
    religion: "",
    education_level: "",
    occupation: "",
    date_of_birth: "",
    age: "",
    marital_status: "",
    children: "",
    phone_number: "",
    nationality: "",
    address: "",
    service_of_care: "",
    referred_to: "",
    clinical_diagnosis: "",
    management_plan: "",
    reason_for_referral: "",
  });

  const params = useParams();
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    if (!dateString) return "";

    const date = new Date(dateString);
    const year = String(date.getFullYear()).padStart(4, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const loadReference = async () => {
      if (params.id) {
        const loadedReference = await getInternalReference(params.id);
        setReference(loadedReference);
      } else {
        const patient = await getPatient(location.state.id);
        const todayFormatted = formatDate(new Date());
        setReference((prevReference) => ({
          ...prevReference,
          date: todayFormatted,
          full_name: patient.name,
          id_number: patient.id_number,
          religion: patient.religion,
          education_level: patient.education_level,
          occupation: patient.occupation,
          date_of_birth: formatDate(patient.date_of_birth),
          age: patient.age,
          marital_status: patient.marital_status,
          children: patient.children,
          phone_number: patient.cell_phone,
          nationality: patient.nationality,
          address: patient.address,
        }));
      }
    };
    loadReference();
  }, []);

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
    navigate(`/internalReferenceDashboard/${location.state.id}`);
    setReference({
      patient_id: "",
      date: "",
      full_name: "",
      id_number: "",
      religion: "",
      education_level: "",
      occupation: "",
      date_of_birth: "",
      age: "",
      marital_status: "",
      children: "",
      phone_number: "",
      nationality: "",
      address: "",
      service_of_care: "",
      referred_to: "",
      clinical_diagnosis: "",
      management_plan: "",
      reason_for_referral: "",
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
            {params.id
              ? "Editar referencia interna"
              : "Nueva referencia interna"}
          </h1>
          <Form.Group controlId="formDate" className="mb-3">
            <Form.Label>Fecha</Form.Label>
            <Form.Control
              type="date"
              name="date"
              onChange={handleChange}
              value={reference.date}
            />
          </Form.Group>
          <Form.Group controlId="formFullName" className="mb-3">
            <Form.Label>Nombre completo</Form.Label>
            <Form.Control
              type="text"
              name="full_name"
              placeholder="Ingrese nombre completo"
              onChange={handleChange}
              value={reference.full_name}
            />
          </Form.Group>
          <Form.Group controlId="formIdNumber" className="mb-3">
            <Form.Label>Cédula</Form.Label>
            <Form.Control
              type="text"
              name="id_number"
              placeholder="Número de cédula"
              onChange={handleChange}
              value={reference.id_number}
            />
          </Form.Group>
          <Form.Group controlId="formReligion" className="mb-3">
            <Form.Label>Religión</Form.Label>
            <Form.Control
              type="text"
              name="religion"
              placeholder="Ingrese religión"
              onChange={handleChange}
              value={reference.religion}
            />
          </Form.Group>
          <Form.Group controlId="formEducationLevel" className="mb-3">
            <Form.Label>Escolaridad</Form.Label>
            <Form.Control
              type="text"
              name="education_level"
              placeholder="Ingrese escolaridad"
              onChange={handleChange}
              value={reference.education_level}
            />
          </Form.Group>
          <Form.Group controlId="formOccupation" className="mb-3">
            <Form.Label>Ocupación</Form.Label>
            <Form.Control
              type="text"
              name="occupation"
              placeholder="Ingrese ocupación"
              onChange={handleChange}
              value={reference.occupation}
            />
          </Form.Group>
          <Form.Group controlId="formDateOfBirth" className="mb-3">
            <Form.Label>Fecha de nacimiento</Form.Label>
            <Form.Control
              type="date"
              name="date_of_birth"
              onChange={handleChange}
              value={reference.date_of_birth}
            />
          </Form.Group>
          <Form.Group controlId="formAge" className="mb-3">
            <Form.Label>Edad</Form.Label>
            <Form.Control
              type="number"
              name="age"
              placeholder="Ingrese edad"
              onChange={handleChange}
              value={reference.age}
            />
          </Form.Group>
          <Form.Group controlId="formMaritalStatus" className="mb-3">
            <Form.Label>Estado Civil</Form.Label>
            <Form.Control
              type="text"
              name="marital_status"
              placeholder="Ingrese estado civil"
              onChange={handleChange}
              value={reference.marital_status}
            />
          </Form.Group>
          <Form.Group controlId="formChildren" className="mb-3">
            <Form.Label>Hijos</Form.Label>
            <Form.Control
              type="number"
              name="children"
              placeholder="Ingrese el número de hijos"
              onChange={handleChange}
              value={reference.children}
            />
          </Form.Group>
          <Form.Group controlId="formPhoneNumber" className="mb-3">
            <Form.Label>Teléfono</Form.Label>
            <Form.Control
              type="text"
              name="phone_number"
              placeholder="Ingrese número de teléfono"
              onChange={handleChange}
              value={reference.phone_number}
            />
          </Form.Group>
          <Form.Group controlId="formNationality" className="mb-3">
            <Form.Label>Nacionalidad</Form.Label>
            <Form.Control
              type="text"
              name="nationality"
              placeholder="Ingrese nacionalidad"
              onChange={handleChange}
              value={reference.nationality}
            />
          </Form.Group>
          <Form.Group controlId="formAddress" className="mb-3">
            <Form.Label>Domicilio</Form.Label>
            <Form.Control
              type="text"
              name="address"
              placeholder="Ingrese dirección de domicilio"
              onChange={handleChange}
              value={reference.address}
            />
          </Form.Group>
          <Form.Group controlId="formServiceOfCare" className="mb-3">
            <Form.Label>Servicio de atención</Form.Label>
            <Form.Control
              type="text"
              name="service_of_care"
              placeholder="Ingrese servicio de atención"
              onChange={handleChange}
              value={reference.service_of_care}
            />
          </Form.Group>
          <Form.Group controlId="formReferredTo" className="mb-3">
            <Form.Label>Referido a</Form.Label>
            <Form.Select
              name="referred_to"
              onChange={handleChange}
              value={reference.referred_to}
            >
              <option value="">Selecione una opción</option>
              <option value="Trabajo Social">Trabajo Social</option>
              <option value="Psicología">Psicología</option>
              <option value="Terapia Física">Terapia Física</option>
            </Form.Select>
          </Form.Group>

          <Form.Group controlId="formClinicalDiagnosis" className="mb-3">
            <Form.Label>Diagnóstico Clínico</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="clinical_diagnosis"
              placeholder="Ingrese diagnóstico clínico"
              onChange={handleChange}
              value={reference.clinical_diagnosis}
            />
          </Form.Group>
          <Form.Group controlId="formManagementPlan" className="mb-3">
            <Form.Label>Plan de manejo</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="management_plan"
              placeholder="Ingrese plan de manejo"
              onChange={handleChange}
              value={reference.management_plan}
            />
          </Form.Group>
          <Form.Group controlId="formReasonForReferral" className="mb-3">
            <Form.Label>Motivo de referencia</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="reason_for_referral"
              placeholder="Ingrese motivo de referencia"
              onChange={handleChange}
              value={reference.reason_for_referral}
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

export default InternalReferenceForm;
