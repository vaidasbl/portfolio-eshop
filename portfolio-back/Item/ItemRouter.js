const express = require("express");
const { Item } = require("./Item");
const { Cart } = require("../Cart/Cart");
const router = express.Router();
const cors = require("cors");
const mongoose = require("mongoose");
const { CartItem } = require("../CartItem/CartItem");
const { User } = require("../User/User");
router.use(express.json());
router.use(cors({ origin: "*" }));

// Add new item
router.post("/", async (req, res) => {
  const item = new Item({
    itemName: req.body.itemName,
    itemDescription: req.body.itemDescription,
    itemPrice: req.body.itemPrice,
    stock: req.body.stock,
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
router.get("/", async (req, res) => {
  try {
    const items = await Item.find();
    if (items.length === 0) {
      res.status(218).send([]);
      return;
    }
    res.send(items);
  } catch (err) {
    res.send("ERROR");
  }
});

//Get filter by name
router.get("/search/:namestring", async (req, res) => {
  const regex = req.params.namestring;

  try {
    const items = await Item.find({
      itemName: new RegExp(`.*${regex}.*`, "i"),
    });
    res.send(items);
  } catch (err) {
    res.send(err.message);
  }
});

router.get("/search/", async (req, res) => {
  try {
    const items = await Item.find();
    res.send(items);
  } catch (err) {
    res.send(err.message);
  }
});

//Get one by id
router.get("/:id", async (req, res) => {
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
router.delete("/:id", async (req, res) => {
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
    } else {
      await Cart.find({ "items.itemId": req.params.id }).updateMany({
        $pull: { items: { itemId: req.params.id } },
      });
    }
    await Item.deleteOne({ _id: itemId });
    res.send("Item with name '" + itemToDelete.itemName + "' has been deleted");
  } catch (err) {
    res.send(err.message);
  }
});

//Update by id
router.put("/:id", async (req, res) => {
  const itemId = req.params.id;
  if (itemId.length !== 24) {
    res.status(218).send("No item with such id.");
    return;
  }

  try {
    const itemToUpdate = await Item.findById(itemId);
    const updatedData = req.body;
    const options = { new: true };

    if (typeof req.body.itemPrice !== "number") {
      res.status(400).send("price has to be a number");
      return;
    }

    if (itemToUpdate === null) {
      res.status(218).send("No item with such id.");
      return;
    }

    if (req.body === "") {
      res.status(400).send("cannot be empty");
      return;
    }

    const result = await Item.findByIdAndUpdate(
      { _id: itemId },
      updatedData,
      options
    );
    console.log(req.body);
    res.send(result);
  } catch (err) {
    res.send(err.message);
  }
});

//Add item to cart
router.put("/:itemid/addtouser/:userid", async (req, res) => {
  try {
    const item = await Item.findById(req.params.itemid);
    const cart = await Cart.findOne({ userId: req.params.userid });

    const ItemInCart = await cart.items.find(
      (i) => i.itemId == req.params.itemid
    );

    if (!ItemInCart) {
      await cart.items.push({
        itemId: item._id,
        itemName: item.itemName,
        quantity: 1,
        itemPrice: item.itemPrice,
      });
      item.stock--;
      await item.save();
      const result = await cart.save();
      res.send(result);
    } else if (item.stock > 0) {
      ItemInCart.quantity++;
      item.stock--;
      await item.save();
      const result = await cart.save();
      res.send(result);
    } else if (item.stock == 0) {
      res.send("out of stock");
    }
  } catch (err) {
    res.send(err.message);
  }
});

//Remove item from cart
router.put("/:itemid/removefromuser/:userid", async (req, res) => {
  try {
    const item = await Item.findById(req.params.itemid);
    const cart = await Cart.findOne({ userId: req.params.userid });

    const ItemInCart = await cart.items.find(
      (i) => i.itemId == req.params.itemid
    );

    if (!ItemInCart) {
      res.status(222).send("the item is not in the cart");
    } else if (ItemInCart.quantity > 1) {
      ItemInCart.quantity--;
      item.stock++;
      await item.save();
      const result = await cart.save();
      res.send(result);
    } else if (ItemInCart.quantity == 1) {
      const index = await cart.items.findIndex(
        (i) => i.itemId == ItemInCart.itemId
      );

      await cart.items.splice(index, 1);
      item.stock++;
      await item.save();

      const result = await cart.save();
      res.send(result);
    }
  } catch (err) {
    res.send(err.message);
  }
});

module.exports = router;
