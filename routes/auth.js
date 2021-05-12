const express = require("express");
const router = express.Router();

//middleware Multer
const uploadMulter = require("../middleware/uploadMulter");
const validation = require("../middleware/validation");

const {
  postBoxes,
  getBoxes,
  login,
  register,
  getComments,
  postComment,
  putComment,
  addLikeUser,
  addLikeBox,
  getUsers,
  getUser,
  delLikeBox,
  delLikeUser,
  uploadProfilePic,
  getBox,
  uploadBackgroundPic,
  editBio,
  getReplies,
  postReply,
  addReplyToComment,
  addFollower,
  delFollower,
  addFollowing,
  delFollowing,
} = require("../controllers/auth");

router.post("/login", login);
router.post("/register", register);
router.get("/users", getUsers);
router.get("/profile/:name", getUser);
router.post("/boxes", postBoxes);
router.get("/boxes", getBoxes);
router.get("/boxes/:boxId", getBox);
router.post("/comments", postComment);
router.get("/comments/:boxId", getComments);
router.put("/comments/:boxId", putComment);
router.put("/comments/replies/:commentId", addReplyToComment);
router.get("/replies/:boxId", getReplies);
router.post("/replies", postReply);
router.put("/users/add/:userId", addLikeUser);
router.put("/users/del/:userId", delLikeUser);
router.put("/boxes/:boxId", addLikeBox);
router.put("/boxes/del/:boxId", delLikeBox);
router.put("/users/followers/add/:selectedUserId", addFollower);
router.put("/users/following/add/:currentUserId", addFollowing);
router.put("/users/followers/del/:selectedUserId", delFollower);
router.put("/users/following/del/:currentUserId", delFollowing);
router.put("/users/pic/:userId", uploadMulter, uploadProfilePic);
router.put("/users/bkg/:userId", uploadMulter, uploadBackgroundPic);
router.put("/users/bio/:userId", editBio);
module.exports = router;
