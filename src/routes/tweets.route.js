const { Router } = require("express");
const controllersTweet = require("../controllers/tweet.controllers");
const middleware = require("../Middlewares/auth.middleware");
const dtoTweet = require("../dto/tweets.dto");
const router = new Router();

router.post(
  "/twitterIPSSI/",
  middleware.isAuthentificated,
  dtoTweet.checkCreateTweet,
  controllersTweet.createTweets
);
router.get(
  "/twitterIPSSI",
  middleware.isAuthentificated,
  controllersTweet.getTweets
);
router.delete(
  "/deleteTweet/:tweetId",
  middleware.isAuthentificated,
  dtoTweet.checkDeleteTweet,
  controllersTweet.deleteTweet
);
router.patch(
  "/updateTweet/:tweetId",
  middleware.isAuthentificated,
  dtoTweet.checkUpdateTweet,
  controllersTweet.updateTweet
);
router.post(
  "/replyTweet/:tweetId",
  middleware.isAuthentificated,
  dtoTweet.checkReplyTweet,
  controllersTweet.replyTweet
);
router.get(
  "/replyTweet/:id",
  middleware.isAuthentificated,
  dtoTweet.checkNumberUserAnswer,
  controllersTweet.NumberUserAnswer
);

module.exports = router;
