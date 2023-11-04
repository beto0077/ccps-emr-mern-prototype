import { Router } from "express";

import {  
    createSocialWorkInfo2, getSocialWorkInfo2, updateSocialWorkInfo2, deleteSocialWorkInfo2 
} from "../../controllers/socialWorkInfo2.controller.js";

const router = Router();

router.get('/socialWorkInfos2/:id', getSocialWorkInfo2);
router.post('/socialWorkInfos2', createSocialWorkInfo2);
router.put('/socialWorkInfos2/:id', updateSocialWorkInfo2);
router.delete('/socialWorkInfos2/:id', deleteSocialWorkInfo2);

export default router;