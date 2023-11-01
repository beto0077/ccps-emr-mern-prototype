import { Router } from "express";

import { 
    getSocialWorkInfos, 
    getSocialWorkInfo, 
    createSocialWorkInfo, 
    updateSocialWorkInfo, 
    deleteSocialWorkInfo 
} from "../../controllers/socialWorkInfo3.controller.js"; // New import for SocialWorkInfo3 controller

const router = Router();

router.get('/socialWorkInfos', getSocialWorkInfos);
router.get('/socialWorkInfos/:id', getSocialWorkInfo);
router.post('/socialWorkInfos', createSocialWorkInfo);
router.put('/socialWorkInfos/:id', updateSocialWorkInfo);
router.delete('/socialWorkInfos/:id', deleteSocialWorkInfo);

export default router;