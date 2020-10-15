const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
require('dotenv').config();

require('./database');

const authAPI = require('../api/auth');

const app = express();

app.use(bodyParser.json());
app.use(morgan('dev'));

app.use('/auth', authAPI);

app.use((req, res) => {
  res.status(404).end();
});

module.exports = app;
