// Load Module Dependencies
var express           = require('express');

var userRouter        = require('./user');
var profileRouter     = require('./profile');
var cashierRouter     = require('./cashier');
var managerRouter     = require('./manager');
var productRouter     = require('./product');
var transactionRouter = require('./transaction');

// Export Router Initializater
module.exports = function initRouter(app) {

  // Users Endpoint
  app.use('/users', userRouter);

  // Profile Endpoint
  app.use('/profiles', profileRouter);

  // Cashier Endpoint
  app.use('/cashiers', cashierRouter);

  // Manager Endpoint
  app.use('/managers', managerRouter);

  // Product Endpoint
  app.use('/products', productRouter);

  // Transaction Endpoint
  app.use('/transactions', transactionRouter);
  
  
};