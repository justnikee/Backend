const mongoose = require('mongoose');
const { Schema } = mongoose;


const userSchema = new Schema({
    firstName: {
        type: String, 
        required: true, 
        max: [16, 'Max character reached!']
    },
    lastName: {
        type: String, 
        max: [16, 'Max character reached!']
    },
    age: {
        type: Number,
        require: true,
        min: 12,
        max: 100
    },
    email: {
        type: String
    }

})