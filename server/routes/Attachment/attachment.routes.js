import { Router } from "express";

import { 
    getAttachments, 
    getAttachment, 
    createAttachment, 
    updateAttachment, 
    deleteAttachment 
} from "../../controllers/attachment.controller.js";

const router = Router();

router.get('/attachments', getAttachments);
router.get('/attachments/:id', getAttachment);
router.post('/attachments', createAttachment);
router.put('/attachments/:id', updateAttachment);
router.delete('/attachments/:id', deleteAttachment);

export default router;
