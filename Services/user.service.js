import { User } from "../Models/users.model.js"
import bcrypt from 'bcrypt'
import { Medal } from "../Models/medals.model.js"
import { UserMedal } from "../Models/users-medals.model.js"

class UserService {

    async findByEmail(email) {
        const findEmail = await User.findOne({ where: { email: email } })
        return findEmail
    }

    async checkEmailRegistered(email) {
        const existingUser = await this.findByEmail(email)
        if (existingUser) {
            throw new Error('The email is already registered');
        }
    }
    async createUser(userData) {
        await this.checkEmailRegistered(userData.email)
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const newUser = await User.create({
            ...userData,
            password: hashedPassword
        })
        return newUser;
    }

    async findByid(id) {
        const findId = await User.findByPk(id)
        return findId
    }

    async updateUser(id, userData) {
        const findUser = await this.findByid(id);
        const updateUser = await findUser.update(userData);
        return updateUser;
    }

    async getAllMedals(userId) {
        const userWithMedals = await User.findOne({
            where: { id: userId },
            include: [
                {
                    model: Medal,
                    as: "medals",
                    through: {
                        model: UserMedal,
                        attributes: []
                    },
                    attributes: ['title', 'description', 'image']
                }
            ]
        });
        return userWithMedals?.medals || [];
    }
    
    
}

export default UserService;