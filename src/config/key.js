import dotenv from 'dotenv'

// initializing env variables
try {
  dotenv.config()
} catch (e) {
  console.log('Could not find .env file. Continuing..')
}

const localhost = '127.0.0.1'
const keys = {
  // mongoURI: "mongodb://URL:27017/myproject"
  mongoURI: `${process.env.DATABASE_URL || localhost}`,
  sessionSecret: `${process.env.SESSION_SECRET || sesssionSecret}`,
  secretOrKey: `${process.env.SECRETORKEY || secretOrKey}`,
  port: process.env.PORT,
};

export default keys