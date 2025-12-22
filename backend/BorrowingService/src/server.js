const ApolloServer = require("@apollo/server").ApolloServer;
const fs = require("fs");
const path = require("path");

const typeDefs = `
    ${fs.readFileSync(
        path.join(__dirname, "./schema/queries.graphql"), 
        "utf8"
    )}
    ${fs.readFileSync(
      path.join(__dirname, "./schema/mutations.graphql"),
      "utf8"
    )}
    ${fs.readFileSync(
      path.join(__dirname, "./schema/typeDef.graphql"),
      "utf8"
    )}
`;

const resolvers = require("./schema/resolvers.js");
const prisma = require("./prisma");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    // Extract user context from API Gateway headers
    const user = req?.headers ? {
      userId: req.headers['x-user-id'],
      email: req.headers['x-user-email'],
      role: req.headers['x-user-role'],
    } : null;
    
    return { prisma, user };
  },
});

module.exports = server;
