import React, { useState, useEffect } from "react";
import Navbar from "../NavigationBar";
import "mdbreact";
import { Container, Row, Col, Table, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useInternalReferenceContext } from "../../context/InternalReferenceContext";

function InternalReferenceView() {
  const { getInternalReference } = useInternalReferenceContext();
  const [referenceInfo, setReferenceInfo] = useState({
    date: "",
    full_name: "",
    id_number: "",
    religion: "",
    education_level: "",
    occupation: "",
    date_of_birth: "",
    age: "",
    marital_status: "",
    children: "",
    phone_number: "",
    nationality: "",
    address: "",
    service_of_care: "",
    referred_to: "",
    clinical_diagnosis: "",
    management_plan: "",
    reason_for_referral: "",
  });

  const params = useParams();

  const formatDate = (dateString) => {
    if (!dateString) return "";

    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const loadInternalReference = async () => {
      if (params.id) {
        const details = await getInternalReference(params.id);
        setReferenceInfo(details);
      }
    };
    loadInternalReference();
  }, []);

  return (
    <div className="bg-dark">
      <Navbar />
      <h2 className="text-white my-3 text-center" style={{ marginTop: "75px" }}>
        Detalles de referencia interna
      </h2>
      <Container>
        <Row>
          <Col>
            <div className="container ml-3 mb-4">
              <Card className="mt-5" style={{ backgroundColor: "#e0e0e0" }}>
                <Card.Body>
                  <h2 className="text-primary">Referencia interna</h2>
                  <Table striped bordered responsive>
                    <tbody>
                      <tr>
                        <td>Fecha</td>
                        <td>{formatDate(referenceInfo.date)}</td>
                      </tr>
                      <tr>
                        <td>Nombre completo</td>
                        <td>{referenceInfo.full_name}</td>
                      </tr>
                      <tr>
                        <td>Cédula</td>
                        <td>{referenceInfo.id_number}</td>
                      </tr>
                      <tr>
                        <td>Religión</td>
                        <td>{referenceInfo.religion}</td>
                      </tr>
                      <tr>
                        <td>Escolaridad</td>
                        <td>{referenceInfo.education_level}</td>
                      </tr>
                      <tr>
                        <td>Ocupación</td>
                        <td>{referenceInfo.occupation}</td>
                      </tr>
                      <tr>
                        <td>Fecha de nacimiento</td>
                        <td>{formatDate(referenceInfo.date_of_birth)}</td>
                      </tr>
                      <tr>
                        <td>Edad</td>
                        <td>{referenceInfo.age}</td>
                      </tr>
                      <tr>
                        <td>Estado Civil</td>
                        <td>{referenceInfo.marital_status}</td>
                      </tr>
                      <tr>
                        <td>Hijos</td>
                        <td>{referenceInfo.children}</td>
                      </tr>
                      <tr>
                        <td>Teléfono</td>
                        <td>{referenceInfo.phone_number}</td>
                      </tr>
                      <tr>
                        <td>Nacionalidad</td>
                        <td>{referenceInfo.nationality}</td>
                      </tr>
                      <tr>
                        <td>Domicilio</td>
                        <td>{referenceInfo.address}</td>
                      </tr>
                      <tr>
                        <td>Servicio de atención</td>
                        <td>{referenceInfo.service_of_care}</td>
                      </tr>
                      <tr>
                        <td>Referido a</td>
                        <td>{referenceInfo.referred_to}</td>
                      </tr>
                      <tr>
                        <td>Diagnóstico Clínico</td>
                        <td>{referenceInfo.clinical_diagnosis}</td>
                      </tr>
                      <tr>
                        <td>Plan de manejo</td>
                        <td>{referenceInfo.management_plan}</td>
                      </tr>
                      <tr>
                        <td>Motivo de referencia</td>
                        <td>{referenceInfo.reason_for_referral}</td>
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
  );
}

export default InternalReferenceView;
