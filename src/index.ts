import express from 'express'; 
require('dotenv').config();  
import { SESSION_SECRET } from './constants'; 
import { ApolloServer } from '@apollo/server'; 
import { expressMiddleware } from '@apollo/server/express4';
import bodyParser from 'body-parser';   
import 'reflect-metadata'; 
import { MikroORM } from '@mikro-orm/postgresql';
import mikroConfig from './mikro-orm.config';
import { buildSchema } from 'type-graphql';  
import { UserResolver } from './resolvers/user'; 
import session from 'express-session'; 
import Redis from 'ioredis'; 
const connectRedis = require('connect-redis');

async function main() {
  const orm = await MikroORM.init(mikroConfig);
  await orm.getMigrator().up();

  const app = express();
  
  const redis = new Redis();

  const RedisStore = new connectRedis(session);

  app.use(
    session({
      store: new RedisStore({
        client: redis, 
        prefix: 'sess:',
        ttl: 86400, 
        disableTouch: true,
      }),
      name: process.env.COOKIE_NAME,
      secret: SESSION_SECRET, 
      resave: false, 
      saveUninitialized: false, 
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, 
        httpOnly: true, 
        secure: false, 
        sameSite: 'lax',
      },
    })
  );

  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver,],
      validate: false,
    }),
  });

  await server.start();

  app.use(
    '/graphql',
    bodyParser.json(),
    expressMiddleware(server, {
      context: async ({ req, res }) => ({ em: orm.em, req, res }),
    })
  );

  app.listen(process.env.PORT, () => {
    console.log('Server is running');
  });
}

main().catch((err) => {
  console.error(err);
});
