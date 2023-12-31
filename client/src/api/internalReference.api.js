import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const getInternalReferencesRequest = async (id) =>
  await axios.get(`${BASE_URL}/internalReference/allInternalReferences/${id}`);

export const createInternalReferenceRequest = async (internalReference) =>
  await axios.post(`${BASE_URL}/internalReference/internalReferences`, internalReference);

export const deleteInternalReferenceRequest = async (id) =>
  await axios.delete(`${BASE_URL}/internalReference/internalReferences/${id}`);

export const getInternalReferenceRequest = async (id) =>
  await axios.get(`${BASE_URL}/internalReference/internalReferences/${id}`);

export const updateInternalReferenceRequest = async (id, newFields) =>
  await axios.put(`${BASE_URL}/internalReference/internalReferences/${id}`, newFields);