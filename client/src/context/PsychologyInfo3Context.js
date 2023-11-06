import { createContext, useContext, useState } from 'react';
import { 
    getPsychologyInfo3sRequest,
    createPsychologyInfo3Request,
    updatePsychologyInfo3Request,
    deletePsychologyInfo3Request,
    getPsychologyInfo3Request } from '../api/psychologyInfo3.api.js';

const PsychologyInfo3Context = createContext();

export const usePsychologyInfo3Context = () => {
    const context = useContext(PsychologyInfo3Context);
    if (context === undefined) {
        throw new Error("usePsychologyInfo3Context must be used within a PsychologyInfo3Provider");
    }
    return context;
};

export const PsychologyInfo3Provider = ({ children }) => {
    const [psychologyInfo3s, setPsychologyInfo3s] = useState([]);

    async function loadPsychologyInfo3s() {
        const response = await getPsychologyInfo3sRequest();
        setPsychologyInfo3s(response.data);
    }

    const deletePsychologyInfo3 = async (id) => {
        try {
            const response = await deletePsychologyInfo3Request(id);
            setPsychologyInfo3s(psychologyInfo3s.filter((info) => info.psychology_info3_id !== id));
            return response;
        } catch (error) {
            console.log(error.response.status);
            return error.response.status;
        }
    };

    const createPsychologyInfo3 = async (psychologyInfo3) => {
        try {
            await createPsychologyInfo3Request(psychologyInfo3);
        } catch (error) {
            console.log(error);
        }
    };

    const getPsychologyInfo3 = async (id) => {
        try {
            const response = await getPsychologyInfo3Request(id);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    };

    const updatePsychologyInfo3 = async (id, newFields) => {
        try {
            const response = await updatePsychologyInfo3Request(id, newFields);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <PsychologyInfo3Context.Provider 
            value={{
                psychologyInfo3s,
                loadPsychologyInfo3s,
                deletePsychologyInfo3,
                createPsychologyInfo3,
                getPsychologyInfo3,
                updatePsychologyInfo3
            }}
        >
            {children}
        </PsychologyInfo3Context.Provider>
    );
};