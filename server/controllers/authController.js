const authService = require('../service/authService')
const usersService = require('../service/usersService')
const { validationResult } = require('express-validator')

class EmailsContoller {

    async registration(req, res, next) {
        try {
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
            return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
          }
          const registration_date = req.requestTime
          const {username, password} = req.body;
          const userData = await authService.registration(username, password, registration_date);
          res.cookie('token', userData.token, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
          return res.status(200).json(userData);
        } 
        catch (e) {
          next(e);
        }
      }
    
      async login(req, res, next) {
        try {
          const {username, password} = req.body;
          const userData = await authService.login(username, password);
          res.cookie('token', userData.token, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, path: '/'})
          return res.status(200).json(userData);
        } 
        catch (e) {
          next(e);
        }
      }
    
      async logout(req, res, next) {
        try {
          const token = req.cookies.token || req.headers.bearer;
          const _token = await authService.logout(token);
          res.clearCookie('token');
          return res.status(200).json(_token);
        } 
        catch (e) {
          next(e);
        }
      }

  async addEmail(req, res, next){

    try {
      const {email} = req.body
      const checkEmail = await db.query(`SELECT email_id FROM public."Emails" WHERE email = $1`, [email])
      if(checkEmail.rows == 0){
        await db.query(`INSERT INTO public."Emails" (email_id, email) VALUES (default, $1) RETURNING *`, [email])
        res.status(201)
      }
    }
    catch(e) {
      next(e);
    }
  }

  async getUser(req, res, next){
    try {
      const {id} = req.user
      const user = await usersService.getUser(id)
      res.json(user)
    }
    catch(e) {
      next(e);
    }
  }
}


module.exports =  new EmailsContoller()