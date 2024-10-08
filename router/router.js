const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');
const signUp = require('../controllers/signUp_controller');
const logIn = require('../controllers/logIn_controller')
const passport = require('../config/pasportConfig');
const isAuth = require('../authentication/isAuth')
const blog = require('../controllers/blog')
const multer = require('../config/multerConfig')
const topic = require('../controllers/topic')

router.get('/myProfile',isAuth,controller.myProfileController)
router.get('/profilePage',isAuth,controller.profilePage)
router.get('/logout',isAuth,controller.logout);
router.get('/' ,isAuth, controller.defaultController);
router.get('/signUp',signUp.signUpform)
router.post('/signUpController',signUp.signUpController)
router.get('/register',controller.register);
router.get('/logIn',logIn.logIn);
router.post('/logInController', passport.authenticate('local', { failureRedirect: '/logIn' }),logIn.logInController)
router.get('/signIn',controller.signIn);
router.post('/addBlogController',multer,blog.addBlogController);
router.get('/addBlog' ,blog.addBlog);
router.get('/allBlog',isAuth,blog.allBlog);
router.get('/myBlog',isAuth,blog.myBlog);
router.get('/edit/:id',isAuth,blog.editBlog)
router.post('/editBlog/:id',multer,blog.updateBlog)
router.get('/delete/:id',isAuth,blog.deletBlog);
router.get('/deleteTopic/:id',isAuth,topic.deletTopic);
// topic
router.get('/addTopics',isAuth,topic.addTopic);
router.post('/addTopicController',isAuth,topic.addTopicController)
router.get('/subTopic',isAuth,topic.subTopic);
router.post('/subTopicContoller',isAuth,topic.subTopicContoller);
module.exports = router;