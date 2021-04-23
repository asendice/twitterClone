const express = require("express");
const router = express.Router();

const { postBoxes, getBoxes, login, register, getComments, postComment } = require("../controllers/auth");

router.post("/login", login);
router.post("/register", register);
router.post("/boxes", postBoxes);
router.get("/boxes", getBoxes);
router.get("/comments", getComments)
router.post("/comments", postComment)

module.exports = router;
