import { Router } from "express";

import { loginUser, getUsers, getUser, createUser, updateUser, deleteUser } from "../../controllers/user.controller.js";

const router = Router();

router.post('/login', loginUser);
router.get('/users', getUsers);
router.get('/users/:id', getUser);
router.post('/users', createUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

export default router;
