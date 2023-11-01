import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { usePhysicalTherapyContext } from "../../context/PhysicalTherapyContext";

function PhysicalTherapyForm() {
  const {
    createPhysicalTherapyInfo,
    getPhysicalTherapyInfo,
    updatePhysicalTherapyInfo,
  } = usePhysicalTherapyContext();
  const [physicalTherapyInfo, setPhysicalTherapyInfo] = useState({
    professional: "",
    clinical_diagnosis: "",
    clinical_history: "",
    edema: false,
    edema_location: "",
    ulcer: false,
    ulcer_location: "",
    activities_of_daily_living: false,
    pain: false,
    pain_location: "",
    muscle_strength: "",
    range_of_motion: "",
    balance: "",
    external_support: "",
    additional_external_support_info: "",
    work_plan: "",
    physical_therapy_treatment: "",
    treatment_objectives: "",
    exercises: "",
    physical_agents: "",
    postural_hygiene: "",
  });
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const loadPhysicalTherapyInfo = async () => {
      if (params.id) {
        const loadedPhysicalTherapyInfo = await getPhysicalTherapyInfo(
          params.id
        );
        setPhysicalTherapyInfo(loadedPhysicalTherapyInfo);
      }
    };
    loadPhysicalTherapyInfo();
  }, [params.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPhysicalTherapyInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (params.id) {
      await updatePhysicalTherapyInfo(params.id, physicalTherapyInfo);
    } else {
      await createPhysicalTherapyInfo(physicalTherapyInfo);
    }
    navigate("/pathToRedirectAfterSubmit");
    setPhysicalTherapyInfo({
      professional: "",
      clinical_diagnosis: "",
      clinical_history: "",
      edema: false,
      edema_location: "",
      ulcer: false,
      ulcer_location: "",
      activities_of_daily_living: false,
      pain: false,
      pain_location: "",
      muscle_strength: "",
      range_of_motion: "",
      balance: "",
      external_support: "",
      additional_external_support_info: "",
      work_plan: "",
      physical_therapy_treatment: "",
      treatment_objectives: "",
      exercises: "",
      physical_agents: "",
      postural_hygiene: "",
    });
  };

  return (
    <div style={{ display: "block", margin: "auto", width: 400, padding: 30 }}>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="professional">
          <Form.Label>Professional</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter professional's name"
            value={physicalTherapyInfo.professional}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="clinicalDiagnosis">
          <Form.Label>Clinical Diagnosis</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter clinical diagnosis"
            value={physicalTherapyInfo.clinical_diagnosis}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="clinicalHistory">
          <Form.Label>Clinical History</Form.Label>
          <Form.Control
            as="select"
            value={physicalTherapyInfo.clinical_history}
            onChange={handleChange}
          >
            <option value="Home visit">Home visit</option>
            <option value="External consultation">External consultation</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="edema">
          <Form.Check
            type="checkbox"
            label="Edema"
            checked={physicalTherapyInfo.edema}
            onChange={(e) =>
              setPhysicalTherapyInfo({
                ...physicalTherapyInfo,
                edema: e.target.checked,
              })
            }
          />
        </Form.Group>

        <Form.Group controlId="edemaLocation">
          <Form.Label>Edema Location</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter edema location"
            value={physicalTherapyInfo.edema_location}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="ulcer">
          <Form.Check
            type="checkbox"
            label="Ulcer"
            checked={physicalTherapyInfo.ulcer}
            onChange={(e) =>
              setPhysicalTherapyInfo({
                ...physicalTherapyInfo,
                ulcer: e.target.checked,
              })
            }
          />
        </Form.Group>

        <Form.Group controlId="ulcerLocation">
          <Form.Label>Ulcer Location</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter ulcer location"
            value={physicalTherapyInfo.ulcer_location}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="activitiesOfDailyLiving">
          <Form.Check
            type="checkbox"
            label="Activities of Daily Living"
            checked={physicalTherapyInfo.activities_of_daily_living}
            onChange={(e) =>
              setPhysicalTherapyInfo({
                ...physicalTherapyInfo,
                activities_of_daily_living: e.target.checked,
              })
            }
          />
        </Form.Group>

        <Form.Group controlId="pain">
          <Form.Check
            type="checkbox"
            label="Pain"
            checked={physicalTherapyInfo.pain}
            onChange={(e) =>
              setPhysicalTherapyInfo({
                ...physicalTherapyInfo,
                pain: e.target.checked,
              })
            }
          />
        </Form.Group>

        <Form.Group controlId="painLocation">
          <Form.Label>Pain Location</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter pain location"
            value={physicalTherapyInfo.pain_location}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="muscleStrength">
          <Form.Label>Muscle Strength</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter muscle strength"
            value={physicalTherapyInfo.muscle_strength}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="rangeOfMotion">
          <Form.Label>Range of Motion</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter range of motion"
            value={physicalTherapyInfo.range_of_motion}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="balance">
          <Form.Label>Balance</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter balance"
            value={physicalTherapyInfo.balance}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="externalSupport">
          <Form.Label>External Support</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter external support"
            value={physicalTherapyInfo.external_support}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="additionalExternalSupportInfo">
          <Form.Label>Additional External Support Info</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter additional external support info"
            value={physicalTherapyInfo.additional_external_support_info}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="workPlan">
          <Form.Label>Work Plan</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter work plan"
            value={physicalTherapyInfo.work_plan}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="physicalTherapyTreatment">
          <Form.Label>Physical Therapy Treatment</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter physical therapy treatment"
            value={physicalTherapyInfo.physical_therapy_treatment}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="treatmentObjectives">
          <Form.Label>Treatment Objectives</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter treatment objectives"
            value={physicalTherapyInfo.treatment_objectives}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="exercises">
          <Form.Label>Exercises</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter exercises"
            value={physicalTherapyInfo.exercises}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="physicalAgents">
          <Form.Label>Physical Agents</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter physical agents"
            value={physicalTherapyInfo.physical_agents}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="posturalHygiene">
          <Form.Label>Postural Hygiene</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter postural hygiene"
            value={physicalTherapyInfo.postural_hygiene}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default PhysicalTherapyForm;
