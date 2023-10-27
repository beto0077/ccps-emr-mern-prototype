import { Router } from "express";

import { 
    getPatients, 
    getPatient, 
    createPatient, 
    updatePatient, 
    deletePatient 
} from "../../controllers/equipmentLoan.controller.js";

const router = Router();

router.get('/patients', getPatients);
router.get('/patients/:id', getPatient);
router.post('/patients', createPatient);
router.put('/patients/:id', updatePatient);
router.delete('/patients/:id', deletePatient);

export default router;