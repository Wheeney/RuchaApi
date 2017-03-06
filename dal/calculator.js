
/**
 * Load Module Dependencies.
 */
var debug      = require('debug')('rucha-api');
var moment     = require('moment');

var Calculator  = require('../models/calculator');

var population = [{ path: 'profile' },{ path:'user' }];

/**
 * create a new calculator.
 * @desc  creates a new calculator and saves them in the database
 *
 * @param {Object} calculatorData  Data for the calculator to create
 * @param {Function} cb  Callback for once saving is complete
 */
exports.create = function create(calculatorData, cb) {
  debug('creating a new calculator');

  // Create calculator
  var newCalculator  = new Calculator(calculatorData);

  newCalculator.save(function saveCalculator(err, data) {
    if (err) { return cb(err);}


    exports.get({ _id: data._id }, function (err, calculator) {
      if(err) { return cb(err); }

      cb(null, calculator);

    });

  });

};

/**
 * delete calculator
 * @desc  delete data of the calculator with the given Id
 *
 * @param {Object}  query   Query Object
 * @param {Function} cb  Callback for once delete is complete
 */
exports.delete = function deleteItem(query, cb) {
  debug('deleting calculator: ', query);

  Calculator
    .findOne(query)
    .populate(population)
    .exec(function deletecalculator(err, calculator) {
      if (err) { return cb(err); }

      if(!calculator) {
        return cb(null, {});
      }

      calculator.remove(function(err) {
        if(err) { return cb(err); }

        cb(null, calculator);

      });

    });
};

/**
 * update a calculator
 * @desc  update data of the calculator with the given Id
 *
 * @param {Object} query  Query object
 * @param {Object} updates  Updated data
 * @param {Function} cb  Callback for once update is complete
 */
exports.update = function update(query, updates,  cb) {
  debug('updating calculator: ', query);

  var now = moment().toISOString();
  updates.last_modified = now;

  Calculator
    .findOneAndUpdate(query, updates)
    .populate(population)
    .exec(function updateCalculator(err, calculator) {
      if(err) { return cb(err); }

      cb(null, calculator || {});
    });
};

/**
 * get a single calculator.
 * @desc get a calculator with the given id from db
 *
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.get = function get(query, cb) {
  debug('getting calculator ', query);

  Calculator
    .findOne(query)
    .populate(population)
    .exec(function(err, calculator) {
      if(err) { return cb(err);}

      cb(null, calculator || {});
    });
};

/**
 * get a collection of calculators
 * @desc get a collection of calculators from db
 *
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.getCollection = function getCollection(query, cb) {
  debug('fetching a collection of calculators');

  Calculator
    .find(query)
    .populate(population)
    .exec(function getcalculatorsCollection(err, calculators) {
      if(err) { return cb(err);}

      return cb(null, calculators);
  });

};