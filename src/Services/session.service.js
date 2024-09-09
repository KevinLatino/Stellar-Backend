import UserService from './user.service.js';
import { User } from '../Models/users.model.js';
import { Session } from '../Models/session.model.js';
import bcrypt from 'bcrypt'
import boom from '@hapi/boom'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config();

const service = new UserService();

class SessionService {

    async findById (token){
        const session = await Session.findByPk(token, {include: {
            model: User,
            as: "user",
            attributes: ["name", "lastName", "secondLastName"]
        }})
        return session
    }

    async findUser(email, password) {
        const user = await service.findByEmail(email);
        if (!user) {
            throw boom.unauthorized();
        }

        const comparedPassword = await bcrypt.compare(password, user.password);
        if (!comparedPassword) {
            throw boom.unauthorized();
        }

        delete user.dataValues.password;
        return user
    }

    async signJwt(user) {
        const payload = { sub: user.id }
        const secret = process.env.SECRET
        const token = jwt.sign(payload, secret)
        return token
    }

    async createSession(user) {
        const token = await this.signJwt(user);
        const newSession = await Session.create({ userId: user.id, token });
        return newSession
    }

    async verifyToken(token) {
        const session = await Session.findOne({ where: { token: token } });
        if (!session) {
            return false
        }
        return true;
    }
}

export default SessionService