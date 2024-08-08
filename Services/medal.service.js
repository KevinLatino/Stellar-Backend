import { Medal } from "../Models/medals.model";

class MedalService {

    async createMedal (medalBody) {
        const createMedal = await Medal.create(medalBody);
        return createMedal
    }
}

export default MedalService
