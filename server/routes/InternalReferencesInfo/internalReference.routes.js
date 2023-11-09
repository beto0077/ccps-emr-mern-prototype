import { Router } from "express";

import { 
    getInternalReferences, 
    getInternalReference, 
    createInternalReference, 
    updateInternalReference, 
    deleteInternalReference 
} from "../../controllers/internalReference.controller.js";

const router = Router();

router.get('/allInternalReferences/:id', getInternalReferences);
router.get('/internalReferences/:id', getInternalReference);
router.post('/internalReferences', createInternalReference);
router.put('/internalReferences/:id', updateInternalReference);
router.delete('/internalReferences/:id', deleteInternalReference);

export default router;
