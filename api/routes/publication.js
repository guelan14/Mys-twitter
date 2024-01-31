const express = require("express");
const router = express.Router();
const PublicationController = require("../controllers/publication");
const multer = require("multer");
const check = require("../middlewares/auth");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/publications/");
  },
  filename: (req, file, cb) => {
    cb(null, "pub-" + Date.now() + "-" + file.originalname);
  },
});
const uploads = multer({ storage });

router.post(
  "/post",
  [check.auth, uploads.single("file0")],
  PublicationController.save
);
router.get("/list/:page?", check.auth, PublicationController.list);

module.exports = router;
