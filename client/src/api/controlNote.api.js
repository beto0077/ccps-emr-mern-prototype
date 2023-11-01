import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const getControlNotesRequest = async () =>
  await axios.get(`${BASE_URL}/controlNotes`);

export const createControlNoteRequest = async (controlNote) =>
  await axios.post(`${BASE_URL}/controlNotes`, controlNote);

export const deleteControlNoteRequest = async (id) =>
  await axios.delete(`${BASE_URL}/controlNotes/${id}`);

export const getControlNoteRequest = async (id) =>
  await axios.get(`${BASE_URL}/controlNotes/${id}`);

export const updateControlNoteRequest = async (id, newFields) =>
  await axios.put(`${BASE_URL}/controlNotes/${id}`, newFields);