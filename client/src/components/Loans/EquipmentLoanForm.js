import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Navbar from '../NavigationBar';
import { useEquipmentLoanContext } from "../../context/EquipmentLoanContext";

function EquipmentLoanForm() {
  const location = useLocation();
  const { createLoan, getLoan, updateLoan } = useEquipmentLoanContext();
  const [loan, setLoan] = useState({
    patient_id: location.state?.id || "",
    delivery_date: "",
    return_date: "",
    description: "",
    plate: "",
    quantity: 0,
    beneficiary: "",
    reference_issued_by_doctor: "",
    person_receiving_equipment: "",
    id_number: "",
    exact_address: "",
    phone_number: "",
    contract_number: "",
    justification: "",
    person_returning_equipment: "",
    prepared_by: "",
    preparation_date: "",
    loan_completed: false
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
    const loadEquipmentLoan = async () => {
      if (params.id) {
        // Existing loan, fetch and populate data
        const loadedLoan = await getLoan(params.id);
  
        // If the loan is completed but doesn't have a return_date, set it to today's date
        if (loadedLoan.loan_completed && !loadedLoan.return_date) {
          loadedLoan.return_date = formatDate(new Date()); // Use formatDate to get the date in YYYY-MM-DD format
        }
  
        setLoan({
          ...loadedLoan,
          // Ensure all dates are formatted correctly
          delivery_date: formatDate(loadedLoan.delivery_date),
          preparation_date: loadedLoan.preparation_date ? formatDate(loadedLoan.preparation_date) : '',
        // Add other date fields here if necessary
        });
      } else {
        // New loan, set delivery_date to today's date by default
        const todayFormatted = formatDate(new Date());
        setLoan(prevLoan => ({
          ...prevLoan,
          delivery_date: todayFormatted,
          preparation_date: todayFormatted,
        }));
      }
    };
  
    loadEquipmentLoan();
  }, [params.id]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoan((prevLoan) => ({
      ...prevLoan,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (params.id) {
      await updateLoan(params.id, loan);
    } else {
      await createLoan(loan);
    }
    navigate(`/equipmentLoan/${params.id}`);
    setLoan({
      patient_id: "",
      delivery_date: "",
      return_date: "",
      description: "",
      plate: "",
      quantity: 0,
      beneficiary: "",
      reference_issued_by_doctor: "",
      person_receiving_equipment: "",
      id_number: "",
      exact_address: "",
      phone_number: "",
      contract_number: "",
      justification: "",
      person_returning_equipment: "",
      prepared_by: "",
      preparation_date: "",
      loan_completed: false
    });
  };

  return (
    <>
    <Navbar />
    <div style={{ display: 'block', margin: 'auto', width: 400, padding: 30 }}>
    <h1>Prestamo de equipo</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="patientId" className="mb-3">
          <Form.Label>Patient ID</Form.Label>
          <Form.Control disabled={!params.id} type="number" name="patient_id" value={loan.patient_id} onChange={handleChange} required />
        </Form.Group>
        <Form.Group controlId="deliveryDate" className="mb-3">
          <Form.Label>Fecha Entrega</Form.Label>
          <Form.Control type="date" name="delivery_date" value={loan.delivery_date} onChange={handleChange} required />
        </Form.Group>
        <Form.Group controlId="returnDate" className="mb-3">
          <Form.Label>Fecha Devolución</Form.Label>
          <Form.Control disabled={!params.id} type="date" name="return_date" value={loan.return_date} onChange={handleChange} required />
        </Form.Group>
        <Form.Group controlId="description" className="mb-3">
          <Form.Label>Descripción</Form.Label>
          <Form.Control type="text" name="description" value={loan.description} onChange={handleChange} required />
        </Form.Group>
        <Form.Group controlId="plate" className="mb-3">
          <Form.Label>Placa</Form.Label>
          <Form.Control type="text" name="plate" value={loan.plate} onChange={handleChange} required />
        </Form.Group>
        <Form.Group controlId="quantity" className="mb-3">
          <Form.Label>Cantidad</Form.Label>
          <Form.Control type="number" name="quantity" value={loan.quantity} onChange={handleChange} required />
        </Form.Group>
        <Form.Group controlId="beneficiary" className="mb-3">
          <Form.Label>Beneficiario</Form.Label>
          <Form.Control type="text" name="beneficiary" value={loan.beneficiary} onChange={handleChange} required />
        </Form.Group>
        <Form.Group controlId="referenceIssuedByDoctor" className="mb-3">
          <Form.Label>Referencia emitida por el médico</Form.Label>
          <Form.Control type="text" name="reference_issued_by_doctor" value={loan.reference_issued_by_doctor} onChange={handleChange} required />
        </Form.Group>
        <Form.Group controlId="personReceivingEquipment" className="mb-3">
          <Form.Label>Persona que recibe el equipo</Form.Label>
          <Form.Control type="text" name="person_receiving_equipment" value={loan.person_receiving_equipment} onChange={handleChange} required />
        </Form.Group>
        <Form.Group controlId="idNumber" className="mb-3">
          <Form.Label>Cédula de persona que recibe el equipo</Form.Label>
          <Form.Control type="text" name="id_number" value={loan.id_number} onChange={handleChange} required />
        </Form.Group>
        <Form.Group controlId="exactAddress" className="mb-3">
          <Form.Label>Dirección exacta</Form.Label>
          <Form.Control type="text" name="exact_address" value={loan.exact_address} onChange={handleChange} required />
        </Form.Group>
        <Form.Group controlId="phoneNumber" className="mb-3">
          <Form.Label>Número de teléfono</Form.Label>
          <Form.Control type="text" name="phone_number" value={loan.phone_number} onChange={handleChange} required />
        </Form.Group>
        <Form.Group controlId="contractNumber" className="mb-3">
          <Form.Label>Número de contrato</Form.Label>
          <Form.Control type="text" name="contract_number" value={loan.contract_number} onChange={handleChange} required />
        </Form.Group>
        <Form.Group controlId="justification" className="mb-3">
          <Form.Label>Justificación</Form.Label>
          <Form.Control as="textarea" rows={3} name="justification" value={loan.justification} onChange={handleChange} required />
        </Form.Group>
        <Form.Group controlId="personReturningEquipment" className="mb-3">
          <Form.Label>Persona que devuelve el equipo</Form.Label>
          <Form.Control disabled={!params.id} type="text" name="person_returning_equipment" value={loan.person_returning_equipment} onChange={handleChange} required />
        </Form.Group>
        <Form.Group controlId="preparedBy" className="mb-3">
          <Form.Label>Creado por</Form.Label>
          <Form.Control type="text" name="prepared_by" value={loan.prepared_by} onChange={handleChange} required />
        </Form.Group>
        <Form.Group controlId="preparationDate" className="mb-3">
          <Form.Label>Fecha de creación</Form.Label>
          <Form.Control type="date" name="preparation_date" value={loan.preparation_date} onChange={handleChange} required />
        </Form.Group>
        {params.id ? (
  <Form.Group controlId="loanCompleted">
    <Button
      style={{ marginTop: '30px' }}
      variant={loan.loan_completed ? "secondary" : "success"}
      type="button"
      disabled={loan.loan_completed} // Disable if the loan is already completed
      onClick={() => setLoan({ ...loan, loan_completed: true })}
    >
      {loan.loan_completed ? "Loan Completed" : "Mark as Completed"}
    </Button>
  </Form.Group>
) : null}
        <div className="d-flex justify-content-between">
    <Button style={{ marginTop: '30px' }} variant="primary" type="submit">
      Save
    </Button>
    <Button
      style={{ marginTop: '30px' }}
      variant="outline-secondary"
      type="button"
      onClick={() => navigate(-1)}
    >
      Cancel
    </Button>
  </div>
      </Form>
    </div>
    </>
  );
}

export default EquipmentLoanForm;