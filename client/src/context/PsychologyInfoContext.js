import { createContext, useContext, useState } from 'react';
import { 
    createPsychologyInfoRequest,
    getPsychologyInfoRequest,
    updatePsychologyInfoRequest,
    deletePsychologyInfoRequest } from '../api/psychologyInfo.api';

const PsychologyInfoContext = createContext();

export const usePsychologyInfoContext = () => {
    const context = useContext(PsychologyInfoContext);
    if (context === undefined) {
        throw new Error("usePsychologyInfoContext must be used within a PsychologyInfoProvider");
    }
    return context;
}

export const PsychologyInfoProvider = ({ children }) => {
    const [psychologyInfo, setPsychologyInfo] = useState([]);

    const getPsychologyInfo = async (id) => {
        try {
            const response = await getPsychologyInfoRequest(id)
            return response.data
        } catch (error) {
            console.log(error)
        }
    }  

    const deletePsychologyInfo = async (id) => {
        try {
            const response = await deletePsychologyInfoRequest(id);
            setPsychologyInfo(psychologyInfo.filter((info) => info.psychology_info_id !== id));
            return response;
        } catch (error) {
            console.log(error.response.status)
            return error.response.status;
        }
    }

    const createPsychologyInfo = async (info) => {
        try {
            await createPsychologyInfoRequest(info);
        } catch (error) {
            console.log(error)
        }
    }

    const updatePsychologyInfo = async (id, newFields) => {
        try {
            const response = await updatePsychologyInfoRequest(id, newFields);
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <PsychologyInfoContext.Provider
            value={{
                psychologyInfo,
                getPsychologyInfo,
                deletePsychologyInfo,
                createPsychologyInfo,
                updatePsychologyInfo
            }}
        >
            {children}
        </PsychologyInfoContext.Provider>
    );
}