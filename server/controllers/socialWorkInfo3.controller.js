// Import the database connection from '../utils/database.js'
import { database } from '../utils/database.js';

export const getSocialWorkInfos = async (req, res) => {
    try {
        const [result] = await database.query("SELECT * FROM SocialWorkInfo3 ORDER BY social_work_info3_id ASC");
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

export const getSocialWorkInfo = async (req, res) => {
    try {
        const [result] = await database.query("SELECT * FROM SocialWorkInfo3 WHERE social_work_info3_id = ?", [req.params.id]);

        if (result.length === 0) {
            return res.status(404).json({ message: "Social Work Info not found" });
        }

        res.json(result[0]);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const createSocialWorkInfo = async (req, res) => {
    try {
        const {
            patient_id,
            patient_name,
            id,
            address,
            evolution,
            treatment
        } = req.body;

        const [result] = await database.query(
            "INSERT INTO SocialWorkInfo3 (patient_id, patient_name, id, address, evolution, treatment) VALUES (?, ?, ?, ?, ?, ?)",
            [patient_id, patient_name, id, address, evolution, treatment]
        );

        res.json({
            social_work_info3_id: result.insertId,
            patient_id,
            patient_name,
            id,
            address,
            evolution,
            treatment
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const updateSocialWorkInfo = async (req, res) => {
    try {
        const result = await database.query(
            "UPDATE SocialWorkInfo3 SET ? WHERE social_work_info3_id = ?",
            [req.body, req.params.id]
        );

        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deleteSocialWorkInfo = async (req, res) => {
    try {
        const [result] = await database.query("DELETE FROM SocialWorkInfo3 WHERE social_work_info3_id = ?", [req.params.id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Social Work Info not found" });
        }

        return res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};