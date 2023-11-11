import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const getSocialWorkInfo3sRequest = async (id) =>
  await axios.get(`${BASE_URL}/socialWorkInfo3/allSocialWorkInfo3s/${id}`);

export const createSocialWorkInfo3Request = async (socialWorkInfo) =>
  await axios.post(`${BASE_URL}/socialWorkInfo3/socialWorkInfos3`, socialWorkInfo);

export const deleteSocialWorkInfo3Request = async (id) =>
  await axios.delete(`${BASE_URL}/socialWorkInfo3/socialWorkInfos3/${id}`);

export const getSocialWorkInfo3Request = async (id) =>
  await axios.get(`${BASE_URL}/socialWorkInfo3/socialWorkInfos3/${id}`);

export const updateSocialWorkInfo3Request = async (id, newFields) =>
  await axios.put(`${BASE_URL}/socialWorkInfo3/socialWorkInfos3/${id}`, newFields);