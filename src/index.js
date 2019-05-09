// application entry point, require env vars
// this file starts the yoga Server and configures middleware
require('dotenv').config('../.env');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const createServer = require('./createServer');
const db = require('./db');

const server = createServer();

server.express.use(cookieParser())
// TODO use express middleware to populate current user
server.express.use((req, res, next) => {
  console.log(`Hey I am a middleware`)
  const { token } = req.cookies
  if (token) {
    console.log('yes token')
    const { userid } = jwt.verify(token, process.env.APP_SECRET)
    console.log(`userid: ${userid}`)
    req.userid = userid
  }
  console.log(`token: ${token}`)
  next()
})

console.log(`Allowing connections from ${process.env.FRONTEND_URL}`)
server.start({
  cors: {
    credentials: true,
    origin: process.env.FRONTEND_URL // locks down the end point to our front end url
  },
}, deets => {
  console.log(`Yoga server is now running on http://localhost:${deets.port} 🧘`)
})
