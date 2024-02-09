const mongoose = require("mongoose");
const { Product } = require("./products");
const { Users } = require("./users");
const { Schema } = mongoose;

//schema
const cartSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Users,
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Product,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  price: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
});

exports.Cart = mongoose.model("Cart", cartSchema);
