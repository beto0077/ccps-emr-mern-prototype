import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import Navber from "../Navber/Navber";
import Footer from "../Footer/Footer";
import { useUserContext } from "../../context/UserContext";

function UsersList() {
    const { users, loadUsers, deleteUser } = useUserContext();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadUsers();
        setIsLoading(false);
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
        <div className="bg-dark">
            <Navber />
            <br />
            <h2 className="text-white text-center">
                Users List
            </h2>
            <h3 className="text-white text-center">
                Welcome!
            </h3>
            <br />
            <Container>
                <Row>
                    <Col>
                        <div className="jumbotron mt-5 mb-5" style={{ backgroundColor: "#e0e0e0" }}>
                            <h2 className="text-primary">Users</h2>
                            <Table striped bordered hover responsive>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                        <th>Actions</th>
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
                                                        Profile
                                                    </Button>
                                                    <Button
                                                        variant="outline-secondary"
                                                        className="mr-2"
                                                        onClick={() => navigate(`/editUser/${user.user_id}`)}
                                                    >
                                                        Edit
                                                    </Button>
                                                    <Button
                                                        variant="outline-secondary"
                                                        onClick={() => handleDeleteConfirmation(user)}
                                                    >
                                                        Delete
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5">
                                                <h4>Loading</h4>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                        </div>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </div>
    );
}

export default UsersList;