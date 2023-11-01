import { Router } from "express";

import { 
    getPsychologyInfo2s, 
    getPsychologyInfo2, 
    createPsychologyInfo2, 
    updatePsychologyInfo2, 
    deletePsychologyInfo2 
} from "../../../controllers/psychologyInfo2.controller.js";

const router = Router();

router.get('/psychologyInfo2s', getPsychologyInfo2s);
router.get('/psychologyInfo2s/:id', getPsychologyInfo2);
router.post('/psychologyInfo2s', createPsychologyInfo2);
router.put('/psychologyInfo2s/:id', updatePsychologyInfo2);
router.delete('/psychologyInfo2s/:id', deletePsychologyInfo2);

export default router;