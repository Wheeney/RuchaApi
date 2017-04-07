/**
 * Load module dependencies
 */
var EventEmitter = require('events').EventEmitter;

var moment = require('moment');
var debug = require('debug')('super-api');

var transactionDal = require('../dal/transaction');
var productDal = require('../dal/product');
var cashierDal = require('../dal/cashier');

var config = require('../config');

exports.createTransaction = function createTransaction(req, res, next){
    debug('controller:creating a transaction');

    var body = req.body;
    var workflow = new EventEmitter();
    
    //validate the transaction
    workflow.on('validateTransaction', function validateTransaction(){
        debug('validating transaction');

        req.checkBody('transaction_type', 'Transaction_type is invalid').isIn('cash', 'debit');
        req.checkBody('quantity', 'quantity is empty').notEmpty()
        
        var validationErrors = req.validationErrors();

        if(validationErrors){
            res.status(400);
            res.json(validationErrors);
        } else{
             workflow.emit('createTransaction');
        };
    });
    workflow.on('createTransaction', function createTransaction(){
        //create transaction data
        transactionDal.create({
            // product:product._id,
            quantity:body.quantity,
            brand:body.brand,
            product_type:body.product_type,
            price:body.price,
            original_price:body.original_price

            
        }, function cb(err, transaction){
            if(err){
                return next(err);
            };
            workflow.emit('respond', transaction);
        });
    });
    workflow.on('respond', function respond(transaction){
        res.status(201).json(transaction);
    });
    workflow.emit('validateTransaction');
};
/**
 * get a single transaction
 * 
 * @desc Fetch a single transaction from the database by Id
 */
exports.getTransaction = function getTransaction(req, res, next){
    debug('Fetching a transaction:', req.params._id);

    var query = { _id:req.params._id };

    transactionDal.get(query, function getcb(err, transaction){
        if (err) { return next(err);}

        res.json(transaction);
    });
};

exports.removeTransaction = function removeTransaction(req, res,next){
     debug('deleting transaction:', req.params._id);

    var query = { _id:req.params._id };

    transactionDal.delete(query, function deletecb(err, transaction){
        if(err) { return next(err);}

        res.json(transaction);
    });
};

exports.updateTransaction = function updateTransaction(req, res, next){
    debug('updating transaction:', req.params._id);

    var query = { _id:req.params._id };
    var body  = req.body;

    transactionDal.update(query, body, function updatecb(err, transaction){
        if (err) { return next(err);}

        res.json(transaction);
    });
};

exports.getTransactions = function getTransactions(req, res, next){
    debug('Fetching all transactions');

    var query = {};
    
    transactionDal.getCollection(query, function getTransactionCollections(err, transactions){
        if(err){
            return next(err);
        }
        res.json(transactions);
    })
};