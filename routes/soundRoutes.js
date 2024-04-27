const express = require("express");
const router = express.Router();
const createSound = require("../controllers/soundController");

router.post("/", createSound.createSound);

module.exports = router;