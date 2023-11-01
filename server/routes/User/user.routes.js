import { Router } from "express";

// Import the controller functions related to Users (these will need to be created)
import { loginUser, getUsers, getUser, createUser, updateUser, deleteUser } from "../../controllers/user.controller.js";

const router = Router();

// Routes related to the Users table for authentication and role-based access
router.post('/login', loginUser);
router.get('/users', getUsers); // Route to get the list of all users
router.get('/users/:id', getUser);
router.post('/users', createUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

export default router;
