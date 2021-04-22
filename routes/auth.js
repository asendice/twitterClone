const express = require("express");
const router = express.Router();

const { postBoxes, getBoxes, login, register } = require("../controllers/auth");

router.post("/login", login);
router.post("/register", register);
router.post("/boxes", postBoxes);
router.get("/boxes", getBoxes);

module.exports = router;
