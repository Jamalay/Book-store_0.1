const jwt = require("jsonwebtoken");
const Review = require("../models/Review.model");

module.exports.reviewController = {
  writeReview: async (req, res) => {
    try {
      const date = new Date();
      const review = await Review.create({
        user: req.userId,
        reviwedBook: req.bookId,
        title: req.title,
        date: `${date.getDay()}.${date.getMonth() + 1}.${date.getFullYear()}`,
      });
      res.json(review);
    } catch (err) {
      res.json({ error: err.message });
    }
  },

  removeReview: async (req, res) => {
    try {
      const { reviewId } = req.params;
      const review = await Review.findByIdAndDelete(reviewId);
      res.json("deleted");
    } catch (err) {
      res.json(err.message);
    }
  },
};
