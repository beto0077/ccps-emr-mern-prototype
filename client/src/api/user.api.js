import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const loginRequest = async (user) =>
  await axios.post(`${BASE_URL}/user/login`, user);

export const getUsersRequest = async () =>
  await axios.get(`${BASE_URL}/user/users`);

export const createUserRequest = async (user) =>
  await axios.post(`${BASE_URL}/user/users`, user);

export const deleteUserRequest = async (id) =>
  await axios.delete(`${BASE_URL}/user/users/${id}`);

export const getUserRequest = async (id) =>
  await axios.get(`${BASE_URL}/user/users/${id}`);

export const updateUserRequest = async (id, newFields) =>
  await axios.put(`${BASE_URL}/user/users/${id}`, newFields);