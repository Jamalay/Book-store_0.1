const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.usersController = {
  signUp: async (req, res) => {
    try {
      const { login, password } = req.body;

      if (!login) {
        return res.status(401).json({ error: "Необходимо указать логин" });
      }

      if (!password) {
        return res.status(401).json({ error: "Необходимо указать пароль" });
      }

      const canditate = await User.findOne({ login });

      if (canditate) {
        return res
          .status(401)
          .json({ error: `Поьзователь с логином ${login} уже существует` });
      }

      const hashPassword = await bcrypt.hash(
        password,
        Number(process.env.HASH_ROUNDS)
      );

      const user = await User.create({
        login,
        password: hashPassword,
      });

      if (!user) {
        return res.status(401).json({ error: "Ошибка при регистрации" });
      }

      const payload = {
        _id: user._id,
        login: user.login,
        role: user.role,
        cart: user.cart,
      };

      const token = jwt.sign(payload, process.env.JWT_SEKRET_KEY, {
        expiresIn: "4h",
      });

      if (!token) {
        return res.status(401).json({ error: "Ошибка при создании токена" });
      }

      res.json({ token });
    } catch (err) {
      res.json({ error: err.message });
    }
  },

  signIn: async (req, res) => {
    try {
      const { login, password } = req.body;

      const canditate = await User.findOne({ login });

      if (!canditate) {
        return res
          .status(401)
          .json({ error: `Пользователь с логином ${login} не найден` });
      }

      const valid = await bcrypt.compare(password, canditate.password);

      if (!valid) {
        return res.status(401).json({ error: "Неверный пароль" });
      }

      const payload = {
        _id: canditate._id,
        login: canditate.login,
        role: canditate.role,
        cart: canditate.cart,
      };

      const token = jwt.sign(payload, process.env.JWT_SEKRET_KEY, {
        expiresIn: "4h",
      });

      if (!token) {
        return res.status(401).json({ error: "Ошибка при создании токена" });
      }

      res.json({ token });
    } catch (err) {
      res.json({ error: err.message });
    }
  },

  addBook: async (req, res) => {
    try {
      const user = await User.findById(req.userId);

      if (user.cart.includes(req.bookId)) {
        return res.json({ error: "Эта книга уже добавлена в корзину" });
      }

      await user.updateOne({ $push: { cart: req.bookId } });

      res.json(user);
    } catch (err) {
      res.json({ error: err.message });
    }
  },

  removeBook: async (req, res) => {
    try {
      const user = await User.findById(req.userId);

      await user.updateOne({ $pull: { cart: req.bookId } });

      res.json(user);
    } catch (err) {
      res.json({ error: err.message });
    }
  },
};
