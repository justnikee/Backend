const express = require("express");
const app = express();
require("dotenv").config();
const morgan = require("morgan");
const productRouter = require("./router/products");
const userRouter = require("./router/user");
const categoryRouter = require("./router/category");
const port = process.env.PORT || 5001;
const mongoose = require("mongoose");
const cors = require("cors");

// connection
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/ecommerceTest");
  console.log("connected");
}

app.use(cors());
app.use(express.json());
app.use(morgan("default"));
app.use("/products", productRouter.router);
app.use("/users", userRouter.router);
app.use("/category", userRouter.router);

app.listen(port, () => {
  console.log(`server running on ${port}`);
});
