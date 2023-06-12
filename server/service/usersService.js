const bcrypt = require('bcrypt');


const tokensService = require('./tokensService');
const commentsService = require('./commentsService.js')
const emailsService = require('./emailsService');
const authService = require('./authService.js')
const savedArticles = require('./savedArticles.js')


const ApiError = require('../exceptions/apiError');

const { User, Email } = require('../models/models')
const Sequelize = require("sequelize");
const Op = Sequelize.Op;


class UsersService {

    async getUsers(query, limit, page, sort_asc, sort_desc){
        page = page || 1
        limit = limit ? limit : 10 
        let offset = page * limit - limit
        let sortBy = sort_asc || sort_desc ? (sort_asc ? sort_asc : sort_desc) : 'id'
        let sortingDirection = sort_asc || sort_desc ? (sort_asc ? "ASC" : "DESC") : "ASC"

        const queryParams = {
            attributes: {
                include: [
                    [Sequelize.col('email.email'), 'email']
                ],
                exclude: [
                    "password"
                ]
            },
            include: [
                {
                    model: Email,
                    attributes: []
                },
            ],
            raw: true,
            order: [
                [sortBy, sortingDirection],
                ['id', 'ASC']
            ],
            limit,
            offset
        }
        
        if(query){
            queryParams.where = {
                [Op.or]: [  
                    {[Op.and]: [
                        { username: { [Op.iLike]: `%${query}%` }},
                        { username: { [Op.notILike]: `admin%` }}
                    ]},
                    { name: { [Op.iLike]: `%${query}%` }},
                    { surname: { [Op.iLike]: `%${query}%` }},
                ]
            }
        }
        
        const users = await User.findAndCountAll(queryParams)

        return users
    }

    async getUser(id){
        const user = await User.findOne({
            attributes: {
                include: [
                    [Sequelize.col('email.email'), 'email'],
                ],
                exclude: [
                    "password"
                ]
            },
            include: [
                {
                    model: Email,
                    attributes: []
                },
            ],
            raw: true,
            where: {id}
        })

        if(!user){
            throw ApiError.NotFound('Пользователь не найден');
        }

        return user
    }
    
    async updateUser(initiatorUser, changeableUser){
        console.log(initiatorUser)
        async function checkUser(){
            if(!user){
                throw ApiError.NotFound('Пользователь не найден');
            }
            if(initiatorUser.id != (user.toJSON()).id && !initiatorUser.roles.includes("admin") && !initiatorUser.roles.includes("moderator")) {
                throw ApiError.BadRequest('У вас не достаточно прав доступа')
            }
        }

        async function checkUsername(){
            let userByUsername = null
            if(changeableUser.username){
                userByUsername = await User.findOne({where: {username: `${changeableUser.username}`}})
            }
            if(userByUsername && changeableUser.username != userByUsername.username){
                throw ApiError.BadRequest('Пользователь с таким именем уже существует')
            }
        }

        async function checkPassword(){
            if(changeableUser.newPass && !changeableUser.oldPass){
                throw ApiError.ForbiddenRequest('У вас не достаточно прав доступа')
            }
            if(changeableUser.newPass != changeableUser.reNewPass){
                throw ApiError.ForbiddenRequest('Новый пароль и повторный пароль не совпадают')
            }
            if(changeableUser.oldPass && !(await authService.validatePassword(changeableUser.oldPass, user.password))){
                throw ApiError.ForbiddenRequest('Введен неверный пароль')
            }
            if(changeableUser.newPass){
                changeableUser.newPass = await bcrypt.hash(changeableUser.newPass, 7);
            }
        }

        async function checkEmail(){
            let emailInDB = null
            let userWithThisEmail = null
            var re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            
            if(changeableUser.email && !re.test(changeableUser.email)){
                throw ApiError.BadRequest('Введен некорректный email-адрес')
            }
            if(changeableUser.email){
                try{
                    emailInDB = await emailsService.getEmail(changeableUser.email)
                }
                catch{}
            }
            if(emailInDB){
                userWithThisEmail = await User.findOne({where:{email_id: emailInDB.id}})
            }
            if(emailInDB && userWithThisEmail){
                throw ApiError.BadRequest('Этот email-адрес уже занят')
            }
            if(emailInDB && !userWithThisEmail){
                changeableUser.email_id = emailInDB.id
            }
            if(!emailInDB && changeableUser.email){
                const _email = await emailsService.addEmail(changeableUser.email)
                changeableUser.email_id = _email.id
            }
        }

        async function changeSavedArticles(){
            let saved_articles = (user.toJSON()).saved_articles
            if(changeableUser.article_id){
                saved_articles = savedArticles.changeSavedArticles(user.toJSON(), changeableUser.article_id)
            }
            changeableUser.saved_articles = saved_articles
        }

        async function checkRoles(){
            if(changeableUser.roles && !changeableUser.roles.length){
                throw ApiError.BadRequest(`Роли не должны быть пустыми`)
            }
        }

        let user = await User.findByPk(changeableUser.id)

        await checkUser()
        await checkUsername()
        await checkPassword()
        await checkEmail()
        await changeSavedArticles()
        await checkRoles()

        user = (await user.update(
            {
                username: changeableUser.username,
                password: changeableUser.newPass ? changeableUser.newPass : user.password,
                surname: changeableUser.surname, 
                name: changeableUser.name, 
                email_id: changeableUser.email_id, 
                roles: changeableUser.roles, 
                saved_articles: changeableUser.saved_articles, 
                is_banned: changeableUser.is_banned
            }
        )).toJSON()
        delete user.password


        if(changeableUser.id == initiatorUser.id && initiatorUser.token){
            await tokensService.removeToken(initiatorUser.token);

            const newToken = tokensService.generateTokens({...user});
            await tokensService.saveToken(user.id, newToken);
            return newToken
        }


        const token = await tokensService.findTokenByUserId(changeableUser.id)
        if(changeableUser.id != initiatorUser.id && token){
            await tokensService.removeToken(token.dataValues.token);
        }

    }

    /*async updateUser(user_id, roles, token, id, username, name, pass, newPass, surname, email, newRoles, article_id, is_banned){
        async function checkUser(user_id, roles, id){
            let user = await User.findByPk(id)

            if(!user){
                throw ApiError.NotFound('Пользователь не найден');
            }
            if(user_id != (user.toJSON()).id && !roles.includes("admin") && !roles.includes("moderator")) {
                throw ApiError.BadRequest('У вас не достаточно прав доступа')
            }

        }



        let user = await User.findByPk(id)
        let userByUsername = null
        let email_id = null
        let emailInDB = null
        let saved_articles = (user.toJSON()).saved_articles
        var re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

        if(!user){
            throw ApiError.NotFound('Пользователь не найден');
        }
        if(user_id != (user.toJSON()).id && !roles.includes("admin") && !roles.includes("moderator")) {
            throw ApiError.BadRequest('У вас не достаточно прав доступа')
        }

        // Изменение username
        if(username){
            userByUsername = await User.findOne({where: {username}})
        }
        if(userByUsername && user.username != userByUsername.username){
            throw ApiError.BadRequest('Пользователь с таким именем уже существует')
        }

        // Изменение пароля
        if(pass && !(await authService.validatePassword(user.password, pass))){
            throw ApiError.ForbiddenRequest('Введен неверный пароль')
        }
        if(newPass){
            newPass = await bcrypt.hash(newPass, 7);
        }

        // Изменение почты
        if(email && !re.test(email)){
            throw ApiError.BadRequest('Введен некорректный email-адрес')
        }
        if(email){
            emailInDB = await emailsService.getEmail(email)
        }
        if(emailInDB){
            email_id = emailInDB.id
        }
        if(!emailInDB && email){
            const _email = await emailsService.addEmail(email)
            email_id = _email.id
        }

        // Изменение роли
        if(newRoles && !newRoles.length){
            throw ApiError.BadRequest(`Роли не должны быть пустыми`)
        }

        // Изменение сохраненных статей
        if(article_id){
            saved_articles = savedArticles.changeSavedArticles(user.toJSON(), article_id)
        }
        
        
        user = (await user.update({username, password: newPass ? newPass : user.password, surname, name, email_id, roles: newRoles, saved_articles, is_banned})).toJSON()
        delete user.password

        if(user_id === id && token){
            await tokensService.removeToken(token);

            const newToken = tokensService.generateTokens({...user});
            await tokensService.saveToken(user.id, newToken);
            return newToken
        }

    }*/

    async deleteUser(user_id, roles, token, id){
        var user = await User.findByPk(id)

        if(!user){
            throw ApiError.NotFound('Пользователь не найден');
        }
  
        if(user_id != id && !roles.includes("admin") && !roles.includes("moderator")) {
            throw ApiError.BadRequest('У вас не достаточно прав доступа')
        }

        user = await User.destroy({where:{id}})

        if(user_id === id){
            await tokensService.removeToken(token);
        }

        return user
    }

   /* async banUser(user_id, roles){
        if(roles.includes("admin") || roles.includes("moderator")) {
            await db.query(`UPDATE public."Users" SET is_banned = $2
                WHERE user_id = $1 
                RETURNING *`, [user_id, true])
            const tokenData = await db.query(
                    `SELECT token
                    FROM public."Tokens"
                    WHERE fk_user_id = $1`, [user_id])
            if(tokenData.rows[0]){
                const token = tokenData.rows[0].token
                await tokensService.removeToken(token);
            }
        }
        else {
            throw ApiError.ForbiddenRequest("У вас нет доступа")
        }
    }

    async unbanUser(user_id, roles){
        if(roles.includes("admin") || roles.includes("moderator")) {
            await db.query(`UPDATE public."Users" SET is_banned = $2
                WHERE user_id = $1 
                RETURNING *`, [user_id, false])
        }
        else {
            throw ApiError.ForbiddenRequest("У вас нет доступа")
        }
    }*/

    
    async getArticlesToChange(user_id, roles){
        var articles
        if(roles.includes("admin") || roles.includes("moderator")){
            articles = await db.query(`SELECT * FROM public."Articles" ORDER BY article_id`)
        }
        else{
            articles = await db.query(`SELECT * FROM public."Articles" WHERE fk_author_id = $1 ORDER BY article_id`, [user_id])
        }
        articles = await commentsService.attachComments(articles, true)
        return articles.rows
    }
}

module.exports = new UsersService();
