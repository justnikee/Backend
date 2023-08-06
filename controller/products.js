const model = require('../model/products')
const Product = model.Product;

const createProduct = async (req, res) => {
    const product = new Product(req.body);
    const output = await product.save()
    .then(() => {
        console.log('success')
    })
    .catch(err => {
        console.log(err)
        res.status(401).json({message: 'error'})
    })
}

const getAllProducts = async(req, res) => {
    const products = await Product.find();
    console.log(products);
}

const getProduct = async(req, res) => {
    const id = req.params.id;
    const product = await Product.findById(id);
    // const product = products.find(prod => prod.id === id);
    // const rez = res.json(product);
    console.log(product)
}

const replaceProduct = async(req, res) => {
    const id = req.params.id;
    try{
        const product = await Product.findOneAndReplace({_id: id}, req.body, {new: true});
        console.log(product)
        res.status(201).json({message : "updated"});
    }catch(err){
         console.log(err)
         res.status(401).json({message : 'error'});
    }
    
}

const updateProduct = async(req, res) => {
    const id = req.params.id;
    try{
        const product = await Product.findOneAndUpdate({_id: id}, req.body, {new: true});
        console.log(product)
        res.status(201).json({message : "patched"});
    }catch(err){
         console.log(err)
         res.status(401).json({message : 'error'});
    }
}

const deleteProduct = async(req, res) => {
    const id = req.params.id;
    try{
        const product = await Product.findOneAndDelete({_id: id});
        console.log(product)
        res.status(201).json(product);
    }catch(err){
         console.log(err)
         res.status(401).json({message : 'error'});
    }
}

module.exports = {
    getAllProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    replaceProduct
}