import { database } from '../utils/database.js';

// Retrieve all patients
export const getPatients = async (req, res) => {
    try {
        const [result] = await database.query("SELECT * FROM PatientInformation ORDER BY patient_id ASC");
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

// Retrieve a specific patient by ID
export const getPatient = async (req, res) => {
    try {
        const [result] = await database.query("SELECT * FROM PatientInformation WHERE patient_id = ?", [req.params.id]);
        if (result.length === 0) {
            return res.status(404).json({ message: "Patient not found" });
        }
        res.json(result[0]);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Search for a patient by ID number
export const searchPatientById = async (req, res) => {
    try {
        const idNumber = req.params.id;
        const [result] = await database.query("SELECT * FROM PatientInformation WHERE id_number = ?", [idNumber]);
        if (result.length === 0) {
            return res.status(404).json({ message: "Patient not found" });
        }
        res.json(result[0]);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Create a new patient
export const createPatient = async (req, res) => {
    try {
        const {
            admission_date, name, id_number, religion, education_level, occupation, date_of_birth, age, marital_status, children, home_phone, cell_phone, email, nationality, address, patient_status, clinical_diagnosis, referred_by, clinical_history, medications, social_support_network, alive_status
        } = req.body;

        const [result] = await database.query(
            "INSERT INTO PatientInformation (admission_date, name, id_number, religion, education_level, occupation, date_of_birth, age, marital_status, children, home_phone, cell_phone, email, nationality, address, patient_status, clinical_diagnosis, referred_by, clinical_history, medications, social_support_network, alive_status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [admission_date, name, id_number, religion, education_level, occupation, date_of_birth, age, marital_status, children, home_phone, cell_phone, email, nationality, address, patient_status, clinical_diagnosis, referred_by, clinical_history, medications, social_support_network, alive_status]
        );

        res.json({
            patient_id: result.insertId,
            ...req.body
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Update a patient's information
export const updatePatient = async (req, res) => {
    
    console.log("hi");
    console.log(req.body);
    try {
        const result = await database.query(
            "UPDATE PatientInformation SET ? WHERE patient_id = ?",
            [req.body, req.params.id]
        );
        res.json(result);
        console.log(result);
    } catch (error) {
        console.error("Database error:", error);
        return res.status(500).json({ message: error.message });
    }
};

// Delete a patient
export const deletePatient = async (req, res) => {
    try {
        const [result] = await database.query("DELETE FROM PatientInformation WHERE patient_id = ?", [req.params.id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Patient not found" });
        }
        res.json({ message: "Patient deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};