const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');
const signUp = require('../controllers/signUp_controller');
const logIn = require('../controllers/logIn_controller')
const passport = require('../config/pasportConfig');
const isAuth = require('../authentication/isAuth')
const blog = require('../controllers/blog')
const multer = require('../config/multerConfig')
const profileUpload = require('../config/multerProfile')
const topic = require('../controllers/topic');
const profile = require('../controllers/profileContoller');
const authController = require('../controllers/authController')

//profile page
router.get('/myProfile',isAuth,profile.myProfileController)
router.get('/profilePage',isAuth,profile.profilePage);
router.get("/editProfile",isAuth,profile.editProfile)
router.post("/editProfileController",profileUpload,profile.editProfileContoller)
//authenticatin
router.get('/logout',isAuth,controller.logout);
router.get('/' ,isAuth, controller.defaultController);
router.get('/signUp',signUp.signUpform)
router.post('/signUpController',signUp.signUpController)
router.get('/register',controller.register);
router.get('/logIn',logIn.logIn);
router.post('/logInController', passport.authenticate('local', { failureRedirect: '/logIn' }),logIn.logInController)
router.get('/signIn',controller.signIn);
// reset password
router.get('/forgotPassword',authController.forgotPassword);
router.post('/forgotPasswordController',authController.forgotPasswordController);
router.get('/changePassword',isAuth,authController.changePassword);
router.post('/chanagePasswordController',authController.chanagePasswordController);
router.get('/otp/:id',authController.otp)
router.post('/resetPass/:id',authController.resetPass)
router.get('/resetPass/:id',authController.resetPass)
router.post('/resetPassword/:id',authController.resetPassword)
router.get('/errorPage',authController.errorPage)
//blog
router.post('/addBlogController',multer,blog.addBlogController);
router.get('/addBlog' ,blog.addBlog);
router.get('/allBlog',isAuth,blog.allBlog);
router.get('/myBlog',isAuth,blog.myBlog);
router.get('/edit/:id',isAuth,blog.editBlog)
router.post('/editBlog/:id',multer,blog.updateBlog)
router.get('/delete/:id',isAuth,blog.deletBlog);
router.post('/addComment/:id',isAuth,blog.addComment)
router.get('/deletComment/:id',isAuth,blog.deletComment)
// topic
router.get('/addTopics',isAuth,topic.addTopic);
router.post('/addTopicController',isAuth,topic.addTopicController)
router.get('/subTopic',isAuth,topic.subTopic);
router.post('/subTopicContoller',isAuth,topic.subTopicContoller);
router.get('/deleteTopicAndSubTopics/:id',isAuth,topic.deleteTopicAndSubTopics);
router.get('/viewTopic',isAuth,topic.viewTopic);

module.exports = router;