import { Router } from "express";

import { getLoans, getLoan, createLoan, updateLoan, deleteLoan } from "../../../controllers/equipmentLoan.controller.js";

const router = Router();

router.get('/loans', getLoans);
router.get('/loans/:id', getLoan);
router.post('/loans', createLoan);
router.put('/loans/:id', updateLoan);
router.delete('/loans/:id', deleteLoan);

export default router;