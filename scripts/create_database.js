const mysql = require('mysql')

const con = mysql.createConnection({
  host: "localhost",
  user: "root", // YOUR USER_NAME
  password: "" // YOUR USER_PASSWORD
});

con.connect((err) => {
  if (err) throw err;
  console.log("Connected!");
  /*Create a database named "mydb":*/
  con.query("CREATE DATABASE nest_app_development",(err, result) => {
    if (err) throw err;
    console.log("Database created");
  });
});
