const filesService = require('../service/filesService')
const usersService = require('./usersService.js')
const emailsService = require('./emailsService.js')
const ApiError = require('../exceptions/apiError');

const {Article, Comment, User} = require('../models/models')
const Sequelize = require("sequelize");
const Op = Sequelize.Op;


const { EventEmitter } = require('node:events');

class EmailsEmitter extends EventEmitter {}

const emailsEmitter = new EmailsEmitter();
emailsEmitter.on('SendMails', function (article){
    emailsService.sendMails(article)
});

class articlesService {
    async getArticles(query, limit, page, sort_asc, sort_desc, tags = []){
        page = page || 1
        limit = limit ? limit : 10 
        let offset = page * limit - limit
        let sortBy = sort_asc || sort_desc ? (sort_asc ? sort_asc : sort_desc) : 'tag'
        let sortingDirection = sort_asc || sort_desc ? (sort_asc ? "ASC" : "DESC") : "ASC"

        const queryParams = {
            attributes:{
                include: [
                    [
                        Sequelize.literal(`(
                            SELECT COUNT(*)
                            FROM comments AS comment
                            WHERE
                                comment.article_id = article.id
                        )`),
                        'comments_count'
                    ]
                ]
            },
            raw: true,
            order: [
                [sortBy, sortingDirection],
                ['id', 'ASC']
            ],
            limit,
            offset
        }

        if(typeof tags == "string"){
            const value = tags
            tags = []
            tags.push(value)
        }
        const tagsFilter = tags.length > 0 ? { [Op.in]: tags } : { [Op.iLike]: "%" };
        
        if(query || (tags && tags.length)){
            queryParams.where = {
                [Op.and]: [
                    {[Op.or]: [  
                        { title: { [Op.iLike]: `%${query ? query : "%"}%` }},
                        { description: { [Op.iLike]: `%${query ? query : "%"}%` }},
                    ]},
                    {[Op.or]: [
                        {tag: tagsFilter}
                    ]}
                ]
            }
        }
        
        const articles = await Article.findAndCountAll(queryParams)
        
        return articles
    }

    async getSavedArticles(user_id, query, limit, page, sort_asc, sort_desc){
        const saved_articles = (await usersService.getUser(user_id)).saved_articles

        page = page || 1
        limit = limit ? limit : 10 
        let offset = page * limit - limit
        let sortBy = sort_asc || sort_desc ? (sort_asc ? sort_asc : sort_desc) : 'id'
        let sortingDirection = sort_asc || sort_desc ? (sort_asc ? "ASC" : "DESC") : "ASC"

        const queryParams = {
            attributes:{
                include: [
                    [
                        Sequelize.literal(`(
                            SELECT COUNT(*)
                            FROM comments AS comment
                            WHERE
                                comment.article_id = article.id
                        )`),
                        'comments_count'
                    ]
                ]
            },
            where: {
                id: {
                    [Op.in]: saved_articles
                }
            },
            raw: true,
            order: [
                [sortBy, sortingDirection]
            ],
            limit,
            offset
        }
        
        if(query){
            queryParams.where = {
                [Op.and]: [
                    {[Op.or]: [  
                        { title: { [Op.iLike]: `%${query}%` }},
                        { description: { [Op.iLike]: `%${query}%` }},
                    ]},
                    { 
                        id: {
                            [Op.in]: saved_articles
                        }
                    }
                ]
            }
        }
        
        const articles = await Article.findAndCountAll(queryParams)
        
        return articles
    }

    async getArticlesToChange(query, limit, page, sort_asc, sort_desc, user_id, roles){

        page = page || 1
        limit = limit ? limit : 10 
        let offset = page * limit - limit
        let sortBy = sort_asc || sort_desc ? (sort_asc ? sort_asc : sort_desc) : 'id'
        let sortingDirection = sort_asc || sort_desc ? (sort_asc ? "ASC" : "DESC") : "ASC"

        const queryParams = {
            attributes:{
                include: [
                    [
                        Sequelize.literal(`(
                            SELECT COUNT(*)
                            FROM comments AS comment
                            WHERE
                                comment.article_id = article.id
                        )`),
                        'comments_count'
                    ]
                ]
            },
            raw: true,
            order: [
                [sortBy, sortingDirection]
            ],
            limit,
            offset
        }

        queryParams.where = []
        
        if(!(roles.includes('admin') || roles.includes('moderator'))){
            queryParams.where.push({
                author_id: user_id
            })
        }

        if(query){
            queryParams.where.push({
                [Op.or]: [  
                    { title: { [Op.iLike]: `%${query}%` }},
                    { description: { [Op.iLike]: `%${query}%` }},
                ]
            })
        }
        
        const articles = await Article.findAndCountAll(queryParams)

        return articles
    }

    async getBestArticles(){
        const COMMENT_WEIGHT = 0.1
        const VIEW_WEIGHT = 0.01
        
        const articles = await Article.findAll({
            attributes:{
                include: [
                    [
                        Sequelize.literal(`(
                            SELECT COUNT(*)
                            FROM comments AS comment
                            WHERE
                                comment.article_id = article.id
                        )`),
                        'comments_count'
                    ]
                ]
            },
            raw:true
        })

        var weightCoef = []
        articles.forEach(article =>{
            weightCoef.push([article.id, article.comments_count * COMMENT_WEIGHT + article.views * VIEW_WEIGHT])
        })
        weightCoef.sort(function(a, b) {
            return b[1] - a[1];
        })
        weightCoef = weightCoef.slice(0, 5)
        var bestArticles = []
        weightCoef.forEach(item =>{
            articles.forEach(article =>{
                if(article.id === item[0]){
                    bestArticles.push(article)
                }
            })
        })

        return bestArticles
    }

    async getArticle(id){
        const article = await Article.findOne({
            attributes:{
                include: [
                    [Sequelize.col('user.username'), 'username'],
                    [Sequelize.col('user.name'), 'name'],
                    [Sequelize.col('user.surname'), 'surname'],
                    [
                        Sequelize.literal(`(
                            SELECT COUNT(*)
                            FROM comments AS comment
                            WHERE comment.article_id = article.id
                        )`),
                        'comments_count'
                    ]
                ],
                exclude: [
                    'updatedAt'
                ]
            },
            include: [
                {
                    model: User,
                    attributes: [],
                    paranoid: false
                }
            ],
            where: {id}
        })

        if(!article){
            throw ApiError.NotFound('Статья не найдена')
        }
      
        const updateViews = (article.toJSON()).views + 1

        await article.update({views: updateViews, where:{id}})

        return article
    }

    async addArticle(author_id, roles, title, description, tag, preview, titles, paragraphs, pictures, sources) {
      
        if(!title){
            throw ApiError.BadRequest('У статьи должно быть название')
        }
        if(!description){
            throw ApiError.BadRequest('У статьи должно быть описание')
        }
        if(!tag){
            throw ApiError.BadRequest('У статьи должен быть тег')
        }
        if(!titles){
            throw ApiError.BadRequest('У статьи должны быть заголовки')
        }
        if(!paragraphs){
            throw ApiError.BadRequest('У статьи должны быть параграфы')
        }
        if(!preview){
            throw ApiError.BadRequest('В статье должно присуствовать превью')
        }

        if(!roles.includes("admin") && !roles.includes("author")) {
            throw ApiError.BadRequest('У вас не достаточно прав доступа')
        }

        const article = await Article.create({title, description, tag, preview, titles, paragraphs, pictures, sources, author_id})   

        emailsEmitter.emit('SendMails', article);

        return article
    } 
    async updateArticle(article_id, user_id, roles, title, description, tag, preview, titles, paragraphs, pictures, sources) {

        var article = await Article.findByPk(article_id)
        if(!article){
            throw ApiError.NotFound('Статья не найдена');
        }
        if(user_id != (article.toJSON()).author_id && !roles.includes("admin") && !roles.includes("moderator")) {
            throw ApiError.BadRequest('У вас не достаточно прав доступа')
        }

        await article.update({title, description, tag, titles, paragraphs, pictures, preview, sources})

        return article
    }
    async deleteArticle(user_id, roles, article_id) {

        var article = await Article.findByPk(article_id)

        if(!article){
            throw ApiError.NotFound('Статья не найдена');
        }

        if(user_id != (article.toJSON()).author_id && !roles.includes("admin") && !roles.includes("moderator")) {
            throw ApiError.BadRequest('У вас не достаточно прав доступа')
        }

        article = await Article.destroy({where:{id: article_id}})
        return article
        /*const users = await db.query(`SELECT user_id FROM public."Users" WHERE $1 = any(fk_saved_articles_id)`, [article_id])
        users.rows.forEach(user => {
            usersService.deleteArticle(user.user_id, article_id)
        })
        await db.query(`DELETE FROM public."Comments" WHERE fk_article_id = $1`, [article_id])
        await db.query(`DELETE FROM public."Articles" WHERE article_id = $1`, [article_id])*/
        //await filesService.deleteDirPreview(article_id)
        //await filesService.deleteDirArticle(article_id)
    } 
}


module.exports =  new articlesService()