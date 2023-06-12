const Router = require('express')
const router = new Router()
const articlesController = require('../controllers/articlesController.js')
const authMiddleware = require('../middlewares/authMiddleware.js')

router.get('/articles', articlesController.getArticles)
router.get('/articles/best', articlesController.getBestArticles)
router.get('/articles/:id', articlesController.getArticle)
router.get('/articles/:id/comments', articlesController.getArticleComments)
router.post('/articles', authMiddleware, articlesController.addArticle)
router.put('/articles/:id', authMiddleware, articlesController.updateArticle)
router.delete('/articles/:id', authMiddleware, articlesController.deleteArticle)


router.post('/upload_picture_preview', authMiddleware, articlesController.uploadPicturePreview)
router.post('/upload_pictures_article', authMiddleware, articlesController.uploadPicturesArticle)
router.delete('/remove_picture_preview', authMiddleware, articlesController.removePicturePreview)
router.delete('/remove_pictures_article', authMiddleware, articlesController.removePicturesArticle)

module.exports = router
