// Load Module Dependencies
var express  = require('express');

var quickRun = require('../controllers/quickRun');

// Create a Router
var router = express.Router();

/**
 * @api {post} /quickRun/create Create a quickRun
 * @apiName createQuickRun
 * @apiGroup Quick_Run
 *
 * @apiParam {String} starting_point Run starting_point
 * @apiParam {String} ending_point Run ending_point
 * @apiParam {String} start_time Run start_time
 * @apiParam {String} end_time Run end_time
 *
 * @apiParamExample Request Example:
 *  {
 *  "starting_point":{
 *		"name":"nairobi",
 *		"lat":"-1.291536",
 *		"long":"36.845736"
 *	},
 *	"ending_point":{
 *		"name":"nakuru",
 *		"lat":"0.3031",
 *		"long":"36.0800"
 *	},
 *	"start_time":"06:00:00",
 *	"end_time":"08:30:00"
 *  }
 *
 * @apiSuccess {String} starting_point Run starting_point
 * @apiSuccess {String} ending_point Run ending_point
 * @apiSuccess {String} start_time Run start_time
 * @apiSuccess {String} end_time Run end_time
 * @apiSuccess {Date} last_modified Last Modified Date
 * @apiSuccess {Date} date_created Date Created
 *
 * @apiSuccessExample {json} Response Example:
 *  {
 * "_id": "58ef571982d57f346d8bb518",
 * "last_modified": "2017-04-13T10:46:49.781Z",
 * "date_created": "2017-04-13T10:46:49.781Z",
 * "start_time": "06:00:00",
 * "end_time": "08:30:00",
 * "ending_point": {
 *   "name": "nakuru",
 *   "lat": 0.3031,
 *   "long": 36.08
 * },
 * "starting_point": {
 *   "name": "nairobi",
 *  "lat": -1.291536,
 *   "long": 36.845736
 * }
 * }
 */
router.post('/create', quickRun.createQuickRun);

/**
 * @api {get} /quickRun/all Get quickRun collection
 * @apiName getQuickRunCollection
 * @apiGroup Quick_Run
 *
 * @apiSuccess {String} starting_point Run starting_point
 * @apiSuccess {String} ending_point Run ending_point
 * @apiSuccess {String} start_time Run start_time
 * @apiSuccess {String} end_time Run end_time
 * @apiSuccess {Number} distance Distance covered
 * @apiSuccess {Date} last_modified Last Modified Date
 * @apiSuccess {Date} date_created Date Created
 *
 * @apiSuccessExample {json} Response Example:
 * [
 *  {
    "_id": "58ef56c37abd7c311221e480",
    "last_modified": "2017-04-13T10:45:24.033Z",
    "date_created": "2017-04-13T10:45:23.928Z",
    "start_time": "07:00:00",
    "end_time": "08:00:00",
    "distance": 69.5497976748658,
    "ending_point": {
      "name": "nakuru",
      "lat": 0.3031,
      "long": 36.08
    },
    "starting_point": {
      "name": "naivasha",
      "lat": 0.7172,
      "long": 36.4310
    }
  },
  {
    "_id": "58ef571982d57f346d8bb518",
    "last_modified": "2017-04-13T10:46:49.823Z",
    "date_created": "2017-04-13T10:46:49.781Z",
    "start_time": "06:00:00",
    "end_time": "08:30:00",
    "distance": 196.6872310775424,
    "ending_point": {
      "name": "nakuru",
      "lat": 0.3031,
      "long": 36.08
    },
    "starting_point": {
      "name": "nairobi",
      "lat": -1.291536,
      "long": 36.845736
    }
  }
 * ]
 */
router.get('/all', quickRun.getQuickRuns);

/**
 * @api {get} /quickRun/:_id Get a single quickRun data
 * @apiName getOneQuickRun
 * @apiGroup Quick_Run
 *
 * @apiSuccess {String} starting_point Run starting_point
 * @apiSuccess {String} ending_point Run ending_point
 * @apiSuccess {String} start_time Run start_time
 * @apiSuccess {String} end_time Run end_time
 * @apiSuccess {Number} distance Distance covered
 * @apiSuccess {Date} last_modified Last Modified Date
 * @apiSuccess {Date} date_created Date Created
 *
 * @apiSuccessExample {json} Response Example:
 * [
 *  {
    "_id": "58ef571982d57f346d8bb518",
    "last_modified": "2017-04-13T10:46:49.823Z",
    "date_created": "2017-04-13T10:46:49.781Z",
    "start_time": "06:00:00",
    "end_time": "08:30:00",
    "distance": 196.6872310775424,
    "ending_point": {
      "name": "nakuru",
      "lat": 0.3031,
      "long": 36.08
    },
    "starting_point": {
      "name": "nairobi",
      "lat": -1.291536,
      "long": 36.845736
    }
  }
 * ]
 */
router.get('/:_id', quickRun.getQuickRun);

router.get('/:_id/calc', quickRun.calculator);

/**
 * @api {delete} /quickRun/:_id Delete a single quickRun
 * @apiName deletequickRun
 * @apiGroup Quick_Run
 *
 * @apiSuccessExample Response Example:
 * {}
 * 
 */
router.delete('/:_id', quickRun.removeQuickRun);

/**
 * @api {put} /quickRun/:_id Update a single quickRun data
 * @apiName updateOneQuickRun
 * @apiGroup Quick_Run
 *
 * @apiParam {String} end_time Run end_time
 * 
 *
 * @apiParamExample Request Example:
 *  {
 *    "end_time":"09:30:00"
 *  }
 * 
 * @apiSuccess {String} starting_point Run starting_point
 * @apiSuccess {String} ending_point Run ending_point
 * @apiSuccess {String} start_time Run start_time
 * @apiSuccess {String} end_time Run end_time
 * @apiSuccess {Number} distance Distance covered
 * @apiSuccess {Date} last_modified Last Modified Date
 * @apiSuccess {Date} date_created Date Created
 *
 * @apiSuccessExample {json} Response Example:
 * [
 *  {
    "_id": "58ef571982d57f346d8bb518",
    "last_modified": "2017-04-13T10:46:49.823Z",
    "date_created": "2017-04-13T10:46:49.781Z",
    "start_time": "06:00:00",
    "end_time": "09:30:00",
    "distance": 196.6872310775424,
    "ending_point": {
      "name": "nakuru",
      "lat": 0.3031,
      "long": 36.08
    },
    "starting_point": {
      "name": "nairobi",
      "lat": -1.291536,
      "long": 36.845736
    }
  }
 * ]
 */
router.put('/:_id', quickRun.updateQuickRun);

router.get('/:_id/start', quickRun.geocode);

router.get('/:_id/distance', quickRun.getDistanceCovered);

router.post('/:_id/cal', quickRun.calculator);


// Export Router
module.exports = router;

