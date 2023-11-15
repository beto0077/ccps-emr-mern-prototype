import { Router } from "express";

const router = Router();

router.get("/ping", async (req, res) => {
    res.send({message: 'Hello Weird World! (by CCPS)'});
});

export default router;