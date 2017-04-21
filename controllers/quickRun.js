'use strict'
/**
 * Load module dependencies
 */
var EventEmitter = require('events').EventEmitter;
var moment       = require('moment');
var debug        = require('debug')('api:controller-quickRun');

var userDal      = require('../dal/user');
var quickRunDal  = require('../dal/quickRun');
var profileDal   = require('../dal/profile');
var inviteDal    = require('../dal/invite');

var workflow     = new EventEmitter();

/**
 * start a quickRun
 *
 * @desc start a quickRun and save data in the db
 * @param {object} req HTTP request object
 * @param {object} res HTTP response object
 * @param {function} next middleware dispatcher
 */
exports.createQuickRun = (req, res, next)=>{
    debug('creating a quickRun');

    var body = req.body;

    //validate the quickRun
    workflow.on('validateQuickRun', function validateQuickRun(){
        debug('validating quickRun');

        var validationErrors = req.validationErrors();
        if(validationErrors){
            res.status(400);
            res.json(validationErrors);
        }
        workflow.emit('createQuickRun');
    });
    workflow.on('createQuickRun', function createQuickRun(){
        profileDal.get({_id:req._user.profile}, function getcb(err, profile){
            if(err){ return next(err);}
            
            quickRunDal.create(body, function cb(err, quickRun){
                if(err){ return next(err);};
                
                profileDal.update({_id:req._user.profile},{ $addToSet:{quick_runs:quickRun._id} }, function updatecb(err, profile){
                    if(err){ return next(err);}

                    workflow.emit('getDistanceCovered', quickRun);
                    return;
                });
            });
        });
    });
    workflow.on('getDistanceCovered', function getDistanceCovered(quickRun){
        debug('Get distance covered on a quickRun:', quickRun._id);
        
        var query = {_id:quickRun._id};
        
        quickRunDal.get(query, function getcb(err, quickRun){
            if(err){ return next(err);}

                var long1 = quickRun.starting_point.long;
                var lat1  = quickRun.starting_point.lat;
                var long2 = quickRun.ending_point.long;
                var lat2  = quickRun.ending_point.lat;

                var radlat1  = Math.PI * lat1 / 180;
                var radlat2  = Math.PI * lat2/180;
                var theta    = long1-long2;
                var radtheta = Math.PI * theta/180;
                var dist     = Math.sin(radlat1)*Math.sin(radlat2)+Math.cos(radlat1)*Math.cos(radlat2)*Math.cos(radtheta);
                dist = Math.acos(dist);
                dist = dist * 180/Math.PI;
                dist = dist *60 * 1.1515;
                dist = dist * 1.609344;

                quickRunDal.update(query, { $set:{distance:dist }}, function updatecb(err, quickRun){
                    if(err){ return next(err);}
                    
                    workflow.emit('respond', quickRun);                
                });
            
        });
    });

    workflow.on('respond', function respond(quickRun){
        res.status(201);
        res.json(quickRun);
    });
    workflow.emit('validateQuickRun');
};

/**
 * Get one quickRun
 *
 * @desc Fetch a single quickRun from the database by Id
 * @param {object} req HTTP request object
 * @param {object} res HTTP response object
 * @param {function} next middleware dispatcher
 */
exports.getQuickRun =(req, res, next)=>{
    debug('Fetching a quickRun:', req.params._id);

    var query = { _id:req.params._id };

    quickRunDal.get(query, function getcb(err, quickRun){
        if (err) { return next(err);}
        res.json(quickRun);
    });
};

/**
 * delete a single quickRun
 *
 * @desc delete a single quickRun from the database by Id
 * @param {object} req HTTP request object
 * @param {object} res HTTP response object
 * @param {function} next middleware dispatcher
 */
exports.removeQuickRun =(req, res,next)=>{
     debug('deleting quickRun:', req.params._id);

    var query = { _id:req.params._id };

    quickRunDal.delete(query, function deletecb(err, quickRun){
        if(err) { return next(err);}
        res.json(quickRun);
    });
};

/**
 * update a  quickRun
 *
 * @desc update a single quickRun from the database by Id
 * @param {object} req HTTP request object
 * @param {object} res HTTP response object
 * @param {function} next middleware dispatcher
 */
exports.updateQuickRun =(req, res, next)=>{
    debug('updating quickRun:', req.params._id);

    var query = { _id:req.params._id };
    var body  = req.body;

    quickRunDal.update(query, body, function updatecb(err, quickRun){
        if (err) { return next(err);}
        res.json(quickRun);
    });
};

/**
 * get all quickRuns
 *
 * @desc Fetch all quickRuns from the database
 * @param {object} req HTTP request object
 * @param {object} res HTTP response object
 * @param {function} next middleware dispatcher
 */
exports.getQuickRuns = (req, res, next)=>{
    debug('Fetching all quickRuns');
    if(req.query.search){
        var regex = new RegExp(escapeRegex(req.query.search), 'gi');
        var query = {location: regex};

        quickRunDal.getCollection(query, function getQuickRunCollections(err, quickRuns){
            if(err){ 
                return next(err);
            }else{
                if(quickRuns.length<1){
                    res.status(404);
                    res.json({ 
                        message:'No match found with specified distanceword'
                    });
                }
            }
            res.json(quickRuns);
        });
    }else{
        var query = {};

        quickRunDal.getCollection(query, function getQuickRunCollections(err, quickRuns){
            if(err){ return next(err);}
            res.json(quickRuns);
        });
    };
};

function escapeRegex(text){
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&");
}


/**
 * geocoding for starting_point and ending_point
 */
exports.geocode = function geocode(req, res, next){
    debug('Getting coordiates of starting_point and ending_point' );

    quickRunDal.get({_id:req.params._id}, function getcb(err, quickRun){
        if(err){ return next(err);}

        res.json(quickRun.starting_point+','+quickRun.ending_point);
    });
};

/**
 * Get calories lost
 *
 * @desc Get calories lost per quickRun
 * @param {object} req HTTP request object
 * @param {object} res HTTP response object
 * @param {function} next middleware dispatcher
 *
 * Requirements to calculate calories lost
 * 1.distance (end_point-starting_point)
 * 2.time (start_time - end_time)
 * 3.age
 * 4.heart rate
 * 5.gender
 *
 * if gender==='male'
 * var calories_burned = ([(age * 0.2017)+(weight * 0.09036) + (heart_rate * 0.6309)- 55.0969]* time /4.184);
 *
 * if gender==='female'
 * var calories_burned = [(age * 0.074)-(weight * 0.05741) + (heart_rate * 0.4472)- 20.4022]* time /4.184;
 *
 * var kcal_per_min = (calories_burned / time);
 */
exports.calculator = function calculator(req, res, next){
    debug('calculating calories lost');

    quickRunDal.get({_id:req.params._id}, function getcb2(err, quickRun){
        if(err){ return next(err);}

        profileDal.get({_id:req._user.profile}, function getcb(err, profile){
        if(err){ return next(err);}

        var age           = profile.age;
        var gender        = profile.gender;
        var weight        = profile.weight;
        var heart_rate    = profile.heart_rate;
        var start_time    = quickRun.start_time;
        var end_time      = quickRun.end_time;
        var starting_point= quickRun.starting_point;
        var ending_point  = quickRun.ending_point;
        var distance      = (ending_point) - (starting_point);
        var time_diff    = moment.utc(moment(end_time,"HH:mm:ss").diff(moment(start_time,"HH:mm:ss"))).format("HH:mm:ss");
        
        //Convert time difference to float value
        function timeStringToFloat(time) {
            var hoursMinutes = time.split(/[.:]/);
            var hours = parseInt(hoursMinutes[0], 10);
            var minutes = hoursMinutes[1] ? parseInt(hoursMinutes[1], 10) : 0;
            return hours + minutes / 60;
        }
        var time_taken = (timeStringToFloat(time_diff));

        if(age === undefined || gender ===undefined || heart_rate ===undefined || weight ===undefined){
            res.status(404);
            res.json({
                message:'please update your profile to complete this action'
            });
            return;
        }
            if(profile.gender ==='male'){
                var calories_burned = ([(age * 0.2017)+(weight * 0.09036) + (heart_rate * 0.6309)- 55.0969]* time_taken /4.184);
                var kcal_per_min = (calories_burned / time_taken);
               
                quickRunDal.update({_id:req.params._id}, {$set:{calories_burned:calories_burned, kcal_per_min:kcal_per_min }}, function done(err, quickRun){
                    if(err){ return next(err);}

                    res.json(quickRun);
                });
                return;
            }else{
                if(profile.gender ==='female'){
                    var calories_burned = ([(age * 0.074)-(weight * 0.05741) + (heart_rate * 0.4472)- 20.4022]* time_taken /4.184);
                    var kcal_per_min = (calories_burned / time_taken);

                    quickRunDal.update({_id:req.params._id}, {$set:{calories_burned:calories_burned, kcal_per_min:kcal_per_min}}, function done(err, quickRun){
                        if(err){ return next(err);}

                        res.json(quickRun);
                    });
                };
            };
        });
    });
};

/**
 * Simple prediction
 * 
 * @desc Predict the amount of calories to lose given the distance
 * @param {object} req HTTP request object
 * @param {object} res HTTP response object
 * @param {function} next middleware dispatcher
 * 
 * Prediction analysis data:
 * 1.Known distance
 * 2.Known calories_burned
 */
exports.predict = function predict(req, res,next){
    debug('Predicting run data');

    var body = req.body;
    var workflow = new EventEmitter();

    workflow.on('getDistance', function getDistance(){

        var validationErrors = req.validationErrors();
        if(validationErrors){
            res.status(400);
            res.json(validationErrors);
        }
        workflow.emit('predictCalories');
    });
    workflow.on('predictCalories', function predictCalories(){

        profileDal.get({_id:req._user.profile}, function getcb(err, profile){
            if(err){ return next(err);}

                    for (var i = 0; i < profile.quick_runs.length; i++){
                        var obj = profile.quick_runs[i];
                        
                        quickRunDal.get({_id:obj}, function getcb2(err, quickRun){
                            if(err) { return next(err);}
                            
                            function forecast(x, ky, kx){
                            var i=0, nr=0, dr=0,ax=0,ay=0,a=0,b=0;
                            function average(ar) {
                                var r=0;
                                for (i=0;i<ar.length;i++){
                                    r = r+ar[i];
                                }
                                return r/ar.length;
                            };
                            ax=average(kx);
                            ay=average(ky);
                            for (i=0;i<kx.length;i++){
                                nr = nr + ((kx[i]-ax) * (ky[i]-ay));
                                dr = dr + ((kx[i]-ax)*(kx[i]-ax))
                            };
                            b=nr/dr;
                            a=ay-b*ax;
                            return (a+b*x);
                        };
                        res.json(quickRun.distance);
                        res.json(forecast(body.distance,[quickRun.distance],[quickRun.calories_burned]));
                    });
                };
            });
        });
    workflow.emit('getDistance');
};
