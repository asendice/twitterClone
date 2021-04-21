const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const boxesSchema = new Schema(
  {
    userId: {
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
    comments: {
      type: Array,
    },
  },
  {
    timestamps: true,
    collection: "posts",
  }
);

module.exports = mongoose.model("Boxes", boxesSchema);