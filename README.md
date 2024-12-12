Apollo GraphQL Server with TypeScript

This project is a robust Apollo GraphQL server implemented in TypeScript. It uses PostgreSQL as the database, managed by MikroORM, and includes essential features like session management, migrations, and more.

Features

Apollo Server: For building a GraphQL API.
MikroORM: For object-relational mapping and database management.
PostgreSQL: As the database.
TypeScript: For robust type checking and cleaner code.
Redis Integration: For session management.
Cloudinary: For handling image uploads.
Requirements

Node.js (16.x or higher)
PostgreSQL
Redis
Installation

Clone the repository:
git clone https://github.com/your-repository/nodets.git  
cd nodets  
Install dependencies:
yarn install  
Create a .env file with your environment variables (e.g., database credentials, Redis connection details).
Scripts

Start the server:
yarn start  
Start in development mode (with ts-node):
yarn dev2  
Watch for TypeScript changes:
yarn watch  
Create a migration:
yarn create:mig  
Directory Structure

src/  
├── entities/          # Entity definitions for MikroORM  
├── resolvers/         # GraphQL resolvers  
├── migrations/        # Database migration files  
├── utils/             # Utility functions  
├── index.ts           # Entry point for the application  
├── mikro-orm.config.ts# MikroORM configuration file  
Key Dependencies

@apollo/server: The core Apollo Server library for GraphQL.
Type-GraphQL: For building a type-safe GraphQL schema.
MikroORM: ORM for managing PostgreSQL database.
Express: Backend framework for handling requests.
Redis & Connect-Redis: For session management.
Configuration

MikroORM Configuration (src/mikro-orm.config.ts):
Ensure your PostgreSQL connection settings are properly set:

export default {  
  entities: ['./dist/entities'],  
  entitiesTs: ['./src/entities'],  
  dbName: 'your-database-name',  
  type: 'postgresql',  
  user: 'your-username',  
  password: 'your-password',  
};  
Session Configuration:
Configured to use Redis for storing sessions with connect-redis.

How to Use

Run Migrations:
yarn create:mig  
Start the Server:
yarn dev2  
Open the GraphQL Playground at http://localhost:4000/graphql.


License

This project is licensed under the MIT License.

Author

Prathamesh2557 - prathamesh2557@gmail.com

Feel free to report issues or suggest features!






