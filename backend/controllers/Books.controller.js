const Book = require("../models/Book.model");

module.exports.bookController = {
  addBook: async (req, res) => {
    try {
      const { name, img, genre, price, author } = req.body;
      const data = await Book.create({
        name,
        price,
        genre,
        img,
        author,
      });
      res.json(data);
    } catch (err) {
      res.json(err.message);
    }
  },

  changeBook: async (req, res) => {
    try {
      const { name, img, genre, price, author } = req.body;
      const data = await Book.findByIdAndUpdate(req.params.bookId, {
        $set: {
          name,
          img,
          genre,
          price,
          author,
        },
      });
      res.json(data);
    } catch (err) {
      res.json(err.message);
    }
  },

  getBooks: async (req, res) => {
    try {
      const data = await Book.find({});
      res.json(data);
    } catch (err) {
      res.json(err.message);
    }
  },

  deleteBook: async (req, res) => {
    try {
      const data = await Book.findByIdAndDelete(req.params.bookId);
      res.json(data);
    } catch (err) {
      res.json(err.message);
    }
  },
};
