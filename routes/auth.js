const express = require("express");
const router = express.Router();

const { postBoxes, getBoxes, login, register, getComments, postComment, putComment } = require("../controllers/auth");

router.post("/login", login);
router.post("/register", register);
router.post("/boxes", postBoxes);
router.get("/boxes", getBoxes);
router.get("/comments/:boxId", getComments)
router.put("/comments/:boxId", putComment)
router.post("/comments", postComment)

module.exports = router;
