Frontend for button game.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.

### `yarn test`

Run tests for components.

### `yarn build`

Builds the app for production.

### `yarn cypress open`

Starts cypress for e2e tests. To run e2e tests make sure that you have the frontend and backend running.

## Dev environment setup

##### Pre-requisites
* [NodeJS](https://nodejs.org/en/)
* [yarn](https://yarnpkg.com/en/docs/install#debian-stable)

```bash
git clone https://github.com/LVK-96/Vincit-assignment-2020 && cd Vincit-assignment-2020
cd frontend && yarn install
yarn start # serve frontend
# OR
yarn start:e2e # requires a local backend
```

## Running tests

```bash
yarn test # integration tests
# Refer to the README in the repo root for e2e tests
```

## Built With
* [React](https://reactjs.org/)
* [Jest](https://jestjs.io/docs/en/tutorial-react) - integration tests
* [Cypress](https://www.cypress.io/) - e2e tests
