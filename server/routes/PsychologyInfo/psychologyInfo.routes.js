import { Router } from "express";

import { getPsychologyInfo, createPsychologyInfo, updatePsychologyInfo, deletePsychologyInfo } from "../../controllers/psychologyInfo.controller.js";

const router = Router();

router.get('/psychologyInfos/:id', getPsychologyInfo);
router.post('/psychologyInfos', createPsychologyInfo);
router.put('/psychologyInfos/:id', updatePsychologyInfo);
router.delete('/psychologyInfos/:id', deletePsychologyInfo);

export default router;