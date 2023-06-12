const Router = require('express')
const router = new Router()
const usersController = require('../controllers/usersController.js')
const authMiddleware = require('../middlewares/authMiddleware.js')
const banMiddleware = require('../middlewares/banMiddleware.js')

router.get('/users', usersController.getUsers)
router.get('/users/:id', usersController.getUser)
router.get('/users/:id/articles/saved', usersController.getSavedArticles)
router.get('/users/:id/articles/change', authMiddleware, usersController.getArticlesToChange)
router.put('/users/:id', authMiddleware, banMiddleware, usersController.updateUser)
router.delete('/users/:id', authMiddleware, banMiddleware, usersController.deleteUser)


module.exports = router





