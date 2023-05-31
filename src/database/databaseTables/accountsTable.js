const databaseManager = require("../dbconnector");
const database = databaseManager.connection();

/*
    Create accounts table
*/
const createTableQuery = `
CREATE TABLE IF NOT EXISTS accounts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL
)`;

database.run(createTableQuery, (err) => {
  if (err) {
    console.error("Error creating table:", err);
    process.exit();
  }
});

function addAccount(username, email, password, callback) {
  const insertQuery = `
    INSERT INTO accounts (username, email, password)
    VALUES (?, ?, ?)`;

  database.run(insertQuery, [username, email, password], (err) => {
    if (err) {
      console.error("Error adding account:", err);
    } else {
      callback(true);
    }
  });
}

function getAccount(email, callback) {
  const selectQuery = `
    SELECT * FROM accounts
    WHERE email = ?`;

  database.get(selectQuery, [email], (err, row) => {
    if (err) {
      console.error("Error retrieving account:", err);
      process.exit();
    } else {
      if (!row) {
        callback(false);
        return;
      }
      callback(row);
    }
  });
}

module.exports = {
  addAccount,
  getAccount
};
