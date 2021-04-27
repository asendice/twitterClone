const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    boxId:{
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
    collection: "comments",
  }
);

module.exports = mongoose.model("Comment", commentSchema);