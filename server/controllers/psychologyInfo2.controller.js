import { database } from '../utils/database.js';

export const getPsychologyInfo2s = async (req, res) => {
    try {
        const [result] = await database.query("SELECT * FROM PsychologyInfo2 ORDER BY psychology_info2_id ASC");
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

export const getPsychologyInfo2 = async (req, res) => {
    try {
        const [result] = await database.query("SELECT * FROM PsychologyInfo2 WHERE patient_id = ?", [req.params.id]);

        if (result.length === 0) {
            return res.status(404).json({ message: "Record not found" });
        }

        res.json(result[0]);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const createPsychologyInfo2 = async (req, res) => {
    try {
        const {
            patient_id,
            evaluation_date,
            date_of_birth,
            full_name,
            age,
            marital_status,
            occupation,
            religion,
            family_group,
            type_of_therapy,
            medical_diagnosis,
            mental_state,
            personal_history,
            emotional_factors,
            occupational_educational_aspects,
            family_aspects_family_diagram,
            approach_plan
        } = req.body;

        const [result] = await database.query(
            "INSERT INTO PsychologyInfo2 (patient_id, evaluation_date, date_of_birth, full_name, age, marital_status, occupation, religion, family_group, type_of_therapy, medical_diagnosis, mental_state, personal_history, emotional_factors, occupational_educational_aspects, family_aspects_family_diagram, approach_plan) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [patient_id, evaluation_date, date_of_birth, full_name, age, marital_status, occupation, religion, family_group, type_of_therapy, medical_diagnosis, mental_state, personal_history, emotional_factors, occupational_educational_aspects, family_aspects_family_diagram, approach_plan]
        );

        res.json({
            psychology_info2_id: result.insertId,
            patient_id,
            evaluation_date,
            date_of_birth,
            full_name,
            age,
            marital_status,
            occupation,
            religion,
            family_group,
            type_of_therapy,
            medical_diagnosis,
            mental_state,
            personal_history,
            emotional_factors,
            occupational_educational_aspects,
            family_aspects_family_diagram,
            approach_plan
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const updatePsychologyInfo2 = async (req, res) => {
    try {
        const result = await database.query(
            "UPDATE PsychologyInfo2 SET ? WHERE psychology_info2_id = ?",
            [req.body, req.params.id]
        );

        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deletePsychologyInfo2 = async (req, res) => {
    try {
        const [result] = await database.query("DELETE FROM PsychologyInfo2 WHERE psychology_info2_id = ?", [req.params.id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Record not found" });
        }

        return res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};