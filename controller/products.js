const fs = require('fs')
const data = JSON.parse(fs.readFileSync('products.json' , 'utf-8' ))
const products = data.products;


const createProduct = (req, res) => {
    console.log(req.body);
    products.push(req.body);
    res.json(req.body)
}

const getAllProducts = (req, res) => {
    res.json(products);
}

const getProduct = (req, res) => {
    console.log(req.params)
    const id = +req.params.id;
    const product = products.find(prod => prod.id === id);
    const rez = res.json(product);
    console.log(rez)
}

const replaceProduct = (req, res) => {
    console.log(req.params)
    const id = +req.params.id;
    const productIndex = products.findIndex(prod => prod.id === id);
    products.splice(productIndex, 1, {...req.body, id});
    res.status(201).json({message : "updated"});
}

const updateProduct = (req, res) => {
    console.log(req.params)
    const id = +req.params.id;
    const productIndex = products.findIndex(prod => prod.id === id);
    const product = products[productIndex]
    products.splice(productIndex, 1, {...product,...req.body});
    res.status(201).json({message : "Patched"});
}

const deleteProduct = (req, res) => {
    console.log(req.params)
    const id = +req.params.id;
    const productIndex = products.findIndex(prod => prod.id === id);
    const product = products[productIndex]
    products.splice(productIndex, 1);
    res.status(201).json(product);
}

module.exports = {
    getAllProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    replaceProduct
}