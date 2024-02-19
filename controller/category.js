const { default: slugify } = require("slugify");
const model = require("../model/category");
const prodModel = require("../model/products")
const Product = prodModel.Product
const Category = model.Category;


const createCategory = async (req, res) => {
  try {
    const {name,slug} = req.body;

    await Category.create({
      name: name,
      slug: slug
    });

    res.status(201).json({"message" : "category created"});
  } catch (error) {
    res.status(404).json({"message" : "Category failed to create"})
  console.log(error);
  }
};

const getCategory = async (req, res) => {
       try {
         const catagories = await Category.find();
         res.status(200).json(catagories);
       } catch (error) {
        res.status(200).json(error)
       }
}


const getSingleCategory = async (req, res) => {

  try{
    const name = req.params.cat;
    console.log(name)
    const category = await Category.find({name});
    res.status(200).json(category);

    if(category){
     console.log('category found')
    }else{
      console.log('no category found')
    }
  }catch(error){
    res.status(404).json({"message" : "category not found"})
    console.log(error);
  }
 
}


const removeSingleCategory = async (req, res) => {

  try{
    const name = req.params.cat;
    console.log(name)
    const category = await Category.deleteOne({name: name});
    res.status(200).json(category);

    if(category){
     console.log('category Deleted Succesfully')
    }else{
      console.log('no category found')
    }
  }catch(error){
    res.status(404).json({"message" : "category not found"})
    console.log(error);
  }
 
}


const addProductsToCategory = async (req, res) => {
  try{
//get category id and product ids
const { cat } = req.params;
const { productsIds } = req.body;

const category = await Category.findOne({name: cat});
console.log(category)
if(!category){
 return res.status(404).json({"message" : "Category not found"})
}

if(!productsIds){
  return res.status(404).json({"message" : "products id's are required"})
}

const products =  await Product.find({_id: {$in : productsIds}});

if(!products){
  return res.status(404).json("One or more products are required")
}

products.forEach((product) => {
  if(!category.products.includes(product._id)){
    category.products.push(product)
  }
})

await category.save();

res.status(200).json({"message" : "Product added to the collection!"})
  }catch(error){
    console.log("Failed to add the product to the collection" , error.message)
    res.status(500).json("Internal Server Error");
  }
     
}


const getProdcutsFromCategory = async(req, res) => {
  // get param 
  const { cat } = req.params;
  
  const category = await Category.findOne({name: cat});

   if(!category){
    return res.json("Category no available");
   }

   const productIds = category.products;

   const products = await Product.find({ _id: {$in : productIds}});

   res.status(200).json(products)
  
}



module.exports = {
  createCategory,
  getCategory,
  removeSingleCategory,
  getSingleCategory,
  addProductsToCategory,
  getProdcutsFromCategory
};
