const { Product } = require("../model/products");
const { Cart } = require("../model/cartModel");

const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    if (!productId || !quantity || quantity < 1) {
      return res.status(404).json({ message: "no product or quantity" });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "no product found!" });
    }

    const totalPrice = product.price * quantity;
    console.log(totalPrice);

    const cartItem = await Cart.findOneAndUpdate(
      {
        productId,
      },
      {
        productId,
        quantity,
        price: product.price,
        title: product.title,
        image: product.thumbnail,
        total: totalPrice,
      },
      {
        upsert: true,
        new: true,
      }
    );
    return res
      .status(201)
      .json({ message: "item added to the cart!", cartItem });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server Error" });
  }
};

const getCartItems = async (req, res) => {
  try {
    const cartProducts = await Cart.find();
    if (!cartProducts) {
      return res.status(200).json({ message: "Empty Cart!" });
    }
    return res.status(200).json(cartProducts);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error!!" });
  }
};

const removeCartItem = async (req, res) => {
  const id = req.params.id;
  try {
    const removeProduct = await Cart.findOneAndDelete({ _id: id });
    if (!removeProduct) {
      res.status(500).json({ message: "error removing product" });
    }
    return res.status(200).json({ message: "Product removed from cart!" });
  } catch (error) {
    res.status(500).json({ message: "Product not found!", error });
  }
};

module.exports = {
  addToCart,
  getCartItems,
  removeCartItem,
};
