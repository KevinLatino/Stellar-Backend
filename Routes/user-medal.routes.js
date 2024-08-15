import { Router } from "express";
import UserMedalServices from "../Services/user-medal.service.js";

const userMedalServices = new UserMedalServices();

const router = Router();

router.post('/goals', async (req, res) => {
    const { userId, medalId } = req.body
    const goalsMedal = await userMedalServices.addSetGoalMedal(userId, medalId);
    res.json(goalsMedal)
})


export default router;
