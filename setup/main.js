const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

require('./database');

const apiList = require('../api');

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));

app.use('/auth', apiList.auth);
app.use('/api/u', apiList.user);

app.use((req, res) => {
  res.status(404).end();
});

module.exports = app;
