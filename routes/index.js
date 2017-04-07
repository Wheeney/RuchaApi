// Load Module Dependencies
var express       = require('express');

var userRouter    = require('./user');
var profileRouter = require('./profile');

// Export Router Initializater
module.exports = function initRouter(app) {

  // Users Endpoint
  app.use('/users', userRouter);

  // Profile Endpoint
  app.use('/profiles', profileRouter);
  
  
};