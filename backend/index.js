require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
app.use(cors());

app.use(require("./routes/book.route"));
app.use(require("./routes/user.route"));
app.use(require("./routes/review.route"));

const PORT = process.env.PORT || 3001;

mongoose
  .connect(`${process.env.MONGO_URL}`)
  .then(() => console.log("Подключение к MongoDB выполнена успешно!"))
  .catch(() => console.log("Ошибка при подключении к MongoDB!"));

app.listen(PORT, () => {
  console.log("Server was started on port: " + PORT);
});
