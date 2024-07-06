import { Router } from "express";
import passport from "passport";
import SessionService from "../Services/session.service.js";

const sessionService = new SessionService();
const router = Router();

router.post(
    '/login',
    passport.authenticate("local", { session: false }),
    async (req, res, next) => {
        try {
            const user = req.user;
            const newSession = await sessionService.createSession(user)
            res.json(newSession);
        } catch (error) {
            next(error);
        }
    }
);

export default router;
