const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
  user: { type: mongoose.SchemaTypes.ObjectId, ref: "User", required: true },
  reviwedBook: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Book",
    required: true,
  },
  title: { type: String, required: true },
  date: { type: String, required: true },
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
