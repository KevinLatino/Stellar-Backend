import { Router } from "express";
import UserMedalServices from "../Services/user-medal.service.js";

const userMedalServices = new UserMedalServices();

const router = Router();

router.post('/goals', async (req, res) => {
    const { userId, medalId } = req.body
    const goalsMedal = await userMedalServices.addSetGoalMedal(userId, medalId);
    res.json(goalsMedal)
})

router.post('/Eisenhower', async (req, res) => {
    const { userId, medalId } = req.body
    const goalsMedal = await userMedalServices.addEisenhowerMedal(userId, medalId);
    res.json(goalsMedal)
})

router.post('/Pomodoro', async (req, res) => {
    const { userId, medalId } = req.body
    const goalsMedal = await userMedalServices.addPodomoroMedal(userId, medalId);
    res.json(goalsMedal)
})

router.post('/Dates', async (req, res) => {
    const { userId, medalId } = req.body
    const goalsMedal = await userMedalServices.addDatesMedal(userId, medalId);
    res.json(goalsMedal)
})

router.post('/Environment', async (req, res) => {
    const { userId, medalId } = req.body
    const goalsMedal = await userMedalServices.addEnvironmentMedal(userId, medalId);
    res.json(goalsMedal)
})

router.post('/Mindfulness', async (req, res) => {
    const { userId, medalId } = req.body
    const goalsMedal = await userMedalServices.addMindfulnessMedal(userId, medalId);
    res.json(goalsMedal)
})


export default router;
