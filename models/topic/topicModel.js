const mongoose = require('mongoose');

const topicModelSchema = mongoose.Schema({
    topic : {
        type:String,
        required:true
    },
    user_id : {
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
        
    }
})

const topicModel = mongoose.model('topic',topicModelSchema);

module.exports = topicModel;