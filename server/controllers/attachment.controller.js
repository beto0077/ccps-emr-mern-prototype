// Import the database connection
import { database } from '../utils/database.js';

export const getAttachments = async (req, res) => {
    try {
        const [result] = await database.query("SELECT * FROM Attachment WHERE patient_id = ? ORDER BY date_added ASC", [req.params.id]);
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

export const getAttachment = async (req, res) => {
    try {
        const [result] = await database.query("SELECT * FROM Attachment WHERE attachment_id = ?", [req.params.id]);

        if (result.length === 0) {
            return res.status(404).json({ message: "Attachment not found" });
        }

        //res.json(result[0]);
        //NEW CODE HERE
        const attachment = result[0];
        const fileContentBase64 = attachment.file_content.toString('base64');

        attachment.file_content = fileContentBase64;

        res.json(attachment);
        //END OF NEW CODE
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const createAttachment = async (req, res) => {
    try {
        const {
            patient_id,
            section_reference,
            attachment_type,
            file_name,
            file_content,
            date_added,
            description,
            uploader_user_id
        } = req.body;

        
        /*const [result] = await database.query(
            "INSERT INTO Attachment (patient_id, section_reference, attachment_type, file_name, file_content, date_added, description, uploader_user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            [patient_id, section_reference, attachment_type, file_name, file_content, date_added, description, uploader_user_id]
        );
        
        res.json({
            attachment_id: result.insertId,
            patient_id,
            section_reference,
            attachment_type,
            file_name,
            file_content,
            date_added,
            description,
            uploader_user_id
        });
        */

        //NEW CODE HERE
        const buffer = Buffer.from(file_content, 'base64');
        const [result] = await database.query(
            "INSERT INTO Attachment (patient_id, section_reference, attachment_type, file_name, file_content, date_added, description, uploader_user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            [patient_id, section_reference, attachment_type, file_name, buffer, date_added, description, uploader_user_id]
        );

        res.json({
            attachment_id: result.insertId,
            patient_id,
            section_reference,
            attachment_type,
            file_name,
            file_content: buffer,
            date_added,
            description,
            uploader_user_id
        });
        //END OF NEW CODE
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const updateAttachment = async (req, res) => {
    try {
        const result = await database.query(
            "UPDATE Attachment SET ? WHERE attachment_id = ?",
            [req.body, req.params.id]
        );

        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deleteAttachment = async (req, res) => {
    try {
        const [result] = await database.query("DELETE FROM Attachment WHERE attachment_id = ?", [req.params.id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Attachment not found" });
        }

        return res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};