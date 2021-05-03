const express = require("express");
const router = express.Router();

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
  getUser,
  delLikeBox,
  delLikeUser
} = require("../controllers/auth");

router.post("/login", login);
router.post("/register", register);
router.get("/users", getUser);
router.post("/boxes", postBoxes);
router.get("/boxes", getBoxes);
router.get("/comments/:boxId", getComments);
router.put("/comments/:boxId", putComment);
router.put("/users/:userId", addLikeUser);
router.put("/users/del/:userId", delLikeUser);
router.put("/boxes/:boxId", addLikeBox);
router.put("/boxes/del/:boxId", delLikeBox);
router.post("/comments", postComment);

module.exports = router;
