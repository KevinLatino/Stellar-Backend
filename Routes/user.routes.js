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

router.get('/medals/:userId', 
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
    const { userId } = req.params;
    const getAllTasks = await userServices.getAllMedals(userId);
    res.json(getAllTasks)
});

router.get('/checkGoalMedal/:userId', 
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
    const { userId } = req.params;
    const checkMedal = await userServices.checkUserHasGoalMedal(userId);
    res.json(checkMedal)
})

router.get('/checkEisenhowerMedal/:userId',
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
    const { userId } = req.params;
    const checkMedal = await userServices.checkUserHasEisenhowerMedal(userId);
    res.json(checkMedal)
})

router.get('/checkPodomoroMedal/:userId',
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
    const { userId } = req.params;
    const checkMedal = await userServices.checkUserHasPodomoroMedal(userId);
    res.json(checkMedal)
})

router.get('/checkDateMedal/:userId', 
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
    const { userId } = req.params;
    const checkMedal = await userServices.checkUserHasDatesMedal(userId);
    res.json(checkMedal)
})


router.get('/checkEnvironmentMedal/:userId',
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
    const { userId } = req.params;
    const checkMedal = await userServices.checkUserHasEnvironmentMedal(userId);
    res.json(checkMedal)
})

router.get('/checkMindfulnessMedal/:userId', 
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
    const { userId } = req.params;
    const checkMedal = await userServices.checkUserHasMindfulnessMedal(userId);
    res.json(checkMedal)
})

export default router