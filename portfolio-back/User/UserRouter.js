const express = require("express");
const router = express.Router();
const cors = require("cors");
const { User } = require("./User");
const { Cart } = require("../Cart/Cart");

router.use(express.json());
router.use(cors({ origin: "*" }));

//Create new user
router.post("/new", async (req, res) => {
  const username = req.body.username;

  try {
    const exists = await User.exists({ username: username });

    if (exists) {
      res.status(218).send("exists with username");
    } else {
      let user = new User({
        username: req.body.username,
        password: req.body.password,
        role: req.body.role,
        cartId: null,
      });
      const cart = new Cart({ userId: user._id });

      await cart.save();
      user.cartId = cart._id;
      const result = await user.save();
      res.send(result);
    }
  } catch (err) {
    res.send(err.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      $and: [{ username: req.body.username }, { password: req.body.password }],
    });

    if (user === null) {
      res.send({ success: false });
      console.log(user);
    } else {
      res.send({
        success: true,
        _id: user._id,
        username: user.username,
        role: user.role,
      });
      console.log(user);
    }
  } catch (err) {
    res.send(err.message);
  }
});

module.exports = router;
