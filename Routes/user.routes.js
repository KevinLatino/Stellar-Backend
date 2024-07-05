import { Router } from "express";
import UserService from "../Services/user.service.js";

const userServices = new UserService();
const router = Router();

router.post('/create', async (req, res, next) => {
    try {
        const userData = req.body
        const newUser = await userServices.createUser(userData);
        res.json(newUser)   
    } catch (error) {
        next(error)
    }
})


export default router