Visit club.danfo.store to view the live project

# Set up the project

## Clone this repo

### Set up the client

`cd client && yarn install`

Create a file named next.config.js and fill the following

```
module.exports = {
  env: {
    BASE_URL: 'http://your-api-base-url',
  },
};
```

Create a build `yarn build`

Start the client `yarn start`

### Set up the api

`cd api && yarn install`

Create a .env file and fill the following

```
PORT = your preferred port
NODE_ENV=development
AUTH_SECRET_KEY = any-string-will-do
```

Edit config.json in api/config with your database connection information then
run

`yarn start`
