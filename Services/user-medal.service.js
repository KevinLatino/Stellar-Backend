import { UserMedal } from "../Models/users-medals.model.js";

class UserMedalServices {

    async addMedal(userId, medalId) {
        const existingMedal = await UserMedal.findOne({
            where: {
                userId: userId,
                medalId: medalId
            }
        });

        if (existingMedal) {
            return existingMedal; 
        }
        
        const addMedal = await UserMedal.create({
            userId: userId,
            medalId: medalId
        });

        return addMedal;
    }

    async addSetGoalMedal(userId, medalId) {
        return this.addMedal(userId, medalId);
    }

    async addEisenhowerMedal(userId, medalId) {
        return this.addMedal(userId, medalId);
    }

    async addPodomoroMedal(userId, medalId) {
        return this.addMedal(userId, medalId);
    }

    async addDatesMedal(userId, medalId) {
        return this.addMedal(userId, medalId);
    }

    async addEnvironmentMedal(userId, medalId) {
        return this.addMedal(userId, medalId);
    }

    async addMindfulnessMedal(userId, medalId) {
        return this.addMedal(userId, medalId);
    }
}

export default UserMedalServices;
