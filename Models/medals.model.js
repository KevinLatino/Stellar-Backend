import { Model, DataTypes } from "sequelize";

const tableName = "medals"

class Medal extends Model { }

const initMedalModel = (sequelize) => {
    Medal.init({
        medalID: {
            field: "medal_id",
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
        }
    }, {
        sequelize,
        modelName: "Medal",
        tableName: tableName,
        timestamps: false
    })
}

export { tableName, Medal, initMedalModel }