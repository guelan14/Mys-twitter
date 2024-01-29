const pool = require("../database/connection");
const mysql2 = require("mysql2/promise");

const save = async (req, res) => {
  //obtain Data from client
  const file = req.file.file0;
  const { description } = req.body;

  //create publication in db
};

module.exports = { save };
