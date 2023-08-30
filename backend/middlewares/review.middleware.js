const User = require("../models/User.model");
const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const { bookId } = req.params;
    const { title } = req.body;

    if (!authorization) {
      return res
        .status(401)
        .json({ error: "Авторизуйтесь, чтобы написать комментарий" });
    }

    const [type, token] = authorization.split(" ");

    if (type !== "Bearer") {
      return res.status(401).json({ error: "Неверный тип токена" });
    }

    const data = jwt.verify(token, process.env.JWT_SEKRET_KEY);

    const user = await User.findById(data._id);

    if (!user) {
      return res.status(401).json({ error: "Ошибка авторизации" });
    }

    req.userId = user._id;
    req.bookId = bookId;
    req.userName = user.login;
    req.title = title;

    next();
  } catch (err) {
    res.json({ error: err.message });
  }
};
