import { Model, DataTypes } from "sequelize";

const tableName = "tasks";

class Task extends Model { }

const initTaskModel = (sequelize) => {
    Task.init({
        taskId: {
            field: "task_id",
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
    }, {
        sequelize,
        modelName: "Task",
        tableName: tableName,
        timestamps: false
    })
}

export {tableName, Task, initTaskModel}