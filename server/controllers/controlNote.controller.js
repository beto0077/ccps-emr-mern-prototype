// Import the database connection
import { database } from '../utils/database.js';

// Other necessary imports...

export const getControlNotes = async (req, res) => {
    try {
        const [result] = await database.query("SELECT * FROM ControlNotes ORDER BY control_note_id ASC");
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getControlNote = async (req, res) => {
    try {
        const [result] = await database.query("SELECT * FROM ControlNotes WHERE control_note_id = ?", [req.params.id]);

        if (result.length === 0) {
            return res.status(404).json({ message: "Control Note not found" });
        }

        res.json(result[0]);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const createControlNote = async (req, res) => {
    try {
        const {
            physical_therapy_id,
            date,
            patient_name,
            control_notes
        } = req.body;

        const [result] = await database.query(
            "INSERT INTO ControlNotes (physical_therapy_id, date, patient_name, control_notes) VALUES (?, ?, ?, ?)",
            [physical_therapy_id, date, patient_name, control_notes]
        );

        res.json({
            control_note_id: result.insertId,
            physical_therapy_id,
            date,
            patient_name,
            control_notes
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const updateControlNote = async (req, res) => {
    try {
        const result = await database.query(
            "UPDATE ControlNotes SET ? WHERE control_note_id = ?",
            [req.body, req.params.id]
        );

        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deleteControlNote = async (req, res) => {
    try {
        const [result] = await database.query("DELETE FROM ControlNotes WHERE control_note_id = ?", [req.params.id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Control Note not found" });
        }

        return res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};