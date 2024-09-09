import passport from "passport";
import localStrategy from './Strategies/localStrategy.js'
import jwtStrategy from "./Strategies/jwtStrategy.js";

const initStrategies = () => {
    passport.use(localStrategy);
    passport.use(jwtStrategy);
}

export default initStrategies;