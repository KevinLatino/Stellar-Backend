import { Model, DataTypes } from "sequelize";
import { usersTable } from "./users.model.js";

const sessionsTable = "sessions"

class Session extends Model { }

const initSessionModel = (sequelize) => {
    Session.init({
        token: {
            primaryKey: true,
            type: DataTypes.STRING
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
        },
    }, {
        sequelize,
        modelName: "Sessions",
        tableName: sessionsTable,
        timestamps: false
    })
}

export { sessionsTable, Session, initSessionModel }