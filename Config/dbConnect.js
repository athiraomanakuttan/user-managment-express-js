const { name } = require('ejs');
const mongoose = require('mongoose');

const connect = mongoose.connect('mongodb://localhost:27017/UserManagment');

connect.then(() => console.log("Connection success")).catch((err) => console.error("Connection failed:", err));



const LoginSchema = new mongoose.Schema(
    {
        email:{
            type: String,
            required: true,
            unique: true
        },
        password:{
            type: String,
            required: true
        },
        created_time: {
            type: Date,
            default: Date.now,
            required: true
        },
        updated_time: {
            type: Date,
            default: Date.now,
            required: true
        }
    }
);


const collection = new mongoose.model('users',LoginSchema)

module.exports = collection;