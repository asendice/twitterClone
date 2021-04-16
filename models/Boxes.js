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
  },
  {
    timestamps: true,
    collection: "posts",
  }
);

module.exports = mongoose.model("Boxes", boxesSchema);