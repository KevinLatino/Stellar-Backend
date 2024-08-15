import { Router } from "express";
import UserMedalServices from "../Services/user-medal.service.js";

const userMedalServices = new UserMedalServices();

const router = Router();

router.post('/goals', async (req, res) => {
    try {
        const { userId, medalId } = req.body
        const goalsMedal = await userMedalServices.addSetGoalMedal(userId, medalId);
        res.json(goalsMedal)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

router.post('/Eisenhower', async (req, res) => {
    try {
        const { userId, medalId } = req.body
        const goalsMedal = await userMedalServices.addEisenhowerMedal(userId, medalId);
        res.json(goalsMedal)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

router.post('/Pomodoro', async (req, res) => {
    try {
        const { userId, medalId } = req.body
        const goalsMedal = await userMedalServices.addPodomoroMedal(userId, medalId);
        res.json(goalsMedal)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

router.post('/Dates', async (req, res) => {
    try {
        const { userId, medalId } = req.body
        const goalsMedal = await userMedalServices.addDatesMedal(userId, medalId);
        res.json(goalsMedal)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

})

router.post('/Environment', async (req, res) => {
    try {
        const { userId, medalId } = req.body
        const goalsMedal = await userMedalServices.addEnvironmentMedal(userId, medalId);
        res.json(goalsMedal)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

})

router.post('/Mindfulness', async (req, res) => {
    try {
        const { userId, medalId } = req.body
        const goalsMedal = await userMedalServices.addMindfulnessMedal(userId, medalId);
        res.json(goalsMedal)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

})


export default router;
