# Budget Application

This application is separated in two side, client and server.

## Server

### `cd server`

Move to server directory

### `npm install`

Installing all of modules

### `npx sequelize-cli db:create`

Create postgreSQL database with named _test-mc-payment_\
Note: Before run this command, make sure you already change your username and password postgreSQL database in server/config/config.json first

### `npx sequelize-cli db:migrate`

Create all tables

### `touch .env`

Create .env file and fill JWT_SECRET environment variable with any string

### `npx nodemon app`

Running the server in localhost port 3000

## Client

### `cd client`

Move to client directory

### `touch .env`

Create .env file and fill REACT_APP_BASE_URL environment variable with http://localhost:3000

### `npm start`

Start React app in localhost port 3001

## Deployment

server: https://budget-application-api.herokuapp.com \
client: https://my-budget-application.web.app \
Dummy account:\
username: acit / email: acit@mail.com
password: 12345678
