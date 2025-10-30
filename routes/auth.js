// const router = require('express').Router();
// const passport = require('passport');
// const User = require('../models/users');

// // --- Signup (form) ---
// router.get('/signup', (req, res) => {
//   res.render('auth/signup');
// });

// // --- Signup (submit) ---
// router.post('/signup', async (req, res, next) => {
//   try {
//     const { email, password, role, displayName, storeName, website } = req.body;

//     const doc = {
//       email,
//       password,        // hashed by userSchema.pre('save')
//       role: role === 'vendor' ? 'vendor' : 'member',
//       vendor: role === 'vendor' ? { displayName, storeName, website } : undefined
//     };

//     const user = await User.create(doc);

//     // Auto-login right after signup
//     req.login(user, (err) => {
//       if (err) return next(err);
//       // Send vendors to add products; members to home/products
//       return res.redirect(user.role === 'vendor' ? '/new-product' : '/products');
//     });
//   } catch (e) {
//     next(e);
//   }
// });

// // --- Login (form) ---
// router.get('/login', (req, res) => {
//   res.render('auth/login');
// });

// // --- Login (submit) ---
// router.post('/login',
//   passport.authenticate('local', { failureRedirect: '/login' }),
//   (req, res) => res.redirect('/products')
// );

// // --- Logout ---
// router.post('/logout', (req, res, next) => {
//   req.logout(err => {
//     if (err) return next(err);
//     res.redirect('/');
//   });
// });

// module.exports = router;
