// Import the database connection
import { database } from '../utils/database.js';

export const getInternalReferences = async (req, res) => {
    try {
        const [result] = await database.query("SELECT * FROM InternalReferencesForm WHERE patient_id = ? ORDER BY internal_reference_id ASC", [req.params.id]);
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

export const getInternalReference = async (req, res) => {
    try {
        const [result] = await database.query("SELECT * FROM InternalReferencesForm WHERE internal_reference_id = ?", [req.params.id]);

        if (result.length === 0) {
            return res.status(404).json({ message: "Internal Reference not found" });
        }

        res.json(result[0]);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const createInternalReference = async (req, res) => {
    try {
        const {
            patient_id,
            date,
            full_name,
            id_number,
            religion,
            education_level,
            occupation,
            date_of_birth,
            age,
            marital_status,
            children,
            phone_number,
            nationality,
            address,
            service_of_care,
            referred_to,
            clinical_diagnosis,
            management_plan,
            reason_for_referral
        } = req.body;

        const [result] = await database.query(
            "INSERT INTO InternalReferencesForm (patient_id, date, full_name, id_number, religion, education_level, occupation, date_of_birth, age, marital_status, children, phone_number, nationality, address, service_of_care, referred_to, clinical_diagnosis, management_plan, reason_for_referral) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [patient_id, date, full_name, id_number, religion, education_level, occupation, date_of_birth, age, marital_status, children, phone_number, nationality, address, service_of_care, referred_to, clinical_diagnosis, management_plan, reason_for_referral]
        );

        res.json({
            internal_reference_id: result.insertId,
            patient_id,
            date,
            full_name,
            id_number,
            religion,
            education_level,
            occupation,
            date_of_birth,
            age,
            marital_status,
            children,
            phone_number,
            nationality,
            address,
            service_of_care,
            referred_to,
            clinical_diagnosis,
            management_plan,
            reason_for_referral
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const updateInternalReference = async (req, res) => {
    try {
        const result = await database.query(
            "UPDATE InternalReferencesForm SET ? WHERE internal_reference_id = ?",
            [req.body, req.params.id]
        );

        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deleteInternalReference = async (req, res) => {
    try {
        const [result] = await database.query("DELETE FROM InternalReferencesForm WHERE internal_reference_id = ?", [req.params.id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Internal Reference not found" });
        }

        return res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};