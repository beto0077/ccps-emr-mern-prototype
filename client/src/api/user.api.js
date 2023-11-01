import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const loginRequest = async (user) =>
  await axios.post(`${BASE_URL}/users/login`, user);

export const getUsersRequest = async () =>
  await axios.get(`${BASE_URL}/users`);

export const createUserRequest = async (user) =>
  await axios.post(`${BASE_URL}/users`, user);

export const deleteUserRequest = async (id) =>
  await axios.delete(`${BASE_URL}/users/${id}`);

export const getUserRequest = async (id) =>
  await axios.get(`${BASE_URL}/users/${id}`);

export const updateUserRequest = async (id, newFields) =>
  await axios.put(`${BASE_URL}/users/${id}`, newFields);