import { Medal } from "../Models/medals.model.js";

class MedalService {

    async findById(id) {
        const foundId = await Medal.findByPk(id);
        return foundId
    }

    async findAllMedals(userId) {
        const medals = await Medal.findAll({
            where: {
                userId
            }
        });
        return medals;
    }

    async createMedal(medalBody) {
        const createMedal = await Medal.create(medalBody);
        return createMedal
    }

    async findMedal(id) {
        const medal = await Medal.findOne({
            where: {
                id: id
            }
        })
        return medal
    }

}

export default MedalService
