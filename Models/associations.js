import { User } from "./users.model.js"
import { Task } from "./tasks.model.js"

const initAssociations = () => {

    //A user can have many Tasks, but a task just can have a user
    User.hasMany(Task, { as: "task", foreignKey: "userId" });
    Task.belongsTo(User, { as: "user" })
}

export default initAssociations