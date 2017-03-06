//Load module dependencies
var EventEmitter = require('events').EventEmitter;
var crypto = require('crypto');

var debug = require('debug')('rucha-api');
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
                })
            })
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
 * Update password
 */
exports.updatePassword = function updatePassword(req, res, next){
    debug('updating password:', req.body.password);

    var workflow = new EventEmitter();

    workflow.on('validatePass', function validatePass(){
        debug('validating password');

        req.checkBody('password', 'password invalid').notEmpty();
        req.checkBody('newPassword', 'password invalid').notEmpty();
        req.checkBody('confirmPassword', 'password mismatch').equals(req.body.confirmPassword);

        var errs = req.validationErrors();
        if(errs){
            res.status(400).json(errs);
            return;
        }
        workflow.emit('verifyUser');
    
    });

    workflow.on('verifyUser', function verifyUser(){
        debug('verifying passwords match');

        userDal.get({_id:req.params._id}, function done(err, user){
            if(err){ return next(err);}

            if(!user._id){
                res.status(404).json({ message:'user invalid'});
                return;
            }
            workflow.emit('validatePass', user);
        });
    });

    workflow.on('validatePass', function validatePass(user){
        user.checkPassword(req.body.password, function done(err, isMatch){
            if(err){ return next(err);}

            if(!isMatch){
                res.status(403).json({message:'wrong password'});
                return;
            }
            workflow.emit('updatePass', user);
        });
    });

    workflow.on('updatePass', function updatePass(user){
        debug('sasa lets update the password');

        var newPassword = req.body.newPassword;
        userDal.update({_id:req.params._id}, { password:req.body.newPassword}, function(err, user){
            if(err){ return next(err);}

            res.json(user);
        })
    })
    workflow.emit('validatePass');
} 