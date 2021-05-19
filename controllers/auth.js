const Boxes = require("../models/Boxes");
const User = require("../models/User");
const Comment = require("../models/Comment");
const Reply = require("../models/Reply");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const { createJWT } = require("../utils/auth.js");
const emailRegexp =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

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
          profilePic: "uploads/2021-05-08T02:06:44.991Zbasicuser.png",
          background: "uploads/2021-05-08T02:09:18.528Zbasicbackground.png",
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
  console.log(req.query);
  const values = {
    firstIndex: req.query.firstIndex,
    secondIndex: req.query.secondIndex,
  };
  Boxes.find().then((posts) => {
    let pag = posts.reverse().slice(values.firstIndex, values.secondIndex);
    if (!posts) {
      return res.status(404).json({
        errors: [{ user: `does not have posts` }],
      });
    } else {
      return res.status(200).json({
        success: true,
        result: pag,
      });
    }
  });
};

exports.getBox = (req, res) => {
  const { boxId } = req.params;
  Boxes.findById(boxId).then((box) => {
    if (!box) {
      return res.status(404).json({
        errors: [{ user: `does not have posts` }],
      });
    } else {
      return res.status(200).json({
        success: true,
        result: box,
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
          _id: user.id,
          name: user.name,
          profilePic: user.profilePic,
          background: user.background,
          followers: user.followers,
          following: user.following,
          liked: user.liked,
          bio: user.bio,
          createdAt: user.createdAt,
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
  const { name } = req.params;
  User.find({ name: name }).then((user) => {
    if (!user) {
      return res.status(404).json({
        errors: [{ user: "Zero users found" }],
      });
    } else {
      const theUser = {
        _id: user[0]._id,
        name: user[0].name,
        profilePic: user[0].profilePic,
        bio: user[0].bio,
        background: user[0].background,
        followers: user[0].followers,
        following: user[0].following,
        liked: user[0].liked,
        createdAt: user[0].createdAt,
      };
      return res.status(200).json({
        success: true,
        result: theUser,
      });
    }
  });
};

//<---------EDIT PROFILE --------------->///
exports.uploadProfilePic = (req, res) => {
  console.log(req.file, "req.file");
  let image = req.file.path;
  const { userId } = req.params;
  User.findById(userId).then((user) => {
    user.profilePic = image;
    user
      .save()
      .then((response) => {
        res.status(200).json({
          success: true,
          result: user,
          response: response,
        });
      })
      .catch((err) => {
        res.status(500).json({
          errors: [{ error: err }],
        });
      });
  });
};

exports.uploadBackgroundPic = (req, res) => {
  let image = req.file.path;
  console.log(image, "IMAGE");
  const { userId } = req.params;
  console.log(req, "THIS IS THE REQUEST ");
  User.findById(userId).then((user) => {
    console.log(user, "user");
    user.background = image;
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

exports.editBio = (req, res) => {
  const { id, bio } = req.body;
  console.log(id, bio);
  User.findById(id).then((user) => {
    user.bio = bio;
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
//<---END OF-EDIT PROFILE --------------->///

//<---------REPLIES--------------->///
exports.getReplies = (req, res) => {
  const { boxId } = req.params;
  Reply.find({ boxId: boxId }).then((replies) => {
    if (!replies) {
      return res.status(404).json({
        errors: [{ replies: `None` }],
      });
    } else {
      return res.status(200).json({
        success: true,
        result: replies,
      });
    }
  });
};

exports.postReply = (req, res) => {
  const { userId, content, commentId, id, boxId } = req.body;
  const reply = new Reply({
    id: id,
    userId: userId,
    boxId: boxId,
    commentId: commentId,
    content: content,
  });
  reply
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

exports.addReplyToComment = (req, res) => {
  const { commentId, replyId } = req.body;
  console.log(replyId, "ReplyID");
  Comment.findOne({ id: commentId }).then((comment) => {
    comment.replies.push(replyId);
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
  });
};
//<------End of Replies----------->///

//<----Beginning of Follow------->////

// adds currentUserId to followers array in the selectedUser's followers list
exports.addFollower = (req, res) => {
  const { currentUserId, selectedUserId } = req.body;
  User.findById(selectedUserId, (err, user) => {
    user.followers.push(currentUserId);
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

// adds selectedUserId to following array in the currentUsers's following list
exports.addFollowing = (req, res) => {
  const { currentUserId, selectedUserId } = req.body;
  User.findById(currentUserId, (err, user) => {
    user.following.push(selectedUserId);
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

// deletes currentUserId if currentUserId is already in selectedUsers's followers list
exports.delFollower = (req, res) => {
  const { currentUserId, selectedUserId } = req.body;
  User.findById(selectedUserId, (err, user) => {
    const index = user.followers.indexOf(currentUserId);
    if (index > -1) {
      user.followers.splice(index, 1);
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

//deletes selectedUserId from currentUser's Id if it already exists in currentUserId's following list
exports.delFollowing = (req, res) => {
  const { currentUserId, selectedUserId } = req.body;
  User.findById(currentUserId, (err, user) => {
    const index = user.following.indexOf(selectedUserId);
    if (index > -1) {
      user.following.splice(index, 1);
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
//<------End of Follow----------->///
