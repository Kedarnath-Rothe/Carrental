const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const userSchema = mongoose.Schema ( {

    username : {
        type : String,
        required : true,
    },

    email : {
        type : String,
        required : true,
    },

    phone : {
        type : String,
        required : true,
        unique: true,
    },


    password : {
        type : String,
        required : true
    },

    verified : {
        type : Boolean,
        default : false
    },

    isAdmin : {
        type : Boolean,
        default : false
    },

    car_provider : {
        type : Boolean,
        default : false
    },

    image : {
        type : String,    
    },

})


//json web token  JWT
userSchema.methods.generateToken = function () {
    try{
        return jwt.sign({
            userId : this._id.toString(),
            email : this.email,
            isAdmin : this.isAdmin
        },
         process.env.JWT_SECRET_KEY,
         {
            expiresIn: "30d"
         }
        )
    }
    catch(error){
        console.log(error.message);
    }
};



const User = new mongoose.model("User", userSchema);

module.exports = User;
