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
    discountPercentage: {
        type: Number,
         min: [0,'min discount'],
         max:[50,'max discount you can give'],
         default: 0
        },
    rating: {
        type: Number,
        min:0,
        max:5
    },
    brand: {
        type: String,
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