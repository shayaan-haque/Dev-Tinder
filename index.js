const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const { connectDB } = require("./config/database");
const { userModel } = require("./models/users");
const { validateData } = require("./utils/validation");
const cookie = require("cookie");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { authentication } = require("./utils/middleware");

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
  try {
    validateData(req);

    const { firstName, lastName, email, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);

    const User = new userModel({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });

    await User.save();
    res.send("saved successfully");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const User = await userModel.findOne({ email: email });

    if (!User) {
      throw new Error("Invalid Login credentials 1 ");
    }

    const isPassword = await bcrypt.compare(password, User.password);

    if (isPassword) {
      const token = await User.getJWT();
      res.cookie("token", token);
      res.send("Logged in successfully");
    } else {
      throw new Error("Invalid Login credentials 2 ");
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
});

app.get("/profile", authentication, async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("User does not exists");
    }
    res.send(user);
  } catch (err) {
    res.send(err.message);
  }
});

app.post("/sendCR", authentication, async (req, res) => {
  const name = req.user.firstName;
  res.send("Connection Sent Successfully by " + name);
});

connectDB()
  .then(() => {
    console.log("Connected");
    app.listen(7777, () => {
      console.log("Active on port 7777");
    });
  })
  .catch((err) => console.log("Did not connect"));
