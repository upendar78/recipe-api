const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();
app.use(express.json());
const path = require("path");
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");
const dbPath = path.join(__dirname, "swivl.db");
const User = require("./user");
let db;

const initializeDB = async () => {
  try {
    db = await open({ filename: dbPath, driver: sqlite3.Database });
    app.listen(3008, () => {
      console.log("users server started on 3008 port");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};

initializeDB();

const userOBj = new User();

app.post("/users/", async (request, response) => {
  User.registerUser(request, response);
});

exports.db = db;

console.log("Hello world");
