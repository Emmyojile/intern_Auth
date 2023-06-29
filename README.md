# Assignment
This is an internship assignment project for implementing a login flow using Node.js, Express and MongoDB.

## Table of Contents
- Description
- Features
- Tech Stack
- Installation


## Description
This project aims to provide a basic authentication system by implementing a user registration and login flow. User information is stored in a MongoDB database, and the application is built using Node.js and Express framework. EJS is also used as the template engine for rendering views.


## Features
- User registration with password hashing
- User login with authentication using JSON Web Tokens (JWT)
- User Dashboard 
- EJS templates for server-side 
- MongoDB database for data storage


## Tech Stack
The project is built using the following technologies:

- Node.js - A JavaScript runtime built on Chrome's V8 JavaScript engine.
- Express - A fast and minimalist web framework for Node.js.
- MongoDB - A document-based NoSQL database.
- EJS - A template engine for server-side rendering in Node.js.

## Installation
- Clone the repository to your local machine:
  - `git clone https://github.com/your-username/assignment.git`

- Navigate to the project directory:
  - `cd assignment`

- Install the dependencies using npm:
  - `npm install`

- Create a .env file in the root directory of the project and provide the required environment variables. Here's an example of the variables needed:
   - `PORT=3000`
   - `MONGODB_URI=mongodb://localhost:27017/assignment`
   - `JWT_SECRET=your-secret-key`

- Start the server:
   - `npm run dev`

