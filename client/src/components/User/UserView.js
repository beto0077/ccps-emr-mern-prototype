import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, Table, Nav } from 'react-bootstrap';
import Navbar from "../NavigationBar";
import { useUserContext } from "../../context/UserContext";

function UserProfile() {
  const { getUser } = useUserContext();
  const [userInfo, setUserInfo] = useState({
    email_address: "",
    user_name: "",
    role: "",
    specialty: "",
  });
  const [availableHeight, setAvailableHeight] = useState(window.innerHeight);

  const params = useParams();

  useEffect(() => {
    const loadData = async () => {
      const userDetails = await getUser(params.id);
      setUserInfo({
        email_address: userDetails.email_address,
        user_name: userDetails.user_name,
        role: userDetails.role,
        specialty: userDetails.specialty,
      });
    };

    loadData();

    const updateAvailableHeight = () => {
      const navbarHeight = document.querySelector('.navbar').offsetHeight;
      const newAvailableHeight = window.innerHeight - navbarHeight;
      setAvailableHeight(newAvailableHeight);
    };

  window.addEventListener('resize', updateAvailableHeight);
  updateAvailableHeight();

  return () => window.removeEventListener('resize', updateAvailableHeight);
  }, [params.id]);

  return (
    <>
    <Navbar />
    <div className="bg-dark py-3" style={{ minHeight: `${availableHeight}px` }}>
      <h2 className="text-white text-center mt-5 mb-4">Perfil del usuario</h2>
      <Container>
        <Row className="justify-content-center">
          <Col lg={8}>
            <Card className="mt-4" style={{ backgroundColor: "#e0e0e0" }}>
              <Card.Body>
                <Card.Title className="text-primary">Información</Card.Title>
                <Table bordered hover>
                  <tbody>
                    <tr>
                      <td> Nombre completo</td>
                      <td>{userInfo.user_name}</td>
                    </tr>
                    <tr>
                      <td>Correo electrónico</td>
                      <td>{userInfo.email_address}</td>
                    </tr>
                    <tr>
                      <td>Rol</td>
                      <td>{userInfo.role}</td>
                    </tr>
                    <tr>
                      <td>Especialidad</td>
                      <td>{userInfo.specialty}</td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
    </>
  );
}

export default UserProfile;
