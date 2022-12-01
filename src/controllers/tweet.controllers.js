const Tweets = require("../schemas/tweetSchema");
const useranswer = require("../schemas/usersAnswers");

const createTweets = async (req, res) => {
  const user = req.user;

  const content = req.body.content;
  const isSondage = req.body.isSondage;

  if (!isSondage) {
    const newTweet = new Tweets();
    newTweet.content = content;
    newTweet.user = user._id;
    newTweet.isSondage = false;

    await newTweet.save();

    res.status(200).send("Tweet créé avec succès");
  } else {
    const answers = req.body.answers;
    const newTweet = new Tweets();
    newTweet.content = content;
    newTweet.isSondage = isSondage;
    newTweet.answers = answers;
    newTweet.user = user._id;
    await newTweet.save();
    res.status(200).send("Sondage créé avec succès");
  }
};

const deleteTweet = async (req, res) => {
  try {
    const tweetId = req.params.tweetId;

    await Tweets.findByIdAndDelete({ _id: tweetId });

    res.status(200).send("Tweet supprimé avec succès");
  } catch (error) {
    console.log(error);
    res.status(500).send("Erreur serveur");
  }
};

const updateTweet = async (req, res) => {
  try {
    const tweetId = req.params.tweetId;
    const newContent = req.body.content;
    const newIsSondage = req.body.isSondage;
    const newAnswers = req.body.answers;

    const tweet = await Tweets.findOne({ _id: tweetId });

    tweet.content = newContent;
    tweet.isSondage = newIsSondage;
    tweet.answers = newAnswers;

    await tweet?.save();

    res.status(200).send("Tweet modifié avec succès");
  } catch (error) {
    console.log(error);
    res.status(500).send("Erreur serveur");
  }
};

const getTweets = async (req, res) => {
  try {
    const tweets = await Tweets.find()
      .populate("user", "username")
      .sort({ createdAt: -1 });
    res.status(200).json(tweets);
  } catch (error) {
    console.log(error);
    res.status(500).send("Erreur serveur");
  }
};

const replyTweet = async (req, res) => {
  try {
    const user = req.user;
    const contentAnswer = req.body.contentAnswer;
    const tweetId = req.params.tweetId;
    const tweet = await Tweets.findById(tweetId);
    const newAnswer = new useranswer();
    newAnswer.contentAnswer = contentAnswer;
    newAnswer.user = user._id;
    newAnswer.tweets = tweet._id;

    console.log(newAnswer.tweets);

    await newAnswer.save();

    res.status(200).send("Réponse envoyée avec succès");
  } catch (error) {
    console.log(error);
    res.status(500).send("Erreur serveur");
  }
};

const NumberUserAnswer = async (req, res) => {
  try {
    const tweetId = req.params.id;
    const tweet = await Tweets.findById(tweetId);
    const userAnswer = await useranswer.find({ tweets: tweet._id });

    console.log(userAnswer);

    // const response = Array.from(
    //   new Set(userAnswer.map((v) => v.contentAnswer))
    // ).map((a) => ({
    //   name: a,
    //   y: userAnswer.map((v) => v.contentAnswer).filter((f) => f === a).length,
    // }));

    // const responseMap = response.map((e) => {
    //   const percentage = (e.y / userAnswer.length) * 100;
    //   return {
    //     name: e.name,
    //     y: percentage,
    //   };
    // });

    // console.log(responseMap);

    const result = {};
    tweet.answers.forEach((answer) => {
      const total = userAnswer.filter((v) => v.contentAnswer === answer).length;
      console.log(answer, total, userAnswer.length);
      result[answer] = (total / userAnswer.length) * 100;
    });

    res.status(200).json({ result });
  } catch (error) {
    console.log(error);
    result.status(500).send("Erreur serveur");
  }
};

module.exports = {
  createTweets,
  deleteTweet,
  updateTweet,
  getTweets,
  replyTweet,
  NumberUserAnswer,
};
