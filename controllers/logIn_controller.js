const signUpModel = require('../models/signUp/signUp_model');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const logIn = (req, res) => {
    console.log("login");
    res.render('auth-login-basic');
}

const logInController = async (req, res) => {
    req.flash('logIn', req.user.name)
    res.redirect('/')
}

module.exports = { logIn, logInController}
