//Load module dependencies
var EventEmitter = require('events').EventEmitter;
var crypto       = require('crypto');
var debug        = require('debug')('rucha-api');
var moment       = require('moment');
var request      = require('request');
var nodemailer = require('nodemailer'); 
var sgTransport = require('nodemailer-sendgrid-transport'); 

var config       = require('../config');
var userDal      = require('../dal/user');
var profileDal   = require('../dal/profile');
var runDal       = require('../dal/run');
var TokenDal     = require('../dal/token');

//Sendgrid Configuration Settings	
var options = {
	auth: {
		api_user: 'winnie', // Sendgrid username
		api_key: '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' // Sendgrid password
	}
}
var client = nodemailer.createTransport(sgTransport(options));

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

        var validationErrors = req.validationErrors();
        if (validationErrors) {
            res.status(400).json(validationErrors);
        } else {
            workflow.emit('createUser');
        };
    });

    workflow.on('createUser', function createUser() {
        debug('create new user');

        //create user data
        userDal.create({
            username: body.email,
            password: body.password,
            role: body.user_type
        }, function createcb(err, user) {
            if (err) { return next(err); }

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
            city:body.city,
            email: body.email
        }, function cb(err, profile) {
            if (err) { return next(err); }

            userDal.update({ _id: user._id }, { profile: profile._id }, function updatecb(err, user) {
                if (err) { return next(err); }

                workflow.emit('respond', user);
            });
        });
    });

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
        //Enter the oldPassword and newPassword
        req.checkBody('password', 'password is empty').notEmpty();
        req.checkBody('newPassword', 'newPassword is empty').notEmpty();
        req.checkBody('confirmPassword', 'password mismatch').equals(req.body.newPassword);

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
 * Get users coordinates(lat, long)
 */
// exports.getCoordinates = function getCoordinates(req, res, next){
//     debug('Getting coordinates of location:',req.body.city);
    
//     profileDal.get({_id:req.params._id}, function getcb(err, profile){
//         if(err){ return next(err);}

//         res.json(profile.city);
//      });
// };

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
        workflow.emit('sendEmail');
    });
        workflow.on('sendEmail', function sendEmail(){
            debug('getting there...');
            userDal.get({_id:req.params._id}, function getcb(err, user){
                if(err){ return next(err);}

                if(body.email !== user.username){
                    res.status(404);
                    res.json({ 
                        message:'Email mismatch'
                    });
                    return;
                }else{
                    TokenDal.get({ user: user._id}, function done(err, token){
                        if(err){ return next(err);}

                crypto.randomBytes(config.TOKEN_LENGTH, function tokenGenerator(err, buf){
                    if(err){ return next(err);}

                    var tokenValue = buf.toString('base64');
                    userDal.update({_id: user._id},{ $set:{resetToken:tokenValue, revoked:false} }, function updateToken(err, token){
                        if(err){ return next(err); }
                        
                        res.json(user, tokenValue);
                    });           
                });
            });
            user.save(function(err){
                if(err) { 
                     return next(err);
                    }else{
                        // Create e-mail object to send to user
                        var email = {
						from: 'Rucha, rucha@localhost.com',
						to: user.username,
						subject: 'Rucha password reset link',
						text: 'Hello ' + user.username + ',Please click on the following link to reset your password: http://localhost:8800/resetPassword/' + user.resetToken,
						html: 'Hello<strong> ' + user.username + '</strong>,<br><br> Please click on the link below to reset your password:<br><br><a href="http://localhost:8800/resetPassword' + user.resetToken + '">http://localhost:8800/resetPassword/</a>'
					};
					// Function to send e-mail to the user
					client.sendMail(email, function(err, info) {
						if (err) console.log(err); // If error with sending e-mail, log to console/terminal
					});
                    res.json({ message:'Please check your email for a reset password link'});
                        }
                    })
                }
                
                res.send('check your email');
            });
        });
        workflow.emit('validateEmail');
    };
    