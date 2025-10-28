const mongoose = require('mongoose');

const cartItemsSchema = new mongoose.Schema({
    product: { 
        ref: 'Product',
        type: mongoose.Schema.Types.ObjectId, 
        //connects the ObjectId from Products Schema to this field. Telling this new
        //model to get the data from the other model. Because we are getting the product name
        //from Product Schema, we dont need to include it here. 
        required: true
//Understand this section, specifically line 5. 
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
        validate: Number.isInteger, message: 'Quantity must be a whole number.'
    }
});

const Cart = mongoose.model('Cart', cartItemsSchema);

module.exports = Cart;