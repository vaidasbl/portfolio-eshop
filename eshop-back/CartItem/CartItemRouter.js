const express = require("express");
const router = express.Router();
const { CartItem } = require("./CartItem");

const cors = require("cors");

router.use(express.json());
router.use(cors({ origin: "*" }));

//Add new cart item
router.post("/", async (req, res) => {
  const cartItem = new CartItem({
    item: req.body.itemId,
  });

  console.log(cartItem);
  try {
    const itemToSave = await cartItem.save();
    res.send(itemToSave);
  } catch (err) {
    res.send(err.message);
  }
});

module.exports = router;
