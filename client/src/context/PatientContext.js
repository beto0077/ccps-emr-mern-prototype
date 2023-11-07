import { createContext, useContext, useState } from 'react';
import { 
    getPatientRequest, 
    getPatientsRequest,
    searchPatientByIdRequest,
    createPatientRequest, 
    updatePatientRequest, 
    deletePatientRequest } from '../api/patient.api.js';

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

    const searchPatientById = async (idNumber) => {
        try {
            // Replace 'searchPatientByIdRequest' with the actual function name you define in patient.api.js
            const response = await searchPatientByIdRequest(idNumber);
            if (response.status === 200) {
                // Assuming the patient data is returned directly in the response body
                return response.data;
            } else {
                // Handle any other HTTP status codes appropriately
                console.error(`Failed to search patient by ID, status code: ${response.status}`);
                return null;
            }
        } catch (error) {
            // Handle errors appropriately - you might want to log them, throw them, or return null
            console.error("Failed to search patient by ID:", error);
            return null;
        }
    };

    return (
        <PatientContext.Provider 
            value={{
                patients, loadPatients, deletePatient, createPatient, getPatient, updatePatient, searchPatientById
            }}
        >
            {children}
        </PatientContext.Provider>
    )
}