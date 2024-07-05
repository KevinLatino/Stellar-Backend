import UserService from './user.service.js';
import bcrypt from 'bcrypt'
import boom from '@hapi/boom'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config();

const service = new UserService();

class SessionService {

    async findUser(email, password) {
        const user = await service.findByEmail(email);
        if (!user) {
            throw boom.unauthorized();
        }
        const comparedPassword = bcrypt.compare(password, user.password);
        if (!comparedPassword) {
            throw boom.unauthorized();
        }
        delete user.dataValues.password;
        return user
    }

    async signJwt(user) {
        const payload = {sub: user.id}
        const secret = process.env.SECRET
        const token = jwt.sign(payload, secret)
        return token
    }
}

export default SessionService