import { UserMedal } from "../Models/users-medals.model";

class UserMedalServices {

    async addSetGoalMedal(userId, medalId){
        const addMedal = await UserMedal.create({
            userId: userId,
            medalId: medalId
        })
        return addMedal;
    }
}

export default UserMedalServices