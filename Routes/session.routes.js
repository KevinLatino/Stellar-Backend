import { Router } from "express";
import passport from "passport";
import SessionService from "../Services/session.service.js";

const sessionService = new SessionService()
const router = Router();

router.post(
    '/login',
    passport.authenticate("local", { session: false }),
    async (req, res, next) => {
        try {
            const user = req.user;
            console.log(user);
            const token = await sessionService.signJwt(user);
            res.json({ user, token })
        } catch (error) {
            next(error)
        }
    }
);

export default router;
