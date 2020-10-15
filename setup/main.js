const express = require('express');
const morgan = require('morgan');
require('dotenv').config();

require('./database');

const app = express();

app.use(morgan('dev'));
app.use(express.json());

module.exports = app;
