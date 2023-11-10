import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const getLoansRequest = async (id) =>
  await axios.get(`${BASE_URL}/equipmentLoan/allLoans/${id}`);

export const createLoanRequest = async (loan) =>
  await axios.post(`${BASE_URL}/equipmentLoan/loans`, loan);

export const deleteLoanRequest = async (id) =>
  await axios.delete(`${BASE_URL}/equipmentLoan/loans/${id}`);

export const getLoanRequest = async (id) =>
  await axios.get(`${BASE_URL}/equipmentLoan/loans/${id}`);

export const updateLoanRequest = async (id, newFields) =>
  await axios.put(`${BASE_URL}/equipmentLoan/loans/${id}`, newFields);
