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
router.patch(
  "/book/update_review/:reviewId",
  reviewMiddleware,
  reviewController.changeReview
);
router.get("/get_reviews", reviewController.getReviews);
router.patch("/add_like/:reviewId", reviewMiddleware, reviewController.Like);
router.patch(
  "/add_dislike/:reviewId",
  reviewMiddleware,
  reviewController.DisLike
);

module.exports = router;
