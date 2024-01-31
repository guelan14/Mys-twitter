const express = require("express");
const router = express.Router();
const FollowController = require("../controllers/follow");
const check = require("../middlewares/auth");

router.post("/save", check.auth, FollowController.save);

module.exports = router;
