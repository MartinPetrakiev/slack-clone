import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import path from 'path';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import sequelize from './models/index';
import cors from 'cors';

const PORT = 8080;


const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true
};
app.use(cors(corsOptions));

const SECRET = 'asdasgsdgasdasd';
const SECRET2 = 'asdasgsdgasdasdasdasdasdasdads';

const typeDefs = mergeTypeDefs(loadFilesSync(path.join(__dirname, './types')));
const resolvers = mergeResolvers(loadFilesSync(path.join(__dirname, './resolvers')));

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const pathUri = '/graphql';
const models = sequelize.models;
const server = new ApolloServer({
  schema, 
  context: {
    models,
    user: {
      id: 1
    },
    SECRET,
    SECRET2
  },
});

server.applyMiddleware({ app, pathUri });

async function assertDatabaseConnectionOk() {
  console.log(`Checking database connection...`);
  try {
    await sequelize.authenticate();
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
  await sequelize.sync();
  console.log("All models were synchronized successfully.");
  app.listen(PORT, () =>
    console.log(`🚀 Server ready at http://localhost:8080${server.graphqlPath}`)
  );
}

init();