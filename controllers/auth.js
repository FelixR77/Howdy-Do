// const express = require("express");
// const router = express.Router();
// const mongoose = require('mongoose')
// const bcrypt = require("bcrypt");


// const User = require("../models/user.js");
// // used to import new user to the database.

// mongoose.connect(process.env.MONGODB_URI);


// module.exports = router;

// const hashedPassword = bcrypt.hashSync(req.body.password, 10);
// req.body.password = hashedPassword;

// router.get("/signup", (req, res) => {
//   res.render("auth/signup.ejs");
// });

// router.post("/signup", async (req, res) => {
//     const userInDatabase = await User.findOne({ username: req.body.username });
// if (userInDatabase) {
//   return res.send("Username already taken.");
// }
// if (req.body.password !== req.body.confirmPassword) {
//   return res.send("Password and Confirm Password must match");
// }
// const user = await User.create(req.body);
// res.send(`Thanks for signing up ${user.username}`);
// });

