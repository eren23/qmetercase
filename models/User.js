const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  basket: [
    {
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
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
});

module.exports = User = mongoose.model("user", UserSchema);
