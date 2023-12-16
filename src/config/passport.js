import passportJwt from "passport-jwt";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from 'bcryptjs';
import User from "../models/User.js";
import keys from "../config/key.js";

const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

export default (passport) => {
  passport
    .use(
      new JwtStrategy(opts, (jwt_payload, done) => {
        User.findById(jwt_payload.id)
          .then((user) => {
            if (user) {
              return done(null, user);
            }
            return done(null, false);
          })
          .catch((err) => console.log(err));
      })
    )
    .use(
      new LocalStrategy({ usernameField: "email" }, async function (
        email,
        password,
        done
      ) {
        console.log({ email, password });
        try {
          const user = await User.findOne({ email: email });
          if (!user) {
            return done(null, false, { message: "Incorrect email." });
          }

          // Assuming `bcrypt` is imported correctly and passwords are hashed.
          const isMatch = await bcrypt.compare(password, user.password);
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: "Incorrect password." });
          }
        } catch (err) {
          done(err);
        }
      })
    );

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
};
