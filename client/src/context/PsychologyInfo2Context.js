import { createContext, useContext, useState } from 'react';

import { 
    getPsychologyInfo2sRequest,
    createPsychologyInfo2Request,
    deletePsychologyInfo2Request,
    getPsychologyInfo2Request,
    updatePsychologyInfo2Request } from '../api/psychologyInfo2.api.js';

const PsychologyInfo2Context = createContext();

export const usePsychologyInfo2Context = () => {
    const context = useContext(PsychologyInfo2Context);
    if (context === undefined) {
        throw new Error("usePsychologyInfo2Context must be used within a PsychologyInfo2Provider");
    }

    return context;
};

export const PsychologyInfo2Provider = ({ children }) => {
    const [psychologyInfo2s, setPsychologyInfo2s] = useState([]);

    async function loadPsychologyInfo2s() {
        const response = await getPsychologyInfo2sRequest();
        setPsychologyInfo2s(response.data);
    }

    const deletePsychologyInfo2 = async (id) => {
        try {
            const response = await deletePsychologyInfo2Request(id);
        setPsychologyInfo2s(psychologyInfo2s.filter((info) => info.psychology_info2_id !== id));
        return response;
        } catch (error) {
            console.log(error.response.status);
            return error.response.status;
        }
    };

    const createPsychologyInfo2 = async (info) => {
        try {
            await createPsychologyInfo2Request(info);
        } catch (error) {
            console.log(error);
        }
    };

    const getPsychologyInfo2 = async (id) => {
        try {
            const response = await getPsychologyInfo2Request(id);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    };

    const updatePsychologyInfo2 = async (id, newFields) => {
        try {
            const response = await updatePsychologyInfo2Request(id, newFields);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <PsychologyInfo2Context.Provider 
            value={{
                psychologyInfo2s,
                loadPsychologyInfo2s,
                deletePsychologyInfo2,
                createPsychologyInfo2,
                getPsychologyInfo2,
                updatePsychologyInfo2
            }}
        >
            {children}
        </PsychologyInfo2Context.Provider>
    );
};