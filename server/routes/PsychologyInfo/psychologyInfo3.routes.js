import { Router } from "express";

import { 
    getPsychologyInfo3s, 
    getPsychologyInfo3, 
    createPsychologyInfo3, 
    updatePsychologyInfo3, 
    deletePsychologyInfo3 
} from "../../controllers/psychologyInfo3.controller.js";

const router = Router();

router.get('/allPsychologyInfo3s/:id', getPsychologyInfo3s);
router.get('/psychologyInfo3s/:id', getPsychologyInfo3);
router.post('/psychologyInfo3s', createPsychologyInfo3);
router.put('/psychologyInfo3s/:id', updatePsychologyInfo3);
router.delete('/psychologyInfo3s/:id', deletePsychologyInfo3);

export default router;