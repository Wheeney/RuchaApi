/**
 * Load module dependencies
 */
var debug = require('debug')('super-api');
var moment = require('moment');

var Transaction = require('../models/transaction');

var population = [{path:'product'},{path:'cashier'},{path:'manager'}];

/**
 * create a transaction
 * 
 * @desc create a new transaction and save the data in the database
 * @param {object} transactionData  data for the transaction being created.
 * @param {function} cb  callback for once the transaction has been created
 */
exports.create = function create(transactionData, cb){
    debug('Creating a new transaction');

    //create a new transaction
    var newTransaction = new Transaction(transactionData);

    newTransaction.save(function saveTransactiont(err, transaction){
        if(err){
            return cb(err);
        };

        //save the id of each created transaction
        exports.get({_id:transaction._id}, function(err, transaction){
            if (err){
                return cb(err)
            };
            cb(null, transaction);
        });
        return;

    });
};

/**
 * Delete a transaction
 * @desc delete data of the transaction with the given id
 * 
 * @param {object} query  Query object
 * @param {function} cb  callback for once delete is complete
 */
exports.delete = function deleteItem(query, cb){
    debug('deleting transaction:', query);
    
    Transaction
             .findOne(query)
             .populate(population)
             .exec(function deleteTransaction(err, transaction){
                 if(err){ return cb(err); }

                 if(!transaction){
                     return cb(new Error('Selected transaction does not exist'));
                 };

                 transaction.remove(function(err){
                     if(err){ return cb(err);}

                     cb(null, transaction);
                 });
             });
};

/**
 * update a transaction
 * @desc update data of a transaction with a given id
 * 
 * @param {object} query  Query object
 * @param {object} updates update data
 * @param {function} cb  callback for once update is complete
 * 
 */
exports.update = function update(query, updates, cb){
    debug('updating transaction:', query);
    var now = moment().toISOString();
    updates.last_modified = now;
    Transaction
       .findOneAndUpdate(query, updates)
       .populate(population)
       .exec(function updateTransaction(err, transaction){
           if (err){ return cb(err);}
           cb(null, transaction || {});
       });
};
/**
 * Get a transaction
 * 
 * @desc get a transaction with a specific id from db
 * 
 * @param {object} query  Query object
 * @param {function} cb  callback for once fetch is complete
 */
exports .get = function get(query, cb){
    debug('Fetching transaction:', query);
    Transaction
       .findOne(query)
       .populate(population)
       .exec(function fetchTransaction(err, transaction){
           if(err){ return cb(err);}
           cb(null, transaction);
       });
};
/**
 * Get a collection of transactions
 * 
 * @desc Get a collection of transactions from the database
 * 
 * @param {object} query  Query object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.getCollection = function getCollection(query, cb){
    debug('Getting a collection of transactions');
    Transaction
       .find(query)
       .populate(population)
       .exec(function getTransactionsCollection(err, transactions){
           if(err){ return cb(err);}
           cb(null, transactions);
       });
};

