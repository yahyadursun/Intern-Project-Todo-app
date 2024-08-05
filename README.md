# TODO Application

![Node.js](https://img.shields.io/badge/Node.js-16.x-green)
![TypeScript](https://shields.io/badge/TypeScript-3178C6?logo=TypeScript&logoColor=FFF&style=flat-square)
![Express.js](https://img.shields.io/badge/Express.js-4.x-blue)
![License](https://img.shields.io/badge/License-MIT-red)

Clean microservices architecture using `Node / Typescript`, `Express.js`, and `Couchbase`. Ideal for those who want to get started with a structured microservice-based TODO application.

## Table of Contents

- [Features](#features)
- [Technologies used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Setup](#setup)
- [Endpoints](#endpoints)
- [Testing With Postman](#testing-with-postman)
- [License](#license)

## Features

- Separate services for authentication and TODO management.
- Secure authentication using JWT.
- Scalable microservices architecture.
- Clean and easy-to-understand code structure.

## Technologies used

- Typescript
- Express.js
- Couchbase
- JWT

## Getting Started

### Prerequisites

- Node.js (16.x)
- Couchbase Server
- Docker & Docker Compose

### Setup

1. Clone the repository.

    ```bash
    git clone https://github.com/your-repo/todo-microservice.git
    ```

2. Install dependencies for each service.

    ```bash
    cd auth-service
    npm install

    cd ../todo-service
    npm install

    cd ../gateway-service
    npm install
    ```

3. Start Couchbase using Docker Compose.

    Create a `docker-compose.yml` file with the following content:

    ```yaml
    version: "3.7"

    services:
      couchbase:
        container_name: couchbase_todo
        image: couchbase:latest
        ports:
          - "8091-8096:8091-8096" # UI ports
          - "11210-11211:11210-11211" # Engine ports
        environment:
          COUCHBASE_ADMINISTRATOR_USERNAME: Administrator
          COUCHBASE_ADMINISTRATOR_PASSWORD: 123456
        volumes:
          - couchbase_data:/opt/couchbase/var
          - couchbase_config:/opt/couchbase/etc

    volumes:
      couchbase_data:
      couchbase_config:
    ```

    Run the following command to start Couchbase:

    ```bash
    docker-compose up -d
    ```
    ```http
    Ensure that you create a collection named **users** under your couchbase scope
    ```



4. Start each service.

    In separate terminals, run the following commands:

    ```bash
    # Start auth service
    cd auth-service
    npm start

    # Start todo service
    cd ../todo-service
    npm start

    # Start gateway service
    cd ../gateway-service
    npm start
    ```


## Endpoints

### Auth Service

Base URL: `http://localhost:3005/auth`

- `POST /auth/signup` - Register a new user
- `POST /auth/signin` - Sign in a user and return access and refresh tokens
- `POST /auth/refreshtoken` - Refresh the access token

### TODO Service

Base URL: `http://localhost:3010/todo`

- `POST /todo` - Create or update a TODO
- `DELETE /todo/:id` - Delete a TODO
- `GET /todo/:id` - Get a specific TODO
- `GET /todo` - Get all TODOs
- `POST /todo/deleted` - Get all deleted TODOs for a user

### Gateway Service

Base URL: `http://localhost:3000`

- Routes requests to the appropriate service based on the URL prefix (`/auth` or `/todo`)

## Testing With Postman

### Request Example
1. Creat a Post request with ```bash http://localhost:3005/auth/signup ```
2. Seletect Body -> raw and JSON
3. Request body example.
    ```http 
    {
        "id":"1",
        "email":"example@gmail.com",
        "password": "examplepassword",
        "name":"examplename",
        "lastname":"examplesurname"
    }
    ```

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
