# Varfit-backend

This is the backend service for managing workout progress and weight tracking. The backend is built using Node.js and Express, with MongoDB as the database.


## Features

- Track and update user workout progress.
- Store and retrieve weight data for users.
- Provide API endpoints to interact with user data.


## Technologies Used

- Node.js. JavaScript runtime environment.
- Express. Web framework for Node.js.
- MongoDB. NoSQL database for storing user data.
- Mongoose. ODM (Object Data Modeling) library for MongoDB and Node.js.
- dotenv. Loads environment variables from a .env file.
- Cors. Middleware for enabling Cross-Origin Resource Sharing (CORS).


## Pre-requisites

- Node.js
- MongoDB
- Postman or any other API testing tool


## Installation

1. Clone repository:
```bash
git clone https://github.com/Varos1009/Varfit-backend.git
cd Varfit-backend
```
2. Install dependencies:
```
npm install
```
3. Setup environment variables:
Create a .env file in the root of the project and add the following variables:
```
MONGODB_URI=mongodb://localhost:27017/workout-progress
PORT=5000
```
Replace the MONGODB_URI with your MongoDB connection string.

4. Start the server:
```
node server.js
```
The server will run on http://localhost:5000.


## License

This project is licensed under the MIT License - see the LICENSE file for details.



