import { Router } from "express";
import UserService from "../Services/user.service.js";
import passport from "passport";

const userServices = new UserService();
const router = Router();

router.post('/create',
    passport.authenticate("jwt", { session: false }),
    async (req, res, next) => {
        try {
            const userData = req.body
            const newUser = await userServices.createUser(userData);
            res.json(newUser)
        } catch (error) {
            next(error)
        }
    })

router.put('/update/:id',
    passport.authenticate("jwt", { session: false }),
    async (req, res, next) => {
        try {
            const { id } = req.params
            const userData = req.body;
            const update = await userServices.updateUser(id, userData)
            res.json(update)
        } catch (error) {
            next(error)
        }
    })

router.get('/medals/:userId', async (req, res) => {
    const { userId } = req.params;
    const getAllTasks = await userServices.getAllMedals(userId);
    res.json(getAllTasks)
});

router.get('/checkGoalMedal/:userId', async (req, res) => {
    const { userId } = req.params;
    const checkMedal = await userServices.checkUserHasGoalMedal(userId);
    res.json(checkMedal)
})

router.get('/checkEisenhowerMedal/:userId', async (req, res) => {
    const { userId } = req.params;
    const checkMedal = await userServices.checkUserHasGoalMedal(userId);
    res.json(checkMedal)
})


export default router