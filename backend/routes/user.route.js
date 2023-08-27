const { Router } = require("express");
const { usersController } = require("../controllers/UsersController");
const authMiddleware = require("../middlewares/auth.middleware");

const router = Router();

router.post("/signUp", usersController.signUp);
router.get("/signIn", usersController.signIn);
router.patch("/addbook", authMiddleware, usersController.addBook);
router.patch("/removebook", authMiddleware, usersController.removeBook);

module.exports = router;
