const fs = require("fs");
const path = require("path");
const mysql = require("mysql2");
const createError = require("http-errors");
const { DB_OPTIONS } = require("../config");

const pool = mysql.createPool(DB_OPTIONS);

(() => {
  // Grab the tables sql file
  const tablesSQL = fs
    .readFileSync(path.join(__dirname, "./tables.sql"))
    .toString();

  try {
    // pool.query("DROP TABLE IF EXISTS users");
    // console.log("[mysql] users table was dropped.");

    // Execute the sql file to create our tables
    pool.query(tablesSQL, (err, data) => {
      if (err) return createError.InternalServerError();
    });
    console.log("[mysql] tables were created successfully.");
  } catch (err) {
    console.log(err);
  }
})();

module.exports = pool.promise();
