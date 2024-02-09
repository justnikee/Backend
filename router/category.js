const express = require("express");
const router = express.Router();
const categoryControler = require("../controller/category");
const { requireSignIn, isAdmin } = require("../middleware/authMiddleware");

router
  .get("/", categoryControler.getCategory)
  .get("/getCatProducts/:cat", categoryControler.findProductByCatagory);

module.exports = router;
