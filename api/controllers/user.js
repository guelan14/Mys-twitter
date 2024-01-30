const pool = require("../database/connection");
const bcrypt = require("bcrypt");
const mysql2 = require("mysql2/promise");
const dotEnv = require("dotenv");
var jwt = require("jsonwebtoken");
const moment = require("moment");

const userTest = (req, res) => {
  return res.status(200).send({ status: "success" });
};

const register = async (req, res) => {
  const { email, firstname, lastname, user_password, confirm_password } =
    req.body;

  if (user_password !== confirm_password) {
    return res.status(500).send({
      status: "error",
      message: "Password are differents",
    });
  }

  try {
    const [results] = await pool.query(
      "SELECT email FROM users WHERE email=?",
      [email]
    );

    if (results.length > 0) {
      // email already registered
      return res.status(200).send({
        status: "error",
        message: "Email already registered",
      });
    }

    const passCrypted = bcrypt.hashSync(user_password);

    await pool.query(
      "INSERT INTO users (email, firstname, lastname, user_password) VALUES (?, ?, ?, ?)",
      [email, firstname, lastname, passCrypted]
    );
    return res.status(200).send({
      status: "success",
      message: "User registered",
      email,
    });
  } catch (error) {
    console.error("Error al registrar el usuario:", error);
    return res.status(500).send({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

const login = async (req, res) => {
  const { email, user_password } = req.body;

  try {
    //obtain user data
    const [user] = await pool.query("SELECT * FROM users WHERE email=?", [
      email,
    ]);

    if (user.length > 0) {
      //compare password
      const pwdMatch = await bcrypt.compare(
        user_password,
        user[0].user_password
      );

      if (!pwdMatch) {
        return res.status(400).send({
          status: "error",
          message: "Information not valid",
        });
      }

      //create user object to pass
      const userForToken = {
        id: user[0].user_id,
        iat: moment().unix(),
        exp: moment().add(1, "days").unix(),
      };

      //creating token
      const token = jwt.sign(userForToken, process.env.SECRET_KEY);

      return res.status(200).send({
        status: "success",
        message: "login successful",
        token,
      });
    } else {
      return res.status(200).send({
        status: "Error",
        message: "Email doesnt exist",
      });
    }
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).send({
      status: "error",
      message: "Internal server error",
    });
  }
};

module.exports = { userTest, register, login };
