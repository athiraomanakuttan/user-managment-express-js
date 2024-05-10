const { Router } = require('express')
const router = Router();
const adminController = require('../Controller/adminController')
const {adminSessionCheck , adminLoginCheck}= require('../Middleware/sessionMiddleware')

router.get('/login',adminLoginCheck,adminController.login)
router.post('/login',adminLoginCheck,adminController.adminLogin)
router.get('/dashbord',adminSessionCheck,adminController.adminDashboard)

module.exports = router