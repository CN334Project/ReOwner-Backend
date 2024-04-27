const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  product: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  }],
});

module.exports = mongoose.model("CartItem", cartItemSchema);
