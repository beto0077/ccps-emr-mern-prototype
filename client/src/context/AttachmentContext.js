import { createContext, useContext, useState } from 'react';
import { 
    getAttachmentsRequest, 
    createAttachmentRequest, 
    updateAttachmentRequest, 
    deleteAttachmentRequest, 
    getAttachmentRequest } from '../api/attachment.api.js';

const AttachmentContext = createContext();

export const useAttachmentContext = () => {
    const context = useContext(AttachmentContext);
    if (context === undefined) {
        throw new Error("useAttachmentContext must be used within an AttachmentProvider");
    }
    return context;
}

export const AttachmentProvider = ({ children }) => {
    const [attachments, setAttachments] = useState([]);

    async function loadAttachments() {
        const response = await getAttachmentsRequest();
        setAttachments(response.data);
    }

    const deleteAttachment = async (id) => {
        try {
            const response = await deleteAttachmentRequest(id);
            setAttachments(attachments.filter((attachment) => attachment.attachment_id !== id));
            return response;
        } catch (error) {
            console.log(error.response.status);
            return error.response.status;
        }
    }

    const createAttachment = async (attachment) => {
        try {
            await createAttachmentRequest(attachment);
        } catch (error) {
            console.log(error);
        }
    }

    const getAttachment = async (id) => {
        try {
            const response = await getAttachmentRequest(id);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    const updateAttachment = async (id, newFields) => {
        try {
            const response = await updateAttachmentRequest(id, newFields);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <AttachmentContext.Provider 
            value={{
                attachments,
                loadAttachments,
                deleteAttachment,
                createAttachment,
                getAttachment,
                updateAttachment
            }}
        >
            {children}
        </AttachmentContext.Provider>
    );
}
