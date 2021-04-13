const Boxes = require("../models/Boxes");
require("dotenv").config();

exports.postBoxes = (req, res) => {
  console.log(req.body);
  const { userId, content } = req.body;
  const boxes = new Boxes({
    userId: userId,
    content: content, 
  });
  boxes
    .save()
    .then((response) => {
      res.status(200).json({
        success: true,
        result: response,
      });
    })
    .catch((err) => {
      res.status(500).json({
        errors: [{ error: err }],
      });
    });
};

exports.getBoxes = (req, res) => {
  Boxes.find().then((posts) => {
    if (!posts) {
      return res.status(404).json({
        errors: [{ user: `does not have posts` }],
      });
    } else {
      return res.status(200).json({
        success: true,
        message: posts,
      });
    }
  });
};
