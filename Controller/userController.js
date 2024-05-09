const collection = require('../Config/dbConnect')


// ------------------- Load signup page --------------- 
const signup = (req, res) => {
    if (req.session.user) {
      res.redirect("/home");
    } else {
      const formData = {}; // Get form data or an empty object if not present
      res.render("SignupPage", { status: false, error:false , formData });
    }
  };
  
// ----------------- Add new user ------------------ 
const createUser = async (req, res) => {
  const data = {
    name: req.body.userName,
    email: req.body.email,
    password: req.body.password,
  };
  const validate = validateForm(data)
  if (validate.valid) {
    console.log("validated success");
    const existingUser = await collection.findOne({email:data.email})
    
    if(existingUser)
        {
            res.render('SignupPage',{error:"User Already Exists",formData:data,status: false})
        }
        else
        {
            let userInsert = await collection.insertMany(data)
            res.redirect('/login')
        }
  } else {
    console.log("validated failed");
    res.render('SIgnupPage',{status: false, error : validate.error ,formData : data})
  }
};
 

// -------------- Login page loading ------------ 

const login = async (req,res)=>{
    res.render('LoginPage',{error:null})
}
const loginUser = async (req,res)=>{
    const data ={
        email:req.body.email,
        password:req.body.password
    }
    let existingUser = await collection.findOne({email: data.email})
    if(existingUser )
        {
            
        }
        else
        {
            res.render('LoginPage',{error:"User Not Exist."})
        }
}






// -----------------  Form validation ------- -----
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


module.exports = { signup, createUser,login, loginUser};
