const express = require("express");
const router = express.Router();

//middleware Multer
const uploadMulter = require("../middleware/uploadMulter");

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
  getProfilePic,
  getBackgroundPic,
  uploadBackgroundPic,
} = require("../controllers/auth");

router.post("/login", login);
router.post("/register", register);
router.get("/users", getUsers);
router.get("/users/:userId", getUser);
router.post("/boxes", postBoxes);
router.get("/boxes", getBoxes);
router.post("/comments", postComment);
router.get("/comments/:boxId", getComments);
router.put("/comments/:boxId", putComment);
router.put("/users/add/:userId", addLikeUser);
router.put("/users/del/:userId", delLikeUser);
router.put("/boxes/:boxId", addLikeBox);
router.put("/boxes/del/:boxId", delLikeBox);
router.put("/users/:userId", uploadMulter, uploadProfilePic);
// router.get("/users/avatar/:userId", getProfilePic);
// router.put("/users/bkg/:userId", uploadBackgroundPic);
// router.get("/users/bkg/:userId", getBackgroundPic);

module.exports = router;
