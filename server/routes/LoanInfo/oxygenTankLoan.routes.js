import { Router } from "express";

import { 
    getOxygenTankLoans, 
    getOxygenTankLoan, 
    createOxygenTankLoan, 
    updateOxygenTankLoan, 
    deleteOxygenTankLoan 
} from "../../../controllers/oxygenTankLoan.controller.js";

const router = Router();

router.get('/oxygenTankLoans', getOxygenTankLoans);
router.get('/oxygenTankLoans/:id', getOxygenTankLoan);
router.post('/oxygenTankLoans', createOxygenTankLoan);
router.put('/oxygenTankLoans/:id', updateOxygenTankLoan);
router.delete('/oxygenTankLoans/:id', deleteOxygenTankLoan);

export default router;