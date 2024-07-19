import { Model, DataTypes } from "sequelize";
import { usersTable } from "./users.model.js";

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
        dueDate: {
            field: "due_date",
            type: DataTypes.DATE,
            allowNull: false
        },
        completed: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        userId: {
            allowNull: true,
            field: "user_id",
            unique: false,
            type: DataTypes.UUID,
            references: {
                model: usersTable, 
                key: "id",
            }
        }
    }, {
        sequelize,
        modelName: "Task",
        tableName: tasksTable,
        timestamps: false
    });

    Task.addHook('beforeSave', (task) => {
        if (task.dueDate) {
            task.dueDate = new Date(task.dueDate).toISOString();
        }
    });
}



export { tasksTable, Task, initTaskModel };
