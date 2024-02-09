const { default: slugify } = require("slugify");
const model = require("../model/category");
const prodModel = require("../model/products")
const Product = prodModel.Product
const Category = model.Category;


const getCategory = async (req, res) => {
  try {
    let products = await Product.find();
    let catagories = [...new Set(products.map(product => product.category))];

    res.status(200).json(catagories);
    console.log(catagories);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


const findProductByCatagory = async (req, res) => {
  try{
         const cat = req.params.cat;
         const products = await Product.find({category: cat})
         res.status(200).json(products)
  }catch(error){
    console.log(error)
  }
}

module.exports = {
  getCategory,
  findProductByCatagory
};
