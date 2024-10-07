const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://priyupatel0987:tXJgpcab8xHeZESH@blog-post.r2zon.mongodb.net/users')
  .then(() => console.log('DB Connected!')).catch((err) =>{
    console.log("err",err);
  })
  