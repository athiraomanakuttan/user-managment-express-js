const collection = require('../Config/dbConnect')
const { ObjectId } = require('mongodb');
const Swal= require('sweetalert2')
const bcrypt = require("bcrypt");
const { cache } = require('ejs');
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
const deleteUser = async (req,res)=>{
    try
    {
        const userId = req.params.id;
         await collection.deleteOne({ _id: new ObjectId(userId) })
         res.redirect('/admin/dashboard')

    }
    catch(err){
        console.log("can't delete user : "+ err)
    }
    
}
// ----------------------- Add user ------------------- 
const addUser =async (req, res) => {
    
    const data = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    };
    
    const validate = validateForm(data);
    if (validate.valid) {
    
      try{
        const existingUser = await collection.findOne({ email: data.email });
  
      if (existingUser) {
        res.redirect('/admin/dashboard');
      } else {
        console.log('failed');
        const salt = 10;
        // ------------------- password hashing usring bcrypt -----------
        data.password = await bcrypt.hash(data.password, salt);
        // ---------------- inserting data -----------
        let userInsert = await collection.insertMany(data);
        res.redirect('/admin/dashboard');
      }
      
      }
      catch(err){
        console.log("nob able to add user " + err)
      }
    } else {
      res.redirect('/admin/dashboard')
    }
  }

  const editUser= async (req,res)=>{
    const id =req.params.id;
    const data= await collection.findOne({_id: new ObjectId(id)})
    res.render('editUser',{data,error:null})
  }
  const updateUser=async (req,res)=>{
    const id = req.params.id
    const data ={
      name:req.body.name,
      email:req.body.email,
      created_time:req.body.created_time
    }
    const validate = validateNameEmail(data);
    if(validate.valid)
      {
        try{
          await collection.updateOne({_id:new ObjectId(id)},{name:data.name ,email : data.email})
          res.redirect('/admin/dashboard')
        } 
        catch(err){
          console.log("error occured : "+err);
        }    
      }
      else{
        res.render('editUser',{data,error:validate.error})
      }
    

  }



  function validateNameEmail(data){
  const namePattern = /^[a-zA-Z]{4,}$/;
    const emailPattern =
      /^(?!.*\.\d)(?=[a-zA-Z0-9._%+-]*[a-zA-Z]{3,}\d*@)[a-zA-Z0-9._%+-]+@[a-z]{3,}\.[a-z]{2,}$/i;
    
  
    if (data.email == null || data.email == "" || !emailPattern.test(data.email))
      return { valid: false, error: "Email is not valid" };
    else if (
      data.name == null ||
      data.name == "" ||
      !data.name.match(namePattern)
    )
      return { valid: false, error: "Name is not valid" };
    
    else return { valid: true };
  }
  function validateForm(data) {
    const namePattern = /^[a-zA-Z]{4,}$/;
    const emailPattern =
      /^(?!.*\.\d)(?=[a-zA-Z0-9._%+-]*[a-zA-Z]{3,}\d*@)[a-zA-Z0-9._%+-]+@[a-z]{3,}\.[a-z]{2,}$/i;
    const passwordPattern = /^(?=.*[0-9])(?=.*[a-zA-Z]).{7,}$/;
  
    if (data.email == null || data.email == "" || !emailPattern.test(data.email))
      return { valid: false, error: "Email is not valid" };
    else if (
      data.name == null ||
      data.name == "" ||
      !data.name.match(namePattern)
    )
      return { valid: false, error: "Name is not valid" };
    else if (
      data.password == null ||
      data.password == "" ||
      !data.password.match(passwordPattern)
    )
      return { valid: false, error: "Password is not valid" };
    else return { valid: true };
  }
module.exports= { login, adminLogin, adminDashboard ,logout,deleteUser, addUser,editUser,updateUser}