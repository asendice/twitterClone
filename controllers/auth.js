const Boxes = require("../models/Boxes");
const User = require("../models/User");
const Comment = require("../models/Comment");
require("dotenv").config();

exports.register = (req, res, next) => {
  const { name, email, password, password_confirmation } = req.body;
  const errors = [];
  if (!name) {
    errors.push({ name: "required" });
  }
  if (!email) {
    errors.push({ email: "required" });
  }
  if (!emailRegexp.test(email)) {
    errors.push({ email: "invalid" });
  }
  if (!password) {
    errors.push({ password: "required" });
  }
  if (!password_confirmation) {
    errors.push({
      password_confirmation: "required",
    });
  }
  if (password != password_confirmation) {
    errors.push({ password: "passwords do not match" });
  }
  if (errors.length > 0) {
    return res.status(422).json({ errors: errors });
  }
  User.findOne({ name: name })
    .then((user) => {
      if (user) {
        return res
          .status(422)
          .json({ errors: [{ user: `"${name}" username already exists` }] });
      } else {
        const user = new User({
          name: name,
          email: email,
          password: password,
          skill: skill,
        });
        bcrypt.genSalt(10, function (err, salt) {
          bcrypt.hash(password, salt, function (err, hash) {
            if (err) throw err;
            user.password = hash;
            user
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
          });
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        errors: [{ error: "Something went wrong" }],
      });
    });
};
exports.login = (req, res) => {
  const { name, password } = req.body;
  const errors = [];
  if (!name) {
    errors.push({ name: "required" });
  }
  if (!password) {
    errors.push({ password: "required" });
  }
  if (errors.length > 0) {
    return res.status(422).json({ errors: errors });
  }
  User.findOne({ name: name })
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          errors: [{ user: "Username is not recognized..." }],
        });
      } else {
        bcrypt
          .compare(password, user.password)
          .then((isMatch) => {
            if (!isMatch) {
              return res
                .status(400)
                .json({ errors: [{ password: "Password is incorrect..." }] });
            }
            const access_token = createJWT(user.name, user._id, 3600);
            jwt.verify(
              access_token,
              process.env.TOKEN_SECRET,
              (err, decoded) => {
                if (err) {
                  return res.status(500).json({ erros: err }), console.log(err);
                }
                if (decoded) {
                  return res.status(200).json({
                    success: true,
                    token: access_token,
                    message: user,
                  });
                }
              }
            );
          })
          .catch((err) => {
            res.status(500).json({ erro: err }), console.log(err);
          });
      }
    })
    .catch((err) => {
      res.status(500).json({ erro: err });
    });
};

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

exports.getComments = (req, res) => {
  const { boxId } = req.query;
  Comment.find({ boxId: boxId }).then((comments) => {
    if (!comments) {
      return res.status(404).json({
        errors: [{ comments: `None` }],
      });
    } else {
      return res.status(200).json({
        success: true,
        message: comments,
      });
    }
  });
};

exports.postComment = (req, res) => {
  console.log(req.body, 'req.body');
  const { userId, content, boxId } = req.body;
  const comment = new Comment({
    userId: userId,
    boxId: boxId,
    content: content,
  });
  comment
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