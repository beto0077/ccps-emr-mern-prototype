import { createContext, useContext, useState } from 'react';

import { 
    getControlNotesRequest, 
    getControlNoteRequest, 
    createControlNoteRequest, 
    updateControlNoteRequest, 
    deleteControlNoteRequest 
} from '../api/controlNotes.api';

const ControlNotesContext = createContext();

export const useControlNotesContext = () => {
    const context = useContext(ControlNotesContext);
    if (context === undefined) {
        throw new Error("useControlNotesContext must be used within a ControlNotesProvider");
    }

    return context;
}

export const ControlNotesProvider = ({ children }) => {
    const [controlNotes, setControlNotes] = useState([]);

    async function loadControlNotes() {
        const response = await getControlNotesRequest();
        setControlNotes(response.data);
    }

    const deleteControlNote = async (id) => {
        try {
            await deleteControlNoteRequest(id);
            setControlNotes(controlNotes.filter((note) => note.control_note_id !== id));
        } catch (error) {
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
        <ControlNotesContext.Provider 
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
        </ControlNotesContext.Provider>
    );
}