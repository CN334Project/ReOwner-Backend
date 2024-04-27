const CartItem = require("../models/CartItem");

exports.addToCart = async (req, res) => {
  const { productId } = req.body;

  try {
    const cartItem = new CartItem({ product: [productId] });
    await cartItem.save();

    res.status(201).json(cartItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const { productIdToRemove, cartID } = req.body;
    const cartItems = await CartItem.findById(cartID).populate("product");
    

    const updatesProductList = cartItems.product.filter((product) => {
      return product._id != productIdToRemove;
    });
    console.log(updatesProductList);
    cartItems.product = updatesProductList
    await cartItems.save()
    res.status(200).json(cartItems)
    
  } catch (error) {
    console.error("Error removing product from cart:", error);
    res.status(500).json({ message: "Internal server error" });
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

exports.getCartById = async (req, res) => {
  try {
    const cartItems = await CartItem.findById(req.params.id).populate(
      "product"
    );
    if (!cartItems) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.json(cartItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateCartById = async (req, res) => {
  try {
    const cartItems = await CartItem.findById(req.params.id);
    if (!cartItems) {
      return res.status(404).json({ message: "Cart not found" });
    }
    const { productId } = req.body;
    cartItems.product.push(productId);
    await cartItems.save();

    res.json(cartItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
