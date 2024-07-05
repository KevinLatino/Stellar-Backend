import { User } from "./users.model.js"
import { Task } from "./tasks.model.js"
import { Medal } from "./medals.model.js";
import { UserMedal } from "./users-medals.model.js";
import { Score } from "./score.model.js";

const initAssociations = () => {
    //Associations 1 to 1
    //A score just can have a user and a user just can have a score
    Score.belongsTo(User, { as: "user" });


    //Associations 1 to N
    //A user can have many Tasks but a task just can have a user
    User.hasMany(Task, { as: "task", foreignKey: "userId" });
    Task.belongsTo(User, { as: "user" });

    //Associations N to N
    //A user can have many Medals and a medal can have many users
    User.belongsToMany(Medal, { as: "medal", through: UserMedal, foreignKey: "userId", otherKey: "medalID" });
    Medal.belongsToMany(User, { as: "user", through: UserMedal, foreignKey: "medalID", otherKey: "userId" });
}

export default initAssociations