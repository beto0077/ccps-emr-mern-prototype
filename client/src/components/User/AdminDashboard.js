import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Container, Dropdown } from "react-bootstrap";
import Navbar from "../NavigationBar";
import "bootstrap/dist/css/bootstrap.min.css";
import { useUserContext } from "../../context/UserContext";

function AdminDashboard() {
  const { getUser } = useUserContext();
  const params = useParams();
  const navigate = useNavigate();
  const [availableHeight, setAvailableHeight] = useState(window.innerHeight);
  const [activeUser, setActiveUser] = useState({
    user_name: "",
    role: "",
    specialty: "",
  });

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
    const updateAvailableHeight = () => {
      const navbarHeight = document.querySelector(".navbar").offsetHeight;
      const newAvailableHeight = window.innerHeight - navbarHeight;
      setAvailableHeight(newAvailableHeight);
    };

    window.addEventListener("resize", updateAvailableHeight);
    updateAvailableHeight();

    return () => window.removeEventListener("resize", updateAvailableHeight);
  }, []);

  return (
    <>
      <Navbar />
      <Container
        style={{
          height: `${availableHeight}px`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "1rem",
        }}
      >
        <h1 className="mb-4 mb-lg-5">
          {activeUser.role === "superAdmin"
            ? "Super Administrador"
            : "Administrador"}
        </h1>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: "2rem",
          }}
        >
          <Button
            variant="primary"
            size="lg"
            onClick={() => navigate(`/usersList`)}
            className="mx-2 my-2 my-lg-3"
          >
            Gestionar usuarios
          </Button>
          <Dropdown className="mx-2 my-2 my-lg-3">
            <Dropdown.Toggle size="lg" id="dropdown-basic">
              Gestionar pacientes
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item
                size="lg"
                onClick={() => navigate(`/createPatient`)}
              >
                Crear paciente
              </Dropdown.Item>
              <Dropdown.Item
                size="lg"
                onClick={() => navigate(`/patientSearch`)}
              >
                Buscar paciente
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Container>
    </>
  );
}

export default AdminDashboard;
