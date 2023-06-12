const Router = require('express')
const router = new Router()
const commentsController = require('../controllers/commentsController.js')
const authMiddleware = require('../middlewares/authMiddleware.js')
const banMiddleware = require('../middlewares/banMiddleware.js')


router.get('/comments', commentsController.getComments)
router.get('/comments/:id', commentsController.getComment)
router.post('/comments', authMiddleware, banMiddleware, commentsController.addСomment)
router.put('/comments/:id', authMiddleware, banMiddleware, commentsController.updateComment)
router.delete('/comments/:id', authMiddleware, banMiddleware, commentsController.deleteComment)

module.exports = router