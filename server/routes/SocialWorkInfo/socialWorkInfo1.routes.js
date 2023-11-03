import { Router } from "express";

import {  
    createSocialWorkInfo1, getSocialWorkInfo1, updateSocialWorkInfo1, deleteSocialWorkInfo1 
} from "../../controllers/socialWorkInfo1.controller.js";

const router = Router();

router.get('/socialWorkInfos/:id', getSocialWorkInfo1);
router.post('/socialWorkInfos', createSocialWorkInfo1);
router.put('/socialWorkInfos/:id', updateSocialWorkInfo1);
router.delete('/socialWorkInfos/:id', deleteSocialWorkInfo1);

export default router;