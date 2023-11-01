// Import the database connection from '../utils/db.js'
import { db } from '../utils/db.js';

export const getPsychologyInfo3s = async (req, res) => {
    try {
        const [result] = await db.query("SELECT * FROM PsychologyInfo3 ORDER BY psychology_info3_id ASC");
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

export const getPsychologyInfo3 = async (req, res) => {
    try {
        const [result] = await db.query("SELECT * FROM PsychologyInfo3 WHERE psychology_info3_id = ?", [req.params.id]);

        if (result.length === 0) {
            return res.status(404).json({ message: "Record not found" });
        }

        res.json(result[0]);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const createPsychologyInfo3 = async (req, res) => {
    try {
        const {
            patient_id,
            name,
            id,
            progress,
            treatment
        } = req.body;

        const [result] = await db.query(
            "INSERT INTO PsychologyInfo3 (patient_id, name, id, progress, treatment) VALUES (?, ?, ?, ?, ?)",
            [patient_id, name, id, progress, treatment]
        );

        res.json({
            psychology_info3_id: result.insertId,
            patient_id,
            name,
            id,
            progress,
            treatment
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const updatePsychologyInfo3 = async (req, res) => {
    try {
        const result = await db.query(
            "UPDATE PsychologyInfo3 SET ? WHERE psychology_info3_id = ?",
            [req.body, req.params.id]
        );

        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deletePsychologyInfo3 = async (req, res) => {
    try {
        const [result] = await db.query("DELETE FROM PsychologyInfo3 WHERE psychology_info3_id = ?", [req.params.id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Record not found" });
        }

        return res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};