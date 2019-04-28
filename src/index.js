require('dotenv').config('../.env');
const createServer = require('./createServer');
const db = require('./db');

const server = createServer();

// TODO use Express middleware for cookies (jwt)
// TODO use express middleware to populate current user

server.start({
  cors: {
    credentials: true,
    origin: process.env.FRONTEND_URL
  },
}, deets => {
  console.log(`server is now running on http://localhost:${deets.port}`)
})
