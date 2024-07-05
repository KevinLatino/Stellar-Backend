import { User } from "../Models/users.model.js"
import bcrypt from 'bcrypt'

class UserService {

    async checkEmailRegistered(email){
        const existingUser = await User.findOne({ where: { email } })
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
}

export default UserService;