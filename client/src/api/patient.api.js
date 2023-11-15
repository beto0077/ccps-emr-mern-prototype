import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const getPatientsRequest = async () =>
  await axios.get(`${BASE_URL}/patient/patients`);

export const createPatientRequest = async (patient) =>
  await axios.post(`${BASE_URL}/patient/patients`, patient);

export const deletePatientRequest = async (id) =>
  await axios.delete(`${BASE_URL}/patient/patients/${id}`);

export const getPatientRequest = async (id) =>
  await axios.get(`${BASE_URL}/patient/patients/${id}`);

export const searchPatientByIdRequest = async (idNumber) =>
  await axios.get(`${BASE_URL}/patient/patients/search/${idNumber}`);

export const updatePatientRequest = async (id, newFields) =>
  await axios.put(`${BASE_URL}/patient/patients/${id}`, newFields);

export const togglePatientAliveStatusRequest = async (id, alive_status) =>
  await axios.put(`${BASE_URL}/patient/patients/${id}`, {
    alive_status,
  });