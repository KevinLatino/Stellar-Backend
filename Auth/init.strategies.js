import passport from "passport";
import localStrategy from './Strategies/localStrategy.js'

const initStrategies = () => {
    passport.use(localStrategy);
}

export default initStrategies;