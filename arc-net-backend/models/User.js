const mongoose = require("mongoose");

const {} = require("validator");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Can't be blank"],
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, "Can't be blank"],
      index: true,
      validate: [isEmail, "Invalid email"],
    },
    password: {
      type: String,
      required: [true, "Can't be blank"],
    },
    picture: {
      type: String,
    },
    newMessages: {
      type: Object,
      default: {},
    },

    status: {
      type: String,
      default: "online",
    },
  },
  { minimize: false } // this allows us to assign null values to newMessages
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
