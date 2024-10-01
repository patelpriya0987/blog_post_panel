
// const blog = require('../models/blog/blogModel');
// const path = require('path');
// const Path= path.join(__dirname , "/views");
// const addBlog =async (req , res) =>{
//     console.log("add blog");
//     res.render('addBlog')
// }
// const allBlog = async(req,res) => {
//     console.log("view blog controller");
    
//     blog.find({})
//     .then(blogData => {
//       console.log("blogData",blogData);
//       res.render('allBlog',{data:req.user,blogData: blogData})
//     })
//   .catch(err => console.log(err));
    
// }
// const addBlogController =async (req , res) =>{
//     console.log("add blog controller");
//     console.log("req.body:", req.body);
//     console.log("req.file:", req.file);
//     const data =  {
//         title: req.body.title,
//         content: req.body.content,
//         blog_img:  req.file ? req.file.path : null
//     }

//     let model = new blog(data);
//     console.log("db",model);
//     await model.save();
//     res.redirect('/');
    
    
// }
// const editBlog = (req,res) => {
//   console.log("edit blogg",req.params.id);
//   res.render('editBlog');
  
// }
// const deletBlog = async (req, res) => {
//   console.log("delet blog");
  
//   const blogId = req.params.id;
  
//   const deletedBlog = await blog.findByIdAndDelete(blogId);
//   console.log("delet",deletedBlog);
  
  
//   const imgPath = path.join(__dirname, '../uploads/', blog.blog_img);
// console.log("imgPath",imgPath);

//       fs.unlink(imgPath, (err) => {
//           if (err) {
//               console.error('Error while deleting poster:', err);
//           }
//       });

//       res.redirect('/allBlog');
// };
// module.exports = {addBlog,addBlogController,allBlog,editBlog,deletBlog}

const fs = require('fs');
const blog = require('../models/blog/blogModel');
const path = require('path');
const Path = path.join(__dirname , "/views");

const addBlog = async (req , res) => {
    console.log("add blog");
    res.render('addBlog');
}

const allBlog = async (req, res) => {
    console.log("view blog controller");

    blog.find({})
    .then(blogData => {
        console.log("blogData", blogData);
        res.render('allBlog', { data: req.user, blogData: blogData });
    })
    .catch(err => console.log(err));
}

const addBlogController = async (req, res) => {
    console.log("add blog controller");
    console.log("req.body:", req.body);
    console.log("req.file:", req.file);

    const data = {
        title: req.body.title,
        content: req.body.content,
        blog_img: req.file ? req.file.path : null
    };

    let model = new blog(data);
    console.log("db", model);
    await model.save();
    res.redirect('/');
}

const editBlog = (req, res) => {
    console.log("edit blog", req.params.id);
    res.render('editBlog');
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

    res.redirect('/allBlog');
};

module.exports = { addBlog, addBlogController, allBlog, editBlog, deletBlog };
