import { __prod__ } from './constants';
import { defineConfig, UnderscoreNamingStrategy } from '@mikro-orm/postgresql'; 
import path from 'path';
import { User } from './entities/User';

export default defineConfig({
  migrations: {
    path: path.join(__dirname, './migrations'),
    glob: '!(*.d).{js,ts}',  
  },
  entities: [User,],
  dbName: 'dbname',
  allowGlobalContext: true,
  namingStrategy: UnderscoreNamingStrategy,
  debug: !__prod__,
}as Parameters<typeof defineConfig>[0]);
