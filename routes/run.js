// Load Module Dependencies
var express   =   require('express');

var run = require('../controllers/run');

// Create a Router
var router = express.Router();

/**
 * @api {post} /runs/new create run
 * @apiName CreateRun
 * @apiGroup runs
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
 * @apiSuccess {String} _id Unique Run ID
 * @apiSuccess {String} location Location of run
 * @apiSuccess {Date} scheduled_date  Date of run
 * @apiSuccess {String} visibility public /private
 * @apiSuccess {String} last_modified Last Modified Date
 * @apiSuccess {String} date_created Date Created
 *
 * @apiSuccessExample Response Example:
 *  {
 *  "_id": "58b7ed442e4b9419b674c3a2",
 *  "name": "power run",
 *  "location": "nyayo stadium",
 *  "scheduled_date": "2014-03-05T00:00:00.000Z",
 *  "visibility": "public",
 *  "date_created": "2017-03-02T11:22:49.481Z",
 *  "last_modified": "2017-03-02T11:22:49.481Z",
 *  "followers": []
 *   }
 */
router.post('/new', run.createRun);

/**
 * @api {get} /runs/all GET runs collection
 * @apiName getRunCollection
 * @apiGroup runs
 *
 * @apiSuccess {String} _id Unique Run ID
 * @apiSuccess {String} location Location of run
 * @apiSuccess {Date} scheduled_date  Date of run
 * @apiSuccess {String} visibility public /private
 * @apiSuccess {String} last_modified Last Modified Date
 * @apiSuccess {String} date_created Date Created
 *
 * @apiSuccessExample Response Example:
 * [
 *  {
 *   "_id": "58b7ed442e4b9419b674c3a2",
 *   "name": "power run",
 *   "location": "nyayo stadium",
 *   "scheduled_date": "2014-03-05T00:00:00.000Z",
 *   "visibility": "public",
 *   "last_modified": "2017-03-01T07:09:43.704Z",
 *   "followers": []
 *  },
 *  {
 *   "_id": "58b672dad0f41016cf97230a",
 *   "name": "aberdare runners",
 *   "location": "KU field",
 *   "scheduled_date": "2014-03-05T00:00:00.000Z",  
 *   "visibility": "private",
 *   "last_modified": "2017-03-01T07:09:43.704Z",
 *   "followers": []
 * }
 * ]
 */
router.get('/all', run.getRuns);

/**
 * @api {get} /runs/public GET public runs collection
 * @apiName getPublicRunCollection
 * @apiGroup runs
 *
 * @apiSuccess {String} _id Unique Run ID
 * @apiSuccess {String} location Location of run
 * @apiSuccess {Date} scheduled_date  Date of run
 * @apiSuccess {String} visibility public /private
 * @apiSuccess {String} last_modified Last Modified Date
 * @apiSuccess {String} date_created Date Created
 *
 * @apiSuccessExample Response Example:
 * [
 *  {
 *   "_id": "58b7ed442e4b9419b674c3a2",
 *   "name": "power run",
 *   "location": "nyayo stadium",
 *   "scheduled_date": "2014-03-05T00:00:00.000Z",
 *   "visibility": "public",
 *   "last_modified": "2017-03-01T07:09:43.704Z",
 *   "followers": []
 *  },
 *  {
 *   "_id": "58b672dad0f41016cf97230a",
 *   "name": "urban swaras",
 *   "location": "karura forest",
 *   "scheduled_date": "2014-03-05T00:00:00.000Z",  
 *   "visibility": "public",
 *   "last_modified": "2017-03-01T07:09:43.704Z",
 *   "followers": []
 * }
 * ]
 */
router.get('/open', run.getPublicRuns);

//GET /runs/open/runId
router.get('/open/:_id', run.getOnePublicRun);

/**
 * @api {post} /runs/:_id Join a run
 * @apiName joinRun
 * @apiGroup runs
 *
 * @apiParam {ObjectId} followers unique Id
 *
 * @apiParamExample Request Example:
 *  {
 *  "followers":"58b67331d0f41016cf97230d"
 *  } 
 *
 * @apiSuccess {String} _id Unique Run ID
 * @apiSuccess {String} location Location of run
 * @apiSuccess {Date} scheduled_date  Date of run
 * @apiSuccess {String} visibility public /private
 * @apiSuccess {String} last_modified Last Modified Date
 * @apiSuccess {String} date_created Date Created
 *
 * @apiSuccessExample Response Example:
 *  {
 *  "_id": "58b7ed442e4b9419b674c3a2",
 *  "name": "power run",
 *  "location": "nyayo stadium",
 *  "scheduled_date": "2014-03-05T00:00:00.000Z",
 *  "visibility": "public",
 *  "date_created": "2017-03-02T11:22:49.481Z",
 *  "last_modified": "2017-03-02T11:22:49.481Z",
 *  "followers": [
 *    58b67331d0f41016cf97230d
 * ]
 *   }
 */
router.post('/:_id/join', run.joinRun);

/**
 * @api {post} /runs/:_id unfollow a run
 * @apiName unfollowRun
 * @apiGroup runs
 *
 * @apiParam {ObjectId} followers unique Id
 *
 * @apiParamExample Request Example:
 *  {
 *  "followers":"58b67331d0f41016cf97230d"
 *  } 
 *
 * @apiSuccess {String} _id Unique Run ID
 * @apiSuccess {String} location Location of run
 * @apiSuccess {Date} scheduled_date  Date of run
 * @apiSuccess {String} visibility public /private
 * @apiSuccess {String} last_modified Last Modified Date
 * @apiSuccess {String} date_created Date Created
 *
 * @apiSuccessExample Response Example:
 *  {
 *  "_id": "58b7ed442e4b9419b674c3a2",
 *  "name": "power run",
 *  "location": "nyayo stadium",
 *  "scheduled_date": "2014-03-05T00:00:00.000Z",
 *  "visibility": "public",
 *  "date_created": "2017-03-02T11:22:49.481Z",
 *  "last_modified": "2017-03-02T11:22:49.481Z",
 *  "followers": []
 *   }
 */
router.post('/:_id/unfollow', run.unfollowRun);

/**
 * @api {get} /runs/:_id GET one run
 * @apiName getRun
 * @apiGroup runs
 *
 * @apiSuccess {String} _id Unique Run ID
 * @apiSuccess {String} location Location of run
 * @apiSuccess {Date} scheduled_date  Date of run
 * @apiSuccess {String} visibility public /private
 * @apiSuccess {String} last_modified Last Modified Date
 * @apiSuccess {String} date_created Date Created
 *
 * @apiSuccessExample Response Example:
 * 
 *  {
 *   "_id": "58b7ed442e4b9419b674c3a2",
 *   "name": "power run",
 *   "location": "nyayo stadium",
 *   "scheduled_date": "2014-03-05T00:00:00.000Z",
 *   "visibility": "public",
 *   "last_modified": "2017-03-01T07:09:43.704Z",
 *   "followers": []
 * }
 * 
 */
router.get('/:_id', run.getRun);

//GET /runs/runId/followers
router.get('/:_id/followers', run.getFollowers);

//DELETE /runs/runId
router.delete('/:_id', run.removeRun);

/**
 * @api {put} /runs/:_id update run
 * @apiName updateRun
 * @apiGroup runs
 *
 * @apiParam {String} name Run name
 *
 * @apiParamExample Request Example:
 *  {
 *	"name":"karura runners"
 *   } 
 *
 * @apiSuccess {String} _id Unique Run ID
 * @apiSuccess {String} location Location of run
 * @apiSuccess {Date} scheduled_date  Date of run
 * @apiSuccess {String} visibility public /private
 * @apiSuccess {String} last_modified Last Modified Date
 * @apiSuccess {String} date_created Date Created
 *
 * @apiSuccessExample Response Example:
 *  {
 *  "_id": "58b7ed442e4b9419b674c3a2",
 *  "name": "karura runners",
 *  "location": "nyayo stadium",
 *  "scheduled_date": "2014-03-05T00:00:00.000Z",
 *  "visibility": "public",
 *  "date_created": "2017-03-02T11:22:49.481Z",
 *  "last_modified": "2017-03-02T11:22:49.481Z",
 *  "followers": []
 *   }
 */
router.put('/:_id', run.updateRun);


// Export Router
module.exports = router;

