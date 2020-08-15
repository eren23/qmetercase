const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const auth = require("../../middleware/auth");
const Product = require("../../models/Product");
const User = require("../../models/User");

// @route    POST api/product
// @desc     Register product
// @access   Public
router.post(
  "/",
  [
    check("productname", "Product Name is too short").not().isEmpty(),
    check("text", "Product Name is too short").not().isEmpty(),
    check("warehousenumber", "Category Name is required").not().isEmpty(),
    check("amount", "Warehouse Number is required").not().isEmpty(),
    check("category", "Category is Required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { productname, text, amount, category, warehousenumber } = req.body;

    try {
      let product = await Product.findOne({ warehousenumber });

      if (product) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Item already exists" }] });
      }

      product = new Product({
        productname,
        warehousenumber,
        amount,
        category,
        text,
      });

      await product.save();
      res.json(product);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @route    GET api/product
// @desc     Get all products
// @access   Public
router.get("/", async (req, res) => {
  try {
    const product = await Product.find();
    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post("/:product_id", auth, async (req, res) => {
  try {
    const product = await Product.findOne({
      warehousenumber: req.params.product_id,
    });

    const user = await User.findById(req.user.id).select("-password");

    if (!product) return res.status(400).json({ msg: "Product not found" });

    if (!user) return res.status(400).json({ msg: "User not found" });

    const { productname, warehousenumber, category, text } = product;

    const basketItem = {
      productname,
      warehousenumber,
      amount: 1,
      category,
      text,
    };

    product.amount--;

    if (Array.isArray(user.basket) && user.basket.length) {
      const foundItem = user.basket.find((item) => {
        return item.warehousenumber == product.warehousenumber;
      });
      if (foundItem) {
        foundItem.amount++;
      } else {
        user.basket.unshift(basketItem);
      }
    } else {
      user.basket.unshift(basketItem);
    }

    await user.save();
    await product.save();
    res.json(user);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "Product not found" });
    }
    res.status(500).send("Server Error");
  }
});

router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) return res.status(400).json({ msg: "User not found" });

    res.json(user.basket);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "Product not found" });
    }
    res.status(500).send("Server Error");
  }
});

router.post("/basket/:product_id", auth, async (req, res) => {
  try {
    const product = await Product.findOne({
      warehousenumber: req.params.product_id,
    });

    const user = await User.findById(req.user.id).select("-password");

    if (!product) return res.status(400).json({ msg: "Product not found" });

    if (!user) return res.status(400).json({ msg: "User not found" });

    const { productname, warehousenumber, category, text } = product;

    const basketItem = {
      productname,
      warehousenumber,
      amount: 1,
      category,
      text,
    };

    product.amount++;

    if (Array.isArray(user.basket) && user.basket.length) {
      const foundItem = user.basket.find((item) => {
        return item.warehousenumber == product.warehousenumber;
      });
      if (foundItem) {
        foundItem.amount--;
      } else {
        user.basket.unshift(basketItem);
      }
    } else {
      user.basket.unshift(basketItem);
    }

    await user.save();
    await product.save();
    res.json(user);
  } catch (err) {
    console.error(err.message);

    return res.status(500).send("Server Error");
  }
});

router.get("/purchase", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) return res.status(400).json({ msg: "User not found" });

    user.basket = [];

    await user.save();
    res.json(user.basket);
  } catch (err) {
    console.error(err.message);

    return res.status(500).send("Server Error");
  }
});

module.exports = router;
