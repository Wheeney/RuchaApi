// Load Module Dependencies
var express       = require('express');

var userRouter    = require('./user');
var profileRouter = require('./profile');
var runRouter     = require('./run');
var forecastRouter= require('./forecast');
var inviteRouter  = require('./invite');

// Export Router Initializater
module.exports = function initRouter(app) {

  // Users Endpoint
  app.use('/users', userRouter);

  // Profile Endpoint
  app.use('/profiles', profileRouter);
  
  //Run Endpoint
  app.use('/runs', runRouter);

  //Forecast Endpoint
  app.use('/weather', forecastRouter);

  //Invite Endpoint
  app.use('/invites', inviteRouter);
};