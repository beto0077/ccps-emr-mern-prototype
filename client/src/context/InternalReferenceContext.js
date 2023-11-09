import { createContext, useContext, useState } from 'react';

import { 
    getInternalReferencesRequest, 
    createInternalReferenceRequest, 
    updateInternalReferenceRequest, 
    deleteInternalReferenceRequest, 
    getInternalReferenceRequest 
} from '../api/internalReference.api.js';

const InternalReferenceContext = createContext();

export const useInternalReferenceContext = () => {
    const context = useContext(InternalReferenceContext);
    if (context === undefined) {
        throw new Error("useInternalReferenceContext must be used within an InternalReferenceProvider");
    }

    return context;
}

export const InternalReferenceProvider = ({ children }) => {
    const [internalReferences, setInternalReferences] = useState([]);

    async function loadInternalReferences(id) {
        const response = await getInternalReferencesRequest(id);
        setInternalReferences(response.data);
    }

    const deleteInternalReference = async (id) => {
        try {
            const response = await deleteInternalReferenceRequest(id);
            setInternalReferences(internalReferences.filter((reference) => reference.internal_reference_id !== id));
            return response;
        } catch (error) {
            console.log(error.response.status);
            return error.response.status;
        }
    }

    const createInternalReference = async (reference) => {
        try {
            await createInternalReferenceRequest(reference);
        } catch (error) {
            console.log(error);
        }
    }

    const getInternalReference = async (id) => {
        try {
            const response = await getInternalReferenceRequest(id);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    const updateInternalReference = async (id, newFields) => {
        try {
            const response = await updateInternalReferenceRequest(id, newFields);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <InternalReferenceContext.Provider 
            value={{
                internalReferences, 
                loadInternalReferences, 
                deleteInternalReference, 
                createInternalReference, 
                getInternalReference, 
                updateInternalReference
            }}
        >
            {children}
        </InternalReferenceContext.Provider>
    );
}