const express = require("express");
const router = express.Router();

const { postBoxes, getBoxes } = require("../controllers/auth");

router.post("/boxes", postBoxes);
router.get("/boxes", getBoxes);

module.exports = router;
