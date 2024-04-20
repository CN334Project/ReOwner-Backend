const CartItem = require("../models/CartItem");

exports.addToCart = async (req, res) => {
  const { productId } = req.body;

  try {
    let cartItem = await CartItem.findOne({ product: productId });

    if (cartItem) {
      cartItem.quantity += 1;
      await cartItem.save();
    } else {
      cartItem = new CartItem({ product: productId });
      await cartItem.save();
    }

    res.status(201).json(cartItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.removeFromCart = async (req, res) => {
  const { productId } = req.body;

  try {
    await CartItem.deleteOne({ product: productId });

    res.json({ message: "Product removed from the cart" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getCart = async (req, res) => {
  try {
    const cartItems = await CartItem.find().populate("product");
    res.json(cartItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
