
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
const { models } = require('mongoose');
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
        res.render('allBlog', { data: req.user, blogData: blogData })
        
        ;
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

    res.redirect('/allBlog');
};

module.exports = { addBlog, addBlogController, allBlog, editBlog, deletBlog ,updateBlog };
