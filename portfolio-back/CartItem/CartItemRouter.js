const express = require("express");
const router = express.Router();
const { CartItem } = require("./CartItem");

const cors = require("cors");

router.use(express.json());
router.use(cors({ origin: "*" }));

//Add new cart item
router.post("/", async (req, res) => {
  const cartItem = new CartItem({
    itemName: req.body.itemName,
    userCart: { userId: req.body.userId, quantity: req.body.quantity },
  });

  try {
    const itemToSave = await cartItem.save();
    res.send(itemToSave);
  } catch (err) {
    res.send(err.message);
  }
});

module.exports = router;
