
// ------------------------ user middleware started --------------------------- 
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
        {
            res.redirect('/home')
        }
            
    else
        next()
}

const userActive= async (req,res,next)=>{
    if(req.session.user)
    {
        const userDetails = await collection.findOne({email:req.session.user})
        console.log(userDetails)
        if(userDetails)
            {
                console.log(userDetails.name)
                req.userName= userDetails.name;
                next()
            }
        else
        {
            req.session.destroy();
            res.redirect('/login')
        }
    }
}

// ------------------------ admin middleware started --------------------------- 

const adminSessionCheck = (req,res,next)=>{
    console.log("inside the midware");
    if(req.session.admin)
        {
            next();
        }
        else
        res.redirect('/admin/login')
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




module.exports={userSessionCheck,userLoginCheck,adminSessionCheck,adminLoginCheck,userActive}