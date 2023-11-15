import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Navbar from "../NavigationBar";
import { useSocialWorkInfo1Context } from "../../context/SocialWorkInfo1Context";
import { usePatientContext } from "../../context/PatientContext";
import { useUserContext } from "../../context/UserContext";

function SocialWorkInfo1Form() {
  const location = useLocation();
  const { getUser } = useUserContext();
  const [activeUser, setActiveUser] = useState({
    user_name: "",
    role: "",
    specialty: "",
  });
  const { createSocialWorkInfo1, getSocialWorkInfo1, updateSocialWorkInfo1 } =
    useSocialWorkInfo1Context();
  const { getPatient } = usePatientContext();
  const [socialWorkInfo, setSocialWorkInfo] = useState({
    patient_id: location.state?.id || "",
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
  //const [familyGroup, setFamilyGroup] = useState([{ name: '', relationship: '', age: '', nationality: '', occupation: '', id: '' }]);
  const [familyGroup, setFamilyGroup] = useState([]);

  const params = useParams();
  const navigate = useNavigate();
  const [newMember, setNewMember] = useState({
    name: "",
    relationship: "",
    age: "",
    nationality: "",
    occupation: "",
    id: "",
  });

  const formatDate = (dateString) => {
    if (!dateString) return "";

    const date = new Date(dateString);
    const year = String(date.getFullYear()).padStart(4, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

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
    loadActiveUser();
    const loadSocialWorkInfo = async () => {
      if (params.id) {
        const loadedInfo = await getSocialWorkInfo1(params.id);
        setSocialWorkInfo(loadedInfo);
      } else {
        const userProfessional = activeUser.user_name;
        const patient = await getPatient(socialWorkInfo.patient_id);
        const todayFormatted = formatDate(new Date());
        setSocialWorkInfo((prevInfo) => ({
          ...prevInfo,
          professional: userProfessional,
          interview_date: todayFormatted,
          patient_name: patient.name,
          age: patient.age,
          date_of_birth: formatDate(patient.date_of_birth),
          id: patient.id_number,
          phone_number: patient.cell_phone,
          religion: patient.religion,
          nationality: patient.nationality,
          occupation: patient.occupation,
          educational_level: patient.education_level,
        }));
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

  const handleNewMemberChange = (e) => {
    const { name, value } = e.target;
    setNewMember({ ...newMember, [name]: value });
  };
  const handleAddFamilyMember = () => {
    setFamilyGroup([...familyGroup, newMember]);
    setNewMember({
      name: "",
      relationship: "",
      age: "",
      nationality: "",
      occupation: "",
      id: "",
    }); // Reset the new member form
  };

  const handleRemoveFamilyMember = (index) => {
    const list = [...familyGroup];
    list.splice(index, 1);
    setFamilyGroup(list);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      ...socialWorkInfo,
      familyGroup,
    };
    if (params.id) {
      await updateSocialWorkInfo1(params.id, formData);
    } else {
      await createSocialWorkInfo1(formData);
    }
    navigate(`/socialWorkDashboard/${socialWorkInfo.patient_id}`);
    setSocialWorkInfo({
      // ... reset to initial state
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
  };

  return (
    <>
      <Navbar />
      <div
        style={{ display: "block", margin: "auto", width: 400, padding: 30 }}
      >
        <Form onSubmit={handleSubmit}>
          <h1 className="text-center mb-4">
            {params.id
              ? "Edit Social Work Info"
              : "Nueva información de trabajo social"}
          </h1>
          <Form.Group controlId="formProfessional" className="mb-3">
            <Form.Label>Profesional</Form.Label>
            <Form.Control
              type="text"
              name="professional"
              placeholder="Ingrese profesional especialista"
              onChange={handleChange}
              value={socialWorkInfo.professional}
            />
          </Form.Group>
          <Form.Group controlId="formInterviewDate" className="mb-3">
            <Form.Label>Fecha de la entrevista</Form.Label>
            <Form.Control
              type="date"
              name="interview_date"
              onChange={handleChange}
              value={socialWorkInfo.interview_date}
            />
          </Form.Group>
          <Form.Group controlId="formClinicalHistory" className="mb-3">
            <Form.Label>Historia Clínica</Form.Label>
            <Form.Control
              as="select"
              name="clinical_history"
              onChange={handleChange}
              value={socialWorkInfo.clinical_history}
            >
              <option value="">Seleccione una opción</option>
              <option value="Visita domiciliar">Visita domiciliar</option>
              <option value="Consulta externa">Consulta externa</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formPeopleInterviewed" className="mb-3">
            <Form.Label>Personas entrevistadas</Form.Label>
            <Form.Control
              type="text"
              name="people_interviewed"
              placeholder="Ingrese personas entrevistadas"
              onChange={handleChange}
              value={socialWorkInfo.people_interviewed}
            />
          </Form.Group>
          <Form.Group controlId="formPatientName" className="mb-3">
            <Form.Label>Nombre completo de paciente</Form.Label>
            <Form.Control
              type="text"
              name="patient_name"
              placeholder="Ingrese nombre completo de paciente"
              onChange={handleChange}
              value={socialWorkInfo.patient_name}
            />
          </Form.Group>
          <Form.Group controlId="formID" className="mb-3">
            <Form.Label>Cédula</Form.Label>
            <Form.Control
              type="text"
              name="id"
              placeholder="Enter ID"
              onChange={handleChange}
              value={socialWorkInfo.id}
            />
          </Form.Group>
          <Form.Group controlId="formAge" className="mb-3">
            <Form.Label>Edad</Form.Label>
            <Form.Control
              type="number"
              name="age"
              placeholder="Ingrese edad"
              onChange={handleChange}
              value={socialWorkInfo.age}
            />
          </Form.Group>
          <Form.Group controlId="formDateOfBirth" className="mb-3">
            <Form.Label>Fecha de nacimiento</Form.Label>
            <Form.Control
              type="date"
              name="date_of_birth"
              onChange={handleChange}
              value={socialWorkInfo.date_of_birth}
            />
          </Form.Group>
          <Form.Group controlId="formGender" className="mb-3">
            <Form.Label>Género</Form.Label>
            <Form.Control
              as="select"
              name="gender"
              onChange={handleChange}
              value={socialWorkInfo.gender}
            >
              <option value="">Seleccione una opción</option>
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formMedicalCondition" className="mb-3">
            <Form.Label>Condición</Form.Label>
            <Form.Control
              as="select"
              name="medical_condition"
              onChange={handleChange}
              value={socialWorkInfo.medical_condition}
            >
              <option value="">Seleccione una opción</option>
              <option value="Crónico">Crónico</option>
              <option value="Cáncer">Cáncer</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formInsurance" className="mb-3">
            <Form.Label>Seguro médico</Form.Label>
            <div>
              <Form.Check
                inline
                type="radio"
                label="Sí"
                name="insurance"
                value="Yes"
                checked={socialWorkInfo.insurance === true}
                onChange={() =>
                  setSocialWorkInfo({ ...socialWorkInfo, insurance: true })
                }
              />
              <Form.Check
                inline
                type="radio"
                label="No"
                name="insurance"
                value="No"
                checked={socialWorkInfo.insurance === false}
                onChange={() =>
                  setSocialWorkInfo({ ...socialWorkInfo, insurance: false })
                }
              />
            </div>
          </Form.Group>
          <Form.Group controlId="formInsuranceType" className="mb-3">
            <Form.Label>Tipo de seguro</Form.Label>
            <Form.Control
              type="text"
              name="insurance_type"
              placeholder="Ingrese el tipo de seguro"
              onChange={handleChange}
              value={socialWorkInfo.insurance_type}
              disabled={socialWorkInfo.insurance === false}
            />
          </Form.Group>
          <Form.Group controlId="formPension">
            <Form.Label>Pensión</Form.Label>
            <div>
              <Form.Check
                inline
                type="radio"
                label="Sí"
                name="pension"
                value="Yes"
                checked={socialWorkInfo.pension === true}
                onChange={() =>
                  setSocialWorkInfo({ ...socialWorkInfo, pension: true })
                }
              />
              <Form.Check
                inline
                type="radio"
                label="No"
                name="pension"
                value="No"
                checked={socialWorkInfo.pension === false}
                onChange={() =>
                  setSocialWorkInfo({ ...socialWorkInfo, pension: false })
                }
              />
            </div>
          </Form.Group>
          <Form.Group controlId="formPensionType" className="mb-3">
            <Form.Label>Tipo de pensión</Form.Label>
            <Form.Control
              type="text"
              name="pension_type"
              placeholder="Ingrese el tipo de pensión"
              onChange={handleChange}
              value={socialWorkInfo.pension_type}
              disabled={socialWorkInfo.pension === false}
            />
          </Form.Group>
          <Form.Group controlId="formSupportNetwork">
            <Form.Label>Red apoyo</Form.Label>
            <div>
              <Form.Check
                inline
                type="radio"
                label="Sí"
                name="support_network"
                value="Yes"
                checked={socialWorkInfo.support_network === true}
                onChange={() =>
                  setSocialWorkInfo({
                    ...socialWorkInfo,
                    support_network: true,
                  })
                }
              />
              <Form.Check
                inline
                type="radio"
                label="No"
                name="support_network"
                value="No"
                checked={socialWorkInfo.support_network === false}
                onChange={() =>
                  setSocialWorkInfo({
                    ...socialWorkInfo,
                    support_network: false,
                  })
                }
              />
            </div>
          </Form.Group>
          <Form.Group controlId="formSupportType" className="mb-3">
            <Form.Label>Tipo de red apoyo</Form.Label>
            <Form.Control
              type="text"
              name="support_type"
              placeholder="Ingrese el tipo de red apoyo"
              onChange={handleChange}
              value={socialWorkInfo.support_type}
              disabled={socialWorkInfo.support_network === false}
            />
          </Form.Group>
          <Form.Group controlId="formHousing" className="mb-3">
            <Form.Label>Vivienda</Form.Label>
            <Form.Control
              as="select"
              name="housing"
              placeholder="Enter housing"
              onChange={handleChange}
              value={socialWorkInfo.housing}
            >
              <option value="">Seleccione una opción</option>
              <option value="Propia hipotecada">Propia hipotecada</option>
              <option value="Propia libre">Propia libre</option>
              <option value="Prestada">Prestada</option>
              <option value="Alquilada">Alquilada</option>
              <option value="Usufructo">Usufructo</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formDiagnosis" className="mb-3">
            <Form.Label>Diagnóstico</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="diagnosis"
              placeholder="Ingrese el diagnóstico"
              onChange={handleChange}
              value={socialWorkInfo.diagnosis}
            />
          </Form.Group>
          <Form.Group controlId="formPhoneNumber" className="mb-3">
            <Form.Label>Número de teléfono</Form.Label>
            <Form.Control
              type="text"
              name="phone_number"
              placeholder="Ingrese el número de teléfono"
              onChange={handleChange}
              value={socialWorkInfo.phone_number}
            />
          </Form.Group>
          <Form.Group controlId="formReligion" className="mb-3">
            <Form.Label>Religión</Form.Label>
            <Form.Control
              type="text"
              name="religion"
              placeholder="Ingrese religión"
              onChange={handleChange}
              value={socialWorkInfo.religion}
            />
          </Form.Group>
          <Form.Group controlId="formNationality" className="mb-3">
            <Form.Label>Nacionalidad</Form.Label>
            <Form.Control
              type="text"
              name="nationality"
              placeholder="Ingrese nacionalidad"
              onChange={handleChange}
              value={socialWorkInfo.nationality}
            />
          </Form.Group>
          <Form.Group controlId="formOccupation" className="mb-3">
            <Form.Label>Profesión u oficio</Form.Label>
            <Form.Control
              type="text"
              name="occupation"
              placeholder="Ingrese Profesión u oficio"
              onChange={handleChange}
              value={socialWorkInfo.occupation}
            />
          </Form.Group>
          <Form.Group controlId="formEducationalLevel" className="mb-3">
            <Form.Label>Nivel académico</Form.Label>
            <Form.Control
              type="text"
              name="educational_level"
              placeholder="Enter educational level"
              onChange={handleChange}
              value={socialWorkInfo.educational_level}
            />
          </Form.Group>
          <Form.Group controlId="formImmigrationStatus" className="mb-3">
            <Form.Label>Estado migratorio</Form.Label>
            <Form.Control
              as="select"
              name="immigration_status"
              placeholder="Enter immigration status"
              onChange={handleChange}
              value={socialWorkInfo.immigration_status}
            >
              <option value="">Seleccione una opción</option>
              <option value="Legal">Legal</option>
              <option value="Ilegal">Ilegal</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formKnowsDiagnosis" className="mb-3">
            <Form.Label>Conoce su diagnóstico</Form.Label>
            <div>
              <Form.Check
                inline
                type="radio"
                label="Sí"
                name="knows_diagnosis"
                value="Yes"
                checked={socialWorkInfo.knows_diagnosis === true}
                onChange={() =>
                  setSocialWorkInfo({
                    ...socialWorkInfo,
                    knows_diagnosis: true,
                  })
                }
              />
              <Form.Check
                inline
                type="radio"
                label="No"
                name="knows_diagnosis"
                value="No"
                checked={socialWorkInfo.knows_diagnosis === false}
                onChange={() =>
                  setSocialWorkInfo({
                    ...socialWorkInfo,
                    knows_diagnosis: false,
                  })
                }
              />
            </div>
          </Form.Group>
          <Form.Group controlId="formReferredBy" className="mb-3">
            <Form.Label>Referido por</Form.Label>
            <Form.Control
              as="select"
              name="referred_by"
              placeholder="Enter referred by"
              onChange={handleChange}
              value={socialWorkInfo.referred_by}
            >
              <option value="">Seleccione una opción</option>
              <option value="Médico">Médico</option>
              <option value="Enfermería">Enfermería</option>
              <option value="Psicología">Psicología</option>
              <option value="Terapia Física">Terapia Física</option>
              <option value="Otro">Otro</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formHeadOfFamily" className="mb-3">
            <Form.Label>Jefe de familia</Form.Label>
            <div>
              <Form.Check
                inline
                type="radio"
                label="Sí"
                name="head_of_family"
                value="Yes"
                checked={socialWorkInfo.head_of_family === true}
                onChange={() =>
                  setSocialWorkInfo({ ...socialWorkInfo, head_of_family: true })
                }
              />
              <Form.Check
                inline
                type="radio"
                label="No"
                name="head_of_family"
                value="No"
                checked={socialWorkInfo.head_of_family === false}
                onChange={() =>
                  setSocialWorkInfo({
                    ...socialWorkInfo,
                    head_of_family: false,
                  })
                }
              />
            </div>
          </Form.Group>
          <Form.Group controlId="formMaritalStatus" className="mb-3">
            <Form.Label>Estado civil</Form.Label>
            <Form.Control
              as="select"
              name="marital_status"
              placeholder="Enter marital status"
              onChange={handleChange}
              value={socialWorkInfo.marital_status}
            >
              <option value="">Seleccione una opción</option>
              <option value="Casado/a">Casado/a</option>
              <option value="Viudo/a">Viudo/a</option>
              <option value="Soltero/a">Soltero/a</option>
              <option value="Separado/a">Separado/a</option>
              <option value="Unión libre">Unión libre</option>
              <option value="Divorciado/a">Divorciado/a</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formPrimaryCaregiver" className="mb-3">
            <Form.Label>Cuidador(a) principal</Form.Label>
            <Form.Control
              type="text"
              name="primary_caregiver"
              placeholder="Ingrese cuidador(a) principal"
              onChange={handleChange}
              value={socialWorkInfo.primary_caregiver}
            />
          </Form.Group>
          <Form.Group controlId="formFamilyType" className="mb-4">
            <Form.Label>Tipo de familia</Form.Label>
            <Form.Control
              as="select"
              name="family_type"
              placeholder="Enter family type"
              onChange={handleChange}
              value={socialWorkInfo.family_type}
            >
              <option value="">Seleccione una opción</option>
              <option value="Nuclear">Nuclear</option>
              <option value="Extensa">Extensa</option>
              <option value="Compuesta">Compuesta</option>
              <option value="Uniparental">Uniparental</option>
              <option value="Otro">Otro</option>
            </Form.Control>
          </Form.Group>
          <div>
            <h2>Grupo Familiar</h2>
            <Form.Group controlId="formFamilyNameNew" className="mb-1">
              <Form.Label>Nombre completo</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Ingrese nombre del familiar"
                value={newMember.name}
                onChange={handleNewMemberChange}
              />
            </Form.Group>
            <Form.Group controlId="formFamilyRelationshipNew" className="mb-1">
              <Form.Label>Parentesco</Form.Label>
              <Form.Control
                type="text"
                name="relationship"
                placeholder="Ingrese parentesco"
                value={newMember.relationship}
                onChange={handleNewMemberChange}
              />
            </Form.Group>
            <Form.Group controlId="formFamilyAgeNew" className="mb-1">
              <Form.Label>Edad</Form.Label>
              <Form.Control
                type="number"
                name="age"
                placeholder="Ingrese edad"
                value={newMember.age}
                onChange={handleNewMemberChange}
              />
            </Form.Group>
            <Form.Group controlId="formFamilyNationalityNew" className="mb-1">
              <Form.Label>Nacionalidad</Form.Label>
              <Form.Control
                type="text"
                name="nationality"
                placeholder="Ingrese nacionalidad"
                value={newMember.nationality}
                onChange={handleNewMemberChange}
              />
            </Form.Group>
            <Form.Group controlId="formFamilyOccupationNew" className="mb-1">
              <Form.Label>Oficio</Form.Label>
              <Form.Control
                type="text"
                name="occupation"
                placeholder="Ingrese oficio"
                value={newMember.occupation}
                onChange={handleNewMemberChange}
              />
            </Form.Group>
            <Form.Group controlId="formFamilyIDNew" className="mb-1">
              <Form.Label>Cédula</Form.Label>
              <Form.Control
                type="text"
                name="id"
                placeholder="Ingrese cédula"
                value={newMember.id}
                onChange={handleNewMemberChange}
              />
            </Form.Group>

            <Button
              className="mt-3 mb-4"
              variant="primary"
              onClick={handleAddFamilyMember}
            >
              Agregar nuevo familiar
            </Button>

            {familyGroup.length > 0 && (
              <>
                <h2>Familiares</h2>
                {familyGroup.map((member, index) => (
                  <div key={index}>
                    <p>
                      Nombre: {member.name} <br />
                      Parentesco: {member.relationship}
                      <br />
                      Edad: {member.age}
                      <br />
                      Nacionalidad: {member.nationality}
                      <br />
                      Ocupación: {member.occupation}
                      <br />
                      Cédula: {member.id}
                    </p>
                    <Button
                      className="mb-3"
                      variant="danger"
                      onClick={() => handleRemoveFamilyMember(index)}
                    >
                      Remover
                    </Button>
                  </div>
                ))}
              </>
            )}
          </div>
          <div className="d-flex justify-content-between">
            <Button
              style={{ marginTop: "30px" }}
              variant="primary"
              type="submit"
            >
              Guardar
            </Button>
            <Button
              style={{ marginTop: "30px" }}
              variant="outline-secondary"
              type="button"
              onClick={() => navigate(-1)}
            >
              Cancelar
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
}

export default SocialWorkInfo1Form;
