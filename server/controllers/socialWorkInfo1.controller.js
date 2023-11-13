import { database } from '../utils/database.js';

export const createSocialWorkInfo1 = async (req, res) => {
    const connection = await database.getConnection();
    try {
        await connection.beginTransaction();

        const {
            patient_id,
            professional,
            interview_date,
            clinical_history,
            people_interviewed,
            patient_name,
            age,
            date_of_birth,
            gender,
            medical_condition,
            insurance,
            insurance_type,
            id,
            pension,
            pension_type,
            support_network,
            support_type,
            housing,
            diagnosis,
            phone_number,
            religion,
            nationality,
            occupation,
            educational_level,
            immigration_status,
            knows_diagnosis,
            referred_by,
            head_of_family,
            marital_status,
            primary_caregiver,
            family_type
        } = req.body;

        const [result] = await connection.query(
            "INSERT INTO SocialWorkInfo1 (patient_id, professional, interview_date, clinical_history, people_interviewed, patient_name, age, date_of_birth, gender, medical_condition, insurance, insurance_type, id, pension, pension_type, support_network, support_type, housing, diagnosis, phone_number, religion, nationality, occupation, educational_level, immigration_status, knows_diagnosis, referred_by, head_of_family, marital_status, primary_caregiver, family_type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [patient_id, professional, interview_date, clinical_history, people_interviewed, patient_name, age, date_of_birth, gender, medical_condition, insurance, insurance_type, id, pension, pension_type, support_network, support_type, housing, diagnosis, phone_number, religion, nationality, occupation, educational_level, immigration_status, knows_diagnosis, referred_by, head_of_family, marital_status, primary_caregiver, family_type]
        );

        const social_work_info1_id = result.insertId;

        const { familyGroup } = req.body;
        if (familyGroup && familyGroup.length > 0) {
            for (const member of familyGroup) {
                await connection.query(
                    "INSERT INTO FamilyGroup (social_work_info1_id, name, relationship, age, nationality, occupation, id) VALUES (?, ?, ?, ?, ?, ?, ?)",
                    [social_work_info1_id, member.name, member.relationship, member.age, member.nationality, member.occupation, member.id]
                );
            }
        }

        await connection.commit();

        res.json({ message: "Data inserted successfully!" });
    } catch (error) {
        await connection.rollback();
        res.status(500).json({ message: "Error inserting data", error: error });
    } finally {
        connection.release();
    }
};

export const getSocialWorkInfo1 = async (req, res) => {
    const connection = await database.getConnection();

    try {
        const [socialWorkInfo1] = await connection.query(
            "SELECT * FROM SocialWorkInfo1 WHERE patient_id = ?",
            [req.params.id]
        );

        if (socialWorkInfo1.length === 0) {
            return res.status(404).json({ message: "SocialWorkInfo1 not found" });
        }

        const [familyGroup] = await connection.query(
            "SELECT * FROM FamilyGroup WHERE social_work_info1_id = ?",
            [socialWorkInfo1[0].social_work_info1_id]
        );

        const response = {
            socialWorkInfo1: socialWorkInfo1,
            familyGroup
        };

        res.json(response);
    } catch (error) {
        res.status(500).json({ message: "Error fetching data", error: error });
    } finally {
        connection.release();
    }
};

export const updateSocialWorkInfo1 = async (req, res) => {
    const { social_work_info1_id } = req.params;
    const {
        patient_id,
        professional,
        interview_date,
        clinical_history,
        people_interviewed,
        patient_name,
        age,
        date_of_birth,
        gender,
        medical_condition,
        insurance,
        insurance_type,
        id,
        pension,
        pension_type,
        support_network,
        support_type,
        housing,
        diagnosis,
        phone_number,
        religion,
        nationality,
        occupation,
        educational_level,
        immigration_status,
        knows_diagnosis,
        referred_by,
        head_of_family,
        marital_status,
        primary_caregiver,
        family_type,
        familyGroup
    } = req.body;

    const connection = await database.getConnection();

    try {
        await connection.beginTransaction();

        await connection.query(
            `UPDATE SocialWorkInfo1 SET
                patient_id = ?,
                professional = ?,
                interview_date = ?,
                clinical_history = ?,
                people_interviewed = ?,
                patient_name = ?,
                age = ?,
                date_of_birth = ?,
                gender = ?,
                medical_condition = ?,
                insurance = ?,
                insurance_type = ?,
                id = ?,
                pension = ?,
                pension_type = ?,
                support_network = ?,
                support_type = ?,
                housing = ?,
                diagnosis = ?,
                phone_number = ?,
                religion = ?,
                nationality = ?,
                occupation = ?,
                educational_level = ?,
                immigration_status = ?,
                knows_diagnosis = ?,
                referred_by = ?,
                head_of_family = ?,
                marital_status = ?,
                primary_caregiver = ?,
                family_type = ?
            WHERE social_work_info1_id = ?`,
            [
                patient_id, professional, interview_date, clinical_history, people_interviewed, patient_name, age,
                date_of_birth, gender, medical_condition, insurance, insurance_type, id, pension, pension_type,
                support_network, support_type, housing, diagnosis, phone_number, religion, nationality, occupation,
                educational_level, immigration_status, knows_diagnosis, referred_by, head_of_family, marital_status,
                primary_caregiver, family_type, social_work_info1_id
            ]
        );

        await connection.query('DELETE FROM FamilyGroup WHERE social_work_info1_id = ?', [social_work_info1_id]);
        for (const member of familyGroup) {
            await connection.query(
                'INSERT INTO FamilyGroup (social_work_info1_id, name, relationship, age, nationality, occupation, id) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [social_work_info1_id, member.name, member.relationship, member.age, member.nationality, member.occupation, member.id]
            );
        }

        await connection.commit();

        res.json({ message: "SocialWorkInfo1 updated successfully" });
    } catch (error) {
        await connection.rollback();
        res.status(500).json({ message: "Error updating data", error: error });
    } finally {
        connection.release();
    }
};

export const deleteSocialWorkInfo1 = async (req, res) => {
    const socialWorkInfo1Id = req.params.id;
    const connection = await database.getConnection();

    try {
        await connection.beginTransaction();

        // Delete associated FamilyGroup records
        await connection.query('DELETE FROM FamilyGroup WHERE social_work_info1_id = ?', [socialWorkInfo1Id]);

        // Delete the main SocialWorkInfo1 record
        const [result] = await connection.query('DELETE FROM SocialWorkInfo1 WHERE social_work_info1_id = ?', [socialWorkInfo1Id]);

        await connection.commit();

        if (result.affectedRows === 0) {
            res.status(404).json({ message: 'No SocialWorkInfo1 found with the given ID.' });
        } else {
            res.status(200).json({ message: 'SocialWorkInfo1 deleted successfully.' });
        }
    } catch (error) {
        await connection.rollback();
        console.error('Error deleting SocialWorkInfo1:', error);
        res.status(500).json({ message: 'Error deleting SocialWorkInfo1', error: error.message });
    } finally {
        connection.release();
    }
};