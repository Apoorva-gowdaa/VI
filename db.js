import mysql from "mysql2";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "NewPassword123!",
  database: "interior_ai",
});

db.connect((err) => {
  if (err) throw err;
  console.log("✅ MySQL Connected");
});

export default db;
