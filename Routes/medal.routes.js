import { Router } from "express";
import MedalService from "../Services/medal.service.js";

const medalServices = new MedalService();

const router = Router();

router.post('/create', async (req, res, next) => {
    const medalBody = req.body;
    const newMedal = await medalServices.createMedal(medalBody);
    res.json(newMedal);
})

export default router

