import { createContext, useContext, useState } from 'react';
import { getPatientRequest, getPatientsRequest, createPatientRequest, updatePatientRequest, deletePatientRequest } from '../api/patient.api.js';

const PatientContext = createContext();

export const usePatientContext = () => {
    const context = useContext(PatientContext);
    if (context === undefined) {
        throw new Error("usePatientContext must be used within a PatientProvider");
    }
    return context;
}

export const PatientProvider = ({ children }) => {
    const [patients, setPatients] = useState([]);

    async function loadPatients() {
        const response = await getPatientsRequest();
        setPatients(response.data);
    }

    const deletePatient = async (id) => {
        try {
            const response = await deletePatientRequest(id);
            setPatients(patients.filter((patient) => patient.patient_id !== id));
            return response;
        } catch (error) {
            console.log(error.response.status);
            return error.response.status;
        }
    }

    const createPatient = async (patient) => {
        try {
            await createPatientRequest(patient);
        } catch (error) {
            console.log(error);
        }
    }

    const getPatient = async (id) => {
        try {
            const response = await getPatientRequest(id);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    const updatePatient = async (id, newFields) => {
        try {
            const response = await updatePatientRequest(id, newFields);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <PatientContext.Provider 
            value={{
                patients, loadPatients, deletePatient, createPatient, getPatient, updatePatient
            }}
        >
            {children}
        </PatientContext.Provider>
    )
}