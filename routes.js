const { Router } = require('express');

const UserController = require("./src/user/controller");
const { encryptPassword } = require("./src/user/middleware");

const SessionController = require("./src/session/controller");
const { checkAuthorization } = require("./src/session/middleware");

const routes = Router();

routes.get('/users', checkAuthorization, UserController.getAll);
routes.get('/users/:id', checkAuthorization, UserController.get);
routes.put('/users/:id', checkAuthorization, encryptPassword, UserController.update);
routes.post('/users', encryptPassword, UserController.create);
routes.delete('/users/:id', checkAuthorization, UserController.remove);

routes.post('/auth', SessionController.auth);

module.exports = routes;