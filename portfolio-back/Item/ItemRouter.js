const express = require("express");
const { Item } = require("./Item");
const router = express.Router();
const cors = require("cors");
router.use(express.json());
router.use(cors({ origin: "*" }));

// Add new item
router.post("/", async (req, res, next) => {
  const item = new Item({
    itemName: req.body.itemName,
    itemDescription: req.body.itemDescription,
    itemPrice: req.body.itemPrice,
    imagePath: req.body.imagePath,
  });

  if (await Item.findOne({ itemName: req.body.itemName })) {
    res
      .status(405)
      .send("Item with name '" + req.body.itemName + "' already exists");
    return;
  }

  try {
    const itemToSave = await item.save();
    res.status(201).send(itemToSave);
  } catch (err) {
    res.send(err.message);
  }
});

//Get all items
router.get("/", async (req, res, next) => {
  try {
    const items = await Item.find();
    if (items.length === 0) {
      res.status(218).send("there are no items");
      return;
    }
    res.send(items);
  } catch (err) {
    res.send("ERROR");
  }
});

//Get one by id
router.get("/:id", async (req, res, next) => {
  const itemId = req.params.id;
  if (itemId.length !== 24) {
    res.status(218).send("No item with such id.");
    return;
  }

  try {
    const item = await Item.findById(req.params.id);

    if (item === null) {
      res.status(218).send("No item with such id.");
      return;
    }

    res.send(item);
  } catch (err) {
    res.send(err.message);
  }
});

//Delete by id
router.delete("/:id", async (req, res, next) => {
  const itemId = req.params.id;
  if (itemId.length !== 24) {
    res.status(218).send("No item with such id.");
    return;
  }

  try {
    const itemToDelete = await Item.findById(itemId);

    if (itemToDelete === null) {
      res.status(218).send("No item with such id.");
      return;
    }

    await Item.deleteOne({ _id: itemId });
    res.send("Item with name '" + itemToDelete.itemName + "' has been deleted");
  } catch (err) {
    res.send(err.message);
  }
});

//Update by id
router.put("/:id", async (req, res, next) => {
  const itemId = req.params.id;
  if (itemId.length !== 24) {
    res.status(218).send("No item with such id.");
    return;
  }

  try {
    const itemToUpdate = await Item.findById(itemId);
    const updatedData = req.body;
    const options = { new: true };
    console.log(typeof req.body.itemPrice);

    if (typeof req.body.itemPrice !== "number") {
      res.status(400).send("price has to be a number");
      return;
    }

    if (itemToUpdate === null) {
      res.status(218).send("No item with such id.");
      return;
    }

    const result = await Item.findByIdAndUpdate(
      { _id: itemId },
      updatedData,
      options
    );
    res.send(result);
  } catch (err) {
    res.send(err.message);
  }
});

module.exports = router;
