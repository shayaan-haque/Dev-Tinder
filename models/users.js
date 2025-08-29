const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 10,
      Lowercase: true,
    },
    lastName: {
      type: String,
      minLength: 3,
    },
    email: {
      type: String,
      Lowercase: true,
      trim: true,
      required: true,
      unique: true,
      validate(value) {
        if (!isEmail(value)) {
          throw new Error("Invalid Email Format");
        }
      },
    },
    password: {
      type: String,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender not ok");
        }
      },
    },
    skills: {
      type: [String],
    },
    age: {
      type: Number,
      min: 18,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.getJWT = async function () {
    const User = this;
    const token = await jwt.sign({ _id: User._id }, "Shayaan", {
      expiresIn: "1d",
    });
    return token;
  };
  

const userModel = mongoose.model("User", userSchema);
module.exports = { userModel };
