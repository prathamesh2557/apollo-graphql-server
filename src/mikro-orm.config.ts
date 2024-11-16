import { Image } from './entities/Image';
import { Post } from './entities/Post';
import { __prod__ } from './constants';
import { defineConfig, UnderscoreNamingStrategy } from '@mikro-orm/postgresql'; 
import path from 'path';
import { User } from './entities/User';
import { ImageLike } from './entities/ImagesLikes';

export default defineConfig({
  migrations: {
    path: path.join(__dirname, './migrations'),
    glob: '!(*.d).{js,ts}',  
  },
  entities: [Post,User,ImageLike,Image],
  dbName: 'nodegqlts',
  allowGlobalContext: true,
  namingStrategy: UnderscoreNamingStrategy,
  debug: !__prod__,
}as Parameters<typeof defineConfig>[0]);
