const Tweets = require("../schemas/tweetSchema");
const useranswer = require("../schemas/usersAnswers");

const checkCreateTweet = (req, res, next) => {
  try {
    const content = req.body.content;
    const isSondage = req.body.isSondage;
    const answers = req.body.answers;

    if (content?.length <= 1) {
      res.status(400).send("Entrer un contenu valide.");
      return;
    }

    if (content?.length >= 280) {
      res.status(400).send("Vous avez dépassé la limite de caractères");
    }

    if (content === null) {
      res.status(400).send("Entrer un contenu valide.");
      return;
    }

    if (isSondage !== true && isSondage !== false) {
      res.status(400).send("Entrer un type de tweet valide.");
      return;
    }

    if (isSondage === true && answers?.length == 0) {
      res.status(400).send("Entrer des réponses au sondage.");
      return;
    }

    if (isSondage === true && answers?.length == null) {
      res.status(400).send("Entrer des réponses au sondage.");
      return;
    }

    if (answers.length < 2) {
      res.status(400).send("Entrer au moins 2 réponses au sondage.");
      return;
    }

    if (answers.length > 5) {
      res.status(400).send("Entrer au plus 5 réponses au sondage.");
      return;
    }

    next();
  } catch (error) {
    res.status(500).send("Erreur serveur");
  }
};

const checkDeleteTweet = async (req, res, next) => {
  try {
    const user = req.user;
    const tweetId = req.params.tweetId;
    const tweet = await Tweets.findOne({ _id: tweetId });

    if (!tweet) {
      res.status(404).send("Tweet introuvable");
      return;
    }

    if (tweet.user.toString() !== user._id.toString()) {
      res.status(403).send("Vous n'avez pas le droit de supprimer ce tweet");
      return;
    }

    next();
  } catch (error) {
    res.status(500).send("Erreur serveur");
  }
};

const checkUpdateTweet = async (req, res, next) => {
  try {
    const tweetId = req.params.tweetId;
    const tweet = await Tweets.findOne({ _id: tweetId });
    const user = req.user;
    const newContent = req.body.content;
    const newisSondage = req.body.isSondage;
    const newAnswers = req.body.answers;

    if (!tweet) {
      res.status(404).send("Tweet introuvable");
      return;
    }

    if (newContent?.length <= 1) {
      res.status(400).send("Entrer un contenu valide.");
      return;
    }

    if (newContent?.length >= 280) {
      res.status(400).send("Vous avez dépassé la limite de charactères");
    }

    if (newContent === null) {
      res.status(400).send("Entrer un contenu valide.");
      return;
    }

    if (newisSondage !== true && newisSondage !== false) {
      res.status(400).send("Entrer un type de tweet valide.");
      return;
    }

    if (newisSondage === true && newAnswers?.length == 0) {
      res.status(400).send("Entrer des réponses au sondage.");
      return;
    }

    if (newisSondage === true && newAnswers?.length == null) {
      res.status(400).send("Entrer des réponses au sondage.");
      return;
    }

    if (`${user._id}` !== `${tweet?.user}`) {
      res.status(403).send("Vous n'avez pas le droit de modifier ce tweet");
      return;
    }

    if (newAnswers.length < 2) {
      res.status(400).send("Entrer au moins 2 réponses au sondage.");
      return;
    }

    if (newAnswers.length > 5) {
      res.status(400).send("Entrer au plus 5 réponses au sondage.");
      return;
    }

    next();
  } catch (error) {
    res.status(500).send("Erreur serveur");
  }
};

const checkReplyTweet = async (req, res, next) => {
  try {
    const user = req.user;
    const tweetId = req.params.tweetId;
    const contentAnswer = req.body.contentAnswer;

    const tweet = await Tweets.findById(tweetId);

    //vérifier si un utilisateur a déjà répondu
    const userAnswer = await useranswer.findOne({
      user: user._id,
      tweets: tweet._id,
    });
    if (userAnswer) {
      res.status(403).send("Vous avez déjà répondu à ce sondage");
      return;
    }

    if (contentAnswer === null) {
      res.status(400).send("Entrer un contenu valide.");
      return;
    }

    if (`${user._id}` === `${tweet.user}`) {
      res
        .status(403)
        .send("Vous ne pouvez pas répondre à votre propre sondage");
      return;
    }

    if (!tweet.answers.includes(contentAnswer)) {
      res.status(400).send("Réponse invalide");
      return;
    }

    next();
  } catch (error) {
    res.status(500).send("Erreur serveur");
  }
};

const checkNumberUserAnswer = async (req, res, next) => {
  try {
    const tweetId = req.params.id;
    const tweet = await Tweets.findById(tweetId);

    if (!tweet) {
      res.status(404).send("Tweet introuvable");
      return;
    }
    const userAnswer = await useranswer.find({ tweets: tweet._id });

    if (userAnswer.length === 0) {
      res.status(404).send("Aucune réponse");
      return;
    }

    next();
  } catch (error) {
    res.status(500).send("Erreur serveur");
  }
};

module.exports = {
  checkCreateTweet,
  checkDeleteTweet,
  checkUpdateTweet,
  checkReplyTweet,
  checkNumberUserAnswer,
};
