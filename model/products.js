const mongoose = require('mongoose');
const { Schema } = mongoose;

// Schema
const productSchema = new Schema({
    title : {
        type: String, 
        required: true
    },
    description : {
        type: String, 
        min:[0,'add the description'], 
        max: [200 ,'you have reached the description limit.']
    },
    price: {
        type: Number,
         required : true,
          min:[0, 'not vailid price']
        },
    category: {
        type: Schema.Types.ObjectId, 
        ref: 'Category'
    },
    thumbnail: {
        type: String,
        required: true
    },
    images : [String]
});

exports.Product = mongoose.model("Product", productSchema);