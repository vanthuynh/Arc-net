const mongoose = require("mongoose");
const { isEmail } = require("validator");
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
      validate: [isEmail, "invalid email"],
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
  { minimize: false }
);

// hide user's password before saving the user
// .pre() = middle ware function that is called directly before the item is saved to the database
UserSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return next(); //

  // encrypt the password
  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });
});

// send back the user
UserSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password; // we don't want to send back user's password
  return userObject;
};

// create user
UserSchema.statics.findByCredentials = async function (email, password) {
  // check for any users
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid email or password");

  // check for the right user
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid email or password");
  return user;
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
