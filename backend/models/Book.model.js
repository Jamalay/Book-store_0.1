const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
  name: String,
  genre: String,
  price: Number,
  author: String,
  img: String,
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
