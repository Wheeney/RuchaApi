// Load Module Dependencies
var express = require('express');

var run     = require('../controllers/run');

// Create a Router
var router = express.Router();

/**
 * @api {post} /runs/create Create a run event
 * @apiName CreateRun
 * @apiGroup Runs
 *
 * @apiParam {String} name Run name
 * @apiParam {String} location Location of run
 * @apiParam {Date} scheduled_date  Date of run
 * @apiParam {String} visibility public /private
 *
 * @apiParamExample Request Example:
 *  {
 *	"name":"power run",
 *	"location":"nyayo stadium",
 *	"scheduled_date":"2014-03-05",
 *	"visibility":"public"
 *   } 
 *
 * @apiSuccess {ObjectId} _id Unique Run ID
 * @apiSuccess {String} location Location of run
 * @apiSuccess {Date} scheduled_date  Date of run
 * @apiSuccess {String} visibility public /private
 * @apiSuccess {String} creator Creator of run
 * @apiSuccess {String} last_modified Last Modified Date
 * @apiSuccess {String} date_created Date Created
 *
 * @apiSuccessExample Response Example:
 * HTTP/1.1 201 Created
 *  {
 *  "_id": "58b7ed442e4b9419b674c3a2",
 *  "name": "power run",
 *  "location": "nyayo stadium",
 *  "scheduled_date": "2014-03-05T00:00:00.000Z",
 *  "visibility": "public",
 *  "creator": "olivia",
 *  "date_created": "2017-03-02T11:22:49.481Z",
 *  "last_modified": "2017-03-02T11:22:49.481Z",
 *  "participants": []
 *   }
 */
router.post('/create', run.createRun);
/**
 * @api {get} /runs/all Get a run collection
 * @apiName getRunCollection
 * @apiGroup Runs
 *
 * @apiSuccess {ObjectId} _id Unique Run ID
 * @apiSuccess {String} location Location of run
 * @apiSuccess {Date} scheduled_date  Date of run
 * @apiSuccess {String} visibility public /private
 * @apiSuccess {String} creator Creator of run
 * @apiSuccess {String} last_modified Last Modified Date
 * @apiSuccess {String} date_created Date Created
 *
 * @apiSuccessExample Response Example:
 * HTTP/1.1 200 Ok
 * [
 *  {
 *   "_id": "58b7ed442e4b9419b674c3a2",
 *   "name": "power run",
 *   "location": "nyayo stadium",
 *   "scheduled_date": "2014-03-05T00:00:00.000Z",
 *   "visibility": "public",
 *   "creator": "olivia",
 *   "last_modified": "2017-03-01T07:09:43.704Z",
 *   "participants": []
 *  },
 *  {
 *   "_id": "58b672dad0f41016cf97230a",
 *   "name": "aberdare runners",
 *   "location": "KU field",
 *   "scheduled_date": "2014-03-05T00:00:00.000Z",  
 *   "visibility": "private",
 *   "creator": "winnie",
 *   "last_modified": "2017-03-01T07:09:43.704Z",
 *   "participants": []
 * }
 * ]
 */
router.get('/all', run.getRuns);

/**
 * @api {get} /runs/search?search=param search run by location
 * @apiName search
 * @apiGroup Runs
 *
 * @apiSuccess {ObjectId} _id Unique Run ID
 * @apiSuccess {String} location Location of run
 * @apiSuccess {Date} scheduled_date  Date of run
 * @apiSuccess {String} visibility public /private
 * @apiSuccess {String} creator Creator of run
 * @apiSuccess {String} last_modified Last Modified Date
 * @apiSuccess {String} date_created Date Created
 *
 * @apiSuccessExample Response Example:
 * HTTP/1.1 200 Ok
 * [
 *  {
 *   "_id": "58b7ed442e4b9419b674c3a2",
 *   "name": "power run",
 *   "location": "nyayo stadium",
 *   "scheduled_date": "2014-03-05T00:00:00.000Z",
 *   "visibility": "public",
 *   "creator": "olivia",
 *   "last_modified": "2017-03-01T07:09:43.704Z",
 *   "participants": []
 *  }
 * ]
 */
router.get('/search', run.search);

/**
 * @api {get} /runs/open Get a collection of public run events
 * @apiName getPublicRunCollection
 * @apiGroup Runs
 *
 * @apiSuccess {ObjectId} _id Unique Run ID
 * @apiSuccess {String} location Location of run
 * @apiSuccess {Date} scheduled_date  Date of run
 * @apiSuccess {String} visibility public /private
 * @apiSuccess {String} creator Creator of run
 * @apiSuccess {String} last_modified Last Modified Date
 * @apiSuccess {String} date_created Date Created
 *
 * @apiSuccessExample Response Example:
 * HTTP/1.1 200 Ok
 * [
 *  {
 *   "_id": "58b7ed442e4b9419b674c3a2",
 *   "name": "power run",
 *   "location": "nyayo stadium",
 *   "scheduled_date": "2014-03-05T00:00:00.000Z",
 *   "visibility": "public",
 *   "creator": "olivia",
 *   "last_modified": "2017-03-01T07:09:43.704Z",
 *   "participants": []
 *  },
 *  {
 *   "_id": "58b672dad0f41016cf97230a",
 *   "name": "urban swaras",
 *   "location": "karura forest",
 *   "scheduled_date": "2014-03-05T00:00:00.000Z",  
 *   "visibility": "public",
 *   "creator": "winnie", 
 *   "last_modified": "2017-03-01T07:09:43.704Z",
 *   "participants": []
 * }
 * ]
 */
router.get('/open', run.getPublicRuns);

/**
 * @api {get} /runs/open/:_id Get one public run event
 * @apiName getOnePublicRun
 * @apiGroup Runs
 *
 * @apiSuccess {ObjectId} _id Unique Run ID
 * @apiSuccess {String} location Location of run
 * @apiSuccess {Date} scheduled_date  Date of run
 * @apiSuccess {String} visibility public /private
 * @apiSuccess {String} creator Creator of run
 * @apiSuccess {String} last_modified Last Modified Date
 * @apiSuccess {String} date_created Date Created
 *
 * @apiSuccessExample Response Example:
 * HTTP/1.1 200 Ok
 * [
 *  {
 *   "_id": "58b7ed442e4b9419b674c3a2",
 *   "name": "power run",
 *   "location": "nyayo stadium",
 *   "scheduled_date": "2014-03-05T00:00:00.000Z",
 *   "visibility": "public",
 *   "creator": "olivia",
 *   "last_modified": "2017-03-01T07:09:43.704Z",
 *   "participants": []
 *  }
 * ]
 */
router.get('/open/:_id', run.getOnePublicRun);

/**
 * @api {get} /runs/:_id/join Join a run event
 * @apiName joinRun
 * @apiGroup Runs
 *
 * @apiSuccess {ObjectId} _id Unique Run ID
 * @apiSuccess {String} location Location of run
 * @apiSuccess {Date} scheduled_date  Date of run
 * @apiSuccess {String} visibility public /private
 * @apiSuccess {String} creator Creator of run
 * @apiSuccess {String} last_modified Last Modified Date
 * @apiSuccess {String} date_created Date Created
 *
 * @apiSuccessExample Response Example:
 * HTTP/1.1 200 Ok
 *  {
 *  "_id": "58b7ed442e4b9419b674c3a2",
 *  "name": "power run",
 *  "location": "nyayo stadium",
 *  "scheduled_date": "2014-03-05T00:00:00.000Z",
 *  "visibility": "public",
 *  "creator": "olivia",
 *  "date_created": "2017-03-02T11:22:49.481Z",
 *  "last_modified": "2017-03-02T11:22:49.481Z",
 *  "participants": [
 *    58b67331d0f41016cf97230d
 * ]
 *   }
 */
router.get('/:_id/join', run.joinRun);

/**
 * @api {get} /runs/:_id/unfollow Unfollow a run event
 * @apiName unfollowRun
 * @apiGroup Runs
 *
 * @apiSuccess {ObjectId} _id Unique Run ID
 * @apiSuccess {String} location Location of run
 * @apiSuccess {Date} scheduled_date  Date of run
 * @apiSuccess {String} visibility public /private
 * @apiSuccess {String} creator Creator of run
 * @apiSuccess {String} last_modified Last Modified Date
 * @apiSuccess {String} date_created Date Created
 *
 * @apiSuccessExample Response Example:
 * HTTP/1.1 200 Ok
 *  {
 *  "_id": "58b7ed442e4b9419b674c3a2",
 *  "name": "power run",
 *  "location": "nyayo stadium",
 *  "scheduled_date": "2014-03-05T00:00:00.000Z",
 *  "visibility": "public",
 *  "creator": "olivia",
 *  "date_created": "2017-03-02T11:22:49.481Z",
 *  "last_modified": "2017-03-02T11:22:49.481Z",
 *  "participants": []
 *   }
 */
router.get('/:_id/unfollow', run.unfollowRun);

/**
 * @api {get} /runs/:_id Get one run event
 * @apiName getRun
 * @apiGroup Runs
 *
 * @apiSuccess {ObjectId} _id Unique Run ID
 * @apiSuccess {String} location Location of run
 * @apiSuccess {Date} scheduled_date  Date of run
 * @apiSuccess {String} visibility public /private
 * @apiSuccess {String} creator Creator of run
 * @apiSuccess {String} last_modified Last Modified Date
 * @apiSuccess {String} date_created Date Created
 *
 * @apiSuccessExample Response Example:
 * HTTP/1.1 200 Ok
 *  {
 *   "_id": "58b7ed442e4b9419b674c3a2",
 *   "name": "power run",
 *   "location": "nyayo stadium",
 *   "scheduled_date": "2014-03-05T00:00:00.000Z",
 *   "visibility": "public",
 *   "creator": "olivia",
 *   "last_modified": "2017-03-01T07:09:43.704Z",
 *   "participants": []
 * }
 * 
 */
router.get('/:_id', run.getRun);


/**
 * @api {get} /runs/:_id/participants Get all participants of a run event
 * @apiName getRunParticipants
 * @apiGroup Runs
 *
 * @apiSuccess {ObjectId} _id Unique participants ID
 *
 * @apiSuccessExample Response Example:
 * HTTP/1.1 200 Ok
 *  [
 *    "58d24895c2b5446a5ec60d8e",
 *    "58b7ed442e4b9419b674c3a2",
 *    "58cfddb2f37c247a4176da74"
 *  ]
 * 
 */
router.get('/:_id/participants', run.getParticipants);

/**
 * @api {delete} /runs/:_id Delete a single run event
 * @apiName deleteRun
 * @apiGroup Runs
 *
 * @apiSuccessExample Response Example:
 * HTTP/1.1 200 Ok
 * {}
 * 
 */
router.delete('/:_id', run.removeRun);

/**
 * @api {put} /runs/:_id Update a run event
 * @apiName updateRun
 * @apiGroup Runs
 *
 * @apiParam {String} name Run name
 *
 * @apiParamExample Request Example:
 *  {
 *	"name":"karura runners"
 *   } 
 *
 * @apiSuccess {ObjectId} _id Unique Run ID
 * @apiSuccess {String} location Location of run
 * @apiSuccess {Date} scheduled_date  Date of run
 * @apiSuccess {String} visibility public /private
 * @apiSuccess {String} creator Creator of run
 * @apiSuccess {String} last_modified Last Modified Date
 * @apiSuccess {String} date_created Date Created
 *
 * @apiSuccessExample Response Example:
 * HTTP/1.1 200 Ok
 *  {
 *  "_id": "58b7ed442e4b9419b674c3a2",
 *  "name": "karura runners",
 *  "location": "nyayo stadium",
 *  "scheduled_date": "2014-03-05T00:00:00.000Z",
 *  "visibility": "public",
 *  "creator": "olivia",
 *  "date_created": "2017-03-02T11:22:49.481Z",
 *  "last_modified": "2017-03-02T11:22:49.481Z",
 *  "participants": []
 *   }
 */
router.put('/:_id', run.updateRun);
router.get('/:_id/start', run.geocode);



// Export Router
module.exports = router;

