import { Router } from "express";
import MedalService from "../Services/medal.service.js";
import passport from "passport";

const medalServices = new MedalService();

const router = Router();

router.post('/create', async (req, res, next) => {
    try {
        const medalBody = req.body;
        const newMedal = await medalServices.createMedal(medalBody);
        res.json(newMedal);
    } catch (error) {
        next(error)
    }
})


export default router

