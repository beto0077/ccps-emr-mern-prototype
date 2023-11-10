import { Router } from "express";

import { 
    getControlNotes, 
    getControlNote, 
    createControlNote, 
    updateControlNote, 
    deleteControlNote 
} from "../../controllers/controlNote.controller.js";

const router = Router();

router.get('/allControlNotes/:id', getControlNotes);
router.get('/controlNotes/:id', getControlNote);
router.post('/controlNotes', createControlNote);
router.put('/controlNotes/:id', updateControlNote);
router.delete('/controlNotes/:id', deleteControlNote);

export default router;