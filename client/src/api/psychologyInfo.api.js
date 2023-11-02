import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const getPsychologyInfoRequest = async (id) =>
  await axios.get(`${BASE_URL}/psychologyInfo/psychologyInfos/${id}`);

export const createPsychologyInfoRequest = async (psychologyInfo) =>
  await axios.post(`${BASE_URL}/psychologyInfo/psychologyInfos`, psychologyInfo);

export const updatePsychologyInfoRequest = async (id, updatedInfo) =>
  await axios.put(`${BASE_URL}/psychologyInfo/psychologyInfos/${id}`, updatedInfo);

export const deletePsychologyInfoRequest = async (id) =>
  await axios.delete(`${BASE_URL}/psychologyInfo/psychologyInfos/${id}`);
