# Build-A-Storefront-Backend
Udacity's 2nd Project for Full Stack JavaScript Developer.

## Project Overview

Storefront Backend is a RESTful API that allows users to perform CRUD operations on a database of products. The API is built using Node.js, Express, and postgresql. The API is tested using Jasmine and Supertest.

### Port for database

```

port : 5432

```

## .env file to store environment variables

```
POSTGRES_HOST=127.0.0.1
POSTGRES_DB=store_database
POSTGRES_DB_TEST=store_database_test
POSTGRES_USER=store_user
POSTGRES_USER_TEST=store_user_test
POSTGRES_PASSWORD=password123
POSTGRES_PORT=5432
BCRYPT_PASSWORD=bcrypt_password
SALT_ROUNDS=10
TOKEN_SECRET=abdiis!
ENV=dev

```
## To get started

### Create database and database user 
```
 create database store_database;
 create user store_user with encrypted password 'password123';
```
### Grant user 
```

grant all privileges on database store_database to store_user;

```
### Create database and database user  for test
```
 create database store_database_test;
 create user store_user_test with encrypted password 'password123';
```
### Grant user on database for test
```

grant all privileges on database store_database_test to store_user_test;

```
### to start the database maigration
```
db-migrate up
```

### to drop the database maigration
```
db-migrate down
```


## Scripts to run the application

```
npm run watch 

```
## To Run the test
```
npm run test
npm run test-docker
```
## Scripts to install packages

### Development
```

    npm install bcrypt
    npm install body-parser
    npm install db-migrate
    npm install db-migrate-pg
    npm install dotenv
    npm install express
    npm install jsonwebtoken
    npm install pg
  
```

### Dev 

```
    npm i @types/bcrypt --save-dev
    npm i @types/express --save-dev
    npm i @types/jasmine --save-dev
    npm i @types/jsonwebtoken --save-dev
    npm i @types/pg --save-dev --save-dev
    npm i @typescript-eslint/eslint-plugin --save-dev
    npm i cross-env --save-dev
    npm i eslint --save-dev
    npm i eslint-config-prettier --save-dev
    npm i eslint-plugin-prettier --save-dev
    npm i eslint-plugin-react --save-dev
   npm i  jasmine --save-dev
    npm i jasmine-spec-reporter --save-dev
    npm i jasmine-ts --save-dev
    npm i supertest --save-dev
    npm i ts-node --save-dev
    npm i ts-watch --save-dev
    npm i typescript --save-dev
   ```

## Author

- [Abdi Aabder]


