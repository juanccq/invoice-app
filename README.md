# Invoice App

This app is for manage the 'sells' of a store, this app have modules for Products, Categories, Users and 'Sells/Invoices'

## Technologies

- NodeJS
- MongoDB
- Docker

## Requirements

- NodeJs 20.17.x
- NPM 10.8.x

## Installation

- Copy `.env.sample` to `.env` and set the variables.
    - Set the `JWT_SECRET` value.
- To run the application in Docker:
    - By default the `compose.yml` file is set to run on `development` mode. 
    - Run `docker compose up --build`

## Scripts

- `npm run test` Execute all tests made with `vitest`.
- `npm run dev` Launch the app for development. It uses nodemon.
- `npm run db-seed` Create an **admin** user with the password.
- `npm run db-dummy-seed` Fill the database with dummy data in `users`, `categories` and `products`.

* If the app is running inside a Docker container, the scripts should be executed in the container shell. Use this command `docker exec -it invoice-app sh` *

## Docker for Production

To run docker in 'Production' mode, change the `dockerfile` value to **Dockerfile** in the `compose.yaml` file (Line 6)