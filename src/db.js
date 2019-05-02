// Connects to the remote Prisma DB
// Allows us to query the DB with Javascript (aka use Yoga server)
const { Prisma } = require('prisma-binding');

const db = new Prisma({
  typeDefs: 'src/generated/prisma.graphql', // prisma binding needs the generated graph spec for our DB
  endpoint: process.env.PRISMA_ENDPOINT, // access to the hosted DB
  secret: process.env.PRISMA_SECRET, // auth
  debug: false // flip to on when debugging interactions with the DB
})

module.exports = db;
