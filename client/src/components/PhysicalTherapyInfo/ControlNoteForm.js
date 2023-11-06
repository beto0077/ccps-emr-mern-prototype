import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useControlNoteContext } from "../../context/ControlNoteContext";

function ControlNoteForm() {
  const { createControlNote, getControlNote, updateControlNote } = useControlNoteContext();
  const [controlNote, setControlNote] = useState({
    date: "",
    patient_name: "",
    control_notes: "",
  });

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const loadControlNote = async () => {
      if (params.id) {
        const loadedControlNote = await getControlNote(params.id);
        setControlNote({
          date: loadedControlNote.date,
          patient_name: loadedControlNote.patient_name,
          control_notes: loadedControlNote.control_notes,
        });
      }
    };
    loadControlNote();
  }, [params.id]);

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
    navigate("/controlNotes");
    setControlNote({
      date: "",
      patient_name: "",
      control_notes: "",
    });
  };

  return (
    <div style={{display: 'block', margin: 'auto', width: 400, padding: 30}}>
      <Form onSubmit={handleSubmit}>
        <h1 className="text-center mb-4">
          {params.id ? "Edit Control Note" : "New Control Note"}
        </h1>
        <Form.Group controlId="formDate">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            name="date"
            placeholder="Enter date"
            onChange={handleChange}
            value={controlNote.date}
          />
        </Form.Group>

        <Form.Group controlId="formPatientName">
          <Form.Label>Patient Name</Form.Label>
          <Form.Control
            type="text"
            name="patient_name"
            placeholder="Enter patient's name"
            onChange={handleChange}
            value={controlNote.patient_name}
          />
        </Form.Group>

        <Form.Group controlId="formControlNotes">
          <Form.Label>Control Notes</Form.Label>
          <Form.Control
            type="text"
            name="control_notes"
            placeholder="Enter control notes"
            onChange={handleChange}
            value={controlNote.control_notes}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Save
        </Button>
      </Form>
    </div>
  );
}

export default ControlNoteForm;