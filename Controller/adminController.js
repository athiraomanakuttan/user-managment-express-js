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
        res.redirect('/admin/dashbord')
    }
    else
    {
        res.render('adminLogin',{error:'Invalid credentials'})
    }

}
const adminDashboard= async (req,res)=>{
    try{
        const serchString = req.query.search || ''
        const serchData = await collection.find({name :{$regex:serchString, $options: 'i'}}) 
        res.render('adminDashbord',{data : serchData})
    }
    catch(error)
    {
        console.log('Error occured : ' + error)
    }
}


module.exports= { login, adminLogin, adminDashboard}