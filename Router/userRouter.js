const { Router }= require('express');
const router = Router();
const userController = require('../Controller/userController');
const  { userSessionCheck, userLoginCheck,userActive} = require('../Middleware/sessionMiddleware')

// ----------------- user sign up ------------------ 

router.get('/signup',userController.signup)
router.post('/signup',userController.createUser)
router.get('/login',userLoginCheck,userController.login)
router.post('/login',userLoginCheck,userController.loginUser)
router.get('/home',userSessionCheck,userActive,userController.homePage)


module.exports = router