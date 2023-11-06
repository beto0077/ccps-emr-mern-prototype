import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const getPhysicalTherapyInfosRequest = async () =>
  await axios.get(`${BASE_URL}/physicalTherapyInfo/physicalTherapyInfos`);

export const createPhysicalTherapyInfoRequest = async (physicalTherapyInfo) =>
  await axios.post(`${BASE_URL}/physicalTherapyInfo/physicalTherapyInfos`, physicalTherapyInfo);

export const deletePhysicalTherapyInfoRequest = async (id) =>
  await axios.delete(`${BASE_URL}/physicalTherapyInfo/physicalTherapyInfos/${id}`);

export const getPhysicalTherapyInfoRequest = async (id) =>
  await axios.get(`${BASE_URL}/physicalTherapyInfo/physicalTherapyInfos/${id}`);

export const updatePhysicalTherapyInfoRequest = async (id, newFields) =>
  await axios.put(`${BASE_URL}/physicalTherapyInfo/physicalTherapyInfos/${id}`, newFields);