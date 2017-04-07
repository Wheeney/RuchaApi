// Load Module Dependencies

var debug = require('debug')('super-api');

var cashierDal  = require('../dal/cashier');

/**
 * Get cashier
 */
exports.getCashier = function getCashier(req, res, next) {
    debug('Fetching cashier:', req.params._id);

    var query = { _id:req.params._id };

    cashierDal.get(query, function getcb(err, cashier){
        if (err) { return next(err);}

        res.json(cashier);
    });
};


/**
 * Update cashier
 */
exports.updateCashier = function updateCashier(req, res, next) {
    debug('updating cashier:', req.params._id);

    var query = { _id:req.params._id };
    var body  = req.body;

    cashierDal.update(query, body, function updatecb(err, cashier){
        if (err) { return next(err);}

        res.json(cashier);
    });
};


/**
 * Get cashiers
 */
exports.getCashiers = function getCashiers(req, res, next) {
    debug('Fetching all cashiers');

    var query = {};
    
    cashierDal.getCollection(query, function getCashierCollections(err, cashiers){
        if(err){
            return next(err);
        }
        res.json(cashiers);
    })
};


// no operation(noop) function
exports.noop = function noop (req, res, next) {
  res.json({
    message: 'To Implemented!'
  });
};