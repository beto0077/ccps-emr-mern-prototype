import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const getPsychologyInfo3sRequest = async (id) =>
  await axios.get(`${BASE_URL}/psychologyInfo3/allPsychologyInfo3s/${id}`);

export const createPsychologyInfo3Request = async (psychologyInfo3) =>
  await axios.post(`${BASE_URL}/psychologyInfo3/psychologyInfo3s`, psychologyInfo3);

export const deletePsychologyInfo3Request = async (id) =>
  await axios.delete(`${BASE_URL}/psychologyInfo3/psychologyInfo3s/${id}`);

export const getPsychologyInfo3Request = async (id) =>
  await axios.get(`${BASE_URL}/psychologyInfo3/psychologyInfo3s/${id}`);

export const updatePsychologyInfo3Request = async (id, newFields) =>
  await axios.put(`${BASE_URL}/psychologyInfo3/psychologyInfo3s/${id}`, newFields);