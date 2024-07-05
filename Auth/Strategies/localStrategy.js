import { Strategy } from "passport-local";
import SessionService from "../../Services/session.service.js";

const service = new SessionService();

const localStrategy = new Strategy(
    {
        usernameField: "email",
        passwordField: "password"
    },
    async (email, password, done) => {
        try {
            const user = await service.findUser(email, password)
            done(null, user)
        } catch (error) {
            done(error, false)
        }
    }
);

export default localStrategy;
