import React, { useState, useEffect } from "react";
import Navber from "../NavigationBar";
import Footer from "../Footer";
import "mdbreact";
import { Container, Row, Col, Table, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { usePatientContext } from "../../context/PatientContext";

function PatientView() {
  const { getPatient } = usePatientContext();
  const [patientInfo, setPatientInfo] = useState({
    name: "",
    id_number: "",
    religion: "",
    education_level: "",
    occupation: "",
    date_of_birth: "",
    age: "",
    marital_status: "",
    children: "",
    home_phone: "",
    cell_phone: "",
    email: "",
    nationality: "",
    address: "",
    patient_status: "",
    clinical_diagnosis: "",
    referred_by: "",
    clinical_history: "",
    medications: "",
    social_support_network: "",
    alive_status: "",
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${day}-${month}-${year}`;
};

  const params = useParams();
  useEffect(() => {
    const loadPatient = async () => {
      if (params.id) {
        const details = await getPatient(params.id);
        setPatientInfo(details);
      }
    };
    loadPatient();
  }, []);

  return (
    <div className="bg-dark">
      <Navber />
      <h2 className="text-white my-3 text-center" style={{ marginTop: "75px" }}>
        Patient Home
      </h2>
      <h3 className="text-white my-3 text-center">Welcome!</h3>
      <Container>
        <Row>
          <Col>
            <Row>
              <Col>
                <div className="container ml-3">
                  <Card className="mt-5" style={{ backgroundColor: "#e0e0e0" }}>
                    <Card.Body>
                      <h2 className="text-primary">Patient Information</h2>
                      <Table striped bordered responsive>
                        <tbody>
                          <tr>
                            <td>Name</td>
                            <td>{patientInfo.name}</td>
                          </tr>
                          <tr>
                            <td>ID Number</td>
                            <td>{patientInfo.id_number}</td>
                          </tr>
                          <tr>
                            <td>Religion</td>
                            <td>{patientInfo.religion}</td>
                          </tr>
                          <tr>
                            <td>Education Level</td>
                            <td>{patientInfo.education_level}</td>
                          </tr>
                          <tr>
                            <td>Occupation</td>
                            <td>{patientInfo.occupation}</td>
                          </tr>
                          <tr>
                            <td>Date of Birth</td>
                            <td>{formatDate(patientInfo.date_of_birth)}</td>
                          </tr>
                          <tr>
                            <td>Age</td>
                            <td>{patientInfo.age}</td>
                          </tr>
                          <tr>
                            <td>Marital Status</td>
                            <td>{patientInfo.marital_status}</td>
                          </tr>
                          <tr>
                            <td>Children</td>
                            <td>{patientInfo.children}</td>
                          </tr>
                          <tr>
                            <td>Home Phone</td>
                            <td>{patientInfo.home_phone}</td>
                          </tr>
                          <tr>
                            <td>Cell Phone</td>
                            <td>{patientInfo.cell_phone}</td>
                          </tr>
                          <tr>
                            <td>Email</td>
                            <td>{patientInfo.email}</td>
                          </tr>
                          <tr>
                            <td>Nationality</td>
                            <td>{patientInfo.nationality}</td>
                          </tr>
                          <tr>
                            <td>Address</td>
                            <td>{patientInfo.address}</td>
                          </tr>
                          <tr>
                            <td>Patient Status</td>
                            <td>{patientInfo.patient_status}</td>
                          </tr>
                          <tr>
                            <td>Clinical Diagnosis</td>
                            <td>{patientInfo.clinical_diagnosis}</td>
                          </tr>
                          <tr>
                            <td>Referred By</td>
                            <td>{patientInfo.referred_by}</td>
                          </tr>
                          <tr>
                            <td>Clinical History</td>
                            <td>{patientInfo.clinical_history}</td>
                          </tr>
                          <tr>
                            <td>Medications</td>
                            <td>{patientInfo.medications}</td>
                          </tr>
                          <tr>
                            <td>Social Support Network</td>
                            <td>{patientInfo.social_support_network}</td>
                          </tr>
                          <tr>
                            <td>Alive Status</td>
                            <td>
                              {patientInfo.alive_status ? "Alive" : "Deceased"}
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </Card.Body>
                  </Card>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}

export default PatientView;
