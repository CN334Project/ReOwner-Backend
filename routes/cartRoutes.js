const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

router.post("/add", cartController.addToCart);
router.patch("/remove", cartController.removeFromCart); 
router.get("/", cartController.getCart);

module.exports = router;