const { model, Schema} = require('mongoose');

const schema = new Schema ({
    contentAnswer: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
   
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = model("usersAnswers", schema, "usersAnswers");