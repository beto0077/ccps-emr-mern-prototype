import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const createSocialWorkInfo2Request = async (socialWorkInfo) =>
  await axios.post(`${BASE_URL}/socialWorkInfo2/socialWorkInfos2`, socialWorkInfo);

export const deleteSocialWorkInfo2Request = async (id) =>
  await axios.delete(`${BASE_URL}/socialWorkInfo2/socialWorkInfos2/${id}`);

export const getSocialWorkInfo2Request = async (id) =>
  await axios.get(`${BASE_URL}/socialWorkInfo2/socialWorkInfos2/${id}`);

export const updateSocialWorkInfo2Request = async (id, newFields) =>
  await axios.put(`${BASE_URL}/socialWorkInfo2/socialWorkInfos2/${id}`, newFields);