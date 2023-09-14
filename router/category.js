const express = require("express");
const router = express.Router();

const { requireSignIn, isAdmin } = require("../middleware/authMiddleware");
const { createCategoryControler } = require("../controller/category");

router.post("create-category", requireSignIn, isAdmin, createCategoryControler);
