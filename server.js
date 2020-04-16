const express = require("express");
const { PORT } = require("./config");
const Routes = require("./routes");
const server = express();

server.use(express.json());

server.use(Routes);

server.listen(PORT);