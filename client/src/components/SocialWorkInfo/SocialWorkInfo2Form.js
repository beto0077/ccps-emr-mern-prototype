import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Navbar from "../NavigationBar";
import { useSocialWorkInfo2Context } from "../../context/SocialWorkInfo2Context";

function SocialWorkInfo2Form() {
  const location = useLocation();
  const { createSocialWorkInfo2, getSocialWorkInfo2, updateSocialWorkInfo2 } =
    useSocialWorkInfo2Context();
  const [socialWorkInfo, setSocialWorkInfo] = useState({
    patient_id: location.state?.id || "",
    total_income: "",
    total_expenses: "",
    per_capita_income: "",
    per_capita_expenses: "",
    poverty_line: "",
    monthly_incomes: [],
    monthly_expenses: [],
  });
  const [numberOfFamilyMembers, setNumberOfFamilyMembers] = useState(1);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    calculateTotals();
  }, [
    socialWorkInfo.monthly_incomes,
    socialWorkInfo.monthly_expenses,
    numberOfFamilyMembers,
  ]);
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
    const perCapitaIncome = totalIncome / numberOfFamilyMembers; // Adjust as needed
    const perCapitaExpenses = totalExpenses / numberOfFamilyMembers; // Adjust as needed

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
      if (params.id) {
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
        await createSocialWorkInfo2(socialWorkInfo);
        /*const response = await createSocialWorkInfo2(socialWorkInfo);
        if (response.status === 201) {
          console.log("Data saved successfully");
          //NAVIGATE TO VIEW PAGE
          // Optionally: Redirect, show a success message, etc.
        }*/
      }
      navigate(`/socialWorkDashboard/${socialWorkInfo.patient_id}`);
    } catch (error) {
      console.error("Error saving or updating data:", error);
      // Optionally: Show an error message, etc.
    }
  };

  return (
    <>
      <Navbar />
      <div
        style={{ display: "block", margin: "auto", width: "auto", padding: 30 }}
      >
        <Form onSubmit={handleSubmit}>
          <h1 className="text-center mb-4">
            {params.id
              ? "Edit Social Work Info 2"
              : "Nuevo resumen de situación socio-económica"}
          </h1>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th colSpan={3}>Ingresos mensuales</th>
                <th colSpan={3}>Egresos mensuales</th>
              </tr>
              <tr>
                <th>Concepto</th>
                <th>Monto</th>
                <th>Remover</th>
                <th>Concepto</th>
                <th>Monto</th>
                <th>Remover</th>
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
                      Remover
                    </Button>
                  </td>

                  {index < socialWorkInfo.monthly_expenses.length ? (
                    <>
                      <td>
                        <Form.Select
                          name="concept"
                          value={
                            socialWorkInfo.monthly_expenses[index]?.concept
                          }
                          onChange={(e) => handleMonthlyExpenseChange(index, e)}
                        >
                          <option value="">Selecione concepto</option>
                          <option value="Préstamos/tarjetas de crédito">
                            Préstamos/tarjetas de crédito
                          </option>
                          <option value="Alquiler">Alquiler</option>
                          <option value="Electricidad">Electricidad</option>
                          <option value="Teléfono fijo/celular">
                            Teléfono fijo/celular
                          </option>
                          <option value="Alimentación">Alimentación</option>
                          <option value="Agua">Agua</option>
                          <option value="Basura">Basura</option>
                          <option value="Transporte">Transporte</option>
                          <option value="Estudio">Estudio</option>
                          <option value="Internet/Cable">Internet/Cable</option>
                          <option value="Medicamentos">Medicamentos</option>
                          <option value="Otros">Otros</option>
                        </Form.Select>
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
                          Remover
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
                        <Form.Select
                          name="concept"
                          value={expense.concept}
                          onChange={(e) =>
                            handleMonthlyExpenseChange(
                              index + socialWorkInfo.monthly_incomes.length,
                              e
                            )
                          }
                        >
                          <option value="">Selecione concepto</option>
                          <option value="Préstamos/tarjetas de crédito">
                            Préstamos/tarjetas de crédito
                          </option>
                          <option value="Alquiler">Alquiler</option>
                          <option value="Electricidad">Electricidad</option>
                          <option value="Teléfono fijo/celular">
                            Teléfono fijo/celular
                          </option>
                          <option value="Alimentación">Alimentación</option>
                          <option value="Agua">Agua</option>
                          <option value="Basura">Basura</option>
                          <option value="Transporte">Transporte</option>
                          <option value="Estudio">Estudio</option>
                          <option value="Internet/Cable">Internet/Cable</option>
                          <option value="Medicamentos">Medicamentos</option>
                          <option value="Otros">Otros</option>
                        </Form.Select>
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
                          Remover
                        </Button>
                      </td>
                    </tr>
                  ))}
              <tr>
                <td colSpan={6}>
                  <Button variant="secondary" onClick={addMonthlyIncome}>
                    Agregar Ingreso
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={addMonthlyExpense}
                    style={{ marginLeft: "100px" }}
                    hidden={!socialWorkInfo.monthly_incomes.length}
                  >
                    Agregar Egreso
                  </Button>
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={2}>Total ingresos</td>
                <td>{socialWorkInfo.total_income}</td>
                <td colSpan={2}>Total egresos</td>
                <td>{socialWorkInfo.total_expenses}</td>
              </tr>
              <tr>
                <td colSpan={2}>Ingreso percapita</td>
                <td>{socialWorkInfo.per_capita_income}</td>
                <td colSpan={2}>Egreso percapita</td>
                <td>{socialWorkInfo.per_capita_expenses}</td>
              </tr>
            </tfoot>
          </Table>
          <Form.Group controlId="formFamilyMembers" className="mb-3">
            <Form.Label>
              *Ingrese el número de intregrantes en la familia para calcular
              correctamente los ingresos y egresos per-capita
            </Form.Label>
            <Form.Control
              type="number"
              min="1"
              name="family_members"
              placeholder="Ingrese el número de intregrantes en la familia"
              onChange={(e) =>
                setNumberOfFamilyMembers(parseInt(e.target.value))
              }
              value={numberOfFamilyMembers}
              required
            />
          </Form.Group>
          <Form.Group controlId="formPovertyLine">
            <Form.Label>Linea de pobreza en Costa Rica</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              name="poverty_line"
              placeholder="Ingrese linea de pobreza en Costa Rica"
              onChange={handleChange}
              value={socialWorkInfo.poverty_line}
            />
          </Form.Group>

          <div className="d-flex justify-content-center">
            <Button
              style={{ marginTop: "30px", marginRight: "10px" }}
              variant="primary"
              type="submit"
              className="mr-2"
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

export default SocialWorkInfo2Form;
