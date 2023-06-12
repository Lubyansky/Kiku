const commentsService = require('../service/commentsService')

class CommentsContoller {

    async getComments(req, res, next){
        try {
            const {query, limit, page, sort_asc, sort_desc, only_count} = req.query
            const comments = await commentsService.getComments(query, limit, page, sort_asc, sort_desc, only_count)
            res.status(200).json(comments)
        }
        catch(e) {
            next(e);
        }
    }

    async getComment(req, res, next){
        try {
            const id = req.params.id
            const comment = await commentsService.getComment(id)
            res.status(200).json(comment)
        }
        catch(e) {
            next(e);
        }
    }

    async addСomment(req, res, next){
        try {
            const {id: user_id} = req.user
            const {text, article_id} = req.body
            const comment = await commentsService.addСomment(user_id, text, article_id)
            res.status(200).json(comment)
        }
        catch(e) {
            next(e);
        }
    }

    async updateComment(req, res, next){
        try {
            const comment_id = req.params.id
            const {id: user_id, roles} = req.user
            const {text} = req.body
            const comment = await commentsService.updateComment(user_id, roles, comment_id, text)
            res.status(200).json(comment)
        }
        catch(e) {
            next(e);
        }
    }

    async deleteComment(req, res, next){
        try {
            const comment_id = req.params.id
            const {id: user_id, roles} = req.user
            const comment = await commentsService.deleteComment(user_id, roles, comment_id)
            return res.status(200).json({message: comment ? "Комментарий был успешно удален" : "Комментарий не был удален"});
        }
        catch(e) {
            next(e);
        }
    }

}


module.exports =  new CommentsContoller()