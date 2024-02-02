const pool = require("../database/connection");
const mysql2 = require("mysql2/promise");
const path = require("path");
const fs = require("fs");
const jwt = require("jsonwebtoken");

const save = async (req, res) => {
  const description = req.body.description;
  const imageFile = req.file;
  let image = "";
  //obtain Data from client
  if (imageFile) {
    image = "pub-" + req.file.originalname;
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
  }
  //using user from token
  const user_id = req.user.id;
  const username = req.user.username;

  //create publication in db
  try {
    await pool.query(
      "INSERT INTO publication (user_id, text_publication, image, username) VALUES (? , ?, ?, ?)",
      [user_id, description, image, username]
    );
    return res.status(200).send({
      status: "succes",
      message: "publication created",
    });
  } catch (error) {
    return res
      .status(500)
      .send({ status: "error aca", message: error.message });
  }
};

const list = async (req, res) => {
  const user = req.user.id;
  let page = req.params.page;

  try {
    //obtain people that the user is following
    const [follows] = await pool.query(
      "SELECT * FROM follow WHERE user_follower = ? ",
      [user]
    );
    const userFollowing = follows.map((follow) => follow.user_following);

    const mysqlFollows = userFollowing.map(() => "?").join(",");

    if (follows && follows.length > 0) {
      const itemPerPage = 10;
      if (!page) {
        page = 1;
      }
      const offset = (page - 1) * itemPerPage;

      const [publications] = await pool.query(
        `SELECT * FROM publication WHERE user_id IN (${mysqlFollows}) ORDER BY create_at DESC LIMIT ? OFFSET ?`,
        [...userFollowing, itemPerPage, offset]
      );

      return res.status(200).send({
        status: "succes",
        message: "lista de publicacion",
        publications,
      });
    }
  } catch (error) {
    return res.status(500).send({
      status: "error",
      message: "no se pudo cargar el feed",
    });
  }
};

module.exports = { save, list };
