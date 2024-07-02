import { Model, DataTypes } from "sequelize";
import { tableUser } from "./users.model.js";

const tasksTable = "tasks";

class Task extends Model { }

const initTaskModel = (sequelize) => {
    Task.init({
        id: {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        priority: {
            type: DataTypes.ENUM,
            values: ["espera", "normal", "urgente"],
            allowNull: false
        },
        userId: {
            allowNull: true,
            field: "user_id",
            unique: false,
            type: DataTypes.UUID,
            references: {
                model: tableUser, 
                key: "id",
            }
        }
    }, {
        sequelize,
        modelName: "Task",
        tableName: tableName,
        timestamps: false
    })
}

export {tableName, Task, initTaskModel}