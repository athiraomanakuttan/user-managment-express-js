const express= require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    res.render('LoginPage');
})
router.get('/signup',(req,res)=>{
    res.render('SignupPage')
})

module.exports = router