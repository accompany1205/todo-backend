// Using ESM syntax for environment variables
import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import passport from 'passport';
import cors from 'cors';
import indexRouter from './routes/index.js';
import passportConfig from './config/passport.js';
import keys from './config/key.js';

// Database Connection
const DATABASE_URL = keys.mongoURI;
mongoose
  .connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected…'))
  .catch((err) => console.error(err));

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: keys.sessionSecret }));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());

// Use routers
app.use('/', indexRouter);

// Passport config
passportConfig(passport);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});