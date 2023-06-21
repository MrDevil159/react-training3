const passport = require('passport');
const passportJWT = require('passport-jwt');
const User = require('../models/user');
const secretKey = '9ab45ebced37176ce2f1ad385f235dd3e4e6c537fde2bf67d3b5404d7ad622ed24efb464b650041c0c4cbc57814f250e6864842cc92ed332d84634825e9199f9'; // Replace with your own secret key

const ExtractJWT = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

const jwtOptions = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: secretKey,
};

const jwtStrategy = new JwtStrategy(jwtOptions, async (payload, done) => {
  try {
    const user = await User.findById(payload._id);
    if (user) {
      return done(null, user);
    }
    return done(null, false);
  } catch (error) {
    return done(error, false);
  }
});

passport.use(jwtStrategy);
