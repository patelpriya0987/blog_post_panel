const topicModel = require('../models/topic/topicModel');
const subTopicModel = require('../models/subTopic/subTopicModel');
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
const subTopic = async(req,res) => {
    console.log("add sub topic");

    try {
        const subTopicData = await subTopicModel.find({}).populate('topic');
        const topicData = await topicModel.find({}); // Fetch topics separately

        console.log("sub topics from my db", subTopicData);
        console.log("topics from my db", topicData);
        console.log("req.user",req.user);
        

        res.render('subTopic', {
            data: req.user, 
            topic: topicData,
            subtopic: subTopicData
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
}
const subTopicContoller = async (req, res) => {
    console.log("add sub topic controller");

    try {
        if (!req.body.topic_id) {
            return res.status(400).send("Topic ID is required.");
        }

        const data = {
            subTopic: req.body.subTopic,
            topic: req.body.topic_id
        };

        let model = new subTopicModel(data);
        console.log("model", model);

        await model.save();

        res.redirect('/subTopic');
    } catch (err) {
        console.error("Error creating subtopic:", err);
        res.status(500).send("Server Error");
    }
};
const deletTopic = async (req, res) => {
    console.log("delete blog");

    const topicId = req.params.id;

    const deletedTopic = await topicModel.findByIdAndDelete(topicId);
    console.log("deleted Topic con ", deletedTopic);


    res.redirect('/addTopics');
};

module.exports = {addTopic,addTopicController,subTopic,deletTopic,subTopicContoller};