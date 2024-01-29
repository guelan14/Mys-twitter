// Get the client
const { createPool } = require("mysql2/promise");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

// Create the connection to database

const pool = createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DATABASE,
  password: process.env.DB_PASSWORD,
});

module.exports = pool;
