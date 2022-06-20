const express = require("express");
const router = express.Router();
const cors = require("cors");
const { User } = require("./User");

router.use(express.json());
router.use(cors({ origin: "*" }));

//Create new user
router.post("/new", async (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });

  try {
    const exists = await User.exists({ username: user.username });

    if (exists) {
      res.status(218).send("exists with username");
    } else {
      const result = await user.save();
      res.send(result);
    }
  } catch (err) {
    res.send(err.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    const result = await User.exists({
      $and: [{ username: req.body.username }, { password: req.body.password }],
    });

    if (result === null) {
      res.send(false);
    } else {
      res.send(true);
    }
  } catch (err) {
    res.send(err.message);
  }
});

module.exports = router;
