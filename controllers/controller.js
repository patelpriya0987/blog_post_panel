const dataBase = require('../models/signUp/signUp_model')
const defaultController =async (req , res) =>{
    console.log("req.user",req.user,req.isAuthenticated());
    res.render('index',{data:req.user , logInMess: req.flash('logIn') })
}

const logout = async (req , res) => {
    req.logout((err)=>{
        if (err) {
            next(err);
        }
        res.redirect('/login');
    });
}
const register = (req,res)=>{
    res.redirect('/signUp');
}
const signIn = (req,res)=>{
    res.redirect('/login');
}
module.exports = {defaultController,logout,register,signIn}