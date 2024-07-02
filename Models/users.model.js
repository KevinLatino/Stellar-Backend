import { DataTypes, Model} from "sequelize";

const tableName = "users";

class User extends Model { }

const initUserModel = (sequelize) => {
    User.init({
        userId: {
            field: "user_id",
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            field: "last_name",
            type: DataTypes.STRING,
            allowNull: false
        },
        
    }, {
        sequelize,
        modelName: "User",
        tableName: tableName,
        timestamps: false
    })
}

export { tableName, User, initUserModel }