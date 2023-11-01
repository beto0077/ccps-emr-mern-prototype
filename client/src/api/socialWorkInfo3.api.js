import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const getSocialWorkInfosRequest = async () =>
  await axios.get(`${BASE_URL}/socialWorkInfo3/socialWorkInfos`);

export const createSocialWorkInfoRequest = async (socialWorkInfo) =>
  await axios.post(`${BASE_URL}/socialWorkInfo3/socialWorkInfos`, socialWorkInfo);

export const deleteSocialWorkInfoRequest = async (id) =>
  await axios.delete(`${BASE_URL}/socialWorkInfo3/socialWorkInfos/${id}`);

export const getSocialWorkInfoRequest = async (id) =>
  await axios.get(`${BASE_URL}/socialWorkInfo3/socialWorkInfos/${id}`);

export const updateSocialWorkInfoRequest = async (id, newFields) =>
  await axios.put(`${BASE_URL}/socialWorkInfo3/socialWorkInfos/${id}`, newFields);