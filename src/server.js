const express = require('express');
const routes = require('./routes');
const { handleError } = require('../helpers/error');

const app = express();

app.use(express.json());
app.use(routes);

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  handleError(err, res);
});

app.listen(8080);
