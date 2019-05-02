const { GraphQLServer } = require('graphql-yoga'); // import the GraphQl server itself
const Mutation = require('./resolvers/Mutations.js');
const Query = require('./resolvers/Query.js');
const db = require('./db');

function createServer() {
  return new GraphQLServer({
    // a typeDef for the yoga server, pertains to the resolvers, Query and Mutation
    // client facing types queries and mutations (what Apollo client will be calling in other words)
    typeDefs: 'src/schema.graphql',
    // server requires resolvers
    resolvers: {
      Mutation,
      Query
    },
    // this property is just to turn off some console warnings
    resolverValidationOptions: {
      requireResolversForResolveType: false
    },
    // context property allows us to pass along some context, in this case we pass along the database to our request object
    context: req => ({ ...req, db })
  });
}

module.exports = createServer;
