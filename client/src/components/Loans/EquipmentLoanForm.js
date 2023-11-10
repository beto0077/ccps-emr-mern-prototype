import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
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

  useEffect(() => {
    const loadEquipmentLoan = async () => {
      if (params.id) {
        const loadedLoan = await getLoan(params.id);
        setLoan({
          patient_id: loadedLoan.patient_id,
          delivery_date: loadedLoan.delivery_date,
          return_date: loadedLoan.return_date,
          description: loadedLoan.description,
          plate: loadedLoan.plate,
          quantity: loadedLoan.quantity,
          beneficiary: loadedLoan.beneficiary,
          reference_issued_by_doctor: loadedLoan.reference_issued_by_doctor,
          person_receiving_equipment: loadedLoan.person_receiving_equipment,
          id_number: loadedLoan.id_number,
          exact_address: loadedLoan.exact_address,
          phone_number: loadedLoan.phone_number,
          contract_number: loadedLoan.contract_number,
          justification: loadedLoan.justification,
          person_returning_equipment: loadedLoan.person_returning_equipment,
          prepared_by: loadedLoan.prepared_by,
          preparation_date: loadedLoan.preparation_date,
          loan_completed: loadedLoan.loan_completed
        });
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
    <div style={{ display: 'block', margin: 'auto', width: 400, padding: 30 }}>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="patientId">
          <Form.Label>Patient ID</Form.Label>
          <Form.Control type="number" name="patient_id" value={loan.patient_id} onChange={handleChange} required />
        </Form.Group>
        <Form.Group controlId="deliveryDate">
          <Form.Label>Delivery Date</Form.Label>
          <Form.Control type="date" name="delivery_date" value={loan.delivery_date} onChange={handleChange} required />
        </Form.Group>
        <Form.Group controlId="returnDate">
          <Form.Label>Return Date</Form.Label>
          <Form.Control type="date" name="return_date" value={loan.return_date} onChange={handleChange} required />
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control type="text" name="description" value={loan.description} onChange={handleChange} required />
        </Form.Group>
        <Form.Group controlId="plate">
          <Form.Label>Plate</Form.Label>
          <Form.Control type="text" name="plate" value={loan.plate} onChange={handleChange} required />
        </Form.Group>
        <Form.Group controlId="quantity">
          <Form.Label>Quantity</Form.Label>
          <Form.Control type="number" name="quantity" value={loan.quantity} onChange={handleChange} required />
        </Form.Group>
        <Form.Group controlId="beneficiary">
          <Form.Label>Beneficiary</Form.Label>
          <Form.Control type="text" name="beneficiary" value={loan.beneficiary} onChange={handleChange} required />
        </Form.Group>
        <Form.Group controlId="referenceIssuedByDoctor">
          <Form.Label>Reference Issued By Doctor</Form.Label>
          <Form.Control type="text" name="reference_issued_by_doctor" value={loan.reference_issued_by_doctor} onChange={handleChange} required />
        </Form.Group>
        <Form.Group controlId="personReceivingEquipment">
          <Form.Label>Person Receiving Equipment</Form.Label>
          <Form.Control type="text" name="person_receiving_equipment" value={loan.person_receiving_equipment} onChange={handleChange} required />
        </Form.Group>
        <Form.Group controlId="idNumber">
          <Form.Label>ID Number</Form.Label>
          <Form.Control type="text" name="id_number" value={loan.id_number} onChange={handleChange} required />
        </Form.Group>
        <Form.Group controlId="exactAddress">
          <Form.Label>Exact Address</Form.Label>
          <Form.Control type="text" name="exact_address" value={loan.exact_address} onChange={handleChange} required />
        </Form.Group>
        <Form.Group controlId="phoneNumber">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control type="text" name="phone_number" value={loan.phone_number} onChange={handleChange} required />
        </Form.Group>
        <Form.Group controlId="contractNumber">
          <Form.Label>Contract Number</Form.Label>
          <Form.Control type="text" name="contract_number" value={loan.contract_number} onChange={handleChange} required />
        </Form.Group>
        <Form.Group controlId="justification">
          <Form.Label>Justification</Form.Label>
          <Form.Control as="textarea" rows={3} name="justification" value={loan.justification} onChange={handleChange} required />
        </Form.Group>
        <Form.Group controlId="personReturningEquipment">
          <Form.Label>Person Returning Equipment</Form.Label>
          <Form.Control type="text" name="person_returning_equipment" value={loan.person_returning_equipment} onChange={handleChange} required />
        </Form.Group>
        <Form.Group controlId="preparedBy">
          <Form.Label>Prepared By</Form.Label>
          <Form.Control type="text" name="prepared_by" value={loan.prepared_by} onChange={handleChange} required />
        </Form.Group>
        <Form.Group controlId="preparationDate">
          <Form.Label>Preparation Date</Form.Label>
          <Form.Control type="date" name="preparation_date" value={loan.preparation_date} onChange={handleChange} required />
        </Form.Group>
        <Form.Group controlId="loanCompleted">
          <Form.Label>Loan Completed</Form.Label>
          <Form.Check type="checkbox" name="loan_completed" checked={loan.loan_completed} onChange={(e) => setLoan({ ...loan, loan_completed: e.target.checked })} />
        </Form.Group>
        <Button style={{ marginTop: '30px' }} variant="primary" type="submit">
          Save
        </Button>
      </Form>
    </div>
  );
}

export default EquipmentLoanForm;