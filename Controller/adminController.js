const collection = require('../Config/dbConnect')
require('dotenv').config({ path: '../Config/config.env' });


const login =(req,res)=>{
    res.render('adminLogin',{error:null})
}

const adminLogin=(req,res)=>{
const adminEmail ='admin@gmail.com';
const adminPassword = 'admin@123';
if(req.body.email === adminEmail && req.body.password === adminPassword)
    {
        req.session.admin=adminEmail;
        res.redirect('/admin/dashboard')
    }
    else
    {
        res.render('adminLogin',{error:'Invalid credentials'})
    }

}
const adminDashboard= async (req,res)=>{
    try{
        const serchString = req.query.search || ''
        const serchData = await collection.find({name :{$regex:serchString, $options: 'i'}}).sort({created_time:-1}) 
        res.render('adminDashboard',{data : serchData,serchString })
    }
    catch(error)
    {
        console.log('Error occured : ' + error)
    }
}
const logout =(req,res)=>{
    req.session.destroy();
    res.redirect('/admin/login')
}

// ---------------------- User delete ----------------- 
const deleteUser =(req,res)=>{
    console.log(req.params.id)
}

module.exports= { login, adminLogin, adminDashboard ,logout,deleteUser}