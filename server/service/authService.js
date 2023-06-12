const {User} = require('../models/models')

const bcrypt = require('bcrypt');
const tokensService = require('./tokensService');

const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const ApiError = require('../exceptions/apiError');

class AuthService {
    async registration(username, password, _registration_date) {
        const candidate = await User.findOne({where: {username}})
        console.log(candidate)
        if (candidate && candidate.toJSON().roles.includes('admin')) {
            throw ApiError.BadRequest('')
        }
        if (candidate) {
            throw ApiError.ForbiddenRequest(`Пользователь ${username} уже существует`)
        }

        const hashPassword = await bcrypt.hash(password, 7);
        const user = (await User.create({username, password: hashPassword})).toJSON()
        delete user.password
        const token = tokensService.generateTokens({...user});
        await tokensService.saveToken(user.id, token);

        return {token, user}
    }

    async login(username, password) {
        if(!username){
            throw ApiError.BadRequest("Поле \"username\" не должно быть пустым")
        }
        if(!password){
            throw ApiError.BadRequest("Поле \"password\" не должно быть пустым")
        }
        const user = await User.findOne({
            attributes: ['id', 'username', 'password', 'name', 'surname', 'createdAt', 'roles', 'email_id'],
            where: {username},
            raw: true
        })
        if (!user) {
            throw ApiError.NotFound('Пользователь с таким именем не найден')
        }
        const isPassEquals = await this.validatePassword(password, user.password);
        if (!isPassEquals) {
            throw ApiError.ForbiddenRequest("У вас нет доступа")
        }
        delete user.password
        const token = tokensService.generateTokens({...user});
        await tokensService.saveToken(user.id, token);
        
        return {token, user}
    }

    async logout(token) {
        const _token = await tokensService.removeToken(token);
        return _token;
    }

    async validatePassword(verifyPass, realPassword){
        if(!verifyPass || !realPassword){
            return false
        }
        return await bcrypt.compare(verifyPass, realPassword);
    }
}

module.exports = new AuthService();