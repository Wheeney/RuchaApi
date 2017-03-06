//Load module dependencies
var EventEmitter = require('events').EventEmitter;
var crypto = require('crypto');
var debug = require('debug')('rucha-api');
var moment = require('moment');
var config = require('../config');
var userDal = require('../dal/user');
var profileDal = require('../dal/profile');
var runDal = require('../dal/run');

/**
 * create the user
 * 1.validate the user
 * 2.create the user
 * 3.create the profile
 */
exports.createUser = (req, res, next) => {
    debug('creating the user');

    var workflow = new EventEmitter();
    var body = req.body;

    workflow.on('validateUser', function validateUser() {
        debug('validating user');

        //validate the user
        req.checkBody('first_name', 'first_name is required!').notEmpty();
        req.checkBody('last_name', 'last_name is required!').notEmpty();
        req.checkBody('email', 'Invalid Email').notEmpty().isEmail();
        req.checkBody('password', 'Invalid password!')
            .notEmpty().withMessage('Password is empty').isLength(5);
        req.checkBody('user_type', 'User Type is Invalid!')
            .notEmpty().withMessage('User Type is Empty')
            .isIn(['consumer', 'admin']).withMessage('User Type should either be consumer or admin');


        var validationErrors = req.validationErrors();

        if (validationErrors) {
            res.status(400);
            res.json(validationErrors);
        } else {
            workflow.emit('createUser');
        };
    });

    workflow.on('createUser', function createUser() {
        debug('create user');

        //create user data
        userDal.create({
            username: body.email,
            password: body.password,
            role: body.user_type,
            realm: body.realm ? body.realm : 'user'
        }, function cb(err, user) {
            if (err) {
                return next(err);
            }
            workflow.emit('createProfile', user);
        });
    });
    workflow.on('createProfile', function createProfile(user) {
        debug('create profile');

        //create user profile
        profileDal.create({
            user: user._id,
            first_name: body.first_name,
            last_name: body.last_name,
            email: body.email,
            runs: body.runs

        }, function cb(err, profile) {
            if (err) {
                return next(err);
            }
            userDal.update({ _id: user._id }, { profile: profile._id }, function updatecb(err, user) {
                if (err) { return next(err); }

                workflow.emit('respond', user);
            });
        });
    });

    // workflow.on('createUserType', function createUserType(user, profile) {
    // // Create User Type
    // debug('create user type: ', body.user_type);

    // if(body.user_type === 'consumer') {
    //   consumerDal.create({
    //     profile: profile._id
    //   }, function callback1(err, consumer) {
    //     if(err) { return next(err); }

    //     profileDal.update({ _id: profile._id }, { $set: { consumer: consumer._id } }, function updateCb1(err, profile) {
    //       if(err) {
    //         return next(err);
    //       }
    //       workflow.emit('respond', user);
    //     });

    //   });

    // } else if(body.user_type === 'admin') {
    //   adminDal.create({
    //     profile: profile._id
    //   }, function callback2(err, admin) {
    //     if(err) {
    //       return next(err);
    //     }

    //     ProfileDal.update({ _id: profile._id }, { $set: { admin: admin._id } }, function updateCb2(err, profile) {
    //       if(err) {
    //         return next(err);
    //       }
    //       workflow.emit('respond',user);
    //     });


    //   });

    // }


    //   });
    workflow.on('respond', function respond(user) {
        debug('respond');

        user = user.toJSON();
        delete user.password;

        res.status(201).json(user);
    });

    workflow.emit('validateUser');

};
/**
 * Get one user
 * 
 * @desc Fetch a single user from the database by Id
 * @param {object} req HTTP request object
 * @param {object} res HTTP response object
 * @param {function} next middleware dispatcher 
 */
exports.fetchOne = (req, res, next) => {
    debug('Fetching user:', req.params._id);

    var query = { _id: req.params._id };

    userDal.get(query, function getcb(err, user) {
        if (err) { return next(err); }

        res.json(user);
    });
};

/**
 * Update the user
 * 
 * @desc Get a single user from the database and update their data
 * @param {object} req HTTP request object
 * @param {object} res HTTP response object
 * @param {function} next middleware dispatcher 
 */
exports.updateUser = (req, res, next) => {
    debug('updating user:', req.params._id);

    var query = { _id: req.params._id };
    var body = req.body;

    userDal.update(query, body, function updatecb(err, user) {
        if (err) { return next(err); }

        res.json(user);
    });
};

/**
 * delete a single user
 * 
 * @desc Get a single user from the database and delete their data.
 * @param {object} req HTTP request object
 * @param {object} res HTTP response object
 * @param {function} next middleware dispatcher 
 */
exports.delete = (req, res, next) => {
    debug('deleting user:', req.params._id);

    var query = { _id: req.params._id };

    userDal.delete(query, function deletecb(err, user) {
        if (err) { return next(err); }

        res.json(user);
    });
};

/**
 * Get a collection of users
 * 
 * @desc Get a collection of users from the database
 * @param {object} req HTTP request object
 * @param {object} res HTTP response object
 * @param {function} next middleware dispatcher 
 */
exports.getUsers = (req, res, next) => {
    debug('Fetching all users');

    var query = {};

    userDal.getCollection(query, function getUserCollections(err, users) {
        if (err) { return next(err); }

        res.json(users);
    });
};

/**
 * Update password
 * 
 * @desc Get one user from the database and update their password
 * @param {object} req HTTP request object
 * @param {object} res HTTP response object
 * @param {function} next middleware dispatcher 
 */
