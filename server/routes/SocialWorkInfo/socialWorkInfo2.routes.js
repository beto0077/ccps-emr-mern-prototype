import { Router } from "express";

import {  
    createSocialWorkInfo2, getSocialWorkInfo2, updateSocialWorkInfo2, deleteSocialWorkInfo2 
} from "../../controllers/socialWorkInfo2.controller.js";

const router = Router();

router.get('/socialWorkInfos/:id', getSocialWorkInfo2);
router.post('/socialWorkInfos', createSocialWorkInfo2);
router.put('/socialWorkInfos/:id', updateSocialWorkInfo2);
router.delete('/socialWorkInfos/:id', deleteSocialWorkInfo2);

export default router;