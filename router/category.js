const express = require("express");
const router = express.Router();
const categoryControler = require("../controller/category");
const { requireSignIn, isAdmin } = require("../middleware/authMiddleware");

router
  .get("/", categoryControler.getCategory)
  .post("/create", categoryControler.createCategory);

module.exports = router;
