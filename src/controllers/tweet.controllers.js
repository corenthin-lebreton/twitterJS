const Tweets = require("../schemas/tweetSchema");
const useranswer = require("../schemas/usersAnswers");

const createTweets = async (req, res) => {
  const { content, isSondage, answers } = req.body;
  const user = req.user;
  const newTweet = new Tweets();

  newTweet.isSondage = isSondage;
  newTweet.user = user._id;
  newTweet.content = content;

  if (isSondage) newTweet.answers = answers;

  await newTweet.save();
  res.status(200).send("Créé avec succès");
};

const deleteTweet = async (req, res) => {
  try {
    const tweetId = req.params.tweetId;
    await Tweets.findByIdAndDelete(tweetId);

    res.status(200).send("Tweet supprimé avec succès");
  } catch (error) {
    res.status(500).send("Erreur serveur");
  }
};

const updateTweet = async (req, res) => {
  try {
    const tweetId = req.params.tweetId;
    const {
      newContent,
      isSondage: newIsSondage,
      answers: newAnswers,
    } = req.body;

    const tweet = await Tweets.findByIdAndUpdate(tweetId, {});

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
    res.status(200).json({ tweets });
  } catch (error) {
    res.status(500).send("Erreur serveur");
  }
};

const replyTweet = async (req, res) => {
  try {
    const user = req.user;
    const contentAnswer = req.body.contentAnswer;
    const tweetId = req.params.tweetId;
    const tweet = await Tweets.findById(tweetId).lean();
    const newAnswer = new useranswer();
    newAnswer.contentAnswer = contentAnswer;
    newAnswer.user = user._id;
    newAnswer.tweets = tweet._id;

    await newAnswer.save();

    res.status(200).send("Réponse envoyée avec succès");
  } catch (error) {
    res.status(500).send("Erreur serveur");
  }
};

const NumberUserAnswer = async (req, res) => {
  try {
    const tweetId = req.params.id;
    const tweet = await Tweets.findById(tweetId);
    const userAnswer = await useranswer.find({ tweets: tweet._id });

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

    const result = {};
    tweet.answers.forEach((answer) => {
      const total = userAnswer.filter((v) => v.contentAnswer === answer).length;
      result[answer] = (total / userAnswer.length) * 100;
    });

    res.status(200).json({ result });
  } catch (error) {
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
