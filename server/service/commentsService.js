const {Comment, User} = require('../models/models')
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const ApiError = require('../exceptions/apiError');

class CommentsService {

    async getComments(query, limit, page, sort_asc, sort_desc, only_count = false){
        page = page || 1
        limit = limit ? limit : 10 
        let offset = page * limit - limit
        let sortBy = sort_asc || sort_desc ? (sort_asc ? sort_asc : sort_desc) : 'id'
        let sortingDirection = sort_asc || sort_desc ? (sort_asc ? "ASC" : "DESC") : "ASC"

        const queryParams = {
            raw: true,
            order: [
                [sortBy, sortingDirection]
            ],
            limit,
            offset
        }
        
        if(query){
            queryParams.where = {
                text: { [Op.iLike]: `%${query}%` }
            }
        }
        
        const comments = await Comment.findAndCountAll(queryParams)
        
        if(only_count){
            return comments.count
        }
        return comments
    }

    async getComments(query, limit, page, sort_asc, sort_desc, id, only_count = false){
        page = page || 1
        limit = limit ? limit : 10 
        let offset = page * limit - limit
        let sortBy = sort_asc || sort_desc ? (sort_asc ? sort_asc : sort_desc) : 'id'
        let sortingDirection = sort_asc || sort_desc ? (sort_asc ? "ASC" : "DESC") : "ASC"

        const queryParams = {
            attributes: {
                include:[
                    [Sequelize.col('user.username'), 'username'],
                    [Sequelize.col('user.name'), 'name'],
                    [Sequelize.col('user.surname'), 'surname'],
                    [Sequelize.col('user.roles'), 'roles']
                ]
            },
            include: [
                {
                    model: User,
                    attributes: [],
                    paranoid: false
                }
            ],
            where: {article_id: id},
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
                article_id: id,
                text: { [Op.iLike]: `%${query}%` }
            }
        }

        const comments = await Comment.findAndCountAll(queryParams)

        if(only_count){
            return comments.count
        }
        return comments
    }

    async getComment(id){
        const comment = await Comment.findByPk(id)
        if(!comment){
            throw ApiError.NotFound('Комментарий не найден');
        }
        return comment
    }

    async addСomment(user_id, text, article_id) {
        if(!text){
            throw ApiError.BadRequest('Коментарий не должен быть пустым');
        }
        const comment = await Comment.create({text, article_id, user_id})

        return comment
  
    }
    async updateComment(user_id, roles, comment_id, text) {

        const comment = await Comment.findByPk(comment_id)
        if(!comment){
            throw ApiError.NotFound('Комментарий не найден');
        }
        if(!text){
            throw ApiError.BadRequest('Коментарий не должен быть пустым');
        }
        if(user_id === comment.user_id || roles.includes("moderator") || roles.includes("admin") ) {
            await comment.update({text})
            return comment
        }
        else {
            throw ApiError.ForbiddenRequest("У вас нет доступа")
        } 
    }
    async deleteComment(user_id, roles, comment_id) {
        var comment = await Comment.findByPk(comment_id)
        
        if(!comment){
            throw ApiError.NotFound('Комментарий не найден');
        }

        if(user_id === comment.user_id || roles.includes("admin") || roles.includes("moderator")) {
            comment = Comment.destroy({where: {id: comment_id}})
            return comment
        }
        else {
           throw ApiError.ForbiddenRequest("У вас нет доступа")
        }
    }

}

module.exports = new CommentsService();