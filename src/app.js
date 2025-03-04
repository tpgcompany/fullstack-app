const express = require('express');
const routes = require('./routes/index');
require('./config/dbConfig');

const app = express();
routes(app);


module.exports = app;