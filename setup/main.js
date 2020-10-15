const express = require('express');
require('dotenv').config();

require('./database');

const app = express();

module.exports = app;
