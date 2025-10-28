const dotenv = require('dotenv');
dotenv.config(); 
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');

const app = express();

mongoose.connect(process.env.MONGODB_URI); //connects to Mongo using mongoose

mongoose.connection.on('connected', () => {
    console.log('connected to Mongo')
});

const Product = require('./models/products.js') 
const Cart = require('./models/cartItem.js')
// important that models are connected  after connection to Mongo (lines 12-14)

app.use(express.urlencoded({ extended: false }));




app.get("/", async (req, res) => {
    res.render('home.ejs')
});

app.get("/why", async (req, res) => {
    res.render('why.ejs')
});

app.get("/partners", async (req, res) => {
    res.render('partners.ejs')
});

app.get("/stories", async (req, res) => {
    res.render('stories.ejs')
});

app.get("/products", async (req, res) => {
    const allProducts = await Product.find();
    res.render('products.ejs', {products: allProducts})
});

app.get("/cart", async (req, res) => {
    res.render('cart.ejs')
});

app.get("/new-product", async (req, res) => {
    res.render('new-product.ejs')
});



app.post('/product', async (req, res) => {
    const productData = {
        name: req.body.name,
        description: req.body.description,
        quantity: parseInt(req.body.quantity, 10),
        // parseInt makes a string into an integer. When numbers come into
        // req.body they are still strings. parseInt helps to change the data type into a number
        price: Math.round(parseFloat(req.body.price) * 100) 
        // Math.round takes a number and rounds to nearest integer. Multiplying by 100 and
        // rounding using math.round stores the 'price' as integer cents.
        // when displaying the price, we have to divide by 100 or the site visitor
        // will see the price in cents. <%= (product.price / 100) %>
    };
    await Product.create(productData);
    res.redirect('/products')
   } 
);
// had to add a conversion step because the floating-point math in 
// JS can be wrong when dealing with fractions. 

app.post('/cart', async (req, res) => {
    const cartItems = await Cart.find().populate('product'); 
    res.render('cart.ejs', {cartItems});
});

app.get('/products/:productId', async (req, res) => {
    const foundProduct = await Product.findById(req.params.productId);
    res.render('product-page.ejs', {product: foundProduct});
});














app.listen(3000, () => {
    console.log('Listening on Port 3000')
});