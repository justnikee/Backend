const express = require("express");
const router = express.Router();
const productControler = require("../controller/products");

router
  .post("/", productControler.createProduct)
  .get("/", productControler.getAllProducts)
  .get("/:id", productControler.getProduct)
  .put("/:id", productControler.replaceProduct)
  .patch("/:id", productControler.updateProduct)
  .delete("/:id", productControler.deleteProduct);

exports.router = router;
