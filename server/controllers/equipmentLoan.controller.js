import { database } from '../utils/database.js';

export const getLoans = async (req, res) => {
    try {
        const [result] = await database.query("SELECT * FROM EquipmentLoanInformation ORDER BY loan_id ASC");
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getLoan = async (req, res) => {
    try {
        const [result] = await database.query("SELECT * FROM EquipmentLoanInformation WHERE loan_id = ?", [req.params.id]);
        if (result.length === 0) {
            return res.status(404).json({ message: "Loan information not found" });
        }
        res.json(result[0]);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const createLoan = async (req, res) => {
    try {
        const {
            patient_id,
            delivery_date,
            return_date,
            description,
            plate,
            quantity,
            beneficiary,
            reference_issued_by_doctor,
            person_receiving_equipment,
            id_number,
            exact_address,
            phone_number,
            contract_number,
            justification,
            person_returning_equipment,
            prepared_by,
            preparation_date,
            loan_completed
        } = req.body;

        const [result] = await database.query(
            "INSERT INTO EquipmentLoanInformation (patient_id, delivery_date, return_date, description, plate, quantity, beneficiary, reference_issued_by_doctor, person_receiving_equipment, id_number, exact_address, phone_number, contract_number, justification, person_returning_equipment, prepared_by, preparation_date, loan_completed) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [patient_id, delivery_date, return_date, description, plate, quantity, beneficiary, reference_issued_by_doctor, person_receiving_equipment, id_number, exact_address, phone_number, contract_number, justification, person_returning_equipment, prepared_by, preparation_date, loan_completed]
        );

        res.json({
            loan_id: result.insertId,
            ...req.body
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const updateLoan = async (req, res) => {
    try {
        const result = await database.query(
            "UPDATE EquipmentLoanInformation SET ? WHERE loan_id = ?",
            [req.body, req.params.id]
        );

        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deleteLoan = async (req, res) => {
    try {
        const [result] = await database.query("DELETE FROM EquipmentLoanInformation WHERE loan_id = ?", [req.params.id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Loan information not found" });
        }

        return res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};