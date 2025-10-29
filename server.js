const dotenv = require('dotenv');
dotenv.config(); 
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');

// Auth changes *** 
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
require('./config/passport')(passport);
// Auth Changes ** 

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
//connects everything inside directory public, 
// including home.js file available to the browser. 

mongoose.connect(process.env.MONGODB_URI); //connects to Mongo using mongoose

mongoose.connection.on('connected', () => {
    console.log('connected to Mongo')
});

const Cart = require('./models/cart.js')
const Product = require('./models/products.js') 
// important that models are connected  after connection to Mongo (lines 12-14)

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(morgan("dev")); 

//Auth changes *** --------------------------------------------------------------
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 } // 7 days
}));
app.use(passport.initialize());
app.use(passport.session());

// Make user available in EJS (nav, etc.)
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


const authRouter = require('./routes/auth');
app.use('/', authRouter);

app.use((req, res, next) => {
  // Should print 'ejs'
  // If undefined, the engine isn't set before this router runs
  console.log('view engine =', req.app.get('view engine'));
  next();
});

// Auth changes *** ---------------------------------------------------------------



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


app.get("/new-product", async (req, res) => {
    res.render('new-product.ejs')
});

app.get("/thank-you", async (req, res) => {
    res.render('thank-you.ejs')
})

app.post('/cart', async (req, res) => {
    await Cart.create(req.body)
    res.redirect('/cart');
});

app.get("/cart", async (req, res) => {
    const cartItems = await Cart.find().populate('product');
    res.render("cart.ejs", {cartItems});
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


app.post('/cart/checkout', async (req, res) => {
    const cartItems = await Cart.find().populate('product');
    for (const item of cartItems) {
        if (item.quantity > item.product.quantity) {
            return res.status(400).send(`Not enough in stock of ${item.product.name}`);
        }
    }

    for (const item of cartItems) {
        const stockUpdate = item.product.quantity - item.quantity;
        await Product.findByIdAndUpdate(item.product._id, {quantity: stockUpdate});
    }
    await Cart.deleteMany({});
    res.redirect('/thank-you');
}
);


app.put('/cart/:id', async (req, res) => {
    const newQuantity = req.body.quantity
    const cartItem = await Cart.findById(req.params.id).populate('product')

    if (newQuantity > cartItem.product.quantity) {
        return res.send('Cannot order more than currently stocked')
    }
    await Cart.findByIdAndUpdate(req.params.id, { quantity: newQuantity});
    res.redirect('/cart');
});
// Changed '/cart/:productId to /cart/:id in lines 146 and lines 135 for consistency. 
app.delete('/cart/:id', async (req, res) => {
    await Cart.findByIdAndDelete(req.params.id);
    res.redirect('/cart');
});

app.get('/products/:productId', async (req, res) => {
    const foundProduct = await Product.findById(req.params.productId);
    res.render('product-page.ejs', {product: foundProduct});
});








app.listen(3000, () => {
    console.log('Listening on Port 3000')
});