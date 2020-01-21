Backend for button game.

## Dev Environment Setup

### Pre-requisites

* [Docker](https://docs.docker.com/get-docker/)
* [docker-compose](https://docs.docker.com/compose/install/)

```bash
docker-compose up # Start backend and monoDB in development mode
```

## Running Tests

```bash
docker-compose -f docker-compose.test.yml run backend yarn test
```

## Built With

* [NodeJS](https://nodejs.org/en/)
* [Express](https://expressjs.com/)
* [Jest](https://jestjs.io/)
* [mongoose](https://mongoosejs.com/)
* [MongoDB](https://www.mongodb.com/)
* [Docker](https://docs.docker.com/install/)
* [docker-compose](https://docs.docker.com/compose/install/)
