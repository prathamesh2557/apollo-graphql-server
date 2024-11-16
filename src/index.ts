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
import { HelloResolver } from './resolvers/hello';
import { PostResolver } from './resolvers/post';
import { UserResolver } from './resolvers/user';
import session from 'express-session';
import Redis from 'ioredis';
const cors = require("cors");
const connectRedis = require('connect-redis');
import { v2 as cloudinary } from 'cloudinary';
import { ImageResolver } from './resolvers/image';
import { ImageLikeResolver } from './resolvers/imagelikes';

async function main() {
  const orm = await MikroORM.init(mikroConfig);
  await orm.getMigrator().up();

  const app = express();
  
  const redis = new Redis();

  const RedisStore = new connectRedis(session);

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME ,
    api_key: process.env.CLOUDINARY_API_KEY ,
    api_secret: process.env.CLOUDINARY_API_SECRET ,
  });

  app.use(
    cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true, 
  }));

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
      resolvers: [HelloResolver, UserResolver, PostResolver, ImageLikeResolver ,ImageResolver],
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
