import { createContext, useContext, useState } from 'react';
import { 
    getPhysicalTherapyInfoRequest,
    createPhysicalTherapyInfoRequest,
    updatePhysicalTherapyInfoRequest,
    deletePhysicalTherapyInfoRequest } from '../api/physicalTherapyInfo.api';

const PhysicalTherapyInfoContext = createContext();

export const usePhysicalTherapyInfoContext = () => {
    const context = useContext(PhysicalTherapyInfoContext);
    if (context === undefined) {
        throw new Error("usePhysicalTherapyInfoContext must be used within a PhysicalTherapyInfoProvider");
    }
    return context;
}

export const PhysicalTherapyInfoProvider = ({ children }) => {
    const [physicalTherapyInfos, setPhysicalTherapyInfos] = useState([]);

    const deletePhysicalTherapyInfo = async (id) => {
        try {
            const response = await deletePhysicalTherapyInfoRequest(id);
            setPhysicalTherapyInfos(physicalTherapyInfos.filter((info) => info.physical_therapy_id !== id));
            return response;
        } catch (error) {
            console.log(error.response.status);
            return error.response.status;
        }
    }

    const createPhysicalTherapyInfo = async (info) => {
        try {
            await createPhysicalTherapyInfoRequest(info);
        } catch (error) {
            console.log(error);
        }
    }

    const getPhysicalTherapyInfo = async (id) => {
        try {
            const response = await getPhysicalTherapyInfoRequest(id);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    const updatePhysicalTherapyInfo = async (id, newFields) => {
        try {
            const response = await updatePhysicalTherapyInfoRequest(id, newFields);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <PhysicalTherapyInfoContext.Provider 
            value={{
                physicalTherapyInfos,
                deletePhysicalTherapyInfo,
                createPhysicalTherapyInfo,
                getPhysicalTherapyInfo,
                updatePhysicalTherapyInfo
            }}
        >
            {children}
        </PhysicalTherapyInfoContext.Provider>
    );
}