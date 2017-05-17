// Load Module Dependencies
var express       = require('express');

var userRouter    = require('./user');
var profileRouter = require('./profile');
var runRouter     = require('./run');
var quickRunRouter= require('./quickRun');
var adminRouter   = require('./admin');
var inviteRouter  = require('./invite');
var athleteRouter = require('./athlete');
var kitRouter     = require('./kit');

// Export Router Initializater
module.exports = function initRouter(app) {

  // Users Endpoint
  app.use('/users', userRouter);

  // Profile Endpoint
  app.use('/profiles', profileRouter);

  // run Endpoint
  app.use('/runs', runRouter);

  // quickRun Endpoint
  app.use('/quickRuns', quickRunRouter);

  // admin Endpoint
  app.use('/admins', adminRouter);

  // Invite Endpoint
  app.use('/invites', inviteRouter);

  //Athlete Endpoint
  app.use('/athletes', athleteRouter);

  //Kit Endpoint
  app.use('/kits', kitRouter);
  
};

