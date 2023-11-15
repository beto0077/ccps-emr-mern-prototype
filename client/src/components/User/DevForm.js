import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useUserContext } from "../../context/UserContext";

function DevForm() {
  const { createUser } = useUserContext();
  const [user, setUser] = useState({
    email_address: "",
    password: "",
    user_name: "",
    role: "superAdmin",
    specialty: "default",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prompt for the second password
    const secondPassword = prompt("Please enter the second password:");

    // Check if the entered password matches the one in .env
    if (secondPassword === process.env.REACT_APP_SECOND_PASSWORD) {
      // If correct, proceed with user creation
      await createUser(user);
      navigate(`/`);
      setUser({
        email_address: "",
        password: "",
        user_name: "",
        role: "",
      });
    } else {
      // If incorrect, display an error message
      alert("Incorrect password. User creation aborted.");
    }
  };

  return (
    <>
      <div
        style={{ display: "block", margin: "auto", width: 400, padding: 30 }}
      >
        <Form onSubmit={handleSubmit}>
          <h1 className="text-center mb-4">Nuevo superAdmin</h1>

          <Form.Group controlId="formUserName" className="mb-3">
            <Form.Label>Nombre completo</Form.Label>
            <Form.Control
              type="text"
              name="user_name"
              placeholder="Ingrese nombre completo"
              onChange={handleChange}
              value={user.user_name}
            />
          </Form.Group>
          <Form.Group controlId="formEmail" className="mb-3">
            <Form.Label>Correo electrónico</Form.Label>
            <Form.Control
              type="email"
              name="email_address"
              placeholder="Ingrese correo electrónico"
              onChange={handleChange}
              value={user.email_address}
            />
          </Form.Group>

          <Form.Group controlId="formPassword" className="mb-3">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Ingrese contraseña"
              onChange={handleChange}
              value={user.password}
            />
          </Form.Group>

          <Form.Group controlId="formRole" className="mb-3">
            <Form.Label>Rol en el sistema</Form.Label>
            <Form.Control
              disabled
              as="select"
              name="role"
              value={user.role}
              onChange={handleChange}
            >
              <option value="">Seleccione un rol para el perfil</option>
              <option value="superAdmin">Super Admin</option>
            </Form.Control>
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
              onClick={() => navigate("/")}
            >
              Cancelar
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
}

export default DevForm;
