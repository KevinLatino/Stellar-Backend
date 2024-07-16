import { DataTypes, Model} from "sequelize";

const usersTable = "users";

class User extends Model { }

const initUserModel = (sequelize) => {
    User.init({
        id: {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
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
        secondLastName: {
            field: "second_last_name",
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: "User",
        tableName: usersTable,
        timestamps: false
    })
}

export { usersTable, User, initUserModel }