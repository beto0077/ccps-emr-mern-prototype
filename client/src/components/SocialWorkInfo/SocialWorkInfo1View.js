// SocialWorkInfo1View.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Table, Card } from "react-bootstrap";
import { useSocialWorkInfo1Context } from "../../context/SocialWorkInfo1Context";

function SocialWorkInfo1View() {
  const { getSocialWorkInfo1 } = useSocialWorkInfo1Context();
  const [socialWorkInfo1, setSocialWorkInfo1] = useState({
    patient_id: "",
    professional: "",
    interview_date: "",
    clinical_history: "",
    people_interviewed: "",
    patient_name: "",
    age: "",
    date_of_birth: "",
    gender: "",
    medical_condition: "",
    insurance: "",
    insurance_type: "",
    id: "",
    pension: "",
    pension_type: "",
    support_network: "",
    support_type: "",
    housing: "",
    diagnosis: "",
    phone_number: "",
    religion: "",
    nationality: "",
    occupation: "",
    educational_level: "",
    immigration_status: "",
    knows_diagnosis: "",
    referred_by: "",
    head_of_family: "",
    marital_status: "",
    primary_caregiver: "",
    family_type: "",
  });
  const [familyGroup, setFamilyGroup] = useState([]);

  const params = useParams();

  // ... continuation from the previous part

  useEffect(() => {
    const loadSocialWorkInfo1 = async () => {
      if (params.id) {
        const response = await getSocialWorkInfo1(params.id);
        const { socialWorkInfo1, familyGroup } = response;
        setSocialWorkInfo1(socialWorkInfo1);
        setFamilyGroup(familyGroup);
      }
    };
    loadSocialWorkInfo1();
  }, [params.id, getSocialWorkInfo1]);

  return (
    <Container>
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <h3>Social Work Information</h3>
            </Card.Header>
            <Card.Body>
              <Table>
                <tbody>
                  <tr>
                    <th>Patient ID</th>
                    <td>{socialWorkInfo1.patient_id}</td>
                  </tr>
                  <tr>
                    <th>Professional</th>
                    <td>{socialWorkInfo1.professional}</td>
                  </tr>
                  <tr>
                    <th>Interview Date</th>
                    <td>{socialWorkInfo1.interview_date}</td>
                  </tr>
                  <tr>
                    <th>Clinical History</th>
                    <td>{socialWorkInfo1.clinical_history}</td>
                  </tr>
                  <tr>
                    <th>People Interviewed</th>
                    <td>{socialWorkInfo1.people_interviewed}</td>
                  </tr>
                  <tr>
                    <th>Patient Name</th>
                    <td>{socialWorkInfo1.patient_name}</td>
                  </tr>
                  <tr>
                    <th>Age</th>
                    <td>{socialWorkInfo1.age}</td>
                  </tr>
                  <tr>
                    <th>Date of Birth</th>
                    <td>{socialWorkInfo1.date_of_birth}</td>
                  </tr>
                  <tr>
                    <th>Gender</th>
                    <td>{socialWorkInfo1.gender}</td>
                  </tr>
                  <tr>
                    <th>Medical Condition</th>
                    <td>{socialWorkInfo1.medical_condition}</td>
                  </tr>
                  <tr>
                    <th>Insurance</th>
                    <td>{socialWorkInfo1.insurance}</td>
                  </tr>
                  <tr>
                    <th>Insurance Type</th>
                    <td>{socialWorkInfo1.insurance_type}</td>
                  </tr>
                  <tr>
                    <th>ID</th>
                    <td>{socialWorkInfo1.id}</td>
                  </tr>
                  <tr>
                    <th>Pension</th>
                    <td>{socialWorkInfo1.pension}</td>
                  </tr>
                  <tr>
                    <th>Pension Type</th>
                    <td>{socialWorkInfo1.pension_type}</td>
                  </tr>
                  <tr>
                    <th>Support Network</th>
                    <td>{socialWorkInfo1.support_network}</td>
                  </tr>
                  <tr>
                    <th>Support Type</th>
                    <td>{socialWorkInfo1.support_type}</td>
                  </tr>
                  <tr>
                    <th>Housing</th>
                    <td>{socialWorkInfo1.housing}</td>
                  </tr>
                  <tr>
                    <th>Diagnosis</th>
                    <td>{socialWorkInfo1.diagnosis}</td>
                  </tr>
                  <tr>
                    <th>Phone Number</th>
                    <td>{socialWorkInfo1.phone_number}</td>
                  </tr>
                  <tr>
                    <th>Religion</th>
                    <td>{socialWorkInfo1.religion}</td>
                  </tr>
                  <tr>
                    <th>Nationality</th>
                    <td>{socialWorkInfo1.nationality}</td>
                  </tr>
                  <tr>
                    <th>Occupation</th>
                    <td>{socialWorkInfo1.occupation}</td>
                  </tr>
                  <tr>
                    <th>Educational Level</th>
                    <td>{socialWorkInfo1.educational_level}</td>
                  </tr>
                  <tr>
                    <th>Immigration Status</th>
                    <td>{socialWorkInfo1.immigration_status}</td>
                  </tr>
                  <tr>
                    <th>Knows Diagnosis</th>
                    <td>{socialWorkInfo1.knows_diagnosis}</td>
                  </tr>
                  <tr>
                    <th>Referred By</th>
                    <td>{socialWorkInfo1.referred_by}</td>
                  </tr>
                  <tr>
                    <th>Head of Family</th>
                    <td>{socialWorkInfo1.head_of_family}</td>
                  </tr>
                  <tr>
                    <th>Marital Status</th>
                    <td>{socialWorkInfo1.marital_status}</td>
                  </tr>
                  <tr>
                    <th>Primary Caregiver</th>
                    <td>{socialWorkInfo1.primary_caregiver}</td>
                  </tr>
                  <tr>
                    <th>Family Type</th>
                    <td>{socialWorkInfo1.family_type}</td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <h3>Family Group</h3>
            </Card.Header>
            <Card.Body>
              <Table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Relationship</th>
                    <th>Age</th>
                    <th>Nationality</th>
                    <th>Occupation</th>
                    <th>Education Level</th>
                    <th>Health Status</th>
                  </tr>
                </thead>
                <tbody>
                  {familyGroup.map((member, index) => (
                    <tr key={index}>
                      <td>{member.name}</td>
                      <td>{member.relationship}</td>
                      <td>{member.age}</td>
                      <td>{member.nationality}</td>
                      <td>{member.occupation}</td>
                      <td>{member.education_level}</td>
                      <td>{member.health_status}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default SocialWorkInfo1View;