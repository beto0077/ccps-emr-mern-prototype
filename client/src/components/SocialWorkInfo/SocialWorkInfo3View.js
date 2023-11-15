import React, { useState, useEffect } from "react";
import Navbar from "../NavigationBar";
import "mdbreact";
import { Container, Row, Col, Table, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useSocialWorkInfo3Context } from "../../context/SocialWorkInfo3Context";

function SocialWorkInfo3View() {
  const { getSocialWorkInfo3 } = useSocialWorkInfo3Context();
  const [socialWorkInfo3, setSocialWorkInfo3] = useState({
    patient_name: "",
    id: "",
    address: "",
    evolution: "",
    treatment: "",
  });
  const [availableHeight, setAvailableHeight] = useState(window.innerHeight);

  const params = useParams();
  useEffect(() => {
    const loadSocialWorkInfo3 = async () => {
      if (params.id) {
        const details = await getSocialWorkInfo3(params.id);
        setSocialWorkInfo3(details);
      }
    };
    loadSocialWorkInfo3();
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
      <div className="bg-white" style={{ minHeight: `${availableHeight}px` }}>
        <h2
          className="text-black my-3 mt-5 text-center"
          style={{ marginTop: "75px" }}
        >
          Seguimiento de Trabajo Social
        </h2>
        <Container>
          <Row>
            <Col>
              <div className="container ml-3">
                <Card className="mt-5" style={{ backgroundColor: "#e0e0e0" }}>
                  <Card.Body>
                    <h2 className="text-Secondary">Detalles</h2>
                    <Table striped bordered responsive>
                      <tbody>
                        <tr>
                          <td>Nombre del paciente</td>
                          <td>{socialWorkInfo3.patient_name}</td>
                        </tr>
                        <tr>
                          <td>Cédula</td>
                          <td>{socialWorkInfo3.id}</td>
                        </tr>
                        <tr>
                          <td>Dirección</td>
                          <td>{socialWorkInfo3.address}</td>
                        </tr>
                        <tr>
                          <td>Evolución</td>
                          <td>{socialWorkInfo3.evolution}</td>
                        </tr>
                        <tr>
                          <td>Tratamiento</td>
                          <td>{socialWorkInfo3.treatment}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default SocialWorkInfo3View;
