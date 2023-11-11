// Import the database connection from '../utils/database.js'
import { database } from '../utils/database.js';

export const createPsychologyInfo = async (req, res) => {
    const connection = await database.getConnection();
    try {
        await connection.beginTransaction();

        const {
            patient_id,
            professional,
            evaluation_for,
            family_structure,
            family_functionality,
            spiritual_support,
            clinical_history,
            diagnosis_knowledge,
            treatment_knowledge,
            prognosis_knowledge,
            date_of_diagnosis,
            pain_scale,
            pain_localization,
            pain_type,
            mental_state,
            mental_state_description,
            psychological_psychiatric_history,
            subjective_evaluation,
            objective_evaluation,
            diagnostic_impression,
            recommendations
        } = req.body;

        const [result] = await connection.query(
            "INSERT INTO PsychologyInfo (patient_id, professional, evaluation_for, family_structure, family_functionality, spiritual_support, clinical_history, diagnosis_knowledge, treatment_knowledge, prognosis_knowledge, date_of_diagnosis, pain_scale, pain_localization, pain_type, mental_state, mental_state_description, psychological_psychiatric_history, subjective_evaluation, objective_evaluation, diagnostic_impression, recommendations) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [patient_id, professional, evaluation_for, family_structure, family_functionality, spiritual_support, clinical_history, diagnosis_knowledge, treatment_knowledge, prognosis_knowledge, date_of_diagnosis, pain_scale, pain_localization, pain_type, mental_state, mental_state_description, psychological_psychiatric_history, subjective_evaluation, objective_evaluation, diagnostic_impression, recommendations]
        );

        const psychology_info_id = result.insertId;

        // Insert data into DiagnosisOncologicalConditions
        const { selected_diagnoses } = req.body;
        if (selected_diagnoses && selected_diagnoses.length > 0) {
            for (const diagnosis of selected_diagnoses) {
                await connection.query(
                    "INSERT INTO DiagnosisOncologicalConditions (psychology_info_id, selected_diagnosis) VALUES (?, ?)",
                    [psychology_info_id, diagnosis]
                );
            }
        }

        // Insert data into DiseaseStatus
        const { selected_statuses } = req.body;
        if (selected_statuses && selected_statuses.length > 0) {
            for (const status of selected_statuses) {
                await connection.query(
                    "INSERT INTO DiseaseStatus (psychology_info_id, selected_status) VALUES (?, ?)",
                    [psychology_info_id, status]
                );
            }
        }

        // Insert data into TreatmentHistory
        const { treatment_histories } = req.body;
        if (treatment_histories && treatment_histories.length > 0) {
            for (const treatment of treatment_histories) {
                await connection.query(
                    "INSERT INTO TreatmentHistory (psychology_info_id, treatment_type, treatment_status, additional_information, identifier) VALUES (?, ?, ?, ?, ?)",
                    [psychology_info_id, treatment.treatment_type, treatment.treatment_status, treatment.additional_information, treatment.identifier]
                );
            }
        }

        // Insert data into EmotionalPsychologicalSymptoms
        const { emotional_psychological_symptoms } = req.body;
        if (emotional_psychological_symptoms && emotional_psychological_symptoms.length > 0) {
            for (const symptom of emotional_psychological_symptoms) {
                await connection.query(
                    "INSERT INTO EmotionalPsychologicalSymptoms (psychology_info_id, symptom, description) VALUES (?, ?, ?)",
                    [psychology_info_id, symptom.symptom, symptom.description]
                );
            }
        }

        // Insert data into TreatmentPlan
        const { treatment_plans } = req.body;
        if (treatment_plans && treatment_plans.length > 0) {
            for (const plan of treatment_plans) {
                await connection.query(
                    "INSERT INTO TreatmentPlan (psychology_info_id, selected_intervention) VALUES (?, ?)",
                    [psychology_info_id, plan.selected_intervention]
                );
            }
        }

        // Commit the transaction
        await connection.commit();

        res.json({ message: "Data inserted successfully!" });
    } catch (error) {
        // If an error occurs, rollback the transaction
        await connection.rollback();
        res.status(500).json({ message: "Error inserting data", error: error });
    } finally {
        // Release the connection
        connection.release();
    }
};

export const getPsychologyInfo = async (req, res) => {
    
    const connection = await database.getConnection();

    try {
        // Fetch data from PsychologyInfo
        const [psychologyInfo] = await connection.query(
            "SELECT * FROM PsychologyInfo WHERE patient_id = ?",
            [req.params.id]
        );

        if (psychologyInfo.length === 0) {
            return res.status(404).json({ message: "PsychologyInfo not found" });
        }

        // Fetch data from DiagnosisOncologicalConditions
        const [diagnosisOncologicalConditions] = await connection.query(
            "SELECT * FROM DiagnosisOncologicalConditions WHERE psychology_info_id = ?",
            [psychologyInfo[0].psychology_info_id]
        );

        // Fetch data from DiseaseStatus
        const [diseaseStatus] = await connection.query(
            "SELECT * FROM DiseaseStatus WHERE psychology_info_id = ?",
            [psychologyInfo[0].psychology_info_id]
        );

        // Fetch data from TreatmentHistory
        const [treatmentHistory] = await connection.query(
            "SELECT * FROM TreatmentHistory WHERE psychology_info_id = ?",
            [psychologyInfo[0].psychology_info_id]
        );

        // Fetch data from EmotionalPsychologicalSymptoms
        const [emotionalPsychologicalSymptoms] = await connection.query(
            "SELECT * FROM EmotionalPsychologicalSymptoms WHERE psychology_info_id = ?",
            [psychologyInfo[0].psychology_info_id]
        );

        // Fetch data from TreatmentPlan
        const [treatmentPlan] = await connection.query(
            "SELECT * FROM TreatmentPlan WHERE psychology_info_id = ?",
            [psychologyInfo[0].psychology_info_id]
        );

        // Construct the response
        const response = {
            psychologyInfo: psychologyInfo[0],
            diagnosisOncologicalConditions,
            diseaseStatus,
            treatmentHistory,
            emotionalPsychologicalSymptoms,
            treatmentPlan
        };

        res.json(response);
    } catch (error) {
        res.status(500).json({ message: "Error fetching data", error: error });
    } finally {
        connection.release();
    }
};

export const updatePsychologyInfo = async (req, res) => {
    const { psychology_info_id } = req.params;
    const {
        patient_id,
        professional,
        evaluation_for,
        family_structure,
        family_functionality,
        spiritual_support,
        clinical_history,
        diagnosis_knowledge,
        treatment_knowledge,
        prognosis_knowledge,
        date_of_diagnosis,
        pain_scale,
        pain_localization,
        pain_type,
        mental_state,
        mental_state_description,
        psychological_psychiatric_history,
        subjective_evaluation,
        objective_evaluation,
        diagnostic_impression,
        recommendations,
        diagnosisOncologicalConditions,
        diseaseStatus,
        treatmentHistory,
        emotionalPsychologicalSymptoms,
        treatmentPlan
    } = req.body;

    const connection = await database.getConnection();

    try {
        // Begin transaction
        await connection.beginTransaction();

        // Update data in PsychologyInfo
        await connection.query(
            `UPDATE PsychologyInfo SET
                patient_id = ?,
                professional = ?,
                evaluation_for = ?,
                family_structure = ?,
                family_functionality = ?,
                spiritual_support = ?,
                clinical_history = ?,
                diagnosis_knowledge = ?,
                treatment_knowledge = ?,
                prognosis_knowledge = ?,
                date_of_diagnosis = ?,
                pain_scale = ?,
                pain_localization = ?,
                pain_type = ?,
                mental_state = ?,
                mental_state_description = ?,
                psychological_psychiatric_history = ?,
                subjective_evaluation = ?,
                objective_evaluation = ?,
                diagnostic_impression = ?,
                recommendations = ?
            WHERE psychology_info_id = ?`,
            [
                patient_id, professional, evaluation_for, family_structure, family_functionality,
                spiritual_support, clinical_history, diagnosis_knowledge, treatment_knowledge,
                prognosis_knowledge, date_of_diagnosis, pain_scale, pain_localization, pain_type,
                mental_state, mental_state_description, psychological_psychiatric_history,
                subjective_evaluation, objective_evaluation, diagnostic_impression, recommendations,
                psychology_info_id
            ]
        );

        // Update DiagnosisOncologicalConditions
        await connection.query('DELETE FROM DiagnosisOncologicalConditions WHERE psychology_info_id = ?', [psychology_info_id]);
        for (const diagnosis of diagnosisOncologicalConditions) {
            await connection.query('INSERT INTO DiagnosisOncologicalConditions (psychology_info_id, selected_diagnosis) VALUES (?, ?)', [psychology_info_id, diagnosis]);
        }

        // Update DiseaseStatus
        await connection.query('DELETE FROM DiseaseStatus WHERE psychology_info_id = ?', [psychology_info_id]);
        for (const status of diseaseStatus) {
            await connection.query('INSERT INTO DiseaseStatus (psychology_info_id, selected_status) VALUES (?, ?)', [psychology_info_id, status]);
        }

        // Update TreatmentHistory
        await connection.query('DELETE FROM TreatmentHistory WHERE psychology_info_id = ?', [psychology_info_id]);
        for (const treatment of treatmentHistory) {
            await connection.query('INSERT INTO TreatmentHistory (psychology_info_id, treatment_type, treatment_status, additional_information, identifier) VALUES (?, ?, ?, ?, ?)', [psychology_info_id, treatment.treatment_type, treatment.treatment_status, treatment.additional_information, treatment.identifier]);
        }

        // Update EmotionalPsychologicalSymptoms
        await connection.query('DELETE FROM EmotionalPsychologicalSymptoms WHERE psychology_info_id = ?', [psychology_info_id]);
        for (const symptom of emotionalPsychologicalSymptoms) {
            await connection.query('INSERT INTO EmotionalPsychologicalSymptoms (psychology_info_id, symptom, description) VALUES (?, ?, ?)', [psychology_info_id, symptom.symptom, symptom.description]);
        }

        // Update TreatmentPlan
        await connection.query('DELETE FROM TreatmentPlan WHERE psychology_info_id = ?', [psychology_info_id]);
        for (const intervention of treatmentPlan) {
            await connection.query('INSERT INTO TreatmentPlan (psychology_info_id, selected_intervention) VALUES (?, ?)', [psychology_info_id, intervention]);
        }

        // Commit transaction
        await connection.commit();

        res.json({ message: "PsychologyInfo updated successfully" });
    } catch (error) {
        // Rollback transaction in case of an error
        await connection.rollback();
        res.status(500).json({ message: "Error updating data", error: error });
    } finally {
        connection.release();
    }
};

// Delete PsychologyInfo and related records
export const deletePsychologyInfo = async (req, res) => {
    const psychologyInfoId = req.params.id;
    const connection = await database.getConnection();

    try {
        // Start a transaction
        await connection.beginTransaction();

        // Delete records from sub-tables
        await connection.query('DELETE FROM DiagnosisOncologicalConditions WHERE psychology_info_id = ?', [psychologyInfoId]);
        await connection.query('DELETE FROM DiseaseStatus WHERE psychology_info_id = ?', [psychologyInfoId]);
        await connection.query('DELETE FROM TreatmentHistory WHERE psychology_info_id = ?', [psychologyInfoId]);
        await connection.query('DELETE FROM EmotionalPsychologicalSymptoms WHERE psychology_info_id = ?', [psychologyInfoId]);
        await connection.query('DELETE FROM TreatmentPlan WHERE psychology_info_id = ?', [psychologyInfoId]);

        // Delete record from main table
        const [result] = await connection.query('DELETE FROM PsychologyInfo WHERE psychology_info_id = ?', [psychologyInfoId]);

        // Commit the transaction
        await connection.commit();

        if (result.affectedRows === 0) {
            res.status(404).json({ message: 'No PsychologyInfo found with the given ID.' });
        } else {
            res.status(200).json({ message: 'PsychologyInfo deleted successfully.' });
        }
    } catch (error) {
        // If an error occurs, rollback the transaction
        await connection.rollback();
        console.error('Error deleting PsychologyInfo:', error);
        res.status(500).json({ message: 'Error deleting PsychologyInfo', error: error.message });
    } finally {
        // Release the connection
        connection.release();
    }
};