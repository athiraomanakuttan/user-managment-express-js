const { Router } = require('express')
const router = Router();
const adminController = require('../Controller/adminController')
const {adminSessionCheck , adminLoginCheck}= require('../Middleware/sessionMiddleware')

router.get('/login',adminLoginCheck,adminController.login)
router.post('/login',adminLoginCheck,adminController.adminLogin)
router.get('/dashboard',adminSessionCheck,adminController.adminDashboard)
router.get('/logout',adminController.logout)
router.get('/deleteUser/:id',adminSessionCheck,adminController.deleteUser)
router.post('/addUser',adminSessionCheck,adminController.addUser)
router.get('/editUser/:id',adminSessionCheck,adminController.editUser)
router.post('/updateUser/:id', adminSessionCheck,adminController.updateUser)

module.exports = router