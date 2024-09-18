# invoice-app

This app is for manage the 'sells' of a store, this app have modules for Products, Categories, Users and 'Sells/Invoices'

## Technologies

- NodeJS
- MongoDB
- Docker

## Installation

- Copy `.env.sample` to `.env` and set the variables.
    - Set the `JWT_SECRET` value.
- Run `docker compose up --build`
- Execute seeders `npm run db-seed`. This command should be execute in the server where the app is running, if you are using Docker, you should execute inside the container. i.e `docker exec -it invoice-app sh` and then execute the seeder command.

## Scripts

- `npm run test`, Execute all tests made with `vitest`.
- `npm run dev`, Launch the app for development. It uses nodemon.
- `npm run db-seed`, Create an **admin** user with the password.
- `npm run db-dummy-seed`, Fill the database with dummy data in `users`, `categories` and `products`.