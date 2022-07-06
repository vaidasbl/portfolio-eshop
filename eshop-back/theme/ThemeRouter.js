const express = require("express");
const router = express.Router();
const cors = require("cors");
const mongoose = require("mongoose");
router.use(express.json());
router.use(cors({ origin: "*" }));

const { Theme } = require("./Theme");

//Get active theme
router.get("/active", async (req, res) => {
  try {
    const activeTheme = await Theme.findOne({ active: true });
    if (activeTheme === null) {
      res.send({ theme: "no active themes" });
    } else {
      res.send(activeTheme);
    }
  } catch (err) {
    res.send(err.message);
  }
});

//Switch theme
router.put("/set/:theme", async (req, res) => {
  try {
    const activeTheme = await Theme.findOne({ active: true });

    if (activeTheme !== null) {
      activeTheme.active = false;
      await activeTheme.save();
    }

    const themeToSet = await Theme.findOne({ theme: req.params.theme });
    themeToSet.active = true;

    const result = await themeToSet.save();

    res.send(result);
  } catch (err) {
    res.send(err.message);
  }
});

//Turn off all themes
router.put("/unset", async (req, res) => {
  try {
    const activeTheme = await Theme.findOne({ active: true });
    if (activeTheme !== null) {
      activeTheme.active = false;
      await activeTheme.save();
    }
    res.send("all themes unset");
  } catch (err) {
    res.send(err.message);
  }
});

//Add theme
router.post("/", async (req, res) => {
  try {
    const theme = new Theme({ theme: req.body.name, active: false });
    await theme.save();

    res.send(theme);
  } catch (err) {
    res.send(err.message);
  }
});

module.exports = router;
