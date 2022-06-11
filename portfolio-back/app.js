const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();

const itemRouter = require("./Item/ItemRouter");
const cartItemRouter = require("./CartItem/CartItemRouter");

app.use("/api/shop/items", itemRouter);
app.use("/api/shop/cartitems", cartItemRouter);

app.use(express.json());
app.use(cors({ origin: "*" }));

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
