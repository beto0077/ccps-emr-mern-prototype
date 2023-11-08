import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useUserContext } from "../../context/UserContext";

function UserForm() {
  const { createUser, getUser, updateUser } = useUserContext();
  const [user, setUser] = useState({
    email_address: "",
    password: "",
    user_name: "",
    role: "",
    specialty: "",
  });
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const loadUser = async () => {
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
    <div style={{ display: "block", margin: "auto", width: 400, padding: 30 }}>
      <Form onSubmit={handleSubmit}>
        <h1 className="text-center mb-4">
          {params.id ? "Edit User" : "New User"}
        </h1>
        <Form.Group controlId="formEmail">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            name="email_address"
            placeholder="Enter email"
            onChange={handleChange}
            value={user.email_address}
          />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Enter password"
            onChange={handleChange}
            value={user.password}
          />
        </Form.Group>

        <Form.Group controlId="formUserName">
          <Form.Label>User Name</Form.Label>
          <Form.Control
            type="text"
            name="user_name"
            placeholder="Enter user name"
            onChange={handleChange}
            value={user.user_name}
          />
        </Form.Group>

        <Form.Group controlId="formRole">
          <Form.Label>Role</Form.Label>
          <Form.Control
            as="select"
            name="role"
            value={user.role}
            onChange={handleChange}
          >
            <option value="superAdmin">Super Admin</option>
            <option value="admin">Admin</option>
            <option value="collaborator">Collaborator</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="formSpecialty">
          <Form.Label>Specialty</Form.Label>
          <Form.Control
            as="select"
            name="specialty"
            value={user.specialty}
            onChange={handleChange}
          >
            <option value="">Select Specialty</option>{" "}
            {/* Default empty option */}
            <option value="Physical therapy">Physical Therapy</option>
            <option value="Psychology">Psychology</option>
            <option value="Social Work">Social Work</option>
            {/* Add more options here as needed */}
          </Form.Control>
        </Form.Group>

        <Button variant="primary" type="submit">
          Save
        </Button>
      </Form>
    </div>
  );
}

export default UserForm;
