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
    console.log("Ok successs middleare")
    if(req.session.user)
    {
            res.redirect('/home')
    }
    else
    {
        next()
    }
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
module.exports={userSessionCheck,userLoginCheck,adminSessionCheck,adminLoginCheck}