const Tweets = require('../schemas/tweetSchema');

const createTweets = async (req, res) =>
{
    const user = req.user;

    const content = req.body.content;
    const isSondage = req.body.isSondage;

    if(!isSondage){

        const newTweet = new Tweets();
        newTweet.content = content;
        newTweet.user = user._id;
        newTweet.isSondage = false;

        await newTweet.save();

        res.status(200).send("Tweet créé avec succès");
    }else
        {
            const answers = req.body.answers;
            const newTweet = new Tweets();
            newTweet.content = content;
            newTweet.isSondage = isSondage;
            newTweet.answers = answers;
            newTweet.user = user._id;
            await newTweet.save();
            res.status(200).send("Sondage créé avec succès");
        }
}

const deleteTweet = async(req, res) =>
{
    try {
        const tweetId = req.params.tweetId; 
    
        await Tweets.findByIdAndDelete({_id: tweetId})
        
        res.status(200).send("Tweet supprimé avec succès");
    } catch (error) {
        console.log(error);
        res.status(500).send("Erreur serveur");
    }
    

}

const updateTweet = async (req, res) =>
{
    try {
        const tweetId = req.params.tweetId;
        const newContent = req.body.content;
        const newIsSondage = req.body.isSondage;
        const newAnswers = req.body.answers;

        const tweet = await Tweets.findOne({_id: tweetId})

        tweet.content = newContent;
        tweet.isSondage = newIsSondage;
        tweet.answers = newAnswers;

        await tweet?.save();

        res.status(200).send("Tweet modifié avec succès");
        
    }catch(error)
    {
        console.log(error);
        res.status(500).send("Erreur serveur");
    }

}

module.exports = {createTweets, deleteTweet, updateTweet};