const pool = require("../database/connection");
const mysql2 = require("mysql2/promise");
const path = require("path");
const fs = require("fs");
const jwt = require("jsonwebtoken");

const save = async (req, res) => {
  //obtain Data from client
  if (!req.file) {
    return res.status(404).send({
      status: "error",
      message: "Peticion no incluye imagen",
    });
  }

  let description = req.body.description;

  let image = "pub-" + req.file.originalname;
  let imageSplit = image.split(".");
  const extension = imageSplit[1];

  if (extension != "png" && extension != "jpg" && extension != "gif") {
    const filePath = req.file.path;
    const fileDeleted = fs.unlinkSync(filePath);

    return res.status(400).send({
      status: "error",
      message: "extension del fichero invalida",
    });
  }
  //using user from token
  const user = req.user.id;
  console.log(user);

  //create publication in db
  try {
    await pool.query(
      "INSERT INTO publication (user_id, text_publication, image) VALUES (? , ?, ?)",
      [user, description, image]
    );
    return res.status(200).send({
      status: "succes",
      message: "publication created",
    });
  } catch (error) {
    return res.status(500).send({ status: "error", message: error.message });
  }
};

module.exports = { save };
