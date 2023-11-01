import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const getAttachmentsRequest = async () =>
  await axios.get(`${BASE_URL}/attachment/attachments`);

export const createAttachmentRequest = async (attachment) =>
  await axios.post(`${BASE_URL}/attachment/attachments`, attachment);

export const deleteAttachmentRequest = async (id) =>
  await axios.delete(`${BASE_URL}/attachment/attachments/${id}`);

export const getAttachmentRequest = async (id) =>
  await axios.get(`${BASE_URL}/attachment/attachments/${id}`);

export const updateAttachmentRequest = async (id, newFields) =>
  await axios.put(`${BASE_URL}/attachment/attachments/${id}`, newFields);
