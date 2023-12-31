import { createContext, useContext, useState } from 'react';
import { 
    getPatientRequest, 
    getPatientsRequest,
    searchPatientByIdRequest,
    createPatientRequest, 
    updatePatientRequest,
    togglePatientAliveStatusRequest, 
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

    const toggleAliveStatus = async (id, patientInfo, setPatientInfo) => {
        try {
          // Fetch the current patient's data
          const patientFound = await getPatientRequest(id);
          // Toggle the alive status of the patient
          await togglePatientAliveStatusRequest(patientFound.data.patient_id, !patientFound.data.alive_status);
      
          // Update the local state with the new alive status
          setPatientInfo({
            ...patientInfo,
            alive_status: !patientFound.data.alive_status
          });
      
        } catch (error) {
          // Log any errors that occur during the process
          console.error(error);
        }
      };

    const searchPatientById = async (idNumber) => {
        try {
            const response = await searchPatientByIdRequest(idNumber);
            if (response.status === 200) {
                return response.data;
            } else {
                console.error(`Failed to search patient by ID, status code: ${response.status}`);
                return null;
            }
        } catch (error) {
            console.error("Failed to search patient by ID:", error);
            return null;
        }
    };

    return (
        <PatientContext.Provider 
            value={{
                patients, loadPatients, deletePatient, createPatient, getPatient, updatePatient, toggleAliveStatus, searchPatientById
            }}
        >
            {children}
        </PatientContext.Provider>
    )
}