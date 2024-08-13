import { Model, DataTypes } from "sequelize";
import { usersTable } from './users.model.js';

const medalsTable = "medals"

class Medal extends Model { }

const initMedalModel = (sequelize) => {
    Medal.init({
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
        image: {
            type: DataTypes.STRING,
            allowNull: false
        },
        module: {
            type: DataTypes.ENUM,
            values: ["Goals", "Eisenhower", "Podomoro", "Dates", "Environment", "Mindfulness"],
            allowNull: false
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
        }
    }, {
        sequelize,
        modelName: "Medal",
        tableName: medalsTable,
        timestamps: false
    })
}

export { medalsTable, Medal, initMedalModel }