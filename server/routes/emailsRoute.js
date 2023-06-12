const Router = require('express')
const router = new Router()
const emailsController = require('../controllers/emailsController.js')
const authMiddleware = require('../middlewares/authMiddleware.js')
const banMiddleware = require('../middlewares/banMiddleware.js')

router.get('/emails', emailsController.getEmails)
router.get('/emails/:id', emailsController.getEmail)
router.post('/emails', emailsController.addEmail)
router.put('/emails/:id', authMiddleware, banMiddleware, emailsController.updateEmail)
router.delete('/emails/:id', authMiddleware, banMiddleware, emailsController.deleteEmail)

module.exports = router
