const express = require("express");
const router = express.Router();
const { Cart } = require("./Cart");

const cors = require("cors");
const CartItem = require("../CartItem/CartItem");

router.use(express.json());
router.use(cors({ origin: "*" }));

//Create cart
router.post("/", async (req, res) => {
  const cart = new Cart();

  try {
    const cartToSave = await cart.save();
    res.send(cartToSave);
  } catch (err) {
    res.send("ERROR");
  }
});

module.exports = router;
