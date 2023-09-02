const jwt = require("jsonwebtoken");
const Review = require("../models/Review.model");

module.exports.reviewController = {
  writeReview: async (req, res) => {
    try {
      const date = new Date();
      const review = await Review.create({
        user: req.userId,
        reviwedBookId: req.bookId,
        title: req.title,
        date: `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`,
      });

      const data = await Review.findById(review._id).populate("user");
      await res.json(data);
    } catch (err) {
      res.json({ error: err.message });
    }
  },

  removeReview: async (req, res) => {
    try {
      const { reviewId } = req.params;
      const review = await Review.findById(reviewId);

      if (!review) {
        return res.status(400).json({ error: "Отзыва нет" });
      }

      if (String(review.user) !== String(req.userId)) {
        return res.status(400).json({ error: "Нельзя братан" });
      }

      await review.deleteOne();
      await res.json(String(reviewId));
    } catch (err) {
      res.json(err.message);
    }
  },

  changeReview: async (req, res) => {
    try {
      const { reviewId } = req.params;
      const review = await Review.findById(reviewId);

      if (!review) {
        return res.status(400).json({ error: "Отзыва нет" });
      }

      await review.updateOne({
        title: req.title,
      });

      await res.json(review);
    } catch (err) {
      res.json(err.message);
    }
  },

  getReviews: async (req, res) => {
    try {
      const reviews = await Review.find().populate("user").exec();
      await res.json(reviews);
    } catch (err) {
      res.json({ error: err.message });
    }
  },

  Like: async (req, res) => {
    try {
      const { reviewId } = req.params;

      const review = await Review.findById(reviewId);

      if (!review) {
        return res.status(400).json({ error: "Комментарий не найден" });
      }

      if (review.likes.includes(req.userId)) {
        await review.updateOne({ $pull: { likes: req.userId } });
      } else {
        await review.updateOne({ $pull: { dislikes: req.userId } });
        await review.updateOne({ $push: { likes: req.userId } });
      }

      const data = await Review.findById(reviewId);
      await res.json(data);
    } catch (err) {
      res.json({ error: err.message });
    }
  },

  DisLike: async (req, res) => {
    try {
      const { reviewId } = req.params;

      const review = await Review.findById(reviewId);

      if (!review) {
        return res.status(400).json({ error: "Комментарий не найден" });
      }

      if (review.dislikes.includes(req.userId)) {
        await review.updateOne({ $pull: { dislikes: req.userId } });
      } else {
        await review.updateOne({ $pull: { likes: req.userId } });
        await review.updateOne({ $push: { dislikes: req.userId } });
      }

      const data = await Review.findById(reviewId);
      await res.json(data);
    } catch (err) {
      res.json({ error: err.message });
    }
  },
};
