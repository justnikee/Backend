const express = require("express");
const router = express.Router();
const categoryControler = require("../controller/category");

router
  .get("/", categoryControler.getCategory)
  .post('/categories', categoryControler.createCategory)
  .get("/:cat", categoryControler.getSingleCategory)
  .delete("/:cat", categoryControler.removeSingleCategory)
  .post("/:cat/addProducts", categoryControler.addProductsToCategory)
  .get("/single/:cat", categoryControler.getProdcutsFromCategory)
module.exports = router;
  