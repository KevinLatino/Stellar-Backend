import { User } from "./users.model.js"
import { Session } from "./session.model.js";
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

    //A user can have many session, but a session just can have a user
    User.hasMany(Session, { as: "session", foreignKey: "userId" });
    Session.belongsTo(User, { as: "user" });


   //A user can have many Medals and a medal can have many users
   User.belongsToMany(Medal, { as: "medals", through: UserMedal, foreignKey: "userId", otherKey: "medalId" });
   Medal.belongsToMany(User, { as: "users", through: UserMedal, foreignKey: "medalId", otherKey: "userId" });   
}

export default initAssociations