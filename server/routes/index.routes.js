import { Router } from "express";

const router = Router();

router.get("/ping", async (req, res) => {
    res.send({message: 'Hello Dark World! (by CCPS)'});
});

export default router;