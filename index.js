import express from 'express';
import { PORT, SECRET, SECRET2 } from './config';
import { ApolloServer } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import path from 'path';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import sequelize from './models/index';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import { refreshTokens } from './auth';
import { createServer } from 'http';

const app = express();

//CORS
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true
};
app.use(cors(corsOptions));

//Auth middleware set headers
const addUser = async (req, res, next) => {
  const token = req.headers['x-token'];
  if (token) {
    try {
      const { user } = jwt.verify(token, SECRET);
      req.user = user;
    } catch (err) {
      const refreshToken = req.headers['x-refresh-token'];
      const newTokens = await refreshTokens(token, refreshToken, models, SECRET, SECRET2);
      if (newTokens.token && newTokens.refreshToken) {
        res.set('Access-Control-Expose-Headers', 'x-token, x-refresh-token');
        res.set('x-token', newTokens.token);
        res.set('x-refresh-token', newTokens.refreshToken);
      }
      req.user = newTokens.user;
    }
  }
  next();
};

app.use(addUser);

//Schemas
const typeDefs = mergeTypeDefs(loadFilesSync(path.join(__dirname, './types')));
const resolvers = mergeResolvers(loadFilesSync(path.join(__dirname, './resolvers')));

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});


//server
const pathUri = '/graphql';
const models = sequelize.models;
const server = new ApolloServer({
  schema,
  subscriptions: {
    path: '/subscriptions'
  },
  context: ({ req, connection }) => ({
    models,
    user: connection ? connection.context : req.user,
    SECRET,
    SECRET2
  }),
});

server.applyMiddleware({ app, pathUri });

const httpServer = createServer(app);
server.installSubscriptionHandlers(httpServer);

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
  httpServer.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
    console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`);
  });
}

init();