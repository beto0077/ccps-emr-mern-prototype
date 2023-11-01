import { Router } from "express";

import { 
    getControlNotes, 
    getControlNote, 
    createControlNote, 
    updateControlNote, 
    deleteControlNote 
} from "../../../controllers/controlNotes.controller.js";

const router = Router();

router.get('/controlNotes', getControlNotes);
router.get('/controlNotes/:id', getControlNote);
router.post('/controlNotes', createControlNote);
router.put('/controlNotes/:id', updateControlNote);
router.delete('/controlNotes/:id', deleteControlNote);

export default router;