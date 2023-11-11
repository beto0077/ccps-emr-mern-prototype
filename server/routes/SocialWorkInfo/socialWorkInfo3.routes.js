import { Router } from "express";

import { 
    getSocialWorkInfo3s, 
    getSocialWorkInfo3, 
    createSocialWorkInfo3, 
    updateSocialWorkInfo3, 
    deleteSocialWorkInfo3 
} from "../../controllers/socialWorkInfo3.controller.js"; // New import for SocialWorkInfo3 controller

const router = Router();

router.get('/allSocialWorkInfo3s/:id', getSocialWorkInfo3s);
router.get('/socialWorkInfos3/:id', getSocialWorkInfo3);
router.post('/socialWorkInfos3', createSocialWorkInfo3);
router.put('/socialWorkInfos3/:id', updateSocialWorkInfo3);
router.delete('/socialWorkInfos3/:id', deleteSocialWorkInfo3);

export default router;