import { Router } from "express";

import {
  getPhysicalTherapyInfos,
  getPhysicalTherapyInfo,
  createPhysicalTherapyInfo,
  updatePhysicalTherapyInfo,
  deletePhysicalTherapyInfo
} from "../../controllers/physicalTherapyInfo.controller.js";

const router = Router();

router.get('/physicalTherapyInfos', getPhysicalTherapyInfos);
router.get('/physicalTherapyInfos/:id', getPhysicalTherapyInfo);
router.post('/physicalTherapyInfos', createPhysicalTherapyInfo);
router.put('/physicalTherapyInfos/:id', updatePhysicalTherapyInfo);
router.delete('/physicalTherapyInfos/:id', deletePhysicalTherapyInfo);

export default router;