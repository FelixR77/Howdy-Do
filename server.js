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

const Product = require('./models/HowdyDo.js') 
// important that this is established after connection to Mongo (lines 12-14)




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
    res.render('products.ejs')
});

app.get("/cart", async (req, res) => {
    res.render('cart.ejs')
});
















app.listen(3000, () => {
    console.log('Listening on Port 3000')
});