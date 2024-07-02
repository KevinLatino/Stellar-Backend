import { initUserMedalModel } from "./users-medals.model.js"
import { initUserModel } from "./users.model.js"
import { initTaskModel } from "./tasks.model.js"
import { initMedalModel } from "./medals.model.js"
import db from "../Config/connection.js"


const initModels = () => {
    //initialize  user model
    initUserModel(db)

    //initialize task model
    initTaskModel(db)

    //initialize medal model
    initMedalModel(db)

    //initialize user-medal model
    initUserMedalModel(db);
}

export default initModels