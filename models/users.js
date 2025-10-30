// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt'); // what is this? do I need to npm i this in the terminal? 

// const vendorProfileSchema = new mongoose.Schema({
//   displayName: String,
//   storeName: String,
//   website: String,
// }, { _id: false });

// const userSchema = new mongoose.Schema({
//   email:    { type: String, required: true, unique: true, lowercase: true, trim: true },
//   password: { type: String, required: true, minlength: 8 },
//   role:     { type: String, enum: ['member', 'vendor'], default: 'member', required: true },
//   // what is 'enum' what does it do and why are we including it here? 
//   vendor:   { type: vendorProfileSchema, default: undefined } // only set for vendors
// }, { timestamps: true });
// // what is timestamps: why are is it included here. 

// // I need to better understand how these. Schemas are structured? will the vendorProfileSchema 
// // only populate if user identifies themselves as a vendor? 

// userSchema.pre('save', async function(next){
//   if (!this.isModified('password')) return next();
//   this.password = await bcrypt.hash(this.password, 12);
//   next();
// });


// userSchema.methods.comparePassword = function(plain) {
//   return bcrypt.compare(plain, this.password);
// };

// // not familiar at all with anything in lines 22-31. I need to learn more about this explain to me 
// // how its applied for this project but also how they are applied in isolation so that I can learn 
// // in general about this code. 

// module.exports = mongoose.model('User', userSchema);
