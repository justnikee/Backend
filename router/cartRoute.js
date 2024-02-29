const express = require("express");
const router = express.Router();
const cartController = require("../controller/cartController");

router
  .post("/addtocart", cartController.addToCart)
  .get("/allItems", cartController.getCartItems)
  .delete("/removeItem/:id", cartController.removeCartItem)
  .put("/item/:id", cartController.updateCartItemQuantity)
module.exports = router;
