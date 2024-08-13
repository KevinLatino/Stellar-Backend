import { Router } from "express";
import MedalService from "../Services/medal.service.js";

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

router.get('/find/:id', async (req, res, next) => {
    const { id } = req.params;
    const medal = await medalServices.findMedal(id);
    res.json(medal)
})

router.get('/findAll', async (req, res, next) => {
    try {
        const medals = await medalServices.findAllMedals();
        res.json(medals);
    } catch (error) {
        next(error);
    }
});

export default router

