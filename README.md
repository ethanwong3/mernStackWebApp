# mernStackWebApp

This project is an exploration of developing web apps using the MERN stack. The current implementation and goals of the project are to align with a productivity and self-care web app for users.

In a MERN stack application, the frontend (React) captures user interactions and sends API requests to the backend (Express server). The routes directory maps these API requests to controller functions, which contain the business logic and interact with the database (MongoDB via Mongoose models). The processed response is then returned to the frontend, where it updates the UI accordingly. More specifically:

- User Interaction (Frontend):

The frontend UI captures user actions (e.g., clicking a button, submitting a form, navigating to a new screen).
These actions trigger an API request (HTTP request) to the backend.

- Routing (Backend - routes/):

The Express router in the routes/ directory maps the API request to the appropriate controller function based on the request URL and method (GET, POST, PUT, DELETE).

- Business Logic (Backend - controllers/):

The controller function processes the request, performing necessary operations such as:
Validating input data.
Querying or modifying the MongoDB database using Mongoose models (models/).
Applying business logic.
The controller then returns a response (success or error) to the client.

- Database Access (Backend - models/):

The controller interacts with Mongoose models (models/), which define the database schema and handle CRUD operations (Create, Read, Update, Delete).

- Response (Frontend Updates):

The backend sends a response (JSON data) back to the frontend, which updates the UI accordingly (e.g., displaying fetched data, redirecting the user, showing error messages).

API

API is an application programming interface that is a set of rules and endpoints that allows different software applications to communicate with each other. They typically use HTTP methods, GET POST PUT DELETE which is retrieve send update delete.

---

SetUp:

server => npm install bcrypt cors dotenv express jsonwebtoken mongoose nodemon
client => npm install styled-components @mui/material @mui/lab @mui/icons-material @emotion/st
yled @emotion/react axios react-router-dom react-redux redux-persist @reduxjs/toolkit dayjs @mui/x-charts @mui/x-date-pic
kers

in server/package.json change add "type": "modile", under main ... and add this to scripts: "start": "nodemon index.js",

MongoDB link: https://cloud.mongodb.com/v2/67a9e041a78a566fd4b4acf4#/overview

Use this to generate a good JWT
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

---

Execution:

server && client => npm start

---

Deployment:

render => webservice => login => connect github => access target repo => save => connect => root change to server => change build command to npm install and start command to npm start => paste env content => create!

netlify => create new website => deploy with github => choose sitename => base directory set to client => build command set to npm run build => publish directory set to client/build => environment variable set key to CI and value to false

change api/index.js API to new URL and push

---

Backend, We are using the MVC (Model View Controller) Pattern:

- models: defines the database schema
- controllers: retrieves and processes data from the model, and sends responses to the client (frontend)
- routes: defines REST API routes and calls the corresponding controller function

Status Codes:
200 OK Success Request completed successfully.
201 Created Success New resource (user) was created.
400 Bad Request Client Error Missing/invalid parameters.
401 Unauthorized Client Error User is not authenticated (no token or invalid token).
403 Forbidden Client Error User is authenticated but lacks permissions.
404 Not Found Client Error Resource doesn’t exist.
409 Conflict Client Error User already exists (duplicate email).
500 Internal Server Error Server Error Unexpected error on the backend.

Middleware???
in express.js, middleware is a function that sits between the request and response cycle. It modifys the req object adding a .user from the JWT decoded. It is added before protexted routes to enforce authentication.

---

Frontend:

redux => state management => used to store user slices
