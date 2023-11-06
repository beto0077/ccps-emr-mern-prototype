import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useSocialWorkInfo2Context } from "../../context/SocialWorkInfo2Context";

function SocialWorkInfo2Form() {
  const { createSocialWorkInfo2, getSocialWorkInfo2, updateSocialWorkInfo2 } =
    useSocialWorkInfo2Context();
  const [socialWorkInfo, setSocialWorkInfo] = useState({
    patient_id: "",
    total_income: "",
    total_expenses: "",
    per_capita_income: "",
    per_capita_expenses: "",
    poverty_line: "",
    monthly_incomes: [],
    monthly_expenses: [],
  });
  const params = useParams();
  const navigate = useNavigate();

  // Function to add a new monthly income entry
  const addMonthlyIncome = () => {
    setSocialWorkInfo((prevInfo) => ({
      ...prevInfo,
      monthly_incomes: [
        ...prevInfo.monthly_incomes,
        { concept: "", amount: "" },
      ],
    }));
  };

  // Function to add a new monthly expense entry
  const addMonthlyExpense = () => {
    setSocialWorkInfo((prevInfo) => ({
      ...prevInfo,
      monthly_expenses: [
        ...prevInfo.monthly_expenses,
        { concept: "", amount: "" },
      ],
    }));
  };

  // Function to handle changes in monthly income fields
  const handleMonthlyIncomeChange = (index, e) => {
    const { name, value } = e.target;
    const updatedMonthlyIncomes = [...socialWorkInfo.monthly_incomes];
    updatedMonthlyIncomes[index][name] = value;
    setSocialWorkInfo((prevInfo) => ({
      ...prevInfo,
      monthly_incomes: updatedMonthlyIncomes,
    }));
  };

  // Function to handle changes in monthly expense fields
  const handleMonthlyExpenseChange = (index, e) => {
    const { name, value } = e.target;
    const updatedMonthlyExpenses = [...socialWorkInfo.monthly_expenses];
    updatedMonthlyExpenses[index][name] = value;
    setSocialWorkInfo((prevInfo) => ({
      ...prevInfo,
      monthly_expenses: updatedMonthlyExpenses,
    }));
  };

  // Function to calculate and update total income, total expenses, per capita income, and per capita expenses
  const calculateTotals = () => {
    const totalIncome = socialWorkInfo.monthly_incomes.reduce(
      (sum, income) => sum + parseFloat(income.amount || 0),
      0
    );
    const totalExpenses = socialWorkInfo.monthly_expenses.reduce(
      (sum, expense) => sum + parseFloat(expense.amount || 0),
      0
    );
    const perCapitaIncome = totalIncome; // Adjust as needed
    const perCapitaExpenses = totalExpenses; // Adjust as needed

    setSocialWorkInfo((prevInfo) => ({
      ...prevInfo,
      total_income: totalIncome.toFixed(2),
      total_expenses: totalExpenses.toFixed(2),
      per_capita_income: perCapitaIncome.toFixed(2),
      per_capita_expenses: perCapitaExpenses.toFixed(2),
    }));
  };

  // useEffect to fetch data and calculate totals
  useEffect(() => {
    // Fetch data logic
    const fetchData = async () => {
      try {
        const response = await getSocialWorkInfo2(params.id);
        if (response.data) {
          setSocialWorkInfo({
            ...response.data,
            monthly_incomes: response.data.monthlyIncome,
            monthly_expenses: response.data.monthlyExpenses,
          });
          // Calculate totals after fetching data
          calculateTotals();
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, []);
  

  // Handle changes in form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSocialWorkInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Determine if it's a new entry or an update based on the presence of an ID
      if (socialWorkInfo.id) {
        // Update existing data
        const response = await updateSocialWorkInfo2(socialWorkInfo.id, socialWorkInfo);
        if (response.status === 200) {
          console.log("Data updated successfully");
          //NAVIGATE TO VIEW PAGE
          // Optionally: Redirect, show a success message, etc.
        }
      } else {
        // Save new data
        const response = await createSocialWorkInfo2(socialWorkInfo);
        if (response.status === 201) {
          console.log("Data saved successfully");
          //NAVIGATE TO VIEW PAGE
          // Optionally: Redirect, show a success message, etc.
        }
      }
    } catch (error) {
      console.error("Error saving or updating data:", error);
      // Optionally: Show an error message, etc.
    }
  };  

  return (
    <div style={{ display: "block", margin: "auto", width: 400, padding: 30 }}>
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
        {socialWorkInfo.monthly_incomes.map((income, index) => (
          <div key={index}>
            <Form.Group controlId={`formMonthlyIncomeConcept${index}`}>
              <Form.Label>Monthly Income - Concept</Form.Label>
              <Form.Control
                type="text"
                name="concept"
                placeholder="Enter concept"
                value={income.concept}
                onChange={(e) => handleMonthlyIncomeChange(index, e)}
              />
            </Form.Group>
            <Form.Group controlId={`formMonthlyIncomeAmount${index}`}>
              <Form.Label>Monthly Income - Amount</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                name="amount"
                placeholder="Enter amount"
                value={income.amount}
                onChange={(e) => handleMonthlyIncomeChange(index, e)}
              />
            </Form.Group>
          </div>
        ))}
        <Button variant="secondary" onClick={addMonthlyIncome}>
          Add Monthly Income
        </Button>

        {/* Monthly Expenses Fields */}
        {socialWorkInfo.monthly_expenses.map((expense, index) => (
          <div key={index}>
            <Form.Group controlId={`formMonthlyExpensesConcept${index}`}>
              <Form.Label>Monthly Expenses - Concept</Form.Label>
              <Form.Control
                type="text"
                name="concept"
                placeholder="Enter concept"
                value={expense.concept}
                onChange={(e) => handleMonthlyExpenseChange(index, e)}
              />
            </Form.Group>
            <Form.Group controlId={`formMonthlyExpensesAmount${index}`}>
              <Form.Label>Monthly Expenses - Amount</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                name="amount"
                placeholder="Enter amount"
                value={expense.amount}
                onChange={(e) => handleMonthlyExpenseChange(index, e)}
              />
            </Form.Group>
          </div>
        ))}
        <Button variant="secondary" onClick={addMonthlyExpense}>
          Add Monthly Expense
        </Button>
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
