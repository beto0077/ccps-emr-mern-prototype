import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Navbar from "../NavigationBar";
import { useUserContext } from "../../context/UserContext";

function UserForm() {
  const { createUser, getUser, updateUser } = useUserContext();
  const [user, setUser] = useState({
    email_address: "",
    password: "",
    user_name: "",
    role: "",
    specialty: "default",
  });
  const [activeUser, setActiveUser] = useState({
    user_name: "",
    role: "",
    specialty: "",
  });
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const loadUser = async () => {
      const loadActiveUser = async () => {
        try {
          const userDataString = sessionStorage.getItem("userData");
          if (!userDataString) {
            throw new Error("No user data found in session storage");
          }
  
          const userData = JSON.parse(userDataString);
          if (!userData.userId) {
            throw new Error("No user ID found in session storage");
          }
  
          const details = await getUser(userData.userId);
          setActiveUser({
            user_name: details.user_name,
            role: details.role,
            specialty: details.specialty,
          });
        } catch (error) {
          console.error("Failed to load user info:", error);
          navigate(`/unauthorized`);
        }
      };
      //ACTIVAR LUEGO
      //loadActiveUser();
      if (params.id) {
        const loadedUser = await getUser(params.id);
        setUser({
          email_address: loadedUser.email_address,
          password: loadedUser.password,
          user_name: loadedUser.user_name,
          role: loadedUser.role,
          specialty: loadedUser.specialty,
        });
      }
    };
    loadUser();
  }, [params.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (params.id) {
      await updateUser(params.id, user);
    } else {
      await createUser(user);
    }
    navigate(`/usersList`); // Adjusted the navigation route
    setUser({
      email_address: "",
      password: "",
      user_name: "",
      role: "",
    });
  };

  return (
    <>
    <Navbar />
    <div style={{ display: "block", margin: "auto", width: 400, padding: 30 }}>
      <Form onSubmit={handleSubmit}>
        <h1 className="text-center mb-4">
          {params.id ? "Edit User" : "Nuevo usuario"}
        </h1>

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
            as="select"
            name="role"
            value={user.role}
            onChange={handleChange}
          >
            <option value="">Seleccione un rol para el perfil</option>
            <option hidden={activeUser.role === "superAdmin" || activeUser.role === "Administrador"} value="superAdmin">Super Admin</option>
            <option hidden={activeUser.role === "Administrador"} value="Administrador">Administrador</option>
            <option value="Colaborador">Colaborador</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="formSpecialty">
          <Form.Label>Especialidad</Form.Label>
          <Form.Control
            as="select"
            name="specialty"
            value={user.specialty}
            onChange={handleChange}
            disabled={!(user.role === "Colaborador")}
          >
            <option value="">Seleccione especialidad para el colaborador</option>
            <option value="Terapia fisica">Terapia fisica</option>
            <option value="Psicología">Psicología</option>
            <option value="Trabajo Social">Trabajo Social</option>
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

export default UserForm;
