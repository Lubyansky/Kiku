const emailsService = require('../service/emailsService')

class EmailsContoller {

    async getEmails(req, res, next){
        try{
            const {query, limit, page, sort_asc, sort_desc} = req.query
            const emails = await emailsService.getEmails(query, limit, page, sort_asc, sort_desc)
            res.status(200).json(emails)
        }
        catch(e){
            next(e)
        }
    }

    async getEmail(req, res, next){
      try{
          const id = req.params.id
          const email = await emailsService.getEmailByPK(id)
          res.status(200).json(email)
      }
      catch(e){
          next(e)
      }
  }

    async addEmail(req, res, next){
        try {
            const {email} = req.body
            const Email = await emailsService.addEmail(email)
            res.status(200).json(Email)
        }
        catch(e) {
            next(e);
        }
    }

    async updateEmail(req, res, next){
        try{
            const email_id = req.params.id
            const {email_id: fk_email_id, roles} = req.user
            const {email} = req.body
            const Email = await emailsService.updateEmail(roles, email_id, fk_email_id, email)
            res.status(200).json(Email)
        }
        catch(e){
            next(e)
        }
    }

    async deleteEmail(req, res, next){
        try{
            const email_id = req.params.id
            const {email_id: fk_email_id, roles} = req.user
            const email = await emailsService.deleteEmail(roles, email_id, fk_email_id)
            return res.status(200).json({message: email ? "Email-адрес был успешно удален" : "Email-адрес не был удален"});
        }
        catch(e){
            next(e)
        }
    }
}


module.exports =  new EmailsContoller()