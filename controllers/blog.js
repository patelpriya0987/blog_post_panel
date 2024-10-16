const fs = require('fs');
const blog = require('../models/blog/blogModel');
const comment = require('../models/comment/commentModel')
const path = require('path');
const { models } = require('mongoose');
const Path = path.join(__dirname , "/views");
const userModel = require('../models/signUp/signUp_model')

const addBlog = async (req , res) => {
    console.log("add blog");
    req.flash('logIn', req.user.name)
    res.render('addBlog',{logInMess:req.flash('logIn')});
}
const myBlog = (req,res) => {
    console.log("my blog");
    console.log("res.user my blog", req.user);
    req.flash('logIn', req.user.name)
    blog.find({user_id:req.user._id})
    .then(blogData => {
        console.log("blogData form my blog", blogData);
        res.render('myBlog',{ data: req.user, blogData: blogData ,logInMess: req.flash('logIn') });
    })
    .catch(err => console.log(err));
}
const allBlog = async (req, res) => {
    console.log("view blog controller");
    const commnetData = await comment.find({}).populate({path:'blog',populate: {path : 'user_id', }}).populate('user');
            
        const blogData = await blog.find({})
        console.log("commnetData", commnetData);

        req.flash('logIn', req.user.name)
        console.log("blogData", blogData);
        res.render('allBlog', { data: req.user, blogData: blogData , comment: commnetData ,logInMess: req.flash('logIn')  });
}


const addBlogController = async (req, res) => {
    console.log("add blog controller");
    console.log("req.body:", req.body);
    console.log("req.file:", req.file);

    const data = {
        title: req.body.title,
        content: req.body.content,
        blog_img: req.file ? req.file.path : null,
        user_id : req.user._id,
    };

    let model = new blog(data);
    console.log("db", model);
    await model.save();
    res.redirect('/');
}

const editBlog = async(req, res) => {
    console.log("edit blog", req.params.id);
    const data = await blog.findOne({_id : req.params.id})

    res.render('editBlog',{data});
}
const updateBlog = async(req,res) => {
    try{

        const data = await blog.findOne({_id : req.params.id})
        console.log("data",data,req.file,req.body);
        
            data.title = req.body.title;
            data.content = req.body.content;
            if (req.file) {
                const oldPost = path.join(__dirname, '../', data.blog_img);
                console.log("oldPost path",oldPost);
                
                fs.unlink(oldPost, (err) => {
                    if (err) {
                        console.error('Error while deleting old poster:', err);
                    }
                });
                data.blog_img = req.file.path;
            }
            console.log("data",data);
            await data.save();
            // await blog.findByIdAndUpdate({_id : req.params.id})
            console.log("update bloggg",req.params.id );
            res.redirect('/allBlog');
    }catch(err) {
        console.error(err);
        res.status(500).send({ error: 'Failed to update the blog' });
      }
}
const deletBlog = async (req, res) => {
    console.log("delete blog");

    const blogId = req.params.id;

    const deletedBlog = await blog.findByIdAndDelete(blogId);
    console.log("deletedBlog", deletedBlog);

    if (deletedBlog && deletedBlog.blog_img) {
        const imgPath = path.join(__dirname, '../', deletedBlog.blog_img);
        console.log("imgPath", imgPath);

        fs.unlink(imgPath, (err) => {
            if (err) {
                console.error('Error while deleting blog image:', err);
            } else {
                console.log('Blog image deleted successfully');
            }
        });
    }

    res.redirect('/');
};
const addComment = async(req,res) => {
    console.log("add commnet");
    console.log("comment : " , req.body);
    
    const data = {
        comment: req.body.comment,
        blog : req.params.id,
        user : req.user._id,
    }
    let model = await new comment(data);
    console.log("data", model);
    await model.save();

    res.redirect('/allBlog');
}
const deletComment = async(req,res) => {
    console.log("delete comment");
    const commentId = req.params.id;
    const deletedComment = await comment.findByIdAndDelete(commentId);
    console.log("deletedComment", deletedComment);
    res.redirect('/allBlog');
}
module.exports = { addBlog, addBlogController, allBlog, editBlog, deletBlog ,updateBlog ,myBlog ,addComment,deletComment};
