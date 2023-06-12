const articlesService = require('../service/articlesService')
const usersService = require('../service/usersService')
const commentsService = require('../service/commentsService')
const filesService = require('../service/filesService')

class ArticlesContoller {

  async getArticles(req, res, next){
    try {
      const {query, limit, page, sort_asc, sort_desc, tags} = req.query
      const articles = await articlesService.getArticles(query, limit, page, sort_asc, sort_desc, tags)
      res.status(200).json(articles)
    }
    catch(e) {
      next(e);
    }
  }

  async getBestArticles(req, res, next){
    try {
      const articles = await articlesService.getBestArticles()
      res.status(200).json(articles)
    }
    catch(e) {
      next(e);
    }
  }

  async getArticle(req, res, next){
    try {
      const id = req.params.id
      const article = await articlesService.getArticle(id)
      res.status(200).json(article)
    }
    catch(e) {
      next(e);
    }
  }

  async addArticle(req, res, next) {
    try {
      const {id: user_id, roles} = req.user
      const {title, description, tag, titles, paragraphs, pictures, preview, sources} = req.body

      const article = await articlesService.addArticle(user_id, roles, title, description, tag, preview, titles, paragraphs, pictures, sources)
      
      return res.status(200).json(article)
    } 
    catch (e) {
      next(e);
    }
  }

  async updateArticle(req, res, next) {
    
    try {
      const {id: user_id, roles} = req.user
      const {id: article_id} = req.params
      const {title, description, tag, titles, paragraphs, pictures, preview_image, sources} = req.body

      const article = await articlesService.updateArticle(article_id, user_id, roles, title, description, tag, preview_image, titles, paragraphs, pictures, sources)

      return res.status(200).json(article)
    } 
    catch (e) {
      next(e);
    }
  }

  async deleteArticle(req, res, next) {
    try {
      const {id: user_id, roles} = req.user
      const {id: article_id} = req.params

      const article = await articlesService.deleteArticle(user_id, roles, article_id)
      return res.status(200).json({message: article ? "Статья была успешно удалена" : "Статья не была удалена"});
    } 
    catch (e) {
      next(e);
    }
  }

  async getArticleComments(req, res, next){
    try {
        const {query, limit, page, sort_asc, sort_desc, tags} = req.query
        const id = req.params.id
        const comments = await commentsService.getComments(query, limit, page, sort_asc, sort_desc, id)
        res.status(200).json(comments)
    }
    catch(e) {
        next(e);
    }
}

  async uploadPicturePreview(req, res, next){
    try{
      const file = req.files.file
      if(!file){
        return res.status(400)
      }
      const article_id = req.body.article_id

      const relativePath = await filesService.uploadPicturePreview(file, article_id)

      return res.status(200).json({path: relativePath})
    }
    catch(e){
      res.status(500).json({message:"Ошибка загрузки"})
      next(e)
    }
  }

  async uploadPicturesArticle(req, res, next){
    try{
      /*const files = req.files
      if(!files){
        return res.status(400)
      }*/
      //const article_id = req.body.article_id
      console.log(Buffer.from(req.body.picture, 'base64').toString('base64'))
      //console.log(JSON.parse(window.atoa(req.body.picture)))
      //const relativePath = await filesService.uploadPicturesArticle(files, article_id)

      return res.status(200).json({path: relativePath})
    }
    catch(e){
      res.status(500).json({message:"Ошибка загрузки"})
      next(e)
    }
  }

  async removePicturePreview(req, res, next){
    try{
      const {article_id} = req.body

      await filesService.deleteDirPreview(article_id)
      
      return res.status(200).json({message: 'Директории успешно удалены'})
    }
    catch(e){
      res.status(500).json({message:"Ошибка удаления"})
      next(e)
    }
  }

  async removePicturesArticle(req, res, next){
    try{
      const {article_id} = req.body

      await filesService.deleteDirArticle(article_id)
      
      return res.status(200).json({message: 'Директории успешно удалены'})
    }
    catch(e){
      res.status(500).json({message:"Ошибка удаления"})
      next(e)
    }
  }
}


module.exports = new ArticlesContoller()