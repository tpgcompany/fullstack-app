const express = require('express');
const cors = require('cors');

const user = require('./UserRoutes');

const routes = (app) => {
  app.use(express.json());
  app.use(cors());

  app.use('/u', user);
}

module.exports = routes;