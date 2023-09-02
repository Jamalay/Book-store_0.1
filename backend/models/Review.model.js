const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
  user: { type: mongoose.SchemaTypes.ObjectId, ref: "User", required: true },
  reviwedBookId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Book",
    required: true,
  },
  title: { type: String, required: true },
  date: { type: String, required: true },
  likes: [{ type: mongoose.SchemaTypes.ObjectId, ref: "User" }],
  dislikes: [{ type: mongoose.SchemaTypes.ObjectId, ref: "User" }],
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
