const Boxes = require("../models/Boxes");
const User = require("../models/User");
const Comment = require("../models/Comment");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
require("dotenv").config();
const { createJWT } = require("../utils/auth.js");
const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

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
                    result: user,
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
        result: posts,
      });
    }
  });
};

exports.getComments = (req, res) => {
  const { boxId } = req.params;
  Comment.find({ boxId: boxId }).then((comments) => {
    if (!comments) {
      return res.status(404).json({
        errors: [{ comments: `None` }],
      });
    } else {
      return res.status(200).json({
        success: true,
        result: comments,
      });
    }
  });
};

exports.postComment = (req, res) => {
  const { userId, content, boxId, id } = req.body;
  const comment = new Comment({
    id: id,
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

exports.putComment = (req, res) => {
  const { boxId, id } = req.body;
  Boxes.findById(boxId, (err, box) => {
    box.comments.push(id);
    box
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
};
exports.addLikeBox = (req, res) => {
  const { boxId, userId } = req.body;
  Boxes.findById(boxId, (err, box) => {
    box.likes.push(userId);
    box
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
};
exports.addLikeUser = (req, res) => {
  const { boxId, userId } = req.body;
  User.findById(userId, (err, user) => {
    user.liked.push(boxId);
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
};
exports.delLikeBox = (req, res) => {
  const { boxId, userId } = req.body;
  Boxes.findById(boxId, (err, box) => {
    const index = box.likes.indexOf(userId);
    if (index > -1) {
      box.likes.splice(index, 1);
    }
    box
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
};
exports.delLikeUser = (req, res) => {
  const { boxId, userId } = req.body;
  User.findById(userId, (err, user) => {
    const index = user.liked.indexOf(boxId);
    if (index > -1) {
      user.liked.splice(index, 1);
    }
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
};

exports.getUsers = (req, res) => {
  User.find().then((users) => {
    if (!users) {
      return res.status(404).json({
        errors: [{ users: "Zero users found" }],
      });
    } else {
      const allUsers = users.map((user) => {
        return {
          id: user.id,
          name: user.name,
          profilePic: user.profilePic,
          followers: user.followers,
          following: user.following,
          liked: user.liked,
        };
      });
      return res.status(200).json({
        success: true,
        result: allUsers,
      });
    }
  });
};
exports.getUser = (req, res) => {
  const { userId } = req.body;
  User.findById(userId).then((user) => {
    console.log(user);
    if (!user) {
      return res.status(404).json({
        errors: [{ user: "Zero users found" }],
      });
    } else {
      const theUser = {
        id: user.id,
        name: user.name,
        avatar: user.avatarPic,
        background: user.backgroundPic,
        followers: user.followers,
        following: user.following,
        liked: user.liked,
      };
      return res.status(200).json({
        success: true,
        result: theUser,
      });
    }
  });
};

exports.uploadProfilePic = (req, res) => {
  let image = req.file.path;
  const { userId } = req.body;
  console.log(req.body);
  User.findById(userId).then((user) => {
    console.log(user, "user");
    user.profilePic = image;
    user
      .save()
      .then((response) => {
        res.status(200).json({
          success: true,
          result: user,
        });
      })
      .catch((err) => {
        res.status(500).json({
          errors: [{ error: err }],
        });
      });
  });
};
