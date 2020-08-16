const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  productname: {
    type: String,
    required: true,
  },
  warehousenumber: {
    type: Number,
    required: true,
    unique: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

module.exports = Product = mongoose.model("product", ProductSchema);
