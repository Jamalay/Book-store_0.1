const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  login: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, default: "USER" }, // USER  ADMIN  OWNER
  cart: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Book" }],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
