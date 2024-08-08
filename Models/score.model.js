import { Model, DataTypes } from "sequelize";
import { usersTable } from './users.model.js';

const scoreTable = "scores"

class Score extends Model {}

const initScoreModel = (sequelize) =>{
    Score.init({
        id: {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        score: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        userId: {
            field: "user_id",
            type: DataTypes.UUID,
            allowNull: true,
            unique: true,
            references: {
                model: usersTable,
                key: "id"
            }
        },
    }, {
        sequelize,
        modelName: "Score",
        tableName: scoreTable,
        timestamps: false
    })
}

export {scoreTable, Score, initScoreModel}