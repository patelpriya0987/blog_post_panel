const user = require('../models/signUp/signUp_model')
const myProfileController = async (req , res) => {
    res.render('myProfile',{data:req.user})
}
const profilePage = (req,res) => {
    res.redirect('/myProfile');
}
const editProfile = async (req,res) => {
    console.log("profile page");
    res.render('editProfile',{data:req.user})
}
const editProfileContoller = async (req,res) => {
    console.log("profile page");
    const {name,email,phone,bio,profileImage} = req.body;
    console.log("req.body form edit profile name,email,phone,bio,profileImage",name,email,phone,bio,profileImage,req.file ? req.file.path : null,);
    
    const data = {
        name : name,
        email : email,
        phone : phone,
        bio : bio,
        profileImage : req.file ? req.file.path : req.user.profileImage,
    }
    console.log("data",data);

    await user.findByIdAndUpdate(req.user._id,data)
    console.log("updated profile ");
    res.redirect('/myProfile')
}

module.exports = {myProfileController,profilePage,editProfile,editProfileContoller}
