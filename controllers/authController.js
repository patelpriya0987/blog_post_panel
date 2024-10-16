const bcrypt = require('bcrypt')
const userModel = require('../models/signUp/signUp_model');
const otpGenerator = require('otp-generator')
let myOtp = null;
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "priyupatel0987@gmail.com",
      pass: "vvvdfhjlzliqnfon",
    },
  });
const forgotPassword = async(req,res) => {
    console.log("forgot Password");
    res.render('forgotPassword');
}
const forgotPasswordController = async (req, res) => {
    console.log("forgot Password Controller");
    const { email } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
        console.log("user found");
        const token = crypto.randomBytes(5).toString('hex');
        console.log('Generated Token:', token);
        const tokenUpadte =await userModel.updateOne({_id:user._id},{userToken:token});
            console.log("token",tokenUpadte);
        let link = `http://localhost:3015/resetPass/${user.id}`
        var message = {
            from: "priyupatel0987",
            to: user.email,
            subject: "RESET password",
            text: `Hi ${user.name},We received a request to reset your password. Click the link below to reset it: ${link} If you didn’t request a password reset, please ignore this email. Thanks`,
          };
        console.log("RESET LINK >>>", message);
        transporter.sendMail(message, (error, info) => {
            if (error) {
              console.error("Error sending email: ", error);
            } else {
              console.log("Email sent: ", info.response);
            }
          });

        res.redirect(`/forgotPassword`);
    } else {
        console.log("user not found");
        res.redirect('/signUp');
    }
}

const otp = (req,res) => {
    console.log("id",req.params.id);

    // let otp = otpGenerator.generate(6, { upperCaseAlphabets: false, lowerCaseAlphabets : false, specialChars: false });
    
    // myOtp = otp;
    // console.log("OTP",myOtp);
    // res.render('otp',{id :req.params.id});
}
const resetPass = async(req,res) => {
    console.log("Reset Password",req.params.id);

    try{
        const user =await userModel.findOne({_id : req.params.id});

        console.log("user",user);
        if(user){
            if(user.userToken){
                res.render('resetPass',{ id:req.params.id , userToken: null});
            }else{
                res.redirect('/errorPage');
            }
        }else{
            res.redirect('/errorPage');
        }
    }catch(err){
        console.log("Invalid Link",err);
        res.redirect('/errorPage');
    }
}
const errorPage = (req,res) =>{
    console.log("error pagee");
    res.render('errorPage')
}
const resetPassword = (req,res) => {
    const id = req.params.id;
    console.log("reset Password",id);
    const {new_password,re_password} = req.body;
    if(new_password == re_password){
        bcrypt.hash(new_password, 10,async (err, hashPassword) => {
            if (err) {
                console.log("Error in hashing password", err);
                return res.status(500).send("Server error"); 
            }
            console.log("hash",hashPassword);
             const newPass =await userModel.updateOne({_id:id},{password:hashPassword,userToken:null});
            console.log("updated pass",newPass);
            
        })
        res.redirect('/');
    }else{
        console.log("new pass & con pass not mathed");
        res.redirect(`/resetPass/${id}`);
    }

}
const changePassword = (req,res) => {
    console.log("chanage Password");
    res.render('changePassword');
}
const chanagePasswordController = (req,res) => {
    console.log("chanage Password Controller");
    
    const {password} = req.user;
    const {cur_password,new_password,re_password} = req.body;
    bcrypt.compare(cur_password ,password ,(err,result)=>{
        console.log("err result",err,result);
        if(result){
            console.log("pass matched");
            if(new_password == re_password){
                bcrypt.hash(new_password, 10,async (err, hashPassword) => {
                    console.log("hash",hashPassword);
                     const updatedPass =await userModel.updateOne({_id:req.user._id},{password:hashPassword});
                    console.log("updated pass",updatedPass);
                    
                })
                res.redirect('/');
            }else{
                console.log("new pass & con pass not mathed");
                res.redirect('/changePassword')
            }
        }else{
            console.log("not matched");
            res.redirect('/changePassword');
        }  
    })
}
module.exports = { forgotPassword , forgotPasswordController ,changePassword , chanagePasswordController,otp ,resetPass,resetPassword,errorPage}