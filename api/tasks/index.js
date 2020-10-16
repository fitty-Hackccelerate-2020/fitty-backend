const express = require('express');
const isAuthenticated = require('../middlewares/isAuthenticated');
const validators = require('../middlewares/validators');

const router = express.Router();

const initiate = require('./initiate');
const getTodaysTask = require('./getTodaysTask');
const updateTodayTask = require('./updateTask');

router.post(
  '/initiate',
  isAuthenticated,
  validators.initiateTaskBodyValidator,
  initiate
);
router.post('/today', isAuthenticated, getTodaysTask);
router.post('/update', isAuthenticated, updateTodayTask);

module.exports = router;
