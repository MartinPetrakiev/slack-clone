import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';

import typeDefs from './schema';
import resolvers from './resolvers';
import sequelize from './models/index';
import models from './models';

const PORT = 8080;

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const app = express();
const path = '/graphql';

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app, path });

async function assertDatabaseConnectionOk() {
  console.log(`Checking database connection...`);
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
    console.log('Database connection OK!');
  } catch (error) {
    console.log('Unable to connect to the database:');
    console.log(error.message);
    process.exit(1);
  }
}

async function init() {
  await assertDatabaseConnectionOk();
  console.log(`Starting Sequelize + Express example on port ${PORT}...`);
  console.log("All models were synchronized successfully.");
  app.listen(PORT, () =>
    console.log(`🚀 Server ready at http://localhost:8080${server.graphqlPath}`)
  );
}

init();