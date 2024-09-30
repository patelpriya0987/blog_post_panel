
const blog = require('../models/blog/blogModel')
const addBlog =async (req , res) =>{
    console.log("add blog");
    res.render('addBlog')
}
const viewBlog = async(req,res) => {
    console.log("view blog controller");
    
    blog.find({})
  .then(blogData => {
    console.log("blogData",blogData);
    res.render('viewBlog',{data:req.user,blogData: blogData})
  })
  .catch(err => console.log(err));
    
}
const addBlogController =async (req , res) =>{
    console.log("add blog controller");
    console.log("req.body:", req.body);
    console.log("req.file:", req.file);
    const data =  {
        title: req.body.title,
        content: req.body.content,
        blog_img:  req.file ? req.file.path : null
    }

    let model = new blog(data);
    console.log("db",model);
    await model.save();
    res.redirect('/');
    
    
}
module.exports = {addBlog,addBlogController,viewBlog}