<h1 align="left">Hey 👋 What's up?</h1>

###

<p align="left">My name is Eyal and I'm a backend developer, with experience in the following technologies: AWS, Node.js, TypeScript, Docker & Kubernetes and MongoDB. I'm currently developing a web app to post and manage tenders of urban renewal. I'd love to connect with you on my LinkedIn profile.</p>

<div align="left">
  <a href="https://www.linkedin.com/in/eyal-moskowitz-85510a327/" target="_blank">
    <img src="https://raw.githubusercontent.com/maurodesouza/profile-readme-generator/master/src/assets/icons/social/linkedin/default.svg" height="30" alt="linkedin logo"  />
  </a>
</div>

###

# ProjeX Backend

ProjeX Backend is a monorepo for all of ProjeX backend services, built in a microservices architecture. ProjeX, a system designed to handle tenders in the context of urban renewal, from creating a tender, preparing an offer and choosing the best one for the residents. Each service is built using Node.js, Express.js and TypeScript, with MongoDB as a primary data store.

## Table of Contents

- [Features](#features)
- [Architecture Overview](#architecture-overview)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
- [Development Workflow](#development-workflow)
- [API Endpoints](#api-endpoints)
- [Data Models](#data-models)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Authentication & Authorization**: Secure login/logout using AWS Cognito and JWT-based access tokens.
- **Project Management**: Create, update, and manage projects and their associated tasks.
- **Task Handling**: Add tasks, assign them to team members, and track progress.
- **User Profiles**: Manage user details, roles, and permissions.
- **Scalable & Extensible**: Built with a modular structure for easy addition of new features and routes.

## Architecture Overview

The backend is structured into well-defined modules and layers:

- **Routes**: Defines HTTP endpoints for various resources (e.g., `/auth`, `/projects`, `/tasks`, `/users`).
- **Handlers**: Handles request logic, input validation, and responses.
- **Models**: Defines the MongoDB/Mongoose schemas and data models.
- **Middlewares**: Includes authentication checks, error handling, and other request/response transformations.
- **Services (if applicable)**: Encapsulates business logic and interactions with the database.
- **Database**: Uses MongoDB, interfaced through Mongoose, for data persistence.

## Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (with Mongoose for schema definitions and queries)
- **Authentication**: AWS Cognito
- **Environment Management**: dotenv

###

<div align="left">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" height="40" alt="typescript logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" height="40" alt="nodejs logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg" height="40" alt="jest logo"  />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-line-wordmark.svg" height="40" alt="amazonwebservices logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg" height="40" alt="kubernetes logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-plain-wordmark.svg" height="40" alt="docker logo"  />
</div>

###

## Getting Started

### Prerequisites

- **Node.js** (v14+ recommended)
- **npm** (v6+ recommended)
- **MongoDB** running locally or accessible via a URI.

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/erm19/ProjeX-Backend.git
   cd ProjeX-Backend
   ```

2. **Switch to the dev branch** (for the latest development code):

   ```bash
   git checkout dev
   ```

3. **Install dependencies**:

   ```bash
   npm i
   ```

### Configuration

For each service create a `.env` file in it's root:

- **api-gateway-service**:

  ```env
  AUTH_ADDRESS=localhost:3001
  ENT_TENDER_ADDRESS=localhost:3002
  ENT_OFFERS_ADDRESS=localhost:3003
  ```

- **authentication-service**:

  ```env
  AWS_USER_POOL_ID={pool_id}
  AWS_COGNITO_REGION={region}
  AWS_APP_CLIENT_ID={client_id}
  COGNITO_CLIENT_SECRET={client_secret}
  MONGODB_USER=user
  MONGODB_PASSWORD=password
  ```

- **ent-tenders-service**:

  ```env
  MONGODB_USER=user
  MONGODB_PASSWORD=password
  ```

- **ent-offers-service**:

  ```env
  MONGODB_USER=user
  MONGODB_PASSWORD=password
  ```

## Development Workflow

`TEMPORARY` **Run Each Service in Development Mode** (with automatic restarts on file changes):

```bash
npm run dev
```

Each service should be accessible at its designated port.

**Build and Run in Production Mode**:
`WIP`

## API Endpoints

Key endpoints include (authentication via `Authorization: Bearer <token>` is typically required):

- **Auth**:

  - `POST /signup`
  - `POST /login`
  - `POST /refresh`
  - `POST /verify`
  - `GET /logout`

- **Entrepreneurs Tenders**:

  - `GET /list`
  - `GET /tender/:tenderId`
  - `GET /my-tenders`
  - `POST /tender`

- **Entreprenerus Offers**:
  - `GET /my-offers`
  - `GET /:tenderId`
  - `POST /:tenderId/offer`

Refer to the `routes` directory in `api-gateway-service` and `handlers` for detailed request/response structures and optional query parameters.

## Data Models

Each service holds the data and models it needs.

- **Auth Service**:

  - **User Model** _(user.ts)_: Defines fields like `email`, `role`, `licenseNum`, `companyName`, `companyNum`.

- **Entrepreneurs Tenders Service**:

  - **User Model** _(user.ts)_: Defines fields like `email`, `tenders` (array of tender references).
  - **Tender Model** _(tender.ts)_: Defines fields like `title` which is the project's title, `creator` (a User ref), `type`, `endDate` and other tender metadata.

- **Entrepreneurs Offers Service**:
  - **User Model** _(user.ts)_: Defines fields like `email`, `offers` (array of offer references).
  - **Offer Model** _(offer.ts)_: Defines fields like `tenderId` (ref to Tender), `creator` (ref to User), `questionnaire` which holds the answers of the tender's questionnaire.

## Testing

`TODO`

## Contributing

1. Fork the repository.
2. Create a new feature branch from `dev`.
3. Make changes and add or update tests as needed.
4. Open a Pull Request against the `dev` branch, describing the changes made and referencing any related issues.

## License

This project is licensed under the [MIT License](https://mit-license.org/). By contributing or using this code, you agree to the terms of this license.

<h1 align="left">Hey 👋 What's up?</h1>

###

<p align="left">My name is ... and I'm a ..., from ....</p>

###

<h2 align="left">About me</h2>

###

<p align="left">✨ Creating bugs since ...<br>📚 I'm currently learning ...<br>🎯 Goals: ...<br>🎲 Fun fact: ...</p>

###
