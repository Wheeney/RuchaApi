/**
 * Load module dependencies
 */
var EventEmitter = require('events').EventEmitter;

var moment       = require('moment');
var debug        = require('debug')('rucha-api');

var userDal      = require('../dal/user');
var calculatorDal       = require('../dal/calculator');
var profileDal   = require('../dal/profile');

/**
 * Create a calculator
 * 
 * @desc create a calculator and save it in the db
 */
exports.createCalculator = function createCalculator(req, res, next){
    debug('creating a calculator');

    var body = req.body;
    var workflow = new EventEmitter();

    //validate the calculator
    workflow.on('validateCalculator', function validateCalculator(){
        debug('validating calculator');

        req.checkBody('distance', 'Distance is empty').notEmpty();
        req.checkBody('time', 'Time is empty').notEmpty();
        req.checkBody('weight', 'weight is empty').notEmpty();
        req.checkBody('age', ' age is empty').notEmpty();
        req.checkBody('heart_rate', 'heart_rate is required').notEmpty();
        req.checkBody('gender', 'gender is invalid').notEmpty().withMessage('gender is empty')
        .isIn(['male', 'female']);

        var validationErrors = req.validationErrors();

        if(validationErrors){
            res.status(400);
            res.json(validationErrors);
        } else{
             workflow.emit('createCalculator');
        };
    });
    workflow.on('createCalculator', function createCalculator(){
        debug('creating calculator data');
        //create calculator data
        calculatorDal.create({
            profile:req.params.profile_id,
            distance: body.distance,
            time: body.time,
            weight: body.weight,
            age:body.age,
            heart_rate:body.heart_rate,
            gender:body.gender

        }, function cb(err, calculator){
            if(err){
                return next(err);
            };

            workflow.emit('caloriesBurned', calculator);                

        });
    });

    workflow.on('caloriesBurned', function compute(calculator){
        debug('computing calories burned');

        var distance = body.distance;
        var time = body.time;
        var weight = body.weight;
        var age = body.age;
        var heart_rate = body.heart_rate;
    
        if(body.gender ==='male'){
            var calories_burned = Math.ceil([(age * 0.2017)+(weight * 0.09036) + (heart_rate * 0.6309)- 55.0969]* time /4.184);
            var kcal_per_min = Math.ceil(calories_burned / time);

            calculatorDal.update({_id:calculator._id}, {$set:{calories_burned:calories_burned, kcal_per_min:kcal_per_min }}, function done(err, calculator){
            if(err){ return next(err);}

            workflow.emit('respond', calculator);
        });
    } else {
            if(body.gender ==='female'){
                var calories_burned = [(age * 0.074)-(weight * 0.05741) + (heart_rate * 0.4472)- 20.4022]* time /4.184;

                calculatorDal.update({_id:calculator._id}, {$set:{calories_burned:calories_burned}}, function done(err, calculator){
            if(err){ return next(err);}

            workflow.emit('respond', calculator);
        });
    };
};
        

    });

    workflow.on('respond', function respond(calculator){
        res.status(201).json(calculator);
    });
    workflow.emit('validateCalculator');
};
/**
 * get a single calculator
 * 
 * @desc Fetch a single calculator from the database by Id
 */
exports.getCalculator = function getCalculator(req, res, next){
    debug('Fetching a calculator:', req.params._id);

    var query = { _id:req.params._id };

    calculatorDal.get(query, function getcb(err, calculator){
        if (err) { return next(err);}

        res.json(calculator);
    });
};

/**
 * delete a single calculator
 * 
 * @desc delete a single calculator from the database by Id
 */
exports.removeCalculator = function removeCalculator(req, res,next){
     debug('deleting calculator:', req.params._id);

    var query = { _id:req.params._id };

    calculatorDal.delete(query, function deletecb(err, calculator){
        if(err) { return next(err);}

        res.json(calculator);
    });
};

/**
 *update a  calculator
 * 
 * @desc update a single calculator from the database by Id
 */
exports.updateCalculator = function updateCalculator(req, res, next){
    debug('updating calculator:', req.params._id);

    var query = { _id:req.params._id };
    var body  = req.body;

    calculatorDal.update(query, body, function updatecb(err, calculator){
        if (err) { return next(err);}

        res.json(calculator);
    });
};

/**
 * get all calculators
 * 
 * @desc Fetch all calculators from the database
 */
exports.getCalculators = function getCalculators(req, res, next){
    debug('Fetching all calculators');

    var query = {};
    
    calculatorDal.getCollection(query, function getCalculatorCollections(err, calculators){
        if(err){
            return next(err);
        }
        res.json(calculators);
    })
};


