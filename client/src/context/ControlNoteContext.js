import { createContext, useContext, useState } from 'react';

import { 
    getControlNotesRequest, 
    getControlNoteRequest, 
    createControlNoteRequest, 
    updateControlNoteRequest, 
    deleteControlNoteRequest 
} from '../api/controlNote.api.js';

const ControlNoteContext = createContext();

export const useControlNoteContext = () => {
    const context = useContext(ControlNoteContext);
    if (context === undefined) {
        throw new Error("useControlNoteContext must be used within a ControlNoteProvider");
    }

    return context;
}

export const ControlNoteProvider = ({ children }) => {
    const [controlNotes, setControlNotes] = useState([]);

    async function loadControlNotes(id) {
        try {
            const response = await getControlNotesRequest(id);
            setControlNotes(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    const deleteControlNote = async (id) => {
        try {
            const response = await deleteControlNoteRequest(id);
            setControlNotes(controlNotes.filter((note) => note.control_note_id !== id));
            return response;
        } catch (error) {
            console.log(error.response.status);
            console.error(error);
        }
    }

    const createControlNote = async (controlNote) => {
        try {
            await createControlNoteRequest(controlNote);
        } catch (error) {
            console.error(error);
        }
    }

    const getControlNote = async (id) => {
        try {
            const response = await getControlNoteRequest(id);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    const updateControlNote = async (id, newFields) => {
        try {
            await updateControlNoteRequest(id, newFields);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <ControlNoteContext.Provider 
            value={{
                controlNotes, 
                loadControlNotes, 
                deleteControlNote, 
                createControlNote, 
                getControlNote, 
                updateControlNote
            }}
        >
            {children}
        </ControlNoteContext.Provider>
    );
}