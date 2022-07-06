const express = require("express");
const router = express.Router();
const { Cart } = require("./Cart");

const cors = require("cors");

router.use(express.json());
router.use(cors({ origin: "*" }));

router.post("/", async (req, res) => {
  const cart = new Cart();

  try {
    const cartToSave = await cart.save();
    res.send(cartToSave);
  } catch (err) {
    res.send("ERROR");
  }
});

router.get("/get/:userid", async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userid });
    console.log(cart.items);
    res.send(cart);
  } catch (err) {
    res.send(err.message);
  }
});
module.exports = router;
