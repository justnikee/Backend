const mongoose = require('mongoose');
const { Schema } = mongoose;


const userSchema = new Schema({
    firstname: {
        type: String,
        trim: true,
        required: true, 
        max: [16, 'Max character reached!']
    },
    lastname: {
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
        type: String,
        require: true,
        unique: true
    },
    phone: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    role: {
        type: Number,
       default: 0
    }
},{timestamps: true}
);

exports.Users = mongoose.model("Users", userSchema);