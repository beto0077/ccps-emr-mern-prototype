import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useSocialWorkInfo2Context } from "../../context/SocialWorkInfo2Context";

function SocialWorkInfo2Form() {
    const { createSocialWorkInfo2, getSocialWorkInfo2, updateSocialWorkInfo2 } = useSocialWorkInfo2Context();
    const [socialWorkInfo, setSocialWorkInfo] = useState({
        patient_id: "",
        total_income: "",
        total_expenses: "",
        per_capita_income: "",
        per_capita_expenses: "",
        poverty_line: "",
        monthly_incomes: [],
        monthly_expenses: []
    });

    // ... (similar useEffect, handleChange, and handleSubmit logic from SocialWorkInfo3Form.js)

    return (
        <div style={{ display: 'block', margin: 'auto', width: 400, padding: 30 }}>
            <Form onSubmit={handleSubmit}>
                <h1 className="text-center mb-4">
                    {params.id ? "Edit Social Work Info 2" : "New Social Work Info 2"}
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
                {/* Monthly Income Fields */}
                <Form.Group controlId="formMonthlyIncomeConcept">
                    <Form.Label>Monthly Income - Concept</Form.Label>
                    <Form.Control
                        type="text"
                        name="monthly_income_concept"
                        placeholder="Enter concept"
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="formMonthlyIncomeAmount">
                    <Form.Label>Monthly Income - Amount</Form.Label>
                    <Form.Control
                        type="number"
                        step="0.01"
                        name="monthly_income_amount"
                        placeholder="Enter amount"
                        onChange={handleChange}
                    />
                </Form.Group>
                {/* Monthly Expenses Fields */}
                <Form.Group controlId="formMonthlyExpensesConcept">
                    <Form.Label>Monthly Expenses - Concept</Form.Label>
                    <Form.Control
                        type="text"
                        name="monthly_expenses_concept"
                        placeholder="Enter concept"
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="formMonthlyExpensesAmount">
                    <Form.Label>Monthly Expenses - Amount</Form.Label>
                    <Form.Control
                        type="number"
                        step="0.01"
                        name="monthly_expenses_amount"
                        placeholder="Enter amount"
                        onChange={handleChange}
                    />
                </Form.Group>
                {/* Totals, Per Capita, and Poverty Line Fields */}
                <Form.Group controlId="formTotalIncome">
                    <Form.Label>Total Income</Form.Label>
                    <Form.Control
                        type="number"
                        step="0.01"
                        name="total_income"
                        placeholder="Enter total income"
                        onChange={handleChange}
                        value={socialWorkInfo.total_income}
                    />
                </Form.Group>
                <Form.Group controlId="formTotalExpenses">
                    <Form.Label>Total Expenses</Form.Label>
                    <Form.Control
                        type="number"
                        step="0.01"
                        name="total_expenses"
                        placeholder="Enter total expenses"
                        onChange={handleChange}
                        value={socialWorkInfo.total_expenses}
                    />
                </Form.Group>
                <Form.Group controlId="formPerCapitaIncome">
                    <Form.Label>Per Capita Income</Form.Label>
                    <Form.Control
                        type="number"
                        step="0.01"
                        name="per_capita_income"
                        placeholder="Enter per capita income"
                        onChange={handleChange}
                        value={socialWorkInfo.per_capita_income}
                    />
                </Form.Group>
                <Form.Group controlId="formPerCapitaExpenses">
                    <Form.Label>Per Capita Expenses</Form.Label>
                    <Form.Control
                        type="number"
                        step="0.01"
                        name="per_capita_expenses"
                        placeholder="Enter per capita expenses"
                        onChange={handleChange}
                        value={socialWorkInfo.per_capita_expenses}
                    />
                </Form.Group>
                <Form.Group controlId="formPovertyLine">
                    <Form.Label>Poverty Line</Form.Label>
                    <Form.Control
                        type="number"
                        step="0.01"
                        name="poverty_line"
                        placeholder="Enter poverty line"
                        onChange={handleChange}
                        value={socialWorkInfo.poverty_line}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Save
                </Button>
            </Form>
        </div>
    );
}

export default SocialWorkInfo2Form;