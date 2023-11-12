import { database } from '../utils/database.js';

export const createSocialWorkInfo2 = async (req, res) => {
    const connection = await database.getConnection();
    try {
        await connection.beginTransaction();

        const {
            patient_id,
            total_income,
            total_expenses,
            per_capita_income,
            per_capita_expenses,
            poverty_line
        } = req.body;

        const [result] = await connection.query(
            "INSERT INTO SocialWorkInfo2 (patient_id, total_income, total_expenses, per_capita_income, per_capita_expenses, poverty_line) VALUES (?, ?, ?, ?, ?, ?)",
            [patient_id, total_income, total_expenses, per_capita_income, per_capita_expenses, poverty_line]
        );

        const social_work_info2_id = result.insertId;

        const { monthly_incomes } = req.body;
        if (monthly_incomes && monthly_incomes.length > 0) {
            for (const income of monthly_incomes) {
                await connection.query(
                    "INSERT INTO MonthlyIncome (social_work_info2_id, concept, amount) VALUES (?, ?, ?)",
                    [social_work_info2_id, income.concept, income.amount]
                );
            }
        }

        const { monthly_expenses } = req.body;
        if (monthly_expenses && monthly_expenses.length > 0) {
            for (const expense of monthly_expenses) {
                await connection.query(
                    "INSERT INTO MonthlyExpenses (social_work_info2_id, concept, amount) VALUES (?, ?, ?)",
                    [social_work_info2_id, expense.concept, expense.amount]
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

export const getSocialWorkInfo2 = async (req, res) => {
    const connection = await database.getConnection();

    try {
        const [socialWorkInfo2] = await connection.query(
            "SELECT * FROM SocialWorkInfo2 WHERE patient_id = ?",
            [req.params.id]
        );

        if (socialWorkInfo2.length === 0) {
            return res.status(404).json({ message: "SocialWorkInfo2 not found" });
        }

        const [monthlyIncome] = await connection.query(
            "SELECT * FROM MonthlyIncome WHERE social_work_info2_id = ?",
            [socialWorkInfo2[0].social_work_info2_id]
        );

        const [monthlyExpenses] = await connection.query(
            "SELECT * FROM MonthlyExpenses WHERE social_work_info2_id = ?",
            [socialWorkInfo2[0].social_work_info2_id]
        );

        const response = {
            socialWorkInfo2: socialWorkInfo2,
            monthlyIncome,
            monthlyExpenses
        };

        res.json(response);
    } catch (error) {
        res.status(500).json({ message: "Error fetching data", error: error });
    } finally {
        connection.release();
    }
};

export const updateSocialWorkInfo2 = async (req, res) => {
    const { social_work_info2_id } = req.params;
    const {
        patient_id,
        total_income,
        total_expenses,
        per_capita_income,
        per_capita_expenses,
        poverty_line,
        monthlyIncome,
        monthlyExpenses
    } = req.body;

    const connection = await database.getConnection();

    try {
        await connection.beginTransaction();

        await connection.query(
            `UPDATE SocialWorkInfo2 SET
                patient_id = ?,
                total_income = ?,
                total_expenses = ?,
                per_capita_income = ?,
                per_capita_expenses = ?,
                poverty_line = ?
            WHERE social_work_info2_id = ?`,
            [
                patient_id,
                total_income,
                total_expenses,
                per_capita_income,
                per_capita_expenses,
                poverty_line,
                social_work_info2_id
            ]
        );

        await connection.query('DELETE FROM MonthlyIncome WHERE social_work_info2_id = ?', [social_work_info2_id]);
        for (const income of monthlyIncome) {
            await connection.query('INSERT INTO MonthlyIncome (social_work_info2_id, concept, amount) VALUES (?, ?, ?)', [social_work_info2_id, income.concept, income.amount]);
        }

        await connection.query('DELETE FROM MonthlyExpenses WHERE social_work_info2_id = ?', [social_work_info2_id]);
        for (const expense of monthlyExpenses) {
            await connection.query('INSERT INTO MonthlyExpenses (social_work_info2_id, concept, amount) VALUES (?, ?, ?)', [social_work_info2_id, expense.concept, expense.amount]);
        }

        await connection.commit();

        res.json({ message: "SocialWorkInfo2 updated successfully" });
    } catch (error) {
        await connection.rollback();
        res.status(500).json({ message: "Error updating data", error: error });
    } finally {
        connection.release();
    }
};

export const deleteSocialWorkInfo2 = async (req, res) => {
    const socialWorkInfo2Id = req.params.id;
    const connection = await database.getConnection();

    try {
        await connection.beginTransaction();

        // Delete related entries from MonthlyIncome and MonthlyExpenses tables
        await connection.query('DELETE FROM MonthlyIncome WHERE social_work_info2_id = ?', [socialWorkInfo2Id]);
        await connection.query('DELETE FROM MonthlyExpenses WHERE social_work_info2_id = ?', [socialWorkInfo2Id]);

        // Delete the main entry from SocialWorkInfo2 table
        const [result] = await connection.query('DELETE FROM SocialWorkInfo2 WHERE social_work_info2_id = ?', [socialWorkInfo2Id]);

        await connection.commit();

        if (result.affectedRows === 0) {
            res.status(404).json({ message: 'No SocialWorkInfo2 found with the given ID.' });
        } else {
            res.status(200).json({ message: 'SocialWorkInfo2 deleted successfully.' });
        }
    } catch (error) {
        await connection.rollback();
        console.error('Error deleting SocialWorkInfo2:', error);
        res.status(500).json({ message: 'Error deleting SocialWorkInfo2', error: error.message });
    } finally {
        connection.release();
    }
};