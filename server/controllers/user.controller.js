import { database } from '../utils/database.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as dotenv from "dotenv";

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

export const loginUser = async (req, res) => {
    try {
        const { email_address, password } = req.body;

        const findQuery = `SELECT user_id, password FROM Users WHERE email_address = ?`;
        const [results] = await database.query(findQuery, [email_address]);

        if (results.length > 0) {
            const userId = results[0].user_id;
            const hashedPassword = results[0].password;

            if (bcrypt.compareSync(password, hashedPassword)) {
                const token = jwt.sign({ userId }, SECRET_KEY, { expiresIn: '24h' });
                res.status(200).json({ token });
            } else {
                res.status(401).json({ message: 'Contraseña incorrecta' });
            }
        } else {
            res.status(404).json({ message: 'Correo electrónico no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getUsers = async (req, res) => {
    try {
        const [result] = await database.query("SELECT * FROM Users ORDER BY user_id ASC");
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getUser = async (req, res) => {
    try {
        const [result] = await database.query("SELECT * FROM Users WHERE user_id = ?", [req.params.id]);

        if (result.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(result[0]);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const createUser = async (req, res) => {
    try {
        const {
            password,
            email_address,
            user_name,
            role,
            specialty
        } = req.body;

        // Hash the password using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);

        const [result] = await database.query(
            "INSERT INTO Users (password, email_address, user_name, role, specialty) VALUES (?, ?, ?, ?, ?)",
            [hashedPassword, email_address, user_name, role, specialty]
        );

        res.json({
            user_id: result.insertId,
            email_address,
            user_name,
            role,
            specialty
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const updateUser = async (req, res) => {
    try {
        const result = await database.query(
            "UPDATE Users SET ? WHERE user_id = ?",
            [req.body, req.params.id]
        );

        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const [result] = await database.query("DELETE FROM Users WHERE user_id = ?", [req.params.id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
