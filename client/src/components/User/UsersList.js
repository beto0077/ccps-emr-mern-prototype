import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import Navber from "../NavigationBar";
import { useUserContext } from "../../context/UserContext";

function UsersList() {
    const { users, loadUsers, deleteUser, getUser } = useUserContext();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
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
    //ACTIVAR LUEGO
    //loadActiveUser();
        loadUsers();
        setIsLoading(false);

        const updateAvailableHeight = () => {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const newAvailableHeight = window.innerHeight - navbarHeight;
            setAvailableHeight(newAvailableHeight);
          };
      
        window.addEventListener('resize', updateAvailableHeight);
        updateAvailableHeight();
      
        return () => window.removeEventListener('resize', updateAvailableHeight);
    }, []);

    // Function to handle deletion confirmation and action
    const handleDeleteConfirmation = async (user) => {
        if (window.confirm(`Are you sure you want to delete ${user.user_name}?`)) {
            try {
                const response = await deleteUser(user.user_id);
                if (response.status === 204) {
                    alert(`User ${user.user_name} has been deleted.`);
                    loadUsers(); // Refresh the user list after deletion
                } else if (response === 404) {
                    alert("User not found.");
                } else {
                    alert("An error occurred while deleting the user.");
                }
            } catch (error) {
                console.error("Error deleting user:", error);
                alert("An error occurred while deleting the user.");
            }
        }
    };

    return (
        <>
        <Navber />
        <div className="bg-dark" style={{ minHeight: `${availableHeight}px` }}>
            
            <br />
            <h2 className="text-white text-center">
                Lista de usuarios
            </h2>
            <br />
            <div className="text-center">
                <Button
            variant="primary"
            size="lg"
            onClick={() => navigate(`/createUser`)}
            className="mx-2 my-2 my-lg-3"
          >
            Crear usuario
          </Button>
            </div>
            <Container>
                <Row>
                    <Col>
                        <div className="jumbotron mt-5 mb-5" style={{ backgroundColor: "#e0e0e0" }}>
                            <h2 className="text-primary">Usuarios</h2>
                            <Table striped bordered hover responsive>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nombre</th>
                                        <th>Correo electrónico</th>
                                        <th>Rol</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {!isLoading ? (
                                        users.map((user) => (
                                            <tr key={user.user_id}>
                                                <td>{user.user_id}</td>
                                                <td>{user.user_name}</td>
                                                <td>{user.email_address}</td>
                                                <td>{user.role}</td>
                                                <td>
                                                    <Button
                                                        variant="outline-secondary"
                                                        className="mr-2"
                                                        onClick={() => navigate(`/userProfile/${user.user_id}`)}
                                                    >
                                                        Perfil
                                                    </Button>
                                                    <Button
                                                        variant="outline-secondary"
                                                        className="mr-2"
                                                        onClick={() => navigate(`/editUser/${user.user_id}`)}
                                                    >
                                                        Editar
                                                    </Button>
                                                    <Button
                                                        variant="outline-secondary"
                                                        onClick={() => handleDeleteConfirmation(user)}
                                                    >
                                                        Eliminar
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5">
                                                <h4>Cargando...</h4>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                        </div>
                        <Button variant="outline-primary" type="button" onClick={() => navigate(`/adminDashboard`)}>
                        Volver al panel
                    </Button>
                    </Col>
                </Row>
            </Container>
        </div>
        </>
    );
}

export default UsersList;