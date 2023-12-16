import User from "../models/User.js";
import bcrypt from "bcryptjs";
import passport from "passport";
import jwt from "jsonwebtoken";
import keys from "../config/key.js";

const register = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      email: req.body.email,
      name: req.body.name,
      password: hashedPassword,
    });
    await user.save();
    res.status(201).json({ message: "User successfully registered" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(400).json({ message: info.message });
    req.login(user, { session: false }, (err) => {
      if (err) return next(err);

      // Once user is authenticated, sign the JWT
      const token = jwt.sign(
        { id: user._id }, // Payload
        keys.secretOrKey, // Secret key
        { expiresIn: "1d" } // Token expiration
      );
      return res.status(200).json({ message: "Logged in successfully", token });
    });
  })(req, res, next);
};

const logout = (req, res) => {
  req.logout((err) => {
    if (err) { return next(err); } // Handle errors if any
    res.status(200).json({ message: "Logged out successfully" });
  });
};

export default {
  register,
  login,
  logout,
};
