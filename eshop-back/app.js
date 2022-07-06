const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();

const itemRouter = require("./Item/ItemRouter");
const cartItemRouter = require("./CartItem/CartItemRouter");
const cartRouter = require("./Cart/CartRouter");
const userRouter = require("./User/UserRouter");
const themeRouter = require("./theme/ThemeRouter");

app.use("/api/shop/items", itemRouter);
app.use("/api/shop/cartitems", cartItemRouter);
app.use("/api/shop/carts", cartRouter);
app.use("/api/shop/users", userRouter);
app.use("/api/shop/themes", themeRouter);

app.use(express.json());

const run = () => {
  const port = process.env.PORT || 3001;
  app.listen(port, () => {
    console.log(`listening on ${port}`);
  });

  mongoose
    .connect("mongodb://localhost/testdb2")
    .then(() => console.log("connected to testdb2"))
    .catch((err) => console.error("failed to connect to testdb2", err));
};

run();
