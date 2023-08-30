const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const { bookId } = req.body;

    if (!authorization) {
      return res.status(401).json({ error: "Нет ключа авторизации" });
    }

    const [type, token] = authorization.split(" ");

    if (type !== "Bearer") {
      return res.status(401).json({ error: "Неверный тип токена" });
    }

    const data = await jwt.verify(token, process.env.JWT_SEKRET_KEY);

    req.userId = data._id;
    req.bookId = bookId;

    next();
  } catch (err) {
    res.json({ error: "ee  " + err.message });
  }
};
