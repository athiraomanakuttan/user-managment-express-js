const collection = require('../Config/dbConnect')
const userSessionCheck = (req,res,next)=>{
if(req.session.user)
{
        next();
}
else{
    res.redirect('/login')
}
}
const userLoginCheck =(req,res,next)=>{
    if(req.session.user)
            res.redirect('/home')
    else
        next()
}


const adminSessionCheck = (req,res,next)=>{
    if(req.session.admin)
        {
            next();
        }
        else
        res.redirect('/admin-login')
}

const adminLoginCheck =(req,res,next)=>{
    if(req.session.admin)
    {
            res.redirect('/admin/dashboard')
    }
    else
    {
        next();
    }
}

const userActive= (req,res,next)=>{
    if(req.session.user)
    {
        const userDetails = collection.findOne({email:req.session.user})
        if(userDetails)
            next()
        else
        {
            req.session.destroy();
            res.redirect('/login')
        }
    }
}


module.exports={userSessionCheck,userLoginCheck,adminSessionCheck,adminLoginCheck,userActive}