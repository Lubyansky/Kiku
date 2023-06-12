const usersService = require('../service/usersService');
const articlesService = require('../service/articlesService');
const commentsService = require('../service/commentsService')
const ApiError = require('../exceptions/apiError');

class UsersContoller {

  async getUsers(req, res, next) {
    try {
      const {query, limit, page, sort_asc, sort_desc} = req.query

      const user = await usersService.getUsers(query, limit, page, sort_asc, sort_desc)
      res.json(user)
    } 
    catch (e) {
      next(e);
    }
  }
  async getUser(req, res, next) {
    try {
      const id = req.params.id
      const user = await usersService.getUser(id)
      res.json(user)
    } 
    catch (e) {
      next(e);
    }
  }
  async updateUser(req, res, next) {
    try {

      const changeableUser = req.body
      changeableUser.id = req.params.id
      const initiatorUser = {id: req.user.id, roles: req.user.roles, token: req.cookies.token || req.headers.bearer}
      
      const newToken = await usersService.updateUser(initiatorUser, changeableUser)
      if(initiatorUser.id == changeableUser.id && newToken) {
        res.cookie('token', newToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, path: '/'})
      }
      return res.status(200).json({message: "Пользователь был успешно изменён"})
    } 
    catch(e) {
      next(e);
    }
  }
  /*async editPassword(req, res, next){
    try{
      const {user_id} = req.user
      const {oldPass, newPass} = req.body.input
      const data = await usersService.editPassword(user_id, oldPass, newPass)
      res.cookie('token', data.token, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, path: '/'})
      return res.status(200).json({message: "Пользователь был успешно изменён"})
    }
    catch(e){
      next(e);
    }
  }*/
  async deleteUser(req, res, next){
    try{
      const id = req.params.id
      const {id: user_id, roles} = req.user
      const token = req.cookies.token || req.headers.bearer

      if(id == user_id) {
        res.clearCookie('token');
      }
      await usersService.deleteUser(user_id, roles, token, id)
      return res.status(200).json({message: "Пользователь был успешно удалён"})
    }
    catch(e){
      next(e);
    }
  }

  async getSavedArticles(req, res, next){
    try {
      const {query, limit, page, sort_asc, sort_desc} = req.query
      const user_id = req.params.id
      const articles = await articlesService.getSavedArticles(user_id, query, limit, page, sort_asc, sort_desc)
      res.status(200).json(articles)
    }
    catch(e) {
      next(e);
    }
  }

  async getArticlesToChange(req, res, next){
    try {
      const {roles} = req.user
      const user_id = req.params.id
      const {query, limit, page, sort_asc, sort_desc} = req.query
      const articles = await articlesService.getArticlesToChange(query, limit, page, sort_asc, sort_desc, user_id, roles)
      res.status(200).json(articles)
    }
    catch(e) {
      next(e);
    }
  }

  /*async banUser(req, res, next){
    try{
      const {roles} = req.user
      const {user_id} = req.body
      await usersService.banUser(user_id, roles)
      return res.status(200).json({message: "Пользователь был успешно заблокирован"})
    }
    catch(e){
      next(e);
    }
  }

  async unbanUser(req, res, next){
    try{
      const {roles} = req.user
      const {user_id} = req.body
      await usersService.unbanUser(user_id, roles)
      return res.status(200).json({message: "Пользователь был успешно раззаблокирован"})
    }
    catch(e){
      next(e);
    }
  }*/

}


module.exports =  new UsersContoller()