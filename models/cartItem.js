const mongoose = require('mongoose');
const Product = require('./products');

const cartItemsSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: Product,
        required: true
//Understand this section, specifically line 5. 
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
        validator: Number.isInteger, message: 'Quantity must be a whole number.'
    }
});

const Cart = mongoose.model('Cart', cartItemsSchema);

module.exports = Cart;