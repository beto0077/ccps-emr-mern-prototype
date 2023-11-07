import { Router } from "express";

import { 
    getPatients, 
    getPatient,
    searchPatientById,
    createPatient, 
    updatePatient, 
    deletePatient 
} from "../../controllers/patient.controller.js";

const router = Router();

router.get('/patients', getPatients);
router.get('/patients/:id', getPatient);
router.get('/patients/search/:id', searchPatientById);
router.post('/patients', createPatient);
router.put('/patients/:id', updatePatient);
router.delete('/patients/:id', deletePatient);

export default router;