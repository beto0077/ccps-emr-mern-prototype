import { Router } from "express";

import { getPsychologyInfo, createPsychologyInfo, updatePsychologyInfo, deletePsychologyInfo } from "../../controllers/psychologyInfo.controller.js";

const router = Router();

router.get('/psychologyInfo/:id', getPsychologyInfo);
router.post('/psychologyInfo', createPsychologyInfo);
router.put('/psychologyInfos/:id', updatePsychologyInfo);
router.delete('/psychologyInfos/:id', deletePsychologyInfo);