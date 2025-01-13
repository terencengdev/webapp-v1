const mysql = require("mysql");
let hostname = "217.21.85.1";
let database = "tere4902_webapp";
let username = "tere4902_admin";
let password = "FZ8&#_]7KWf@";

if (process.env.NODE_ENV == "development") {
  hostname = "localhost";
  database = "webapp-v1";
  username = "root";
  password = "";
}

const db = mysql.createPool({
  connectionLimit: 10, // Adjust as needed
  host: hostname,
  database: database,
  user: username,
  password: password,
  port: 3306,
});

db.getConnection((err, connection) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("MySQL Connected...");
  connection.release(); // Release the connection back to the pool
});

module.exports = db;
