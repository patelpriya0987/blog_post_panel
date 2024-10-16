const mongoose = require('mongoose');

const signUpSchema = mongoose.Schema({
    name : {
        type:String,
        required:true
    },
    email : {
        type:String,
        required:true,
        unique: true
    },
    password : {
        type:String,
        required:true
    },
    phone: {
        type: String,
    },
    bio: {
        type: String,
    },
    profileImage: {
        type: String,
    },
    userToken : {
        type: String
    }
})

const signUpModel = mongoose.model('signUp',signUpSchema);

module.exports = signUpModel;