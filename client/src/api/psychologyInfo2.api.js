import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const getPsychologyInfo2sRequest = async () =>
  await axios.get(`${BASE_URL}/psychologyInfo2/psychologyInfo2s`);

export const createPsychologyInfo2Request = async (psychologyInfo2) =>
  await axios.post(`${BASE_URL}/psychologyInfo2/psychologyInfo2s`, psychologyInfo2);

export const deletePsychologyInfo2Request = async (id) =>
  await axios.delete(`${BASE_URL}/psychologyInfo2/psychologyInfo2s/${id}`);

export const getPsychologyInfo2Request = async (id) =>
  await axios.get(`${BASE_URL}/psychologyInfo2/psychologyInfo2s/${id}`);

export const updatePsychologyInfo2Request = async (id, newFields) =>
  await axios.put(`${BASE_URL}/psychologyInfo2/psychologyInfo2s/${id}`, newFields);