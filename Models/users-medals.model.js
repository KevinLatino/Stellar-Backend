import { Model, DataTypes, UUIDV4 } from "sequelize";
import { usersTable } from './users.model.js';
import { medalsTable } from './medals.model.js';

const userMedalTable = "user_medal";

class UserMedal extends Model { }

const initUserMedalModel = (sequelize) => {
    UserMedal.init({
        id: {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: UUIDV4
        },
        userId: {
            field: "user_id",
            type: DataTypes.UUID,
            unique: false,
            references: {
                model: usersTable,
                key: "id"
            }
        },
        medalId: {
            field: "medal_id",
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
            references: {
                model: medalsTable,
                key: "id"
            }
        },
    }, {
        sequelize,
        modelName: "UserMedal",
        tableName: userMedalTable,
        timestamps: false
    })
}

export { userMedalTable, UserMedal, initUserMedalModel }