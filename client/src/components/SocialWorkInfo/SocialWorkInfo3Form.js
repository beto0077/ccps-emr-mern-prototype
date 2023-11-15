import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Navbar from "../NavigationBar";
import { useSocialWorkInfo3Context } from "../../context/SocialWorkInfo3Context";
import { usePatientContext } from "../../context/PatientContext";

function SocialWorkInfo3Form() {
  const location = useLocation();
  const { createSocialWorkInfo3, getSocialWorkInfo3, updateSocialWorkInfo3 } =
    useSocialWorkInfo3Context();
  const { getPatient } = usePatientContext();
  const [socialWorkInfo, setSocialWorkInfo] = useState({
    patient_id: location.state?.id || "",
    patient_name: "",
    id: "",
    address: "",
    evolution: "",
    treatment: "",
  });
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const loadSocialWorkInfo = async () => {
      if (params.id) {
        const loadedInfo = await getSocialWorkInfo3(params.id);
        setSocialWorkInfo(loadedInfo);
      } else {
        const patient = await getPatient(socialWorkInfo.patient_id);
        setSocialWorkInfo((prevInfo) => ({
          ...prevInfo,
          patient_name: patient.name,
          id: patient.id_number,
          address: patient.address,
        }));
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
      await updateSocialWorkInfo3(params.id, socialWorkInfo);
    } else {
      await createSocialWorkInfo3(socialWorkInfo);
    }
    navigate(`/socialWorkInfo3List/${socialWorkInfo.patient_id}`);
    setSocialWorkInfo({
      patient_id: "",
      patient_name: "",
      id: "",
      address: "",
      evolution: "",
      treatment: "",
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
              ? "Edit Social Work Info"
              : "Nuevo seguimiento de trabajo social"}
          </h1>
          <Form.Group controlId="formPatientName" className="mb-3">
            <Form.Label>Nombre del paciente</Form.Label>
            <Form.Control
              type="text"
              name="patient_name"
              placeholder="Ingrese el nombre del paciente"
              onChange={handleChange}
              value={socialWorkInfo.patient_name}
            />
          </Form.Group>
          <Form.Group controlId="formID" className="mb-3">
            <Form.Label>Cédula</Form.Label>
            <Form.Control
              type="text"
              name="id"
              placeholder="Ingrese la cédula"
              onChange={handleChange}
              value={socialWorkInfo.id}
            />
          </Form.Group>
          <Form.Group controlId="formAddress" className="mb-3">
            <Form.Label>Dirección</Form.Label>
            <Form.Control
              type="text"
              name="address"
              placeholder="Ingrese la dirección"
              onChange={handleChange}
              value={socialWorkInfo.address}
            />
          </Form.Group>
          <Form.Group controlId="formEvolution" className="mb-3">
            <Form.Label>Evolución</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              name="evolution"
              placeholder="Ingrese la evolución"
              onChange={handleChange}
              value={socialWorkInfo.evolution}
            />
          </Form.Group>
          <Form.Group controlId="formTreatment">
            <Form.Label>Tratamiento</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              name="treatment"
              placeholder="Ingrese el tratamiento"
              onChange={handleChange}
              value={socialWorkInfo.treatment}
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

export default SocialWorkInfo3Form;
