const topicModel = require('../models/topic/topicModel')
const addTopic = (req,res) => {
    console.log("add topic");
    topicModel.find({})
    .then(topic => {
        console.log("topics form my db", topic);
        res.render('addTopics',{ data: req.user, topic: topic });
    })
    .catch(err => console.log(err));   
}
const addTopicController = async(req,res) => {
    console.log("add topic controller");
    console.log("req.body",req.body);
    const data = {
        topic: req.body.topic,
        user_id : req.user._id,
        creater_name : req.user.name
    };

    let model = new topicModel(data);
    console.log("model", model);
    await model.save();

    topicModel.find({})
    .then(topic => {
        console.log("topics form my db", topic);
        res.render('addTopics',{ data: req.user, topic: topic });
    })
    .catch(err => console.log(err));
    
}
const subTopic = (req,res) => {
    console.log("add topic");
    res.render('subTopic',{data:req.user});    
}

const deletTopic = async (req, res) => {
    console.log("delete blog");

    const topicId = req.params.id;

    const deletedTopic = await topicModel.findByIdAndDelete(topicId);
    console.log("deleted Topic con ", deletedTopic);


    res.redirect('/addTopics');
};

module.exports = {addTopic,addTopicController,subTopic,deletTopic};