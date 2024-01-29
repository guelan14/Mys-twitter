const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user");

router.get("/userTest", UserController.userTest);
router.get("/register", UserController.register);
router.post("/login", UserController.login);

module.exports = router;
