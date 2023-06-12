const nodemailer = require('nodemailer');
const config = require('../config.js')
const {Email} = require('../models/models')
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const ApiError = require('../exceptions/apiError');

class EmailsService {

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: "smtp-kiku.alwaysdata.net",
            port: 587,
            secure: false,
            auth: {
                user: "kiku@alwaysdata.net",
                pass: "79gs.y3q@R#H3Zg"
            }
        })
    }

    async sendMail(to, article) {
        await this.transporter.sendMail({
            from: "kiku@alwaysdata.net",
            to,
            subject: "Новый материал: «" + article.title + "»",
            text: '',
            html:
                `
                    <div>
                        <h1>${article.title}</h1>
                        <h2>${article.tag}</h2>
                        <p>${article.description}</p>
                        <img width="480" height="268" :src = "${article.preview}">
                        <div>Ознакомиться можно ссылке: <a href=${config.WEB_URL}/articles/${article.id}>${config.WEB_URL}/articles/${article.id}</a><div>
                    </div>
                `
        })
    }

    async sendMails(article){
        let emails = await this.getEmails()
        emails.rows.forEach(email => {
            this.sendMail((email.toJSON()).email, article)
        })
    }

    async getEmails(query, limit, page, sort_asc, sort_desc){
        page = page || 1
        limit = limit ? limit : 10 
        let offset = page * limit - limit
        let sortBy = sort_asc || sort_desc ? (sort_asc ? sort_asc : sort_desc) : 'id'
        let sortingDirection = sort_asc || sort_desc ? (sort_asc ? "ASC" : "DESC") : "ASC"

        const queryParams = {
            order: [
                [sortBy, sortingDirection],
                ['id', 'ASC']
            ],
            limit,
            offset
        }
        
        if(query){
            queryParams.where = {
                email: { [Op.iLike]: `%${query}%` }
            }
        }
        
        const emails = await Email.findAndCountAll(queryParams)
        
        return emails
    }

    async getEmailByPK(id){
        const email = await Email.findByPk(id)
        if(!email){
            throw ApiError.NotFound('Email не найден');
        }
        return email
    }

    async getEmail(email){
        const _email = await Email.findOne({where: {email}})
        if(!_email){
            throw ApiError.NotFound('Email не найден');
        }
        return _email
    }

    async addEmail(email) {
        if(!email){
            throw ApiError.BadRequest('Email-адрес не должен быть пустым');
        }
        var _email = await Email.findAndCountAll({where:{email}})
        if(_email.count > 0){
            throw ApiError.BadRequest('Email-адрес уже занят');
        }
        _email = await Email.create({email})
        return _email
  
    }
    async updateEmail(roles, email_id, fk_email_id, email) {

        const _email = await Email.findByPk(email_id)
        if(!_email){
            throw ApiError.NotFound('Email-адрес не найден');
        }
        if(!email){
            throw ApiError.BadRequest('Email-адрес не должен быть пустым');
        }
        if(fk_email_id === _email.id || roles.includes("moderator") || roles.includes("admin") ) {
            await _email.update({email})
            return _email
        }
        else {
            throw ApiError.ForbiddenRequest("У вас нет доступа")
        } 
    }
    async deleteEmail(roles, email_id, fk_email_id) {
        var _email = await Email.findByPk(email_id)
        
        if(!_email){
            throw ApiError.NotFound('Email-адрес не найден');
        }

        if(fk_email_id === _email.id || roles.includes("admin") || roles.includes("moderator")) {
            _email = Email.destroy({where: {id: email_id}})
            return _email
        }
        else {
           throw ApiError.ForbiddenRequest("У вас нет доступа")
        }
    }
}

module.exports = new EmailsService();
