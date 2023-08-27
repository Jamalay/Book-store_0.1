const { Router } = require("express");
const { bookController } = require("../controllers/Books.controller");

const router = Router();

router.post("/books", bookController.addBook);
router.get("/books", bookController.getBooks);
router.patch("/books/:bookId", bookController.changeBook);
router.delete("/books/:bookId", bookController.deleteBook);

module.exports = router;
