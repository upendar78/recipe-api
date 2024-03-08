const express = require("express");
const bcrypt = require("bcrypt");
const app = express();
app.use(express.json());
const { db } = require("./index");

class User {
  async registerUser(request,response) {
      const { username, name, password, gender, location } = request.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const userQuery = `SELECT * FROM user WHERE username='${username}'`;
      const user = await db.get(userQuery);
      if (user === undefined) {
        const loginUserQuery = `
              INSERT INTO user(username,name,password,gender,location) VALUES
              ('${username}','${name}','${hashedPassword}','${gender}','${location}');`;
        await db.run(loginUserQuery);
        response.send("User Registered Successfully");
      } else {
        response.status(400);
        response.send("User Already Exists");
      }
  }
}

module.exports = User;
