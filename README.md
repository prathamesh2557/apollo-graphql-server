# Node-Apollo-Graphql server

this project is just demo for other project(repo will be commited soon)
Mainly TS is used.

# Dependencies
Used Mikro-ORM & Apollo,GraphQL.

# About dist dir
at terminal "yarn watch" it will make dist folder,
to run "yarn dev/start" NOTE WITHOUT dist folder yarn can't dev/start so make sure you specified correct dir.

# Commands

inside package.json
    "start": "ts-node src/index.ts", <br>
    "watch": "tsc -w", <br>
    "dev": "nodemon dist/index.js",<br>
    "start2": "ts-node src/index.ts",<br>
    "dev2": "nodemon --exec ts-node src/index.ts" <br>
 Use yarn to use the following commands and to install dependencies.
