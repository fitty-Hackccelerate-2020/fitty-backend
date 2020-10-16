const express = require('express');
const logger = require('./logger');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

require('./database');

const helpers = require('../helpers');
const apiList = require('../api');

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  logger.error(err);
  res
    .status(500)
    .json(
      helpers.responseWrapper.errorResponse(
        helpers.responseErrors.INTERNAL_ERROR_OCCURED
      )
    );
});

app.use('/auth', apiList.auth);
app.use('/api/u', apiList.user);
app.use('/api/t', apiList.tasks);

app.use((req, res) => {
  res.status(404).end();
});

module.exports = app;
