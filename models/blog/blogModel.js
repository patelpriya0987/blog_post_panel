const mongoose = require('mongoose');

const blogModelSchema = mongoose.Schema({
    title : {
        type:String,
        required:true
    },
    content : {
        type:String,
        required:true,
    },
    blog_img : {
        type:String,
        required:true
    }
})

const blogModel = mongoose.model('blog',blogModelSchema);

module.exports = blogModel;