//Load module dependencies
var EventEmitter = require('events').EventEmitter;
var crypto = require('crypto');

var debug = require('debug')('api:controller-auth');
var moment = require('moment');

var config   = require('../config');

var userDal = require('../dal/user');
var tokenDal = require('../dal/token');

//Login controller
exports.login = function login(req, res, next){
    debug('login user');

    var workflow = new EventEmitter();

    workflow.on('validateData', function validateData(){
        debug('validating user data');

        req.checkBody('username','username is invalid').notEmpty().withMessage('username is empty');
        req.checkBody('password', 'password id invalid').notEmpty();

        var errs = req.validationErrors();
        if(errs){
            res.status(400);
            res.json(errs);
            return;
        }
        workflow.emit('validateUsername');
    });
    
     workflow.on('validateUsername', function validateUsername() {
    debug('validating username');
    // Check username
    userDal.get({ username: req.body.username }, function done(err, user) {
      if(err) {
        return next(err);
      }

      if(!user._id){
        res.status(404);
        res.json({
          message: 'User Not Found!'
        });
        return;
      }

      workflow.emit('validatePassword', user);
    });
  });

  workflow.on('validatePassword', function validatePassword(user) {
    debug('validating password');

    // Check Password
    user.checkPassword(req.body.password, function done(err, isOk) {
      if(err) {
        return next(err);
      }

      if(!isOk) {
        res.status(403);
        res.json({
          message: 'Wrong Credentials!'
        });
        return;
      }

      workflow.emit('generateToken', user);
    });
  });

  workflow.on('generateToken', function generateToken(user){
      debug('generating token')
            tokenDal.get({ user: user._id}, function done(err, token){
                if(err){ return next(err);}

                crypto.randomBytes(config.TOKEN_LENGTH, function tokenGenerator(err, buf){
                    if(err){ return next(err);}

                    var tokenValue = buf.toString('base64');

                    //generate a new token
                    if(!token._id){
                        tokenDal.create({ user:user._id, value:tokenValue, revoked:false}, function createToken(err, token){
                            if(err){ return next(err); }

                            workflow.emit('respond', user, tokenValue);
                        });

                     } else {
                         //update value
                         tokenDal.update({_id: token._id},{ $set:{value:tokenValue, revoked:false} }, function updateToken(err, token){
                             if(err){ return next(err); }

                             workflow.emit('respond', user, tokenValue);
                         });

                      };
                });
                
            });

        });
        workflow.on('respond', function respond(user, token){
            var now = moment().toISOString();

             //update last_login
            userDal.update({ _id:user._id}, { last_login: now}, function updateLogin(err, user){
                if(err){ return next(err); }

                user = user.toJSON();

                delete user.password;
                
                res.json({
                    token:token,
                    user:user
                });
            });
        });

  
    workflow.emit('validateData');
};

//Logout controller
exports.logout = function logout(req, res,next){
    debug('logout user');

    var workflow = new EventEmitter();

    workflow.on('verifyToken', function verifyToken(){
        debug('logout user:',req.params._id);

        tokenDal.get({user:req.params._id}, function done(err, token){
            if (err){ return done(err);}

            if(!token._id){
            res.status(500);
            res.json({
                message:'LOGOUT ERROR'
            });
        };
        workflow.emit('revokeToken', token);
    });
});
     workflow.on('revokeToken', function revokeToken(token){
         debug('revoking token');
         if(token._id){
             tokenDal.update({_id: token._id},{ $set:{value:'EMPTY', revoked:true} }, function updateToken(err, token){
                 if(err){ return next(err); }
                 
                  workflow.emit('respond', token);
                });
            };
         });

         workflow.on('respond', function respond(token){
             res.status(200).json({ message:'success logout'});
         });


    workflow.emit('verifyToken');
};

/**
 * Forgot password 
 * @param {object} req HTTP request object
 * @param {object} res HTTP response object
 * @param {function} next middleware dispatcher 
 * 
 */
exports.forgotPassword = (req, res, next)=> {
  var email = req.body.email;

  userDal.get({ email }, (err, existingUser) => {
    // If user is not found, return error
    if (err || existingUser == null) {
      res.status(422).json({ error: 'Your request could not be processed as entered. Please try again.' });
      return next(err);
    }

      // If user is found, generate and save resetToken

      // Generate a token with Crypto
    crypto.randomBytes(48, (err, buffer) => {
      var resetToken = buffer.toString('hex');
      if (err) { return next(err); }

      existingUser.resetPasswordToken = resetToken;
      existingUser.resetPasswordExpires = Date.now() + 3600000; 

      existingUser.save((err) => {
          // If error in saving token, return it
        if (err) { return next(err); }

        var message = {
          subject: 'Reset Password',
          text: `${'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
            'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
            'http://'}${req.headers.host}/reset-password/${resetToken}\n\n` +
            `If you did not request this, please ignore this email and your password will remain unchanged.\n`
        };

          // Otherwise, send user email via Mailgun
        mailgun.sendEmail(existingUser.email, message);

        return res.status(200).json({ message: 'Please check your email for the link to reset your password.' });
      });
    });
  });
};

