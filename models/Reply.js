const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const replySchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    boxId: {
      type: String,
      required: true,
    },
    commentId: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    likes: {
      type: Array,
    },
  },
  {
    timestamps: true,
    collection: "replies",
  }
);

module.exports = mongoose.model("Reply", replySchema);
