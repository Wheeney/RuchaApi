//Load module dependencies
var EventEmitter = require('events').EventEmitter;
var crypto       = require('crypto');
var debug        = require('debug')('api:controller-user');
var moment       = require('moment');
var request      = require('request');
var sendgrid     = require('sendgrid')('kerubo111', 'winnie111');
var sg           = require('sendgrid')('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');

var config       = require('../config');
var userDal      = require('../dal/user');
var profileDal   = require('../dal/profile');
var TokenDal     = require('../dal/token');
var CustomError  = require('../lib/custom-error');



/**
 * create a user
 * 
 * @desc create a new user and add them to the database
 * @param {object} req HTTP request object
 * @param {object} res HTTP response object
 * @param {function} next middleware dispatcher 
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
        req.checkBody('password', 'Invalid password!').notEmpty().withMessage('Password is empty').isLength(5);
        req.checkBody('user_type', 'User Type is Invalid!')
        .notEmpty().withMessage('User Type is Empty')
        .isIn(['consumer', 'admin']).withMessage('User Type should either be consumer or admin');

        var errs = req.validationErrors();
        if (errs) {
            return next(CustomError({
                name:'USER_CREATION_ERROR',
                message:errs.messaage
            }));
        }
            workflow.emit('createUser');
        });

    workflow.on('createUser', function createUser() {
        debug('create new user');

        //create user data
        userDal.create({
            username: body.email,
            password: body.password,
            role    : body.user_type
        }, function createcb(err, user) {
            if(err) {
                return next(CustomError({
                    name   : 'SERVER_ERROR',
                    message: err.message
                }));
            };

            workflow.emit('createProfile', user);
        });
    });

    workflow.on('createProfile', function createProfile(user) {
        debug('create profile');

        var userId    = { _id: user._id };
        var profileId = { profile: profile._id };

        //create user profile
        profileDal.create({
            user      : user._id,
            first_name: body.first_name,
            last_name : body.last_name,
            city      : body.city,
            email     : body.email
        }, function cb(err, profile) {
            if(err) {
                return next(CustomError({
                    name   : 'SERVER_ERROR',
                    message: err.message
                }));
            };

            userDal.update(userId, profileId, function updatecb(err, user) {
                if(err) {
                    return next(CustomError({
                        name   : 'SERVER_ERROR',
                        message: err.message
                    }));
                };

                workflow.emit('respond', user);
            });
        });
    });

    workflow.on('respond', function respond(user) {

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
exports.fetchOne = function GetOneUser(req, res, next){
    debug('Fetching user:', req.params._id);

    var query = { _id: req.params._id };

    userDal.get(query, function getcb(err, user) {
        if(err) {
            return next(CustomError({
                name: 'SERVER_ERROR',
                message: err.message
            }));
        };
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
        if(err) {
            return next(CustomError({
                name: 'SERVER_ERROR',
                message: err.message
            }));
        };
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
        if(err) {
            return next(CustomError({
                name: 'SERVER_ERROR',
                message: err.message
            }));
        };
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
        if(err) {
            return next(CustomError({
                name: 'SERVER_ERROR',
                message: err.message
            }));
        };
        res.json(users);
    });
};

/**
 * Get a collection of users by pagination
 * 
 * @desc Get a collection of users from the database by pagiation
 * @param {object} req HTTP request object
 * @param {object} res HTTP response object
 * @param {function} next middleware dispatcher 
 */
exports.fetchAllByPagination = function fetchAllUsers(req, res, next) {
  debug('get a collection of users by pagination');

  // retrieve pagination query params
  var page   = req.query.page || 1;
  var limit  = req.query.per_page || 10;

  var opts = {
    page: page,
    limit: limit
  };
  var query = {};

  userDal.getCollectionByPagination(query, opts, function cb(err, users) {
    if(err) {
        return next(CustomError({
            name: 'SERVER_ERROR',
            message: err.message
        }));
    };
    res.json(users);
  });
};



/**
 * Update Password
 * 
 * @desc Get one user from the database and update their password
 * @param {object} req HTTP request object
 * @param {object} res HTTP response object
 * @param {function} next middleware dispatcher
 */
exports.updatePassword = function updatePassword(req, res, next){
    var body = req.body;
    var workflow = new EventEmitter();

    workflow.on('updatePass', function updatePass(){
        var errs = req.validationErrors();
        if(errs){
            res.status(404);
            res.json(errs);
        };
        workflow.emit('verifyUser');
    });

    //Verify if the user exists
    workflow.on('verifyUser', function verifyUser(){
        userDal.get({_id: req.params._id }, function done(err, user) {
            if(err) { return next(err);}
            if(!user._id){
                res.status(404);
                res.json({
                    message: 'User Not Found!'
                });
                return;
            }
            workflow.emit('verifyPass', user);
        });

        //verify the users password
        workflow.on('verifyPass', function verifyPass(user){
            user.checkPassword(req.body.password, function done(err, isOk) {
                if(err) { return next(err);}
                if(!isOk) {
                    res.status(403);
                    res.json({
                        message: 'Wrong Credentials!'
                    });
                    return;
                }
                workflow.emit('hashPass', user);
            });
        });

        //save the newPassword
        workflow.on('hashPass', function hashPass(user){
            user.password = req.body.newPassword;
            user.save(function (err){
                if(err){ return next(err);}

                res.json(user);
            });
        });
    });
    
    workflow.emit('updatePass');
};


/**
 * Forgot password
 */
exports.forgotPassword = function forgotPassword(req, res, next){
    debug('damn!forgot password');

    var body = req.body;
    var workflow = new EventEmitter();

    workflow.on('validateEmail', function validateEmail(){
        debug('enter email');

        req.checkBody('email',' email is empty').notEmpty();

        var errs = req.validationErrors();
        if(errs){
            res.status(404);
            res.json(errs);
        };
        workflow.emit('sendMail');
    });

    workflow.on('sendMail', function sendMail(){
        debug('sending mail...');

        userDal.get({ _id:req.params._id}, function getcb(err, user){
            if(err){ return next(err);}
            if(body.email !== req._user.username){
                res.status(404);
                res.json({
                    message:'Email does not match'
                });
                return;
            }else{
                TokenDal.get({user:user._id}, function done(err, token){
                    if(err) { return next(err);}

                    crypto.randomBytes(config.TOKEN_LENGTH, function tokenGenerator(err, buf){
                        if(err) {return next(err);}

                        var tokenValue = buf.toString('base64');

                        TokenDal.update({_id: token._id},{ $set:{resetToken:tokenValue, revoked:false} }, function updateToken(err, token){
                             if(err){ return next(err); }

                             workflow.emit('netSend', user, tokenValue);
                         });
                    });
                });
            };
        });
    });
    workflow.on('netSend', function netSend(user, tokenValue){
        var resetToken = tokenValue;
        

        var helper = require('sendgrid').mail;
        var from_email = new helper.Email('rucha709@gmail.com');
        var to_email = new helper.Email(body.email);
        var subject = 'Reset Password!';
        var content = new helper.Content('text/plain', 'Hello '+body.email+' You recently requested a reset password link.Please click on the reset link below to complete the process:http://localhost:8800/users/reset/'+resetToken);
        var mail = new helper.Mail(from_email, subject, to_email, content);

        var request = sg.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: mail.toJSON(),
        });
        sg.API(request, function(error, response) {
            res.status(response.statusCode);
            res.json({
                message:'Reset link has been sent to: '+body.email+' Please check your email'
            });
            return;
        });
        
    });
    workflow.emit('validateEmail');
};

/**
 * Reset Password
 */
exports.resetPassword = function resetPassword(req, res, next){
    debug('Reset password now...');

    var body = req.body;
    var workflow = new EventEmitter();

    workflow.on('newPass', function newPass(){
        req.checkBody('newPassword', 'newPassword is empty').notEmpty();
        req.checkBody('confirmPassword', 'password mismatch').equals(req.body.newPassword);

        var errs = req.validationErrors();
        if(errs){
            res.status(404);
            res.json(errs);
        };
        workflow.emit('reset');
    });
    workflow.on('reset', function reset(){
        userDal.get({_id: req.params._id }, function done(err, user) {
            if(err) { return next(err);}
            if(!user._id){
                res.status(404);
                res.json({
                    message: 'User Not Found!'
                });
                return;
            }
            workflow.emit('hashPass', user);
        });

        //save the newPassword
        workflow.on('hashPass', function hashPass(user){
            user.password = req.body.newPassword;
            user.save(function (err){
                if(err){ return next(err);}

                res.json({
                    message:'Your password has been successfully reset.'
                });
            });
        });
});
workflow.emit('newPass');
};
    