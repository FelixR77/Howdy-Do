const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/users');

module.exports = function(passport){
  passport.use(new LocalStrategy(
    { usernameField: 'email' }, // we'll log in with email
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (!user) return done(null, false, { message: 'Invalid credentials' });
        const ok = await user.comparePassword(password);
        if (!ok) return done(null, false, { message: 'Invalid credentials' });
        return done(null, user);
      } catch (e) {
        return done(e);
      }
    }
  ));

  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id, done) => {
    try { done(null, await User.findById(id)); }
    catch (e) { done(e); }
  });
};
