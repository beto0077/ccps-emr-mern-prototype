import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useSocialWorkInfo1Context } from "../../context/SocialWorkInfo1Context";

function SocialWorkInfo1Form() {
  const { createSocialWorkInfo1, getSocialWorkInfo1, updateSocialWorkInfo1 } =
    useSocialWorkInfo1Context();
  const [socialWorkInfo, setSocialWorkInfo] = useState({
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
    insurance: false,
    insurance_type: "",
    id: "",
    pension: false,
    pension_type: "",
    support_network: false,
    support_type: "",
    housing: "",
    diagnosis: "",
    phone_number: "",
    religion: "",
    nationality: "",
    occupation: "",
    educational_level: "",
    immigration_status: "",
    knows_diagnosis: false,
    referred_by: "",
    head_of_family: false,
    marital_status: "",
    primary_caregiver: "",
    family_type: "",
  });
  const [familyGroup, setFamilyGroup] = useState([{ name: '', relationship: '', age: '', nationality: '', occupation: '', id: '' }]);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const loadSocialWorkInfo = async () => {
      if (params.id) {
        const loadedInfo = await getSocialWorkInfo1(params.id);
        setSocialWorkInfo(loadedInfo);
      }
    };
    loadSocialWorkInfo();
  }, [params.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSocialWorkInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleFamilyGroupChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...familyGroup];
    list[index][name] = value;
    setFamilyGroup(list);
};

const handleAddFamilyMember = () => {
    setFamilyGroup([...familyGroup, { name: '', relationship: '', age: '', nationality: '', occupation: '', id: '' }]);
};

const handleRemoveFamilyMember = (index) => {
    const list = [...familyGroup];
    list.splice(index, 1);
    setFamilyGroup(list);
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (params.id) {
      await updateSocialWorkInfo1(params.id, socialWorkInfo);
    } else {
      await createSocialWorkInfo1(socialWorkInfo);
    }
    navigate("/socialWorkInfo1");
    setSocialWorkInfo({
      // ... reset to initial state
    });
  };

  return (
    <div style={{ display: "block", margin: "auto", width: 400, padding: 30 }}>
      <Form onSubmit={handleSubmit}>
        <h1 className="text-center mb-4">
          {params.id ? "Edit Social Work Info" : "New Social Work Info"}
        </h1>
        <Form.Group controlId="formPatientID">
          <Form.Label>Patient ID</Form.Label>
          <Form.Control
            type="number"
            name="patient_id"
            placeholder="Enter patient ID"
            onChange={handleChange}
            value={socialWorkInfo.patient_id}
          />
        </Form.Group>
        <Form.Group controlId="formProfessional">
          <Form.Label>Professional</Form.Label>
          <Form.Control
            type="text"
            name="professional"
            placeholder="Enter professional"
            onChange={handleChange}
            value={socialWorkInfo.professional}
          />
        </Form.Group>
        <Form.Group controlId="formInterviewDate">
          <Form.Label>Interview Date</Form.Label>
          <Form.Control
            type="date"
            name="interview_date"
            onChange={handleChange}
            value={socialWorkInfo.interview_date}
          />
        </Form.Group>
        <Form.Group controlId="formClinicalHistory">
          <Form.Label>Clinical History</Form.Label>
          <Form.Control
            as="select"
            name="clinical_history"
            onChange={handleChange}
            value={socialWorkInfo.clinical_history}
          >
            <option value="Home visit">Home visit</option>
            <option value="External consultation">External consultation</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="formPeopleInterviewed">
          <Form.Label>People Interviewed</Form.Label>
          <Form.Control
            type="text"
            name="people_interviewed"
            placeholder="Enter people interviewed"
            onChange={handleChange}
            value={socialWorkInfo.people_interviewed}
          />
        </Form.Group>
        <Form.Group controlId="formPatientName">
          <Form.Label>Patient Name</Form.Label>
          <Form.Control
            type="text"
            name="patient_name"
            placeholder="Enter patient name"
            onChange={handleChange}
            value={socialWorkInfo.patient_name}
          />
        </Form.Group>
        <Form.Group controlId="formAge">
          <Form.Label>Age</Form.Label>
          <Form.Control
            type="number"
            name="age"
            placeholder="Enter age"
            onChange={handleChange}
            value={socialWorkInfo.age}
          />
        </Form.Group>
        <Form.Group controlId="formDateOfBirth">
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control
            type="date"
            name="date_of_birth"
            onChange={handleChange}
            value={socialWorkInfo.date_of_birth}
          />
        </Form.Group>
        <Form.Group controlId="formGender">
          <Form.Label>Gender</Form.Label>
          <Form.Control
            as="select"
            name="gender"
            onChange={handleChange}
            value={socialWorkInfo.gender}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="formMedicalCondition">
          <Form.Label>Medical Condition</Form.Label>
          <Form.Control
            type="text"
            name="medical_condition"
            placeholder="Enter medical condition"
            onChange={handleChange}
            value={socialWorkInfo.medical_condition}
          />
        </Form.Group>
        <Form.Group controlId="formInsurance">
          <Form.Label>Insurance</Form.Label>
          <Form.Check
            type="checkbox"
            name="insurance"
            onChange={(e) =>
              handleChange({
                target: { name: e.target.name, value: e.target.checked },
              })
            }
            checked={socialWorkInfo.insurance}
          />
        </Form.Group>
        <Form.Group controlId="formInsuranceType">
          <Form.Label>Insurance Type</Form.Label>
          <Form.Control
            type="text"
            name="insurance_type"
            placeholder="Enter insurance type"
            onChange={handleChange}
            value={socialWorkInfo.insurance_type}
          />
        </Form.Group>
        <Form.Group controlId="formID">
          <Form.Label>ID</Form.Label>
          <Form.Control
            type="text"
            name="id"
            placeholder="Enter ID"
            onChange={handleChange}
            value={socialWorkInfo.id}
          />
        </Form.Group>
        <Form.Group controlId="formPension">
          <Form.Label>Pension</Form.Label>
          <Form.Check
            type="checkbox"
            name="pension"
            onChange={(e) =>
              handleChange({
                target: { name: e.target.name, value: e.target.checked },
              })
            }
            checked={socialWorkInfo.pension}
          />
        </Form.Group>
        <Form.Group controlId="formPensionType">
          <Form.Label>Pension Type</Form.Label>
          <Form.Control
            type="text"
            name="pension_type"
            placeholder="Enter pension type"
            onChange={handleChange}
            value={socialWorkInfo.pension_type}
          />
        </Form.Group>
        <Form.Group controlId="formSupportNetwork">
          <Form.Label>Support Network</Form.Label>
          <Form.Check
            type="checkbox"
            name="support_network"
            onChange={(e) =>
              handleChange({
                target: { name: e.target.name, value: e.target.checked },
              })
            }
            checked={socialWorkInfo.support_network}
          />
        </Form.Group>
        <Form.Group controlId="formSupportType">
          <Form.Label>Support Type</Form.Label>
          <Form.Control
            type="text"
            name="support_type"
            placeholder="Enter support type"
            onChange={handleChange}
            value={socialWorkInfo.support_type}
          />
        </Form.Group>
        <Form.Group controlId="formHousing">
          <Form.Label>Housing</Form.Label>
          <Form.Control
            type="text"
            name="housing"
            placeholder="Enter housing"
            onChange={handleChange}
            value={socialWorkInfo.housing}
          />
        </Form.Group>
        <Form.Group controlId="formDiagnosis">
          <Form.Label>Diagnosis</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="diagnosis"
            placeholder="Enter diagnosis"
            onChange={handleChange}
            value={socialWorkInfo.diagnosis}
          />
        </Form.Group>
        <Form.Group controlId="formPhoneNumber">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="text"
            name="phone_number"
            placeholder="Enter phone number"
            onChange={handleChange}
            value={socialWorkInfo.phone_number}
          />
        </Form.Group>
        <Form.Group controlId="formReligion">
          <Form.Label>Religion</Form.Label>
          <Form.Control
            type="text"
            name="religion"
            placeholder="Enter religion"
            onChange={handleChange}
            value={socialWorkInfo.religion}
          />
        </Form.Group>
        <Form.Group controlId="formNationality">
          <Form.Label>Nationality</Form.Label>
          <Form.Control
            type="text"
            name="nationality"
            placeholder="Enter nationality"
            onChange={handleChange}
            value={socialWorkInfo.nationality}
          />
        </Form.Group>
        <Form.Group controlId="formOccupation">
          <Form.Label>Occupation</Form.Label>
          <Form.Control
            type="text"
            name="occupation"
            placeholder="Enter occupation"
            onChange={handleChange}
            value={socialWorkInfo.occupation}
          />
        </Form.Group>
        <Form.Group controlId="formEducationalLevel">
          <Form.Label>Educational Level</Form.Label>
          <Form.Control
            type="text"
            name="educational_level"
            placeholder="Enter educational level"
            onChange={handleChange}
            value={socialWorkInfo.educational_level}
          />
        </Form.Group>
        <Form.Group controlId="formImmigrationStatus">
          <Form.Label>Immigration Status</Form.Label>
          <Form.Control
            type="text"
            name="immigration_status"
            placeholder="Enter immigration status"
            onChange={handleChange}
            value={socialWorkInfo.immigration_status}
          />
        </Form.Group>
        <Form.Group controlId="formKnowsDiagnosis">
          <Form.Label>Knows Diagnosis</Form.Label>
          <Form.Check
            type="checkbox"
            name="knows_diagnosis"
            onChange={(e) =>
              handleChange({
                target: { name: e.target.name, value: e.target.checked },
              })
            }
            checked={socialWorkInfo.knows_diagnosis}
          />
        </Form.Group>
        <Form.Group controlId="formReferredBy">
          <Form.Label>Referred By</Form.Label>
          <Form.Control
            type="text"
            name="referred_by"
            placeholder="Enter referred by"
            onChange={handleChange}
            value={socialWorkInfo.referred_by}
          />
        </Form.Group>
        <Form.Group controlId="formHeadOfFamily">
          <Form.Label>Head of Family</Form.Label>
          <Form.Check
            type="checkbox"
            name="head_of_family"
            onChange={(e) =>
              handleChange({
                target: { name: e.target.name, value: e.target.checked },
              })
            }
            checked={socialWorkInfo.head_of_family}
          />
        </Form.Group>
        <Form.Group controlId="formMaritalStatus">
          <Form.Label>Marital Status</Form.Label>
          <Form.Control
            type="text"
            name="marital_status"
            placeholder="Enter marital status"
            onChange={handleChange}
            value={socialWorkInfo.marital_status}
          />
        </Form.Group>
        <Form.Group controlId="formPrimaryCaregiver">
          <Form.Label>Primary Caregiver</Form.Label>
          <Form.Control
            type="text"
            name="primary_caregiver"
            placeholder="Enter primary caregiver"
            onChange={handleChange}
            value={socialWorkInfo.primary_caregiver}
          />
        </Form.Group>
        <Form.Group controlId="formFamilyType">
          <Form.Label>Family Type</Form.Label>
          <Form.Control
            type="text"
            name="family_type"
            placeholder="Enter family type"
            onChange={handleChange}
            value={socialWorkInfo.family_type}
          />
        </Form.Group>
        <h2>Family Group</h2>
            {familyGroup.map((x, i) => {
                return (
                    <div key={i}>
                        <Form.Group controlId={`formFamilyName${i}`}>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                placeholder="Enter name"
                                value={x.name}
                                onChange={(e) => handleFamilyGroupChange(e, i)}
                            />
                        </Form.Group>
                        <Form.Group controlId={`formFamilyRelationship${i}`}>
                        <Form.Label>Relationship</Form.Label>
                        <Form.Control
                            type="text"
                            name="relationship"
                            placeholder="Enter relationship"
                            value={x.relationship}
                            onChange={(e) => handleFamilyGroupChange(e, i)}
                        />
                    </Form.Group>
                    <Form.Group controlId={`formFamilyAge${i}`}>
                        <Form.Label>Age</Form.Label>
                        <Form.Control
                            type="number"
                            name="age"
                            placeholder="Enter age"
                            value={x.age}
                            onChange={(e) => handleFamilyGroupChange(e, i)}
                        />
                    </Form.Group>
                    <Form.Group controlId={`formFamilyNationality${i}`}>
                        <Form.Label>Nationality</Form.Label>
                        <Form.Control
                            type="text"
                            name="nationality"
                            placeholder="Enter nationality"
                            value={x.nationality}
                            onChange={(e) => handleFamilyGroupChange(e, i)}
                        />
                    </Form.Group>
                    <Form.Group controlId={`formFamilyOccupation${i}`}>
                        <Form.Label>Occupation</Form.Label>
                        <Form.Control
                            type="text"
                            name="occupation"
                            placeholder="Enter occupation"
                            value={x.occupation}
                            onChange={(e) => handleFamilyGroupChange(e, i)}
                        />
                    </Form.Group>
                    <Form.Group controlId={`formFamilyID${i}`}>
                        <Form.Label>ID</Form.Label>
                        <Form.Control
                            type="text"
                            name="id"
                            placeholder="Enter ID"
                            value={x.id}
                            onChange={(e) => handleFamilyGroupChange(e, i)}
                        />
                    </Form.Group>
                    <Button variant="danger" onClick={() => handleRemoveFamilyMember(i)}>Remove</Button>
                </div>
            );
        })}
        <Button variant="primary" onClick={handleAddFamilyMember}>Add Family Member</Button>
        <Button variant="primary" type="submit">
          Save
        </Button>
      </Form>
    </div>
  );
}

export default SocialWorkInfo1Form;