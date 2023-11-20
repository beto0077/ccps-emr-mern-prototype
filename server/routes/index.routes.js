import { Router } from "express";

const router = Router();

router.get("/ping", async (req, res) => {
    res.send({message: 'Hello World! (by ACPS)'});
});

export default router;