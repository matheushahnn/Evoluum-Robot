const express = require('express');

const Robot = require('./Robot');

const routes = express.Router();

routes.use(express.json());
routes.post('/rest/mars/:movement', Robot.movementRobot);

module.exports = routes;
