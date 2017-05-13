// Load Module Dependencies
var debug = require('debug')('super-api');

var adminDal  = require('../dal/admin');
var userDal   = require('../dal/user');

/**
 * Get admin
 * 
 * @desc Fetch a single admin from the database
 * @param {object} req HTTP request object
 * @param {object} res HTTP response object
 * @param {function} next middleware dispatcher 
 */
exports.getAdmin = function getAdmin(req, res, next) {
    debug('Fetching admin:', req.params._id);

    var query = { _id:req.params._id };

    userDal.get(query, function getcb(err, admin){
        if (err) { return next(err);}

        res.json(admin);
    });
};


/**
 * Update admin
 * 
 * @desc Update a single admin from the database
 * @param {object} req HTTP request object
 * @param {object} res HTTP response object
 * @param {function} next middleware dispatcher 
 */
exports.updateAdmin = function updateAdmin(req, res, next) {
    debug('updating admin:', req.params._id);

    var query = { _id:req.params._id };
    var body  = req.body;

    userDal.update(query, body, function updatecb(err, admin){
        if (err) { return next(err);}

        res.json(admin);
    });
};


/**
 * Get admins
 * 
 * @desc Fetch a collection of Admins from the database
 * @param {object} req HTTP request object
 * @param {object} res HTTP response object
 * @param {function} next middleware dispatcher 
 */
exports.getAdmins = function getAdmins(req, res, next) {
    debug('Fetching all admins');

    var query = {role:'admin'};
    
    userDal.getCollection(query, function getAdminCollections(err, admins){
        if(err){
            return next(err);
        }
        res.json(admins);
    })
};