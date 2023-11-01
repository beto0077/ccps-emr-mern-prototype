import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const getPhysicalTherapyInfosRequest = async () =>
  await axios.get(`${BASE_URL}/physicalTherapyInfos`);

export const createPhysicalTherapyInfoRequest = async (physicalTherapyInfo) =>
  await axios.post(`${BASE_URL}/physicalTherapyInfos`, physicalTherapyInfo);

export const deletePhysicalTherapyInfoRequest = async (id) =>
  await axios.delete(`${BASE_URL}/physicalTherapyInfos/${id}`);

export const getPhysicalTherapyInfoRequest = async (id) =>
  await axios.get(`${BASE_URL}/physicalTherapyInfos/${id}`);

export const updatePhysicalTherapyInfoRequest = async (id, newFields) =>
  await axios.put(`${BASE_URL}/physicalTherapyInfos/${id}`, newFields);