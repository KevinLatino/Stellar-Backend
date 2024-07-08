import { Strategy, ExtractJwt } from "passport-jwt";
import dotenv from "dotenv";

dotenv.config();

const extract = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET
}

const jwtStrategy = new Strategy(extract, (payload, done) => {
    done(null, payload)
})

export default jwtStrategy