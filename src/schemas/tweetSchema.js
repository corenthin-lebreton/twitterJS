const { model, Schema } = require("mongoose");

const schema = new Schema({
  content: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  isSondage: Boolean,
  answers: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("Tweets", schema, "tweet");
