import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { useUserContext } from "../context/UserContext";

function NavigationBar() {
  const { getUser } = useUserContext();
  const [activeUser, setActiveUser] = useState({
    user_name: "",
    role: "",
    specialty: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
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
    loadActiveUser();
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("usertoken");
    sessionStorage.removeItem("userData");
    navigate("/");
  };

  return (
    <div>
      <Navbar className="navbar" bg="success" text="white" var="lg">
        <Navbar.Brand style={{ color: "white" }}>
          Asociación Cuidados Paliativos de Sarchí
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto ms-auto">
            <Nav.Link className="text-white" onClick={() => navigate(-1)}>
              Atrás
            </Nav.Link>
            <Nav.Link
              hidden={!(activeUser.role === "superAdmin" || activeUser.role === "Administrador")}
              className="text-white"
              onClick={() => navigate(`/adminDashboard`)}
            >
              Administrador
            </Nav.Link>
            <Nav.Link className="text-white" href="/patientSearch">
              Buscar paciente
            </Nav.Link>
            <Nav.Link className="text-white" onClick={handleLogout}>
              Cerrar sesión
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default NavigationBar;
