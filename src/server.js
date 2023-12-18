// Using ESM syntax for environment variables
import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import passport from "passport";
import cors from "cors";
import https from "https";
import fs from 'fs';
import path from 'path';
import indexRouter from "./routes/index.js";
import passportConfig from "./config/passport.js";
import keys from "./config/key.js";

// Database Connection
const DATABASE_URL = keys.mongoURI;
const __dirname = path.dirname(new URL(import.meta.url).pathname);

mongoose
  .connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected…"))
  .catch((err) => console.error(err));
const SSL_CERT_PATH = path.resolve(__dirname, '../server.crt');
console.log(SSL_CERT_PATH);
const SSL_KEY_PATH = path.resolve(__dirname, '../server.key');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: keys.sessionSecret }));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());

// Use routers
app.use("/", indexRouter);

// Passport config
passportConfig(passport);

// Start server
const PORT = process.env.PORT || 8000;
const httpsOptions = {
  key: fs.readFileSync(SSL_KEY_PATH),
  cert: fs.readFileSync(SSL_CERT_PATH),
};
https.createServer(httpsOptions, app).listen(PORT, () => {
  console.log(`HTTPS server running on port ${PORT}`);
});
