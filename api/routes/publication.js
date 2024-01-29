const express = require("express");
const router = express.Router();
const PublicationController = require("../controllers/publication");

router.post("/post", PublicationController.save);

module.exports = router;
