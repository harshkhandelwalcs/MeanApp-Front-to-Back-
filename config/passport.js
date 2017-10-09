const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require("../models/user");
const config = require("../config/database");


module.exports = function (passport) {
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt') 
    opts.secretOrKey = config.secret;
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        User.findOne({ _id: jwt_payload.data._id}, (err, user) => {
            if (err) {
                return done(err, false);
            }
            if (user) {
                
                done(null, user);
            } else {
                done(null, false);

            }
        });
    }));
}

