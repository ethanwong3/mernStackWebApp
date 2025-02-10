# mernStackWebApp

This project is an exploration of developing web apps using the MERN stack. The current implementation and goals of the project are to align with a productivity and self-care web app for users.
.
.
.
.
.
SetUp:

server => npm install bcrypt cors dotenv express jsonwebtoken mongoose nodemon
client => npm install styled-components @mui/material @mui/lab @mui/icons-material @emotion/st
yled @emotion/react axios react-router-dom react-redux redux-persist @reduxjs/toolkit dayjs @mui/x-charts @mui/x-date-pic
kers

in server/package.json change add "type": "modile", under main ... and add this to scripts: "start": "nodemon index.js",

MongoDB link: https://cloud.mongodb.com/v2/67a9e041a78a566fd4b4acf4#/overview

Use this to generate a good JWT
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

.
.
.
.
.
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
