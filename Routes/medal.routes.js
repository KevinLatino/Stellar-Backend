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

router.get('/find/:id', async (req, res, next) => {
    const { id } = req.params;
    const medal = await medalServices.findMedal(id);
    res.json(medal)
})

router.get('/findAll/:userId',
    passport.authenticate("jwt", { session: false }),
    async (req, res, next) => {
        try {
            const userId = req.params.userId;
            const medals = await medalServices.findAllMedals(userId);
            res.json(medals);
        } catch (error) {
            next(error);
        }
    });

router.get('/findPodomoro/:userId',
    passport.authenticate("jwt", { session: false }),
    async (req, res, next) => {
        try {
            const userId = req.params.userId;
            const podomoroMedals = await medalServices.findPodomoroMedals(userId);
            res.json(podomoroMedals);
        } catch (error) {
            next(error);
        }
    });



export default router

