import { Router } from "express";

import {  
    createSocialWorkInfo1, getSocialWorkInfo1, updateSocialWorkInfo1, deleteSocialWorkInfo1 
} from "../../controllers/socialWorkInfo1.controller.js";

const router = Router();

router.get('/socialWorkInfos1/:id', getSocialWorkInfo1);
router.post('/socialWorkInfos1', createSocialWorkInfo1);
router.put('/socialWorkInfos1/:id', updateSocialWorkInfo1);
router.delete('/socialWorkInfos1/:id', deleteSocialWorkInfo1);

export default router;