const express = require("express");
const userController = require("./src/userController");
const authController = require("./src/authController");
const passwordMiddleware = require('./src/passwordMiddleware');
const authMiddleware = require('./src/authMiddleware');
const server = express();

server.use(express.json());

server.get('/users', authMiddleware, userController.getAll);
server.get('/users/:id', authMiddleware, userController.get);
server.put('/users/:id', passwordMiddleware, userController.update);
server.post('/users', passwordMiddleware, userController.create);
server.delete('/users/:id', userController.remove);

server.post('/auth', authController.auth);

server.listen(8081);