import { UserMedal } from "../Models/users-medals.model.js";
import { Medal } from "../Models/medals.model.js";

class UserMedalServices {

    async addSetGoalMedal(userId, medalId) {
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
}

export default UserMedalServices;
