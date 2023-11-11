import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Navbar from "../NavigationBar";
import { useControlNoteContext } from "../../context/ControlNoteContext";
import { usePatientContext } from "../../context/PatientContext";

function ControlNoteForm() {
  const location = useLocation();
  const { createControlNote, getControlNote, updateControlNote } = useControlNoteContext();
  const { getPatient } = usePatientContext();
  const [controlNote, setControlNote] = useState({
    physical_therapy_id: location.state?.id || "",
    date: "",
    patient_name: "",
    control_notes: "",
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
    const loadControlNote = async () => {
      if (params.id) {
        const loadedControlNote = await getControlNote(params.id);
        setControlNote({
          date: formatDate(loadedControlNote.date),
          patient_name: loadedControlNote.patient_name,
          control_notes: loadedControlNote.control_notes,
        });
      } else {
        const patientName = await getPatient(location.state?.patientId);
        const todayFormatted = formatDate(new Date());
        setControlNote(prevControlNote => ({
          ...prevControlNote,
          date: todayFormatted,
          patient_name: patientName.name,
        }));
      }
    };
    loadControlNote();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setControlNote((prevControlNote) => ({
      ...prevControlNote,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (params.id) {
      await updateControlNote(params.id, controlNote);
    } else {
      await createControlNote(controlNote);
    }
    navigate(`/controlNoteList/${location.state.patientId}`);
    setControlNote({
      physical_therapy_id: "",
      date: "",
      patient_name: "",
      control_notes: "",
    });
  };

  return (
    <>
    <Navbar />
    <div style={{display: 'block', margin: 'auto', width: 400, padding: 30}}>
      <Form onSubmit={handleSubmit}>
        <h1 className="text-center mb-4">
          {params.id ? "Edit Control Note" : "Nueva nota de control"}
        </h1>
        <Form.Group controlId="formDate" className="mb-3">
          <Form.Label>Fecha</Form.Label>
          <Form.Control
            type="date"
            name="date"
            placeholder="Enter date"
            onChange={handleChange}
            value={controlNote.date}
          />
        </Form.Group>

        <Form.Group controlId="formPatientName" className="mb-3">
          <Form.Label>Nombre del paciente</Form.Label>
          <Form.Control
            type="text"
            name="patient_name"
            placeholder="Ingrese el nombre del paciente"
            onChange={handleChange}
            value={controlNote.patient_name}
          />
        </Form.Group>

        <Form.Group controlId="formControlNotes" className="mb-3">
          <Form.Label>Nota</Form.Label>
          <Form.Control
            as="textarea" rows={7}
            name="control_notes"
            placeholder="Escriba su nota aquí"
            onChange={handleChange}
            value={controlNote.control_notes}
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

export default ControlNoteForm;