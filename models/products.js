const mongoose = require('mongoose'); 

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true, //keeps data consistency by eliminating spaces.
    },
    
    description: {
        type: String,
    },

    price: {
        type: Number,
        min: 0,
        required: true,  
        validate: {
            validator: Number.isInteger,
            message: 'Price must be stored in whole cents.'
        }
    },
    // validators are used to make sure data stays consistent from the start. 
    // learned about best practice when using pricing in models. JS sometimes makes mistakes when
    // rounding decimals. So best practice is to 'store integer cents'. Learn more about this and
    // JS floats rounding errors. This storage of price in cents will be in server.js

    quantity: {
        type: Number,
        required: true, 
        min: 0,
        validator: Number.isInteger,
        message: 'Stock quantity must be a whole number.'
    },
})

const Product = mongoose.model('Product', productSchema);
module.exports = Product;