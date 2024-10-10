const mongoose = require('mongoose');

const topicModelSchema = mongoose.Schema({
    topic : {
        type:String,
        required:true
    },
    user_id : {
        type:mongoose.Schema.Types.ObjectId,
        ref:'signUp'   
    },
    creater_name : {
        type: String
    }
})

const topicModel = mongoose.model('topic',topicModelSchema);

module.exports = topicModel;