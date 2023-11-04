import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const createSocialWorkInfo1Request = async (socialWorkInfo) =>
  await axios.post(`${BASE_URL}/socialWorkInfo1/socialWorkInfos1`, socialWorkInfo);

export const deleteSocialWorkInfo1Request = async (id) =>
  await axios.delete(`${BASE_URL}/socialWorkInfo1/socialWorkInfos1/${id}`);

export const getSocialWorkInfo1Request = async (id) =>
  await axios.get(`${BASE_URL}/socialWorkInfo1/socialWorkInfos1/${id}`);

export const updateSocialWorkInfo1Request = async (id, newFields) =>
  await axios.put(`${BASE_URL}/socialWorkInfo1/socialWorkInfos1/${id}`, newFields);