import { User } from "../Models/users.model.js";
import bcrypt from 'bcrypt';
import { Medal } from "../Models/medals.model.js";
import { UserMedal } from "../Models/users-medals.model.js";

class UserService {

    async findByEmail(email) {
        return User.findOne({ where: { email } });
    }

    async checkEmailRegistered(email) {
        const existingUser = await this.findByEmail(email);
        if (existingUser) {
            throw new Error('The email is already registered');
        }
    }

    async createUser(userData) {
        await this.checkEmailRegistered(userData.email);
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        return User.create({
            ...userData,
            password: hashedPassword
        });
    }

    async findById(id) {
        return User.findByPk(id);
    }

    async updateUser(id, userData) {
        const user = await this.findById(id);
        return user.update(userData);
    }

    async getAllMedals(userId) {
        const user = await User.findOne({
            where: { id: userId },
            include: [
                {
                    model: Medal,
                    as: "medals",
                    through: { model: UserMedal, attributes: [] },
                    attributes: ['title', 'description', 'image']
                }
            ]
        });
        return user?.medals || [];
    }

    async checkUserHasMedal(userId, medalTitle) {
        const userWithMedal = await User.findOne({
            where: { id: userId },
            include: [
                {
                    model: Medal,
                    as: "medals",
                    where: { title: medalTitle },
                    through: { model: UserMedal, attributes: [] },
                    attributes: ['title']
                }
            ]
        });

        return userWithMedal?.medals?.length > 0;
    }

    async checkUserHasGoalMedal(userId) {
        return this.checkUserHasMedal(userId, 'Goals');
    }

    async checkUserHasEisenhowerMedal(userId) {
        return this.checkUserHasMedal(userId, 'Eisenhower');
    }

    async checkUserHasPodomoroMedal(userId) {
        return this.checkUserHasMedal(userId, 'Podomoro');
    }

    async checkUserHasDatesMedal(userId) {
        return this.checkUserHasMedal(userId, 'Dates');
    }

    async checkUserHasEnvironmentMedal(userId) {
        return this.checkUserHasMedal(userId, 'Environment');
    }

    async checkUserHasMindfulnessMedal(userId) {
        return this.checkUserHasMedal(userId, 'Mindfulness');
    }
}

export default UserService;
