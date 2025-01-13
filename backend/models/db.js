const mysql = require("mysql");

const db = mysql.createPool({
  connectionLimit: 10, // Adjust as needed
  host: "https://terenceng.dev",
  database: "tere4902_webapp",
  user: "tere4902_admin",
  password: "FZ8&#_]7KWf@",
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
