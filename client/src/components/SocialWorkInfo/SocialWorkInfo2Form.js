import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
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

  useEffect(() => {
    calculateTotals();
    console.log(socialWorkInfo.total_income);
    console.log(socialWorkInfo.total_expenses);
    console.log(socialWorkInfo.per_capita_income);
    console.log(socialWorkInfo.per_capita_expenses);
    console.log(socialWorkInfo.poverty_line);
    console.log(socialWorkInfo.monthly_incomes);
    console.log(socialWorkInfo.monthly_expenses);
  }, [socialWorkInfo.monthly_incomes, socialWorkInfo.monthly_expenses]);
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

  const removeMonthlyIncome = (index) => {
    const updatedIncomes = socialWorkInfo.monthly_incomes.filter(
      (_, i) => i !== index
    );
    setSocialWorkInfo((prevInfo) => ({
      ...prevInfo,
      monthly_incomes: updatedIncomes,
    }));
  };

  const removeMonthlyExpense = (index) => {
    const updatedExpenses = socialWorkInfo.monthly_expenses.filter(
      (_, i) => i !== index
    );
    setSocialWorkInfo((prevInfo) => ({
      ...prevInfo,
      monthly_expenses: updatedExpenses,
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
      if (params.id) {
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
        const response = await updateSocialWorkInfo2(
          socialWorkInfo.id,
          socialWorkInfo
        );
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
    <div
      style={{ display: "block", margin: "auto", width: "auto", padding: 30 }}
    >
      <Form onSubmit={handleSubmit}>
        <h1 className="text-center mb-4">
          {params.id ? "Edit Social Work Info 2" : "New Social Work Info 2"}
        </h1>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th colSpan={3}>Monthly Income</th>
              <th colSpan={3}>Monthly Expenses</th>
            </tr>
            <tr>
              <th>Concept</th>
              <th>Amount</th>
              <th>Remove</th>
              <th>Concept</th>
              <th>Amount</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {socialWorkInfo.monthly_incomes.map((income, index) => (
              <tr key={`income-${index}`}>
                <td>
                  <Form.Control
                    type="text"
                    name="concept"
                    value={income.concept}
                    onChange={(e) => handleMonthlyIncomeChange(index, e)}
                  />
                </td>
                <td>
                  <Form.Control
                    type="number"
                    name="amount"
                    value={income.amount}
                    onChange={(e) => handleMonthlyIncomeChange(index, e)}
                  />
                </td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => removeMonthlyIncome(index)}
                  >
                    Remove
                  </Button>
                </td>

                {index < socialWorkInfo.monthly_expenses.length ? (
                  <>
                    <td>
                      <Form.Control
                        type="text"
                        name="concept"
                        value={socialWorkInfo.monthly_expenses[index]?.concept}
                        onChange={(e) => handleMonthlyExpenseChange(index, e)}
                      />
                    </td>
                    <td>
                      <Form.Control
                        type="number"
                        name="amount"
                        value={socialWorkInfo.monthly_expenses[index]?.amount}
                        onChange={(e) => handleMonthlyExpenseChange(index, e)}
                      />
                    </td>
                    <td>
                      <Button
                        variant="danger"
                        onClick={() => removeMonthlyExpense(index)}
                      >
                        Remove
                      </Button>
                    </td>
                  </>
                ) : (
                  <td colSpan={3}></td>
                )}
              </tr>
            ))}
            {socialWorkInfo.monthly_expenses.length >
              socialWorkInfo.monthly_incomes.length &&
              socialWorkInfo.monthly_expenses
                .slice(socialWorkInfo.monthly_incomes.length)
                .map((expense, index) => (
                  <tr key={`expense-extra-${index}`}>
                    <td colSpan={3}></td>
                    <td>
                      <Form.Control
                        type="text"
                        name="concept"
                        value={expense.concept}
                        onChange={(e) =>
                          handleMonthlyExpenseChange(
                            index + socialWorkInfo.monthly_incomes.length,
                            e
                          )
                        }
                      />
                    </td>
                    <td>
                      <Form.Control
                        type="number"
                        name="amount"
                        value={expense.amount}
                        onChange={(e) =>
                          handleMonthlyExpenseChange(
                            index + socialWorkInfo.monthly_incomes.length,
                            e
                          )
                        }
                      />
                    </td>
                    <td>
                      <Button
                        variant="danger"
                        onClick={() =>
                          removeMonthlyExpense(
                            index + socialWorkInfo.monthly_incomes.length
                          )
                        }
                      >
                        Remove
                      </Button>
                    </td>
                  </tr>
                ))}
            <tr>
              <td colSpan={6}>
                <Button variant="secondary" onClick={addMonthlyIncome}>
                  Add Income
                </Button>
                <Button
                  variant="secondary"
                  onClick={addMonthlyExpense}
                  style={{ marginLeft: "10px" }}
                >
                  Add Expense
                </Button>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={2}>Total Income</td>
              <td>{socialWorkInfo.total_income}</td>
              <td colSpan={2}>Total Expenses</td>
              <td>{socialWorkInfo.total_expenses}</td>
            </tr>
            <tr>
              <td colSpan={2}>Per Capita Income</td>
              <td>{socialWorkInfo.per_capita_income}</td>
              <td colSpan={2}>Per Capita Expenses</td>
              <td>{socialWorkInfo.per_capita_expenses}</td>
            </tr>
          </tfoot>
        </Table>

        <Form.Group controlId="formPovertyLine">
          <Form.Label>Poverty Line in Costa Rica</Form.Label>
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
