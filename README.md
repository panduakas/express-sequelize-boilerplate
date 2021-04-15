# Express-sequelize-boilerplate

## PLEASE COMPLETELY READ THESE INFORMATION FIRST

---

## Main Tech stacks

    * NodeJS as server runner
    * Express as server framework
    * Sequelize as database ORM
    * Redis as server memory store
    * Logstash as logging server (optional)

## Getting Started

Getting up and running is as easy as 1, 2, 3.

1. Make sure you have [NodeJS](https://nodejs.org/), [npm](https://www.npmjs.com/) and [redis](https://redis.io/) installed.
   Required version:

   > "node": ">= 8.10.0"

2. Install your dependencies

   > cd path/to/app; npm install

3. Configure things

   **`Create .env file in root directory of the project`**

   Copy .env.example file to new file named as .env then setup variable value following your machine.

4. Start your app

   > npm run start-dev

5. Unit Test

   > npm run test

6. Swagger Docs

   > `localhost:3000/docs`
   > username: `dev`
   > password: `supersecretpassword`

7. Docker

   > docker-compose build

   **then**

   > docker-compose up

## If you are not using logstash

Comments logstash transports code, please check this file:

> app/helpers/logger.js

## License

This code is made wholeheartedly and contains the art of writing code.

Copyright (c) 2020 panduakas
