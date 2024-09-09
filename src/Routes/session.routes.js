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
            const session = await sessionService.findById(newSession.token)
            res.json(session);
        } catch (error) {
            next(error);
        }
    }
);

router.post('/verifyToken', async (req, res, next) => {
    try {
        const token = req.body.token
        const verify = await sessionService.verifyToken(token)
        res.json(verify);
    } catch (error) {
        next(error);
    }
});

export default router;
