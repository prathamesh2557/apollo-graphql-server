Apollo GraphQL Server with TypeScript

A robust Apollo GraphQL server built with TypeScript, PostgreSQL, and MikroORM.
This project includes essential backend features such as session management with Redis, database migrations, and a clean, scalable project structure.

Features

Apollo Server – Build and serve a GraphQL API

TypeScript – Strong typing for safer and cleaner code

MikroORM – ORM for PostgreSQL with migrations support

PostgreSQL – Relational database

Redis – Session storage

Express – HTTP server integration

TypeGraphQL – Type-safe GraphQL schema and resolvers

Tech Stack

Node.js

Apollo Server

TypeScript

PostgreSQL

MikroORM

Redis

Express

Requirements

Make sure you have the following installed:

Node.js (v16.x or higher)

PostgreSQL

Redis

Installation
1. Clone the repository
git clone https://github.com/prathamesh2557/nodets.git
cd nodets

2. Install dependencies
yarn install

3. Environment variables

Create a .env file in the root directory and add your configuration:

DB_NAME=your_database_name
DB_USER=your_username
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432

REDIS_URL=redis://localhost:6379
SESSION_SECRET=your_secret_key

Available Scripts
Command	Description
yarn start	Start the production server
yarn dev2	Start the server in development mode (ts-node)
yarn watch	Watch and recompile TypeScript files
yarn create:mig	Create a new database migration
Project Structure
src/
├── entities/            # MikroORM entity definitions
├── resolvers/           # GraphQL resolvers
├── migrations/          # Database migration files
├── utils/               # Utility/helper functions
├── index.ts             # Application entry point
├── mikro-orm.config.ts  # MikroORM configuration

Configuration
MikroORM (src/mikro-orm.config.ts)

Make sure your PostgreSQL credentials are correctly set:

export default {
  entities: ['./dist/entities'],
  entitiesTs: ['./src/entities'],
  dbName: 'your-database-name',
  type: 'postgresql',
  user: 'your-username',
  password: 'your-password',
};

Session Management

Sessions are stored in Redis

Implemented using connect-redis

Automatically persists login state across requests

How to Use
Run database migrations
yarn create:mig

Start the development server
yarn dev2

Open GraphQL Playground

Visit:

http://localhost:4000/graphql

License

This project is licensed under the MIT License.

Author

Prathamesh2557
Email: prathamesh2557@gmail.com

GitHub: https://github.com/prathamesh2557

Feel free to open issues or suggest new features
