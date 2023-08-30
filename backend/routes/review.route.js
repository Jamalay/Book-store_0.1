const { Router } = require("express");
const { reviewController } = require("../controllers/Review.controller");
const reviewMiddleware = require("../middlewares/review.middleware");

const router = Router();

router.post(
  "/book/review/:bookId",
  reviewMiddleware,
  reviewController.writeReview
);
router.delete(
  "/book/remove_review/:reviewId",
  reviewMiddleware,
  reviewController.removeReview
);

module.exports = router;
