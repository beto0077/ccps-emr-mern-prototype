// Import the database connection
import { db } from '../utils/db.js';

export const getPhysicalTherapyInfos = async (req, res) => {
    try {
        const [result] = await db.query("SELECT * FROM PhysicalTherapyInfo ORDER BY physical_therapy_id ASC");
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

export const getPhysicalTherapyInfo = async (req, res) => {
    try {
        const [result] = await db.query("SELECT * FROM PhysicalTherapyInfo WHERE physical_therapy_id = ?", [req.params.id]);
        if (result.length === 0) {
            return res.status(404).json({ message: "Record not found" });
        }
        res.json(result[0]);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const createPhysicalTherapyInfo = async (req, res) => {
    try {
        const {
            patient_id,
            professional,
            clinical_diagnosis,
            clinical_history,
            edema,
            edema_location,
            ulcer,
            ulcer_location,
            activities_of_daily_living,
            pain,
            pain_location,
            muscle_strength,
            range_of_motion,
            balance,
            external_support,
            additional_external_support_info,
            work_plan,
            physical_therapy_treatment,
            treatment_objectives,
            exercises,
            physical_agents,
            postural_hygiene
        } = req.body;

        const [result] = await db.query(
            "INSERT INTO PhysicalTherapyInfo (patient_id, professional, clinical_diagnosis, clinical_history, edema, edema_location, ulcer, ulcer_location, activities_of_daily_living, pain, pain_location, muscle_strength, range_of_motion, balance, external_support, additional_external_support_info, work_plan, physical_therapy_treatment, treatment_objectives, exercises, physical_agents, postural_hygiene) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [patient_id, professional, clinical_diagnosis, clinical_history, edema, edema_location, ulcer, ulcer_location, activities_of_daily_living, pain, pain_location, muscle_strength, range_of_motion, balance, external_support, additional_external_support_info, work_plan, physical_therapy_treatment, treatment_objectives, exercises, physical_agents, postural_hygiene]
        );

        res.json({
            physical_therapy_id: result.insertId,
            patient_id,
            professional,
            clinical_diagnosis,
            clinical_history,
            edema,
            edema_location,
            ulcer,
            ulcer_location,
            activities_of_daily_living,
            pain,
            pain_location,
            muscle_strength,
            range_of_motion,
            balance,
            external_support,
            additional_external_support_info,
            work_plan,
            physical_therapy_treatment,
            treatment_objectives,
            exercises,
            physical_agents,
            postural_hygiene
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const updatePhysicalTherapyInfo = async (req, res) => {
    try {
        const result = await db.query(
            "UPDATE PhysicalTherapyInfo SET ? WHERE physical_therapy_id = ?",
            [req.body, req.params.id]
        );
        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deletePhysicalTherapyInfo = async (req, res) => {
    try {
        const [result] = await db.query("DELETE FROM PhysicalTherapyInfo WHERE physical_therapy_id = ?", [req.params.id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Record not found" });
        }
        return res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};