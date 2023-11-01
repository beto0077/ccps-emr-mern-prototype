import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const getOxygenTankLoansRequest = async () =>
  await axios.get(`${BASE_URL}/oxygenTankLoan/loans`);

export const createOxygenTankLoanRequest = async (loan) =>
  await axios.post(`${BASE_URL}/oxygenTankLoan/loans`, loan);

export const deleteOxygenTankLoanRequest = async (id) =>
  await axios.delete(`${BASE_URL}/oxygenTankLoan/loans/${id}`);

export const getOxygenTankLoanRequest = async (id) =>
  await axios.get(`${BASE_URL}/oxygenTankLoan/loans/${id}`);

export const updateOxygenTankLoanRequest = async (id, newFields) =>
  await axios.put(`${BASE_URL}/oxygenTankLoan/loans/${id}`, newFields);